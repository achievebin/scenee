import React, { useEffect, useState } from 'react';
import { getReviews, reviseReview, deleteReview } from '../../api/reviewApi';
import Ratings from 'react-rating';
import { Star } from 'lucide-react';
import EditReviewModal from './EditReviewModal'; // 모달 컴포넌트
import { useAuthContext } from '../../contexts/AuthContext'; // 사용자 정보

export default function ReviewList({ movieId }) {
  const [reviews, setReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null); // 수정할 리뷰
  const { user } = useAuthContext(); // 로그인한 사용자 정보

  const fetchReviews = async () => {
    try {
      const data = await getReviews(movieId);
      setReviews(data);
    } catch (err) {
      console.error('리뷰 가져오기 실패', err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [movieId]);

  const handleDelete = async (reviewId) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      await deleteReview(reviewId);
      fetchReviews(); // 목록 갱신
    } catch (err) {
      console.error('리뷰 삭제 실패', err);
    }
  };

  return (
    <div>
      <h3>리뷰 목록</h3>
      {reviews.length === 0 ? (
        <p>아직 리뷰가 없습니다.</p>
      ) : (
        <ul>
          {reviews.map((r) => (
            <li key={r.id}>
              <Ratings
                initialRating={r.rating}
                readonly
                emptySymbol={<Star color="lightgray" size={20} />}
                fullSymbol={<Star color="gold" size={20} fill="gold" />}
              />
              <p>{r.content}</p>
              <small>작성자: {r.nickname || r.userId}</small>
              {user?.id === r.userId && (
                <>
                  <button onClick={() => setEditingReview(r)}>수정</button>
                  <button onClick={() => handleDelete(r.id)}>삭제</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* 리뷰 수정 모달 */}
      {editingReview && (
        <EditReviewModal
          review={editingReview}
          isOpen={true}
          onClose={() => setEditingReview(null)}
          onSubmit={async (updated) => {
            try {
              await reviseReview(updated); // 서버에 수정 내용 전송
              await fetchReviews(); // 목록 갱신
            } catch (err) {
              console.error('리뷰 수정 실패:', err);
            } finally {
              setEditingReview(null);
            }
          }}
        />
      )}
    </div>
  );
}
