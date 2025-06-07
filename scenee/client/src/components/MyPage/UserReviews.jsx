import React, { useEffect, useState } from 'react'
import { getUserReviews, deleteReview } from '../../api/reviewApi'
import { fetchMovieDetails } from '../../api/tmdbApi'
import styles from './UserReviews.module.css'

export default function UserReviews() {
  const [boardList, setBoardList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    //리뷰 가져오기  
    const fetchReviews = async () => {
      try {
        const res = await getUserReviews(userId);
        const reviews = res.data;
        //TMDB API를 이용해 영화 제목과 포스터 가져오기
        const enriched = await Promise.all(reviews.map(async (review) => {
          //Promise.all(): 여러 개의 비동기 작업을 병렬로 실행 후 모두 완료시 한꺼번에 반환
          try {
            const movieRes = await fetchMovieDetails(review.movie_id);
            return {
              ...review,
              movie: movieRes
            }
          } catch (err) {
            //하나라도 실패시 catch로 넘어감
            console.error(`영화 ${review.movie_id} 불러오기 실패`, err);
            return review;
          }
        }));
        setBoardList(enriched);
      } catch (err) {
        console.error('리뷰 목록을 가져오는 데 실패했습니다.', err)
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [userId]);

  //리뷰 삭제
  const handleDelete = async (reviewId) => {
    if (!window.confirm('정말 이 리뷰를 삭제하겠습니까?')) return;
    try {
      await deleteReview(reviewId);
      setBoardList((prev) => prev.filter((delr) => delr.id == reviewId))
    } catch (err) {
      console.error('리뷰 삭제 실패', err);
      alert('리뷰 삭제에 실패하였습니다.');
    }
  }

  //목록을 가져오는 동안 출력
  if (loading) return <p>리뷰를 불러오는 중입니다.</p>;
  //해당하는 목록이 존재하지 않을 때 출력
  if (!boardList.length == 0) return <p>작성한 리뷰가 없습니다.</p>;

return (
    <div>
      <h3>작성한 리뷰 목록</h3>
      <ul className={styles['my-review-list__container']}>
        {boardList.map((review) => (
          <li key={review.id} className={styles['my-review-list']}>
            {review.movie && (
              <div className={styles['my-review__container']}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${review.movie.poster_path}`}
                  alt={review.movie.title}
                  className={styles['my-review__thumbnail']}
                />
                <div>
                  <h4>{review.movie.title}</h4>
                  <p><strong>평점:</strong> {review.rating}</p>
                  <p><strong>내용:</strong> {review.content}</p>
                  <p><strong>작성일:</strong> {new Date(review.created_at).toLocaleString()}</p>
                  <button onClick={() => handleDelete(review.id)}>삭제</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
