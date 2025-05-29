//controller: 사용자 입력과 model, view 간의 상호작용을 제어함
import { fetchPopularMovies, fetchMovieDetail, searchMoviesByKeyword } from '../models/movieModel.js'
//영화 목록과 영화 상세 정보를 가져오는 역할

export const getPopularMovies = async (req, res) => {
    try {
        const movies = await fetchPopularMovies();
        res.json(movies);
    } catch (error) {
        res.status(500).json({message: '인기 영화 실패'});
    }
};

export const getMovieById = async (req, res) => {
    try {
        const movie = await fetchMovieDetail(req.params.id);
        res.json(movie);
    } catch (error) {
        res.status(500).json({message: '검색 실패'});
    }

};

// export const addReview = async (req, res) => {

// };

export const searchMovies = async (req, res) => {
    try {
        const {query} = req.query;
        const results = await searchMoviesByKeyword(query);
        res.json(results);

    } catch (error) {
        res.status(500).json({message: '검색 실패'});
    }

};

// export const getMoviesByCategory = async (req, res) => {

// };

// export const getReviewsByMovieId = async (req, res) => {

// };
 
