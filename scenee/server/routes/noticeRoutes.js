//routes: 클라이언트에서 오는 API 요청을 처리함
import { Router } from 'express';
import { getBoards, getBoardById, getNoticeBoards, getEventBoards, createNotice } from '../controllers/noticeController.js'
const router = Router();
//공지사항과 이벤트 관련 라우팅

//전체 목록 - /api/board/boards
router.get('/boards', getBoards);
//게시판 조회 - /api/board/boards/:id
router.get('/boards/:id', getBoardById);
//공지사항 목록 - /api/board/notices
router.get('/notices', getNoticeBoards);
//이벤트 목록 - /api/board/events
router.get('/events', getEventBoards);
//공지사항 작성 (관리자) - /api/board/notices
router.post('/notices', createNotice);

export default router;