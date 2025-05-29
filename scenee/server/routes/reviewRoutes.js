//routes: 클라이언트에서 오는 API 요청을 처리함
const express = require('express');
const router = express.Router();
const { postReview, getReviews, removeReview } = require('../controllers/reviewController');
//const { createReview, getReviewsByMovieId, getUserReviews, deleteReview, updateReview } = require('../controllers/reviewController');
//리뷰를 작성하고 수정하고 갱신하고 지우는 라우팅

//영화 ID를 기준 삼아 리뷰 목록 가져오기
router.get('/movie/:movieId', getReviews);
//특정 사용자가 작성한 리뷰 목록
//router.get('/user/:userId', getUserReviews);
//리뷰 생성
router.post('/', postReview);
//리뷰 갱신
//router.put('/:reviewId', updateReview);
//리뷰 삭제
router.delete('/:reviewId', removeReview);

module.exports = router;