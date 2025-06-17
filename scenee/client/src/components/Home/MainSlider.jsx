import React, { useEffect, useRef, useState } from 'react';
import styles from './MainSlider.module.css';
import { getMoviesByCategory } from '../../api/tmdbApi';
import { TMDB_IMAGE_BASE_URL, BACKDROP_SIZE } from '../../constants/tmdb';
import nextIcon from '../../assets/images/next.svg';

function MainSlider() {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeout = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMoviesByCategory('popular');
        setMovies(res.results.slice(0, 10));
      } catch (e) {
        console.error('인기 영화 가져오기 실패', e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => timeout.current && clearTimeout(timeout.current);
  }, [currentIndex, movies.length]);

  const handleNext = () => {
    if (timeout.current) clearTimeout(timeout.current);
    setCurrentIndex((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    if (timeout.current) clearTimeout(timeout.current);
    setCurrentIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
  };

  return (
    <div className={styles['slider-container']}>
      <div
        className={styles['slider-wrapper']}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {movies.map((movie, idx) => (
          <div className={styles.slide} key={movie.id}>
            <img
              src={`${TMDB_IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.backdrop_path || movie.poster_path}`}
              alt={movie.title || `슬라이드 ${idx + 1}`}
            />
          </div>
        ))}
      </div>

      <button className={styles['arrowPrev']} onClick={handlePrev}>
        <img src={nextIcon} alt="Previous" className={styles['flipX']} />
      </button>

      <button className={styles['arrowNext']} onClick={handleNext}>
        <img src={nextIcon} alt="Next" className={styles['arrowIcon']} />
      </button>

      <div className={styles['dots']}>
        {movies.map((_, idx) => (
          <span
            key={idx}
            className={`${styles.dot} ${idx === currentIndex ? styles.active : ''}`}
            onClick={() => {
              if (timeout.current) clearTimeout(timeout.current);
              setCurrentIndex(idx);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default MainSlider;
