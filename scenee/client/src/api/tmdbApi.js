import axios from 'axios';
//작성한 axios 인스턴스를 가져옴

//TMDB API를 받아오기 위함
const TMDB_BASE_URL = 'https://api.themoviedb.org/3/';
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

//인기 영화 조회
export async function fetchPopularMovies() {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {params: {api_key: TMDB_API_KEY}});
    return response.data;
}

//영화 상세정보 조회
export async function fetchMovieDetails(movieId) {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}`, {params: {api_key: TMDB_API_KEY}});
    return response.data;
}

//영화 검색
export async function searchMovie(query) {
    const respnse = await axios.get(`${TMDB_BASE_URL}/search/movie`, {params: {api_key: TMDB_API_KEY}, query});
    return response.data;
}

