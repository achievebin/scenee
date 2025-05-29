//리뷰 관련 sql문 처리
import pool from './db.js'

//영화 ID를 기준 삼아 리뷰 조회
export async function getReviewsByMovieId(movieId) {
    const conn = await pool.getConnection();
    const rows = await conn.query(
        'SELECT * FROM reviews WHERE movie_id = ?', [movieId]
    );
    conn.release();
    return rows;
}

//리뷰 생성
export async function createReview(userId, movieId, content, rating) {
    const conn = await pool.getConnection();
    await conn.query(
        'INSERT INTO reviews (user_id, movie_id, content, rating, created_at) VALUES (?, ?, ?, ?, NOW())',
        [userId, movieId, content, rating]
    );
    conn.release();
}

//리뷰 삭제
export async function deleteReview(reviewId, userId) {
    const conn = await pool.getConnection();
    await conn.query(
        'DELETE FROM reviews WHERE id = ? AND user_id = ?', [reviewId, userId]
    );
    conn.release();
}