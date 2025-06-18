import axios from './axiosInstance.js';

// 전체 게시판
export function getBoards() {
  return axios.get('/api/board/boards');
}
// 게시글 상세 조회
export function getBoardById(id) {
  return axios.get(`/api/board/boards/${id}`);
}
// 공지사항 목록
export function getNoticeBoards() {
  return axios.get('/api/board/notices');
}
// 이벤트 목록 (경로 수정)
export function getEventBoards() {
  return axios.get('/api/board/events');
}
// 공지/이벤트 생성
export function createNotice(payload) {
  return axios.post('/api/board/notices', payload);
}
