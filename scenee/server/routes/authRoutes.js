//routes: 클라이언트에서 오는 API 요청을 처리함
import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
const router = Router();

//회원가입 - /api/auth/register
router.post('/register', registerUser);
//로그인 - /api/auth/login
router.post('/login', loginUser);
//토큰 검증 - api/auth/check
router.get('/check', authenticateJWT, (req, res) => {
  res.json({ success: true, message: '유효한 토큰입니다.', user: req.user });
});

export default router;
