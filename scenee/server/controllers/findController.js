// server/controllers/findController.js 
import { findUserByEmail, updateUserPassword } from '../models/userModel.js';
import { createResetToken, findToken, deleteToken } from '../models/resetTokenModel.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import transporter from '../config/mailConfig.js';
import { format } from 'date-fns';
import dotenv from 'dotenv';

dotenv.config(); // FRONTEND_BASE_URL 등 불러오기

// 환경 변수 구조분해
const { MAIL_USER, FRONTEND_BASE_URL } = process.env;

/*
 * ─── 1) 아이디 찾기 (Find ID)
 * 클라이언트가 { email }을 보내면,
 *  1. 이메일로 사용자 조회 → 
 *  2. 존재하면 메일(가입된 아이디) 전송 → 
 *  3. JSON으로 username 반환
 */
export async function findIdByEmail(req, res) {
  try {
    // 1) 요청 형식 검증
    if (!req.body || typeof req.body.email !== 'string') {
      return res.status(400).json({ message: '유효한 이메일을 JSON 형식으로 보내주세요.' });
    }

    const { email } = req.body;
    if (!email.trim()) {
      return res.status(400).json({ message: '이메일을 입력하세요.' });
    }

    // 2) DB에서 이메일로 사용자 조회
    const user = await findUserByEmail(email.trim().toLowerCase());
    if (!user) {
      return res.status(404).json({ message: '해당 이메일로 가입된 사용자가 없습니다.' });
    }

    // 3) 이메일 전송 (가입된 아이디(user.username)를 메일로 발송)
    const mailOptions = {
      from: MAIL_USER,
      to: user.email,
      subject: '[YourApp] 아이디 찾기 결과',
      html: `
        <p>안녕하세요, YourApp 입니다.</p>
        <p>요청하신 이메일 <strong>${user.email}</strong>로 가입된 아이디는 
           <strong>${user.username}</strong> 입니다.</p>
        <p>감사합니다.</p>
      `
    };
    await transporter.sendMail(mailOptions);

    // 4) JSON 응답 (프론트엔드용)
    return res.status(200).json({
      message: '가입된 아이디를 해당 이메일로 발송했습니다.',
      data: { username: user.username }
    });
  } catch (err) {
    console.error('findIdByEmail 에러:', err);
    return res.status(500).json({ message: '서버 오류로 인해 아이디를 찾을 수 없습니다.' });
  }
}

/*
 * ─── 2) 비밀번호 찾기 요청 (Request Password Reset)
 * 클라이언트가 { email }을 보내면,
 *  1. 이메일로 사용자 조회 → 
 *  2. 랜덤 토큰 생성 → 
 *  3. DB에 토큰 저장 (만료 시간 1시간) → 
 *  4. 프론트 주소에 토큰 쿼리 포함한 링크 생성 → 
 *  5. 해당 링크를 메일로 발송 → 
 *  6. JSON으로 resetUrl(또는 token) 반환
 */
