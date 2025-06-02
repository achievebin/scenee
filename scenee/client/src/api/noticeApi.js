import axios from './axiosInstance.js';
//작성한 axios 인스턴스를 가져옴

//전체 게시판 목록 요청
export function getBoards(data) {
    return axios.get('boards', data);
}
//게시판 조회 요청
export function getBoardById(data) {
    return axios.get('boards/:id', data);
}
//공지사항 게시판 목록 요청
export function getNoticeBoards(data) {
    return axios.get('notices', data);
}
//이벤트 게시판 목록 요청
export function getEventBoards(data) {
    return axios.get('events', data);
}
