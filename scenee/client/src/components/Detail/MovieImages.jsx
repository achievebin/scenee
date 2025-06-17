import React, { useEffect, useState } from 'react';
import { fetchMovieImages } from '../../api/tmdbApi';
import { TMDB_IMAGE_BASE_URL, B_POSTER_SIZE } from '../../constants/tmdb';
import styles from './MovieImages.module.css';

export default function MovieImages({ movieId }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchMovieImages(movieId);
        setImages(data.backdrops || []);
      } catch (e) { console.error(e); }
    }
    load();
  }, [movieId]);

  return (
    <section className={styles.movieImages}>
      <h2>스틸컷</h2>
      <div className={styles.imagesGrid}>
        {images.length
          ? images.map((img, i) => (
              <img
                key={i}
                src={`${TMDB_IMAGE_BASE_URL}${B_POSTER_SIZE}${img.file_path}`}
                alt={`스틸컷 ${i + 1}`}
              />
            ))
          : <p>이미지를 불러올 수 없습니다.</p>}
      </div>
    </section>
  );
}
