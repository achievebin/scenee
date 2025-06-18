// MostReviewedSection.jsx
import React, { useEffect, useState } from 'react';
import { getMostReviewedMovies } from '../../api/reviewApi';
import styles from './MostReviewedSection.module.css';

// 별 아이콘 간단 구현
const StarIcon = ({ filled }) => (
  <span style={{ color: filled ? '#FFD700' : '#DDD' }}>★</span>
);

function MostReviewedSection() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMostReviewedMovies(); // ✅ 서버 API
        setReviews(res.data || []);
      } catch (err) {
        console.error(err);
        setError('리뷰를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>
        최근에 달린 코멘트 <span className={styles.star}>⭐</span>
      </h1>

      {loading && <p className={styles.status}>로딩중…</p>}
      {error && <p className={styles.status}>{error}</p>}

      <div className={styles.sliderWrap}>
        <div className={styles.cardList}>
          {reviews.map((r) => (
            <article key={r.review_id} className={styles.card}>
              <header className={styles.cardHeader}>
                <span className={styles.nickname}>
                  {r.title || '제목 없음'}
                </span>
                <span className={styles.stars}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} filled={i < r.rating} />
                  ))}
                </span>
              </header>
              <p className={styles.text}>댓글 수: {r.commentCount || 0}개</p>
              <footer className={styles.cardFooter}>
                <a href={`/movie/${r.movie_id}`} className={styles.detailLink}>
                  자세히 보기
                </a>
              </footer>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.more}>
        <button className={styles.moreButton}>더 보기</button>
      </div>
    </section>
  );
}

export default MostReviewedSection;
