// server/routes/findRoutes.js
import express from 'express';
import {
  findIdByEmail,
  requestPasswordReset,
  resetPassword
} from '../controllers/findController.js';

const router = express.Router();

// POST /api/find/id → { email } 보내면, 이메일로 아이디 전송
router.post('/id', findIdByEmail);

// POST /api/find/password/request → { email } 보내면, 비밀번호 재설정 링크 이메일로 전송
router.post('/password/request', requestPasswordReset);

// POST /api/find/password/reset → { token, newPassword } 보내면, DB에서 비밀번호 변경
router.post('/password/reset', resetPassword);

export default router;
