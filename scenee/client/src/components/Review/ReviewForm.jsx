import React, { useState } from 'react';
import { createReview } from '../../api/reviewApi';
import StarRatings from 'react-star-ratings'; // 별점 UI
import styles from './ReviewForm.module.css';

export default function ReviewForm({ movieId }) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !content.trim()) {
      return setError('별점과 내용을 모두 입력해 주세요.');
    }

    try {
      await createReview({ movieId, rating, content });
      setRating(0);
      setContent('');
      setError('');
      // 리뷰 목록 새로고침 트리거 필요 시 상위로 콜백
    } catch (err) {
      console.error('리뷰 작성 실패:', err);
      setError('리뷰 작성 중 오류가 발생했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>리뷰 작성</h3>

      <StarRatings
        rating={rating}
        starRatedColor="gold"
        changeRating={setRating}
        numberOfStars={5}
        name="rating"
        starDimension="24px"
        starSpacing="4px"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="이 영화에 대한 당신의 의견을 들려주세요"
      />

      {error && <p className={styles.error}>{error}</p>}

      <button type="submit">리뷰 등록</button>
    </form>
  );
}

