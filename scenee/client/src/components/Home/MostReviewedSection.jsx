import React, { useEffect, useState } from 'react';

import styles from './MostReviewedSection.module.css';

function MostReviewedSection() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/reviews/popular')
      .then((res) => {
        if (!res.ok) throw new Error('네트워크 에러');
        return res.json();
      })
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('댓글을 불러오는 중 오류가 발생했습니다.');
        setLoading(false);
      });
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
            <article key={r.id} className={styles.card}>
              <header className={styles.cardHeader}>
                <span className={styles.nickname}>{r.title}</span>
                <span className={styles.stars}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} filled={i < r.rating} />
                  ))}
                </span>
              </header>
              <p className={styles.text}>댓글 수: {r.commentCount}개</p>
              <footer className={styles.cardFooter}>
                <a href={`/reviews/${r.id}`} className={styles.detailLink}>
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
