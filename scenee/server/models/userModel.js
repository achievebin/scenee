//models: 데이터를 저장하고 관리하는 역할을 맡으며, 데이터베이스와 직접 상호작용함
import pool from '../config/db.js'
//mariaDB와 연결하는 객체 호출

//users 테이블에 이용자 내용 삽입
export const createUser = async (username, hashedPassword, nickname, email) => {
  const sql = 'INSERT INTO users (username, password, nickname, email) VALUES (?, ?, ?, ?)'
  const [result] = await pool.query(sql, [username, hashedPassword, nickname, email]);
  return result.insertId;
}

// 이메일로 유저 조회 (아이디 찾기에 사용)
export async function findUserByEmail(email) {
  const sql = `SELECT id, username, email FROM users WHERE email = ? LIMIT 1`;
  const [rows] = await pool.query(sql, [email]);
  return rows[0] || null;
}

// 비밀번호 해시 후, DB에 업데이트 (비밀번호 재설정에 사용)
export async function updateUserPassword(userId, hashedPwd) {
  const sql = `UPDATE users SET password = ?WHERE id = ?`;
  const [result] = await pool.query(sql, [hashedPwd, userId]);
  return result.affectedRows; // 정상 업데이트 시 1 이상 반환
}

//users 테이블에 userId를 사용하여 이용자 조회
export const getUserByUsername = async (username) => {
  const sql = 'SELECT * FROM users WHERE username = ?'
  const [rows] = await pool.query(sql, [username]);
  return rows[0] || null;
};