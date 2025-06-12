//config: 프로젝트 전반에 사용하는 공통 파일 설정을 모아두는 공간
import dotenv from 'dotenv';
dotenv.config();

//TMDB API의 기본 URL, 키 정리
const tmdbConfig = {
  tmdbBaseUrl: 'https://api.themoviedb.org/3',
  imageBaseUrl: 'https://image.tmdb.org/t/p/original',
  tmdbApiKey: process.env.TMDB_API_KEY,
};

export default tmdbConfig;