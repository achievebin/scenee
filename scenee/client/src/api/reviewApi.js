import axios from './axiosInstance.js';
//작성한 axios 인스턴스를 가져옴

//영화 ID 기준 리뷰 가져오기 요청 (GET) - /api/reviews/:movieId
export function getReviews(movieId) {
  return axios.get(`/api/reviews/movie/${movieId}`);
}
//이용자 ID 기준 리뷰 가져오기 요청 (GET) - /api/reviews/:userId
export function getUserReviews(userId) {
  return axios.get(`/api/reviews/user/${userId}`);
}

//영화 ID를 기반하여 가장 많은 댓글 가져오기 요청 (GET) = /api/reviews/highlight
export function getMostReviewedMovies() {
  return axios.get('/api/reviews/highlight');
}

//리뷰 생성 요청 (POST) - /api/reviews/
export function addReview(reviewData) {
  return axios.post('/api/reviews', reviewData);
  //{movieId, content, rating}
}
//리뷰 수정 요청 (PUT) - /api/reviews/:reviewId
export function reviseReview(reviewId, updateData) {
  return axios.put(`/api/reviews/${reviewId}`, updateData);
  //{content, rating}
}
//리뷰 삭제 요청 (DELETE) - /api/reviews/:reviewId
export function deleteReview(reviewId) {
  return axios.delete(`/api/reviews/${reviewId}`);
}
