//models: 데이터를 저장하고 관리하는 역할을 맡으며, 데이터베이스와 직접 상호작용함
import pool from '../config/db.js'
//mariaDB와 연결하는 객체 호출

//users 테이블에 이용자 내용 삽입
export const createUser = async (email,nickname,username, hashedPassword) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query(
            'INSERT INTO users (email,nickname,username, password) VALUES (?, ?, ?, ?)', [email,nickname,username, hashedPassword]
        );
        //성공한다면 이용자의 ID를 반환합니다.
        return result.insertId;
    } finally {
        //연결 해제
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