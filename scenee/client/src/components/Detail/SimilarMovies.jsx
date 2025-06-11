import React, { useState, useEffect } from 'react';
import { fetchSimilarMovies } from '../../api/tmdbApi';
import { TMDB_IMAGE_BASE_URL, S_POSTER_SIZE } from '../../constants/tmdb';

export default function SimilarMovies({ movieId }) {
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    const loadSimilarMovies = async () => {
      try {
        const data = await fetchSimilarMovies(movieId);
        setSimilarMovies(data.results);
      } catch (err) {
        console.error('비슷한 영화 이미지 가져오기 실패', err);
      }
    };
    loadSimilarMovies();
  }, [movieId]);

  return (
    <section className="similar-movies">
      <h2>비슷한 영화</h2>
      <div className="movie-grid">
        {similarMovies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`${TMDB_IMAGE_BASE_URL}${S_POSTER_SIZE}${movie.poster_path}`}
              alt={movie.title}
            />
            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
