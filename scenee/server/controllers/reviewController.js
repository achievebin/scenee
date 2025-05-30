//controller: 사용자 입력과 model, view 간의 상호작용을 제어함
import {getReviewsByMovieId, createReview, deleteReview} from '../models/reviewModel.js'
//리뷰 작성과 조회 및 삭제 기능을 담당

export const getReviews = async (req, res) => {
    const movieId = req.params.movieId;
    try {
        const reviews = await getReviewsByMovieId(movieId);
        res.json(reviews);
    } catch (error) {
        res.status(500).json({message: '리뷰를 가져오는 데 실패하였습니다.'});
    }
    
}

export const postReview = async (req, res) => {
    const {userId, movieId, content, rating} = req.body
    try {
        await createReview(userId, movieId, content, rating);
        res.status(201).json({message: '리뷰를 작성하는 데 성공하였습니다.'})

    } catch (error) {
        res.status(500).json({message: '리뷰를 작성하는 데 실패했습니다.'});
    }
    
}

export const removeReview = async (req, res) => {
    const reviewId = req.params.reviewId;
    const {userId} = req.body;
    try {
        await deleteReview(reviewId, userId);
        res.json({message: '리뷰 삭제 성공'});
    } catch (error) {
        res.status(500).json({message: '리뷰를 삭제하는 데데 실패했습니다.'});
    }
    
}