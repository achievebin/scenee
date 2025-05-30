//models: 데이터를 저장하고 관리하는 역할을 맡으며, 데이터베이스와 직접 상호작용함
//영화 관련 sql문 처리
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
import tmdbConfig from '../config/tmdbConfig.js';
//TMDB API 접속을 하기 위함
const { tmdbBaseUrl, tmdbApiKey } = tmdbConfig;

export const fetchPopularMovies = async () => {
    try {
        const response = await axios.get(`${tmdbBaseUrl}/movie/popular`, {
        params: {
            api_key: tmdbApiKey,
            language: 'ko-KR',
            page: 1
        }
    });
    return response.data.results;
    } catch (error) {
        console.error('', error.message);
        throw error;
    }
}

export const fetchMovieDetail = async (id) => {
    try {
        const response = await axios.get(`${tmdbBaseUrl}/movie/${id}`, {
        params: {
            api_key: tmdbApiKey,
            language: 'ko-KR'
        }
    });
    return response.data;
    } catch (error) {
        console.error('', error.message);
        throw error;
    }
    
}

export const searchMoviesByKeyword = async (query) => {
    try {
        const response = await axios.get(`${tmdbBaseUrl}/search/multi`, {
        params: {
            api_key: tmdbApiKey,
            language: 'ko-KR',
            query
        }
    });
    return response.data.results;
    } catch (error) {
        console.error('', error.message);
        throw error;
    }
}