//models: 데이터를 저장하고 관리하는 역할을 맡으며, 데이터베이스와 직접 상호작용함
//리뷰 관련 sql문 처리
import pool from '../config/db.js'
//mariaDB와 연결하는 객체 호출

//영화 ID를 기준 삼아 리뷰 조회
export async function bringReviewsByMovieId(movieId) {
    let conn;
    try {
        conn = await pool.getConnection();
        const [rows] = await conn.query(
            'SELECT * FROM reviews WHERE movie_id = ? ORDER BY createdAt DESC', [movieId]
        );
        return rows;
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

//이용자 ID를 기준 삼아 리뷰 조회
export async function bringReviewsByUserId(userId) {
    let conn;
    try {
        conn = await pool.getConnection();
        const [rows] = await conn.query(
            'SELECT * FROM reviews WHERE user_id = ? ORDER BY createdAt DESC', [userId]
        );
        return rows;
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

//리뷰 생성
export async function createReview(userId, movieId, content, rating) {
    let conn;
    try {
        conn = await pool.getConnection();;
        const [result] = await conn.query(
            'INSERT INTO reviews (user_id, movie_id, content, rating, created_at) VALUES (?, ?, ?, ?, NOW())',
            [userId, movieId, content, rating]
        );
        return result.insertId;
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

//리뷰 수정
export async function rewriteReview(reviewId, userId, movieId, content, rating) {
    let conn;
    try {
        const [result] = await conn.query(
        'UPDATE reviews SET (content, rating, updated_at) WHERE id = ? AND user_id = ?', [movieId, content, rating, reviewId, userId]
        );
        return result.affectedRows;
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}

//리뷰 삭제
export async function deleteReview(reviewId, userId) {
    let conn;
    try {
        conn = await pool.getConnection();
        const [result] = await conn.query(
            'DELETE FROM reviews WHERE id = ? AND user_id = ?', [reviewId, userId]
        );
        return result.affectedRows;
    } catch (err) {
        throw err;
    } finally {
        conn.release();
    }
}