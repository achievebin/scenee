//controller: 사용자 입력과 model, view 간의 상호작용을 제어함
import {bringReviewsByMovieId, bringReviewsByUserId, rewriteReview, createReview, deleteReview} from '../models/reviewModel.js'
//리뷰 작성과 조회 및 삭제 기능을 담당

//영화 기준 리뷰 조회 - api/reviews/movie/:movieId
export const getReviewsByMovieId = async (req, res) => {
    const {movieId} = req.params;
    try {
        const reviews = await bringReviewsByMovieId(movieId);
        res.json(reviews);
    } catch (error) {
        res.status(500).json({message: '리뷰 조회 실패'});
        //http 응답코드 500(Internet Server Error)
    }
    
}

//이용자 기준 리뷰 조회 - api/reviews/user/:userId
export const getReviewsByUserId = async (req, res) => {
    const {userId} = req.params;
    try {
        const reviews = await bringReviewsByUserId(userId);
        res.json(reviews);
    } catch (error) {
        res.status(500).json({message: '리뷰 조회 실패'});
        //http 응답코드 500(Internet Server Error)
    }
    
}

//리뷰 작성 - api/reviews
export const postReview = async (req, res) => {
    const userId = req.user.id;
    const {movieId, content, rating} = req.body
    try {
        await createReview(userId, movieId, content, rating);
        res.status(201).json({message: '리뷰 작성 성공', reviewId})
        //http 응답코드 201(Created)
    } catch (error) {
        res.status(500).json({message: '리뷰 작성 실패'});
        //http 응답코드 500(Internet Server Error)
    }
    
}

//리뷰 수정 - api/reviews/:reviewId
export const updateReview = async (req, res) => {
    const userId = req.user.id;
    const { reviewId } = req.params;
    const { content, rating} = req.body
    try {
        const result = await rewriteReview(reviewId, userId, content, rating);
        if (result === 0){
            return res.status(403).json({message: '수정 권한이 없습니다. 본인만 수정할 수 있습니다.'})
            //http 응답코드 403(Forbidden)
        }
        res.status(201).json({message: '리뷰 작성 성공'})
        //http 응답코드 201(Created)
    } catch (error) {
        res.status(500).json({message: '리뷰 작성 실패'});
        //http 응답코드 500(Internet Server Error)
    }
    
}

//리뷰 삭제 - api/reviews/:reviewId
export const removeReview = async (req, res) => {
    const userId = req.user.id;
    const reviewId = req.params.reviewId;
    try {
        const result = await deleteReview(reviewId, userId);
         if (result === 0){
            return res.status(403).json({message: '삭제제 권한이 없습니다. 본인만 삭제할 수 있습니다.'})
            //http 응답코드 403(Forbidden)
        }
        res.json({message: '리뷰 삭제 성공'});
    } catch (error) {
        res.status(500).json({message: '리뷰 삭제 실패'});
        //http 응답코드 500(Internet Server Error)
    }
    
}