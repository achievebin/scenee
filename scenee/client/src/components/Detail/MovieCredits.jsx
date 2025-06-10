import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCredits } from "../../api/tmdbApi";
import { TMDB_IMAGE_BASE_URL } from "../../constants/tmdb";
import styles from "./MovieCredits.module.css";

export default function MovieCredits() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState(null);

  useEffect(() => {
    const loadCredits = async () => {
      try {
        const data = await fetchMovieCredits(movieId);
        const directorData = data.crew.find((c) => c.job === "Director"); //DB에서 감독 직함을 가진 인물을 가져오기
        setDirector(directorData);
        setCast(data.cast.slice(0, 8)); //배우 정보 중 8명까지 가져오기
      } catch (error) {
        console.error("출연진 정보 불러오기 실패", error);
      }
    };

    loadCredits();
  }, [movieId]);

  return (
    <div className={styles.credits}>
      <h2>출연진 및 제작진</h2>

      {director && (
        <p>
          <strong>감독:</strong> {director.name}
        </p>
      )}

      <div className={styles.castList}>
        {cast.map((actor) => (
          <div key={actor.cast_id} className={styles.castCard}>
            <img
              src={
                actor.profile_path
                  ? `${TMDB_IMAGE_BASE_URL}w185${actor.profile_path}`
                  : "/default-profile.png"
              }
              alt={actor.name}
            />
            <p>
              <strong>{actor.name}</strong>
            </p>
            <p className={styles.character}>({actor.character})</p>
          </div>
        ))}
      </div>
    </div>
  );
}
