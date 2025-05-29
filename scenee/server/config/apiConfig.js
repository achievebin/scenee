//config: 프로젝트 전반에 사용하는 공통 파일 설정을 모아두는 공간

//TMDB API의 기본 URL, 키 정리
const apiConfig = {
  tmdbBaseUrl: 'https://api.themoviedb.org/3',
  imageBaseUrl: 'https://image.tmdb.org/t/p/original',
  tmdbApiKey: import.meta.env.VITE_TMDB_API_KEY,
  backendBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api',
};

export default apiConfig;