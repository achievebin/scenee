import axios from 'axios';
//작성한 axios 인스턴스를 가져옴
import { TMDB_API_KEY, TMDB_BASE_URL } from '../constants/tmdb';
//TMDB API를 받아오기 위한 상수

//영화 상세정보 조회
export async function fetchMovieDetails(movieId) {
  const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}`, {
    params: {
      api_key: TMDB_API_KEY,
      language: 'ko-KR',
    },
  });
  return response.data;
}

//영화 감독 및 출연진 정보 조회
export async function fetchMovieCredits(movieId) {
  const res = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}/credits`, {
    params: {
      api_key: TMDB_API_KEY,
      language: 'ko-KR',
    },
  });
  return res.data;
}

//영화 이미지 조회
export async function fetchMovieImages(movieId) {
  const res = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}/images`, {
    params: {
      api_key: TMDB_API_KEY,
    },
  });
  return res.data;
}

//비슷한 영화 조회
export async function fetchSimilarMovies(movieId) {
  const res = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}/similar`, {
    params: {
      api_key: TMDB_API_KEY,
      language: 'ko-KR',
    },
  });
  return res.data;
}

//검색어 기반 영화 검색
export async function searchMovies(query) {
  const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
    params: {
      api_key: TMDB_API_KEY,
      language: 'ko-KR',
      query,
    },
  });
  return response.data;
}

//카테고리별 영화 검색
export async function getMoviesByCategory(category) {
  const response = await axios.get(`${TMDB_BASE_URL}/movie/${category}`, {
    params: {
      api_key: TMDB_API_KEY,
      language: 'ko-KR',
    },
  });
  return response.data;
}

//장르별 영화 검색
export async function getMoviesByGenre(genreId) {
  const response = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
    params: {
      api_key: TMDB_API_KEY,
      language: 'ko-KR',
      with_genres: genreId,
    },
  });
  return response.data;
}
