import React, { useState, useEffect } from 'react';
import { fetchMovieDetails } from '../../api/tmdbApi';

export default function MovieInfoSection({ movieId }) {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const loadInfo = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setInfo(data);
      } catch (err) {
        console.error('영화 정보 가져오기 실패', err);
      }
    };
    loadInfo();
  }, [movieId]);
  return (
    <div>
      <></>
    </div>
  );
}
