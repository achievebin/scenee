import { createInquiry } from "../models/contactModel.js";
import transporter from "../config/mailConfig.js";

export async function postInquiry(req, res, next) {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "모든 필드를 입력해주세요." });
    }

    // 1) DB 저장
    const inquiryId = await createInquiry({ name, email, subject, message });

    // 2) (선택) 이메일 알림 발송
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: process.env.MAIL_USER,
      subject: `[문의알림 #${inquiryId}] ${subject}`,
      text: `
새 문의가 도착했습니다.

이름: ${name}
이메일: ${email}
제목: ${subject}
메시지:
${message}
      `,
    });

    // BigInt를 문자열로 변환해서 응답
    return res.status(201).json({ inquiryId: inquiryId.toString() });
  } catch (err) {
    next(err);
  }
}
