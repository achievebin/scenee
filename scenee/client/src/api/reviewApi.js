import axios from './axiosInstance.js';
//작성한 axios 인스턴스를 가져옴

//영화 ID 기준 리뷰 가져오기 요청 (GET) - /api/reviews/:movieId
export function getReviews(movieId) {
    return axios.get(`/reviews/movie/${movieId}`);
}
//이용자 ID 기준 리뷰 가져오기 요청 (GET) - /api/reviews/:userId
export function  getUserReviews(userId) {
    return axios.get(`/reviews/user/${userId}`)
}
//리뷰 생성 요청 (POST) - /api/reviews/
export function addReview(reviewData) {
    return axios.post('/reviews', reviewData);
    //{movieId, content, rating}
}
//리뷰 수정 요청 (PUT) - /api/reviews/:reviewId
export function reviseReview(reviewId, updateData) {
    return axios.put(`/reviews/${reviewId}`, updateData);
    //{content, rating}
}
//리뷰 삭제 요청 (DELETE) - /api/reviews/:reviewId
export function deleteReview(reviewId) {
    return axios.delete(`/reviews/${reviewId}`);

}