import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  searchMovies,
  getMoviesByCategory,
  getMoviesByGenre,
} from '../../api/tmdbApi';
import styles from './MovieGridSection.module.css';

const SearchResultPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const genreId = searchParams.get('genre');
  const category = searchParams.get('category');
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function fetchResults() {
      try {
        if (query) {
          const res = await searchMovies(query);
          setResults(res.results);
        } else if (genreId) {
          const res = await getMoviesByGenre(genreId);
          setResults(res.results);
        } else if (category) {
          const res = await getMoviesByCategory(category);
          setResults(res.results);
        } else {
          setResults([]);
        }
      } catch (err) {
        console.error('검색 실패:', err);
      }
    }

    fetchResults();
  }, [query, genreId, category]);

  return (
    <div>
      <h2>검색 결과</h2>
      {results.length > 0 ? (
        <div className={styles.grid}>
          {results.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title || movie.name}
              posterPath={movie.poster_path}
              rating={movie.vote_average}
            />
          ))}
        </div>
      ) : (
        <p>결과가 없습니다.</p>
      )}
    </div>
  );
};

export default SearchResultPage;
