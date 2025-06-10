import React, { useEffect } from "react";
import { fetchMovieDetails } from "../../api/tmdbApi";
import {
  TMDB_IMAGE_BASE_URL,
  POSTER_SIZE,
  BACKDROP_SIZE,
} from "../../constants/tmdb";
import { useParams } from "react-router-dom";
import styles from "./MovieBasicInfo.module.css";

export default function MovieBasicInfo() {
  const { movieId } = useParams;
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        console.error("영화 정보 가져오기 실패패", err);
      }
    };
    loadMovie();
  }, [movieId]);

  const posterUrl = `${TMDB_IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`;
  const backdropUrl = `${TMDB_IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.backdrop_path}`;
  const genres = movie.genres.map((g) => g.name).join(", ");

  return (
    <section
      className={styles.header}
      style={{ backgroundImage: `url(${backdropUrl})` }}
    >
      <section className={styles.overlay}>
        <img src={posterUrl} alt={movie.title} className={styles.poster} />
        <article>
          <h1>{movie.title}</h1>
          <p>
            <strong>원제:</strong> {movie.original_title}
          </p>
          <p>
            <strong>개봉일:</strong> {movie.release_date}
          </p>
          <p>
            <strong>장르:</strong> {genres}
          </p>
          <p>
            <strong>러닝타임:</strong> {movie.runtime}
          </p>
          <p>
            <strong>평점:</strong> {movie.vote_average}
          </p>
        </article>
      </section>
    </section>
  );
}
