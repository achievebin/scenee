import React, { useEffect, useState } from 'react';
import { getReviews, reviseReview, deleteReview } from '../../api/reviewApi';
import Ratings from 'react-rating';
import { Star } from 'lucide-react';
import EditReviewModal from './EditReviewModal';
import { useAuthContext } from '../../contexts/AuthContext';
import ReviewForm from './ReviewForm';

export default function ReviewList({ movieId }) {
  const [reviews, setReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null);
  const { user } = useAuthContext();

  const fetchReviews = async () => {
    try {
      const data = await getReviews(movieId);
      if (Array.isArray(data)) {
        setReviews(data);
      } else {
        setReviews([]);
      }
    } catch (err) {
      console.error('리뷰 가져오기 실패', err);
      setReviews([]);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [movieId]);

  const handleDelete = async (reviewId) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      await deleteReview(reviewId);
      fetchReviews();
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

      <ReviewForm movieId={movieId} onReviewSubmit={fetchReviews} />

      {editingReview && (
        <EditReviewModal
          review={editingReview}
          isOpen={true}
          onClose={() => setEditingReview(null)}
          onSubmit={async (updated) => {
            try {
              await reviseReview(updated);
              await fetchReviews();
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