export async function requestPasswordReset(req, res) {
  try {
    // 1) 요청 형식 검증
    if (!req.body || typeof req.body.email !== 'string') {
      return res.status(400).json({ message: '유효한 이메일을 JSON 형식으로 보내주세요.' });
    }

    const { email } = req.body;
    if (!email.trim()) {
      return res.status(400).json({ message: '이메일을 입력하세요.' });
    }

    // 2) DB에서 이메일로 사용자 조회
    const user = await findUserByEmail(email.trim().toLowerCase());
    if (!user) {
      return res.status(404).json({ message: '해당 이메일로 가입된 사용자가 없습니다.' });
    }

    // 3) 토큰 생성 (랜덤 32바이트 → hex 문자열)
    const token = crypto.randomBytes(32).toString('hex');

    // 4) 토큰 만료 시간 설정 (현재 시각 + 1시간)
    const expiresAt = format(
      new Date(Date.now() + 60 * 60 * 1000), // 1시간 후
      'yyyy-MM-dd HH:mm:ss'
    );

    // 5) DB에 토큰 저장
    await createResetToken(user.id, token, expiresAt);

    // 6) 비밀번호 재설정 링크 생성
    //    FRONTEND_BASE_URL 예: 'http://localhost:5173'
    const resetUrl = `${FRONTEND_BASE_URL}/reset-password?token=${token}`;

    // 7) 이메일 전송 (resetUrl 포함)
    const mailOptions = {
      from: MAIL_USER,
      to: user.email,
      subject: '[YourApp] 비밀번호 재설정 안내',
      html: `
        <p>안녕하세요, YourApp 입니다.</p>
        <p>비밀번호 재설정을 요청하셨습니다. 아래 버튼을 클릭하여 새로운 비밀번호를 설정해주세요.</p>
        <a href="${resetUrl}" style="
            display:inline-block;
            margin:20px 0;
            padding:10px 20px;
            background:#4caf50;
            color:#fff;
            text-decoration:none;
            border-radius:4px;
          ">
          비밀번호 재설정하기
        </a>
        <p>만약 본인이 요청한 것이 아니라면, 이 이메일을 무시하시면 됩니다.</p>
        <p>이 링크는 발송 시점으로부터 1시간 동안만 유효합니다.</p>
      `
    };
    await transporter.sendMail(mailOptions);

    // 8) JSON 응답 (프론트엔드용)
    return res.status(200).json({
      message: '비밀번호 재설정 링크를 해당 이메일로 발송했습니다.',
      data: { resetUrl }
    });
  } catch (err) {
    console.error('requestPasswordReset 에러:', err);
    return res.status(500).json({ message: '서버 오류로 인해 비밀번호 재설정을 신청할 수 없습니다.' });
  }
}

/*
 * ─── 3) 비밀번호 재설정 완료 (Reset Password)
 * 클라이언트가 { token, newPassword }을 보내면,
 *  1. 토큰 유효성 검증 → 
 *  2. 토큰 만료 여부 확인 → 
 *  3. 새 비밀번호 해싱 → 
 *  4. users 테이블에 비밀번호 업데이트 → 
 *  5. 사용된 토큰 삭제 → 
 *  6. JSON 응답 반환
 */
export async function resetPassword(req, res) {
  try {
    // 1) 요청 형식 검증
    if (!req.body 
        || typeof req.body.token !== 'string' 
        || typeof req.body.newPassword !== 'string') 
    {
      return res.status(400).json({ message: '토큰(token)과 새 비밀번호(newPassword)를 JSON 형식으로 모두 보내주세요.' });
    }

    const { token, newPassword } = req.body;
    if (!token.trim() || !newPassword.trim()) {
      return res.status(400).json({ message: '토큰과 새 비밀번호를 모두 입력하세요.' });
    }

    // 2) DB에서 토큰 레코드 조회
    const record = await findToken(token.trim());
    if (!record) {
      return res.status(400).json({ message: '유효하지 않은 토큰입니다.' });
    }

    // 3) 토큰 만료 여부 확인
    const now = new Date();
    const expiresAt = new Date(record.expires_at);
    if (now > expiresAt) {
      // 토큰 만료된 경우, 토큰 삭제 후 에러 반환
      await deleteToken(token.trim());
      return res.status(400).json({ message: '토큰이 만료되었습니다. 다시 요청해주세요.' });
    }

    // 4) 새 비밀번호 해싱 후 업데이트
    const hashedPwd = await bcrypt.hash(newPassword.trim(), 10);
    await updateUserPassword(record.user_id, hashedPwd);

    // 5) 사용된 토큰 삭제
    await deleteToken(token.trim());

    // 6) 성공 응답
    return res.status(200).json({ message: '비밀번호가 성공적으로 변경되었습니다.' });
  } catch (err) {
    console.error('resetPassword 에러:', err);
    return res.status(500).json({ message: '서버 오류로 인해 비밀번호를 재설정할 수 없습니다.' });
  }
}
