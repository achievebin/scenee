import React, { useEffect, useState } from 'react';
import Rating from 'react-rating';
import { Star } from 'lucide-react';

//Modal(모달): 새 창을 띄우는 팝업과 달리 브라우저 내부에 상위 레이어를 띄우는 방식
export default function EditReviewModal({ isOpen, onClose, review, onSubmit }) {
  const [content, setContent] = useState();
  const [rating, setRating] = useState(5);

  useEffect(() => {
    if (review) {
      setContent(review.content || '');
      setRating(review.rating || 5);
    }
  }, [review]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit({ ...review, content, rating });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-body">
        <h3>수정할 리뷰</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="4"
            required
          ></textarea><br />
          <Rating
            initialRating={rating}
            onChange={(rate) => setRating(rate)}
            emptySymbol={<Star color="lightgray" size={24} />}
            fullSymbol={<Star color="gold" size={24} fill="gold" />}
          /><br />
          <button type="submit">수정</button>
          <button type="button" onClick={onClose}>
            취소
          </button>
        </form>
      </div>
    </div>
  );
}
