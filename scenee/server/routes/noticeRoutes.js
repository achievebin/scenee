//routes: 클라이언트에서 오는 API 요청을 처리함
const express = require('express');
const router = express.Router();
const { getNotices, getEvents, createNotice } = require('../controllers/noticeController');
//공지사항과 이벤트 관련 라우팅

//공지사항 목록
router.get('/notices', getNotices);
//이벤트 목록
router.get('/events', getEvents);
//공지사항 작성 (관리자)
router.post('/notices', createNotice);

module.exports = router;