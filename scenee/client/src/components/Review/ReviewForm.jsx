import React, { useState } from 'react';
import { addReview } from '../../api/reviewApi';
import Ratings from 'react-rating';
import { Star } from 'lucide-react';
import { useAuthContext } from '../../contexts/AuthContext'; // 로그인 정보
import styles from './ReviewForm.module.css';

export default function ReviewForm({ movieId, onReviewSubmit }) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const { user } = useAuthContext(); // 로그인 여부

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !content.trim()) {
      return setError('별점과 내용을 모두 입력해 주세요.');
    }

    try {
      await addReview({ movieId, rating, content });
      setRating(0);
      setContent('');
      setError('');
      if (onReviewSubmit) onReviewSubmit(); // 상위에서 목록 갱신
    } catch (err) {
      console.error('리뷰 작성 실패:', err);
      setError('로그인 상태를 확인하거나 다시 시도해 주세요.');
    }
  };

  if (!user) {
    return <p className={styles.error}>리뷰 작성을 위해 로그인해 주세요.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>리뷰 작성</h3>

      <Ratings
        initialRating={rating}
        onChange={setRating}
        emptySymbol={<Star color="lightgray" size={24} />}
        fullSymbol={<Star color="gold" size={24} fill="gold" />}
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
