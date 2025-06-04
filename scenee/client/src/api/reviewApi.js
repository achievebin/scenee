import axios from './axiosInstance.js';
//작성한 axios 인스턴스를 가져옴

//리뷰 가져오기 요청 - /api/reviews/:movieId
export function getReviews(movieId) {
    return axios.get(`/reviews/movie/${movieId}`);
}
//리뷰 생성 요청 - /api/reviews/
export function addReview(reviewData) {
    return axios.post('/reviews', reviewData);

}
//리뷰 수정 요청 - /api/reviews/:reviewId
export function reviseReview(reviewId, updateData) {
    return axios.put(`/reviews/${reviewId}`, updateData);

}
//리뷰 삭제 요청 - /api/reviews/:reviewId
export function deleteReview(reviewId) {
    return axios.delete(`/reviews/${reviewId}`);

}