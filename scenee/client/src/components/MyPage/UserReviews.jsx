import React, { useEffect, useState } from 'react';
import { getUserReviews, deleteReview, reviseReview } from '../../api/reviewApi';
import { fetchMovieDetails } from '../../api/tmdbApi';
import StarRatings from 'react-star-ratings';
import styles from './UserReviews.module.css';

export default function UserReviews({userId}) {
  const [boardList, setBoardList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fixReview, setFixReview] = useState(null);

  useEffect(() => {
    if (!userId) return;
    //리뷰 가져오기
    const fetchReviews = async () => {
      try {
        const res = await getUserReviews(userId);
        const reviews = res.data;
        //TMDB API를 이용해 영화 제목과 포스터 가져오기
        const enriched = await Promise.all(
          reviews.map(async (review) => {
            //Promise.all(): 여러 개의 비동기 작업을 병렬로 실행 후 모두 완료시 한꺼번에 반환
            try {
              const movieRes = await fetchMovieDetails(review.movie_id);
              return {
                ...review,
                movie: movieRes,
              };
            } catch (err) {
              //하나라도 실패시 catch로 넘어감
              console.error(`영화 ${review.movie_id} 불러오기 실패`, err);
              return review;
            }
          })
        );
        setBoardList(enriched);
      } catch (err) {
        console.error('리뷰 목록을 가져오는 데 실패했습니다.', err);
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
      setBoardList((prev) => prev.filter((r) => r.id == reviewId));
    } catch (err) {
      console.error('리뷰 삭제 실패', err);
      alert('리뷰 삭제에 실패하였습니다.');
    }
  };

  //리뷰 수정
  const handleUpdate = async (UpdatedReview) => {
    try {
      await reviseReview(UpdatedReview.id, {
        content: UpdatedReview.content,
        rating: UpdatedReview.rating
      })
      setBoardList((prev) => prev.map((r) => UpdatedReview.id ? {...r, ...UpdatedReview} : r))
      setFixReview(null);
    } catch (err) {
      console.error('수정 실패', err)
    }
  };

  return (
    <section>
      <h3>작성한 리뷰</h3>
      {loading ? (
        <p>로딩 중...</p>
      ) : boardList.length === 0 ? (
        <p>작성한 리뷰가 없습니다.</p>
      ) : (
        <ul className={styles['my-review-list__container']}>
          {boardList.map((review) => (
            <li key={review.id} style={style['my-review-list']}>
              {review.movie && (
                <section className={styles['my-review__container']}>
                  {/* TMDB API 활용하여 이미지 출력 */}
                  <img
                    src={`https://image.tmdb.org/t/p/w200${review.movie.poster_path}`}
                    alt={review.movie.title}
                    className={styles['my-review__thumbnail']}
                  />
                  <article>
                    <strong>{review.movie.title}</strong>
                    {/* 별점 UI 출력 */}
                    <StarRatings
                      rating={review.rating}
                      starRatedColor="gold"
                      starEmptyColor="lightgray"
                      numberOfStars={5}
                      name={`rating-${review.id}`}
                      starDimension="20px"
                      starSpacing="3px"
                    />
                    <p>{review.content}</p>
                    <button onClick={() => setFixReview(review)}>수정</button>
                    <button onClick={() => handleDelete(review.id)}>삭제</button>
                  </article>
                </section>
              )}
            </li>
          ))}
        </ul>
      )}
      {/* 리뷰 수정할 때 모달 사용 */}
      <EditReviewModal
        isOpen={!!fixReview}
        onClose={() => setFixReview(null)}
        review={fixReview}
        onSubmit={handleUpdate}
      />
    </section>
  );
}
