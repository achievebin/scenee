//routes: 클라이언트에서 오는 API 요청을 처리함
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

//회원가입, 로그인, 인증 관련 라우팅
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;