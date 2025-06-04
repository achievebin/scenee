import axios from './axiosInstance.js';
//작성한 axios 인스턴스를 가져옴

//전체 게시판 목록 요청 - /api/board/boards
export function getBoards(data) {
    return axios.get('board/boards', data);
}
//게시판 조회 요청 - api/board/boards/:id
export function getBoardById(data) {
    return axios.get('board/boards/:id', data);
}
//공지사항 게시판 목록 요청 - api/board/notices
export function getNoticeBoards(data) {
    return axios.get('board/notices', data);
}
//이벤트 게시판 목록 요청 - api/board/events
export function getEventBoards(data) {
    return axios.get('borad/events', data);
}
