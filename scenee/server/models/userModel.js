import pool from './db.js'

export const createUser = async (username, hashedPassword) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query();
        return result.insertId;
    } finally {
        if (conn) conn.release();
    }
}