import React, { useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';

export default function EditReviewModal({ isOpen, onClose, review, onSubmit }) {
  const [content, setContent] = useState();
  const [rating, setRating] = useState();

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

  return (
    <div className="modal-fade">
      <div className="modal-body">
        <h3>수정할 리뷰</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="4"
            required
          ></textarea>
          <StarRatings
            rating={rating}
            starRatedColor="gold"
            starEmptyColor="lightgray"
            changeRating={setRating}
            numberOfStars={5}
            name="user-rating"
            starDimension="30px"
            starSpacing="5px"
          />
          <button type="submit">수정</button>
          <button type="button" onClick={onClose}>
            취소
          </button>
        </form>
      </div>
    </div>
  );
}
