//routes: 클라이언트에서 오는 API 요청을 처리함
const express = require('express');
const router = express.Router();
const { getPopularMovies, getMovieById, searchMovies } = require('../controllers/movieContoller');
//const { getPopularMovies, getMovieById, searchMovies, getMoviesByCategory, addReview, getReviewsByMovieId } = require('../controllers/movieController.js');
//영화 검색과 상세정보 관련 라우팅

//인기 영화 리스트
router.get('/popular', getPopularMovies);
//영화 ID로 정보 받아오기
router.get('/:id', getMovieById);
//검색어로 영화 찾기
router.get('/search/:query', searchMovies);
//카테고리별 영화 목록
//router.get('/category/:category', getMoviesByCategory)
//리뷰 작성
//router.post('/:id/review', addReview)
//영화 ID로 리뷰 조회
//router.get('/:id/reviews', getReviewsByMovieId)

module.exports = router;