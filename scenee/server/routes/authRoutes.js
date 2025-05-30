//routes: 클라이언트에서 오는 API 요청을 처리함
import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
const router = Router();

//회원가입
router.post('/register', registerUser);
//로그인
router.post('/login', loginUser);

export default router;
