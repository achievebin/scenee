import React, { useState, useRef, useEffect } from 'react';
import { getMoviesByCategory } from '../../api/tmdbApi';
import { TMDB_IMAGE_BASE_URL, B_POSTER_SIZE } from '../../constants/tmdb';
import styles from './PopularSection.module.css';

function PopularSection() {
  const [movies, setMovies] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getMoviesByCategory('popular');
        setMovies(res.results.slice(0, 10));
      } catch (e) {
        console.error('인기 영화 가져오기 실패', e);
      }
    }

    fetchData();
    // 3초마다 다음 인덱스로
    timerRef.current = setInterval(() => {
      setHoveredIndex((i) => (i + 1) % movies.length);
    }, 4000);
    return () => clearInterval(timerRef.current);
  });

  // 마우스 올리면 자동 슬라이드 멈추고, 해당 카드로 변경
  const handleMouseEnter = (idx) => {
    clearInterval(timerRef.current);
    setHoveredIndex(idx);
  };
  // 마우스 떼면 다시 자동 실행
  const handleMouseLeave = () => {
    timerRef.current = setInterval(() => {
      setHoveredIndex((i) => (i + 1) % movies.length);
    }, 3000);
  };

  return (
    <section className={styles.popularSection}>
      <h1 className={styles.popularSectionTitle}>WEEK BEST 🏆</h1>
      <div
        className={styles.popularList}
        style={{
          transform: `translateX(-${hoveredIndex * (333 + 90)}px)`,
          transition: 'transform 0.9s ease-in-out',
        }}
      >
        {movies.map((movie, idx) => {
          const isHovered = idx === hoveredIndex;
          const displayRank = idx + 1;
          const imageUrl = `${TMDB_IMAGE_BASE_URL}${B_POSTER_SIZE}${
            movie.poster_path || movie.backdrop_path
          }`;
          return (
            <div
              key={movie.id}
              className={[styles.popularItem, isHovered && styles.hovered]
                .filter(Boolean)
                .join(' ')}
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={handleMouseLeave}
            >
              <div className={styles.popularCardWrapper}>
                <span className={styles.popularRank}>{displayRank}</span>
                <div
                  className={[
                    styles.popularCardInner,
                    styles[`inner${displayRank}`],
                  ].join(' ')}
                >
                  <img
                    src={imageUrl}
                    alt={movie.title}
                    className={styles.popularCardImg}
                  />
                </div>
              </div>
              <p className={styles.popularSubtitle}>{movie.title}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default PopularSection;
