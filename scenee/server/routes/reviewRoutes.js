//routes: 클라이언트에서 오는 API 요청을 처리함
import { Router } from 'express';
import {getReviewsByMovieId, postReview, updateReview, removeReview} from '../controllers/reviewController.js'
import { authenticateJWT } from '../middlewares/authMiddleware.js';
const router = Router();
//const { createReview, getReviewsByMovieId, getUserReviews, deleteReview, updateReview } = require('../controllers/reviewController');
//리뷰를 작성하고 수정하고 갱신하고 지우는 라우팅

//영화 ID를 기준 삼아 리뷰 목록 가져오기 - /api/reviews/movie/:movieId
router.get('/movie/:movieId', getReviewsByMovieId);
//특정 사용자가 작성한 리뷰 목록 - /api/reviews/user/:userId
//router.get('/user/:userId', getUserReviews);
//리뷰 생성 - /api/reviews
router.post('/', authenticateJWT, postReview);
//리뷰 갱신 - /api/reviews/:reviewId
router.put('/:reviewId', authenticateJWT, (req, res, next) => {
    if (req.user.id !== parseInt(req.params.id)) {
        return res.status(403).json({message: '본인만 수정할 수 있습니다.'})
        //http 응답코드 403(Forbidden)
    }
    next();
}, updateReview);
//리뷰 삭제 - /api/reviews/:reviewId
router.delete('/:reviewId', authenticateJWT, (req, res, next) => {
    if (req.user.id !== parseInt(req.params.id)) {
        return res.status(403).json({message: '본인만 수정할 수 있습니다.'})
        //http 응답코드 403(Forbidden)
    }
    next();
}, removeReview);

export default router;