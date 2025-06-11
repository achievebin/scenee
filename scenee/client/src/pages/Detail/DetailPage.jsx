import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../../api/tmdbApi';
import MovieBasicInfo from '../../components/Detail/MovieBasicInfo';
import MovieInfoSection from '../../components/Detail/MovieInfoSection';
import MovieCredits from '../../components/Detail/MovieCredits';
import ReviewSection from '../../components/Detail/ReviewSection';
import MovieImages from '../../components/Detail/MovieImages';
import SimilarMovies from '../../components/Detail/SimilarMovies';

//영화 상세정보와 리뷰, 별점을 확인할 수 있는 페이지
const DetailPage = () => {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    const loadMovieData = async () => {
      try {
        const data = await fetchMovieDetails(data);
        setMovieData(data);
      } catch (error) {
        console.error('영화 상세 정보 로딩 실패:', error);
      }
    };
    loadMovieData();
  }, [movieId]);

  if (!movieData) return <div>로딩 중...</div>;

  return (
    <div>
      {movieData && (
        <>
          <MovieBasicInfo movieData={movieData} />
          <MovieInfoSection movieData={movieData} />
        </>
      )}
      <MovieCredits movieId={movieId} />
      <ReviewSection movieId={movieId} />
      <MovieImages movieId={movieId} />
      <SimilarMovies movieId={movieId} />
    </div>
  );
};

export default DetailPage;
