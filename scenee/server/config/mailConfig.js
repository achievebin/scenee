// server/config/mailConfig.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.MAIL_USER,       // 실제로 사용할 Gmail 계정 (예: your_email@gmail.com)
    pass: process.env.MAIL_PASSWORD    // 앱 비밀번호 또는 OAuth 토큰
  }
});

export default transporter;
