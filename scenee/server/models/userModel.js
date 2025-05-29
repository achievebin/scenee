import pool from './db.js'

export const createUser = async (username, hashedPassword) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query(
            'INSERT INTO users (username, password) VALUES (?, ?)',
            [username, hashedPassword]
        );
        return result.insertId;
    } finally {
        conn.release();
    }
};

export const getUserByUsername = async (username) => {
  const conn = await pool.getConnection();
  try {
    const rows = await conn.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    return rows[0];
  } finally {
    conn.release();
  }
};