import React from 'react';
import ReviewForm from '../Review/ReviewForm';
import ReviewList from '../Review/ReviewList';
import styles from './ReviewSection.module.css';

//리뷰 관련 컴포넌트가 담겨 있는 공간
const ReviewSection = ({ movieId }) => {
  return (
    <div className={styles.Section}>
      <ReviewForm movieId={movieId} className={styles.Form}/>
      <ReviewList movieId={movieId} />
    </div>
  );
};

export default ReviewSection;
