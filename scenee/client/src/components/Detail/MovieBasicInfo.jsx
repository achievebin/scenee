import React from 'react';
import {
  TMDB_IMAGE_BASE_URL,
  B_POSTER_SIZE,
  BACKDROP_SIZE,
} from '../../constants/tmdb';

export default function MovieBasicInfo({ movieData }) {
  const posterUrl = `${TMDB_IMAGE_BASE_URL}${B_POSTER_SIZE}${movieData.poster_path}`;
  const backdropUrl = `${TMDB_IMAGE_BASE_URL}${BACKDROP_SIZE}${movieData.backdrop_path}`;
  const genres = movie.genres.map((g) => g.name).join(', ');

  return (
    <section
      className={styles.header}
      style={{ backgroundImage: `url(${backdropUrl})` }}
    >
      <section className={styles.overlay}>
        <img src={posterUrl} alt={movieData.title} className={styles.poster} />
        <article>
          <h1>{movieData.title}</h1>
          <p>
            <strong>원제:</strong> {movieData.original_title}
          </p>
          <p>
            <strong>개봉일:</strong> {movieData.release_date}
          </p>
          <p>
            <strong>장르:</strong> {genres}
          </p>
          <p>
            <strong>러닝타임:</strong> {movieData.runtime}분
          </p>
          <p>
            <strong>평점:</strong> {movieData.vote_average}
          </p>
        </article>
      </section>
    </section>
  );
}
