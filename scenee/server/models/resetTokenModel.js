// server/models/resetTokenModel.js
import pool from '../config/db.js';

// 1) 비밀번호 재설정 토큰 생성 후 DB에 저장
export async function createResetToken(userId, token, expiresAt) {
  const sql = `
    INSERT INTO password_reset_tokens (user_id, token, expires_at)
    VALUES (?, ?, ?)
  `;
  const [result] = await pool.query(sql, [userId, token, expiresAt]);
  return result.insertId;
}

// 2) 토큰을 기반으로 레코드 조회 (토큰 유효성 검증에 사용)
export async function findToken(token) {
  const sql = `
    SELECT prt.id, prt.user_id, prt.expires_at, u.email
    FROM password_reset_tokens AS prt
    JOIN users AS u ON prt.user_id = u.id
    WHERE prt.token = ?
    LIMIT 1
  `;
  const [rows] = await pool.query(sql, [token]);
  return rows[0] || null;
}

// 3) 사용 후(또는 만료 후) 토큰 삭제
export async function deleteToken(token) {
  const sql = `
    DELETE FROM password_reset_tokens
    WHERE token = ?
  `;
  const [result] = await pool.query(sql, [token]);
  return result.affectedRows; // 삭제 성공 시 1 반환
}
