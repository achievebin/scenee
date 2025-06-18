import React, { useEffect, useState } from 'react';
import { fetchMoviesByType } from '../../api/tmdbApi';
import MovieCard from './MovieCard';
import styles from './MovieGridSection.module.css';

function MovieGridSection({ title, fetchType }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMoviesByType(fetchType);
        setMovies(data.results);
      } catch (err) {
        console.error('영화 로딩 실패:', err);
      }
    };
    loadMovies();
  }, [fetchType]);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.grid}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}

export default MovieGridSection;
