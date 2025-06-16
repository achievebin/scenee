import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MovieCard.module.css';

const MovieCard = ({
  id,
  title,
  posterPath,
  rating,
  reviewCount,
  commentCount,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${id}`);
  };

  return (
    <div
      className={styles.card}
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      <img
        src={
          posterPath
            ? `https://image.tmdb.org/t/p/w500${posterPath}`
            : '/default-poster.png'
        }
        alt={title}
        className={styles.poster}
      />
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        {rating && <p className={styles.rating}>⭐ {rating.toFixed(1)}</p>}
        {typeof reviewCount === 'number' && (
          <p className={styles.subInfo}>리뷰 수: {reviewCount}</p>
        )}
        {typeof commentCount === 'number' && (
          <p className={styles.subInfo}>댓글 수: {commentCount}</p>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
