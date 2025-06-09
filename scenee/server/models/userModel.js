// models: 데이터를 저장하고 관리하는 역할을 맡으며, 데이터베이스와 직접 상호작용함
import pool from '../config/db.js';
// MariaDB 연결 객체 호출

/**
 * 사용자 생성
 * @param {string} username
 * @param {string} hashedPassword
 * @param {string} nickname
 * @param {string} email
 * @returns {Promise<number>} 새로 생성된 user ID
 */
export const createUser = async (username, hashedPassword, nickname, email) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(
      'INSERT INTO users (username, password, nickname, email) VALUES (?, ?, ?, ?)',
      [username, hashedPassword, nickname, email]
    );
    return result.insertId;
  } catch (err) {
    console.error('createUser error:', err);
    throw err;
  } finally {
    conn.release();
  }
};

// 이메일로 유저 조회 (아이디 찾기 등)
export const findUserByEmail = async (email) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows.length > 0 ? rows[0] : null;
  } catch (err) {
    console.error('findUserByEmail error:', err);
    throw err;
  } finally {
    conn.release();
  }
};

// 비밀번호 재설정 시 해시된 패스워드 업데이트
export const updateUserPassword = async (userId, hashedPwd) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(
      'UPDATE users SET password = ? WHERE id = ?',
      [hashedPwd, userId]
    );
    return result.affectedRows;
  } catch (err) {
    console.error('updateUserPassword error:', err);
    throw err;
  } finally {
    conn.release();
  }
};

// username으로 유저 조회
export const getUserByUsername = async (username) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    return rows.length > 0 ? rows[0] : null;
  } catch (err) {
    console.error('getUserByUsername error:', err);
    throw err;
  } finally {
    conn.release();
  }
};
