//영화 관련 sql문 처리
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.API_BASE_URL;
const key = process.env.TMDB_API_KEY;

export const fetchPopularMovies = async () => {
    const response = await axios.get(`${url}/movie/popular`, {
        params: {
            api_key: key,
            language: 'ko=KR',
            page: 1
        }
    });
    return response.data.results;
}

export const fetchMovieDetail = async (id) => {
    const response = await axios.get(`${url}/movie/${id}`, {
        params: {
            api_key: key,
            language: 'ko=KR'
        }
    });
    return response.data;
}

export const searchMoviesByKeyword = async (query) => {
    const response = await axios.get(`${url}/movie/multi`, {
        params: {
            api_key: key,
            language: 'ko=KR',
            query
        }
    });
    return response.data.results;
}