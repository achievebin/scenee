import React, { useState, useEffect } from 'react';
import { fetchMovieImages } from '../../api/tmdbApi';
import { TMDB_IMAGE_BASE_URL, B_POSTER_SIZE } from '../../constants/tmdb';

export default function MovieImages({ movieId }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const data = await fetchMovieImages(movieId);
        setImages(data.backdrops || []); // backdrops만 사용하는 경우
      } catch (err) {
        console.error('스틸 컷 가져오기 실패', err);
      }
    };
    loadImages();
  }, [movieId]);

  return (
    <div>
      <section className="movie-images">
        <h2>스틸컷</h2>
        <div className="images-grid">
          {images.length > 0 ? (
            images.map((img, idx) => (
              <img
                key={idx}
                src={`${TMDB_IMAGE_BASE_URL}${B_POSTER_SIZE}${img.file_path}`}
                alt={`Still ${idx + 1}`}
              />
            ))
          ) : (
            <p>이미지를 불러올 수 없습니다.</p>
          )}
        </div>
      </section>
    </div>
  );
}
