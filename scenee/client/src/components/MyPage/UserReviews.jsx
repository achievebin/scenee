import React, { useEffect } from 'react'
import { getUserReviews } from '../../api/reviewApi'

export default function UserReviews() {
  const [boardList, setBoardList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    
    const fetchReviews = async () => {
      try {
        const res = await getUserReviews(userId);
        setBoardList(res.data);
      } catch (err) {
        console.error('리뷰 목록을 가져오는 데 실패했습니다.', err)
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [userId]);
  //목록을 가져오는 동안 출력
  if (loading) return <p>리뷰를 불러오는 중입니다.</p>;
  //해당하는 목록이 존재하지 않을 때 출력
  if (!boardList.length == 0) return <p>작성한 리뷰가 없습니다.</p>;

  return (
    <div>
      <h3>작성한 리뷰 목록</h3>
      <ul>
        {boardList.map((review) => (
          <li key={review.id}>
            <strong>{review.movie_id}번 영화</strong> - 평점: {review.rating}<br />
            내용: {review.content}<br/>
            작성일: {new Date(review.createdAt).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  )
}
