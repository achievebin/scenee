import axios from './axiosInstance';

//본인 정보 가져오기 (GET) - /api/user/me
export function fetchUserProfile() {
  return axios.get('/api/user/me');
  //axios.get(url, config)
  //URL, 설정 객체(headers, params) 순
}
//이용자 정보 가져오기 (GET) - /api/user/:id
export function getUserInfoById(id) {
  return axios.get(`/api/user/${id}`);
}
//이용자 정보 수정하기 (PUT) - /api/user/:id
export function updateUser(id, userData) {
  return axios.put(`/api/user/${id}`, userData);
}
//이용자 정보 삭제하기 (DELETE) - /api/user/:id
export function deleteUser(id) {
  return axios.delete(`/api/user/${id}`);
}
//이용자 찜 내역 가져오기 (GET)
export function getUserWishlist(id) {
  return axios.get(`/api/users/${id}/wishlist`);
}
//이용자 문의 내역 가져오기 (GET)
export function getUserInquiries(id) {
  axios.get(`/api/users/${id}/inquiries`);
}
