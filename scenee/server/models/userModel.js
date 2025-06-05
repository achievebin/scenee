//models: 데이터를 저장하고 관리하는 역할을 맡으며, 데이터베이스와 직접 상호작용함
import pool from '../config/db.js'
//mariaDB와 연결하는 객체 호출

//users 테이블에 이용자 내용 삽입
export const createUser = async (username, hashedPassword, nickname, email) => {
  let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query(
            'INSERT INTO users (username, password, nickname, email) VALUES (?, ?, ?, ?)', [username, hashedPassword, nickname, email.trim().toLower]
        );
        //성공한다면 이용자의 ID를 반환합니다.
        return result.insertId;
    } catch (err) {
      throw err;
    } finally {
      //연결 해제
      conn.release();
    }
}

// 이메일로 유저 조회 (아이디 찾기에 사용)
export async function findUserByEmail(email) {
  let conn;
  try {
    conn = await pool.getConnection();
    const [rows] = await conn.query(
      'SELECT * FROM users WHERE email = ?', [email]
    )
    if (rows && rows.length > 0) {
    return rows[0];
    }
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

// 비밀번호 해시 후, DB에 업데이트 (비밀번호 재설정에 사용)
export async function updateUserPassword(userId, hashedPwd) {
  let conn;
  try {
    conn = await pool.getConnection();
    const [result] = await conn.query(
      `UPDATE users SET password = ? WHERE id = ?`, [hashedPwd, userId]
    );
    return result.affectedRows; // 정상 업데이트 시 1 이상 반환
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
}

//users 테이블에 userId를 사용하여 이용자 조회
export const getUserByUsername = async (username) => {
  const conn = await pool.getConnection();
  try {
    const rows = await conn.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    return rows[0] || null;
  } finally {
    conn.release();
  }
};