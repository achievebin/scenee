// server/controllers/findController.js
import { findUserByEmail, updateUserPassword } from '../models/userModel.js';
import { createResetToken, findToken, deleteToken } from '../models/resetTokenModel.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import transporter from '../config/mailConfig.js';
import { format } from 'date-fns';

// ─── 2-4-1. 아이디 찾기 (Find ID) 컨트롤러 ───────────────────────
// 클라이언트가 { email }을 보내면, DB에서 조회 → 이메일로 username 발송
export async function findIdByEmail(req, res) {
  try {
    const { email } = req.body; 
    if (!email) {
      return res.status(400).json({ message: '이메일을 입력하세요.' });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: '해당 이메일로 가입된 사용자가 없습니다.' });
    }

    // 이메일 전송: 가입된 아이디(username)를 사용자 메일로 알려주기
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: user.email,
      subject: '[YourApp] 아이디 찾기 결과',
      html: `
        <p>안녕하세요, YourApp 입니다.</p>
        <p>요청하신 이메일 <strong>${user.email}</strong>로 가입된 아이디는 <strong>${user.username}</strong> 입니다.</p>
        <p>감사합니다.</p>
      `
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: '가입된 아이디를 해당 이메일로 발송했습니다.', data: { username: user.username } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: '서버 오류로 인해 아이디를 찾을 수 없습니다.' });
  }
}

// ─── 2-4-2. 비밀번호 찾기 요청 (Request Password Reset) 컨트롤러 ──────────
// 클라이언트가 { email }을 보내면, DB에서 조회 → 토큰 생성 → DB 저장 → 이메일로 링크 전송
export async function requestPasswordReset(req, res) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: '이메일을 입력하세요.' });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: '해당 이메일로 가입된 사용자가 없습니다.' });
    }

    // 1) 토큰 생성 (랜덤 32바이트 → hex 문자열)
    const token = crypto.randomBytes(32).toString('hex');
    // 2) 만료 시간 설정 (발급 시점으로부터 1시간 뒤)
    const expiresAt = format(
      new Date(Date.now() + 60 * 60 * 1000), // 1시간 후
      'yyyy-MM-dd HH:mm:ss'
    );

    // 3) DB에 토큰 저장
    await createResetToken(user.id, token, expiresAt);

    // 4) 이메일 전송: 비밀번호 재설정 링크 포함
    //    FRONTEND_BASE_URL은 예를 들어 "https://your-frontend-domain.com" 처럼 설정
    const resetUrl = `${process.env.FRONTEND_BASE_URL}/reset-password?token=${token}`;
    const mailOptions = {
      from: process.env.MAIL_USER,
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
    return res.status(200).json({ message: '비밀번호 재설정 링크를 해당 이메일로 발송했습니다.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: '서버 오류로 인해 비밀번호 재설정을 신청할 수 없습니다.' });
  }
}

// ─── 2-4-3. 비밀번호 재설정 폼 제출 (Reset Password) 컨트롤러 ─────────────
// 클라이언트가 { token, newPassword } 을 보내면 → 토큰 검증 → 비밀번호 업데이트 → 토큰 삭제
export async function resetPassword(req, res) {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({ message: '토큰과 새 비밀번호를 모두 입력하세요.' });
    }

    // 1) DB에서 토큰 레코드 조회
    const record = await findToken(token);
    if (!record) {
      return res.status(400).json({ message: '유효하지 않은 토큰입니다.' });
    }

    // 2) 토큰 만료 여부 확인
    const now = new Date();
    const expiresAt = new Date(record.expires_at);
    if (now > expiresAt) {
      // 토큰 만료된 경우에는 삭제 후 에러 반환
      await deleteToken(token);
      return res.status(400).json({ message: '토큰이 만료되었습니다. 다시 요청해주세요.' });
    }

    // 3) 새 비밀번호 해싱 후, users 테이블에 업데이트
    const hashedPwd = await bcrypt.hash(newPassword, 10);
    await updateUserPassword(record.user_id, hashedPwd);

    // 4) 사용된 토큰 삭제
    await deleteToken(token);

    return res.status(200).json({ message: '비밀번호가 성공적으로 변경되었습니다.' });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: '서버 오류로 인해 비밀번호를 재설정할 수 없습니다.' });
  }
}
