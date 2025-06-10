//models: 데이터를 저장하고 관리하는 역할을 맡으며, 데이터베이스와 직접 상호작용함
//리뷰 관련 sql문 처리
import pool from '../config/db.js'
//mariaDB와 연결하는 객체 호출

//영화 ID를 기준 삼아 리뷰 조회
export const bringReviewsByMovieId = async (movieId) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      'SELECT * FROM reviews WHERE movie_id = ? ORDER BY createdAt DESC',
      [movieId]
    );
    return Array.isArray(rows) ? rows : [];
  } catch (error) {
    console.error("bringReviewsByMovieId 오류:", error);
    throw error;
  } finally {
    conn.release();
  }
}

//이용자 ID를 기준 삼아 리뷰 조회
export const bringReviewsByUserId = async (userId) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      'SELECT * FROM reviews WHERE user_id = ? ORDER BY createdAt DESC',
      [userId]
    );
    return Array.isArray(rows) ? rows : [];
  } catch (error) {
    console.error("getReviewsByUserId 오류:", error);
    throw error;
  } finally {
    conn.release();
  }
}

//리뷰 생성
export const createReview = async (userId, movieId, rating, content) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(
      'INSERT INTO reviews (user_id, movie_id, rating, content) VALUES (?, ?, ?, ?)',
      [userId, movieId, rating, content]
    );
    conn.release();
    return result.insertId;
  } catch (error) {
    console.error('createReview 오류:', error);
    throw error;
  }
};

//리뷰 수정
export const rewriteReview = async (reviewId, userId, content, rating) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(
      'UPDATE reviews SET content = ?, rating = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?',
      [content, rating, reviewId, userId]
    );
    conn.release();
    return result.affectedRows > 0;
  } catch (error) {
    console.error('updateReview 오류:', error);
    throw error;
  }
};

//리뷰 삭제
export const deleteReview = async (reviewId, userId) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(
      'DELETE FROM reviews WHERE id = ? AND user_id = ?',
      [reviewId, userId]
    );
    conn.release();
    return result.affectedRows > 0;
  } catch (error) {
    console.error('deleteReview 오류:', error);
    throw error;
  }
};