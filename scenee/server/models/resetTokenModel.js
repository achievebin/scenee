// server/models/resetTokenModel.js
import pool from '../config/db.js';

// 1) 비밀번호 재설정 토큰 생성 후 DB에 저장
export async function createResetToken(userId, token, expiresAt) {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query(
      `INSERT INTO password_reset_tokens (user_id, token, expires_at)
       VALUES (?, ?, ?)`,
      [userId, token, expiresAt]
    );
  } finally {
    conn?.release();
  }
}

// 2) 토큰을 기반으로 레코드 조회 (토큰 유효성 검증에 사용)
export async function findToken(token) {
  const conn = await pool.getConnection();
  try {
    const rows = await conn.query(
      'SELECT * FROM password_reset_tokens WHERE token = ?',
      [token]
    );
    return rows.length ? rows[0] : null;
  } finally {
    conn.release();
  }
}


// 3) 사용 후(또는 만료 후) 토큰 삭제
export async function deleteToken(token) {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query(
      `DELETE FROM password_reset_tokens WHERE token = ?`,
      [token]
    );
  } finally {
    conn?.release();
  }
}
