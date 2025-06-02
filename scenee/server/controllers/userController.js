//controller: 사용자 입력과 model, view 간의 상호작용을 제어함
import pool from '../config/db.js'
//mariaDB와 연결하는 객체 호출

//사용자 정보와 프로필 변경 기능을 담당

//자신의 정보를 가져오기 - api/user/me
export const getMyInfo = async (req, res) => {
    const userId = req.user.id;
    try {
        const conn = await pool.getConnection();
        const [user] = await conn.query(
            'SELECT id, username, email FROM users id = ?', [userId]
        )
        conn.release();
        res.json(user);
    } catch (error) {
        res.status(500).json({message: '내 정보 조회 실패'});
    }
}

//다른 이용자의 정보를 가져오기
export const getInfoById = async (req, res) => {
    const {id} = req.params;
    try {
        const conn = await pool.getConnection();
        const [user] = await conn.query(
            'SELECT id, username FROM users id = ?', [id]
        )
        conn.release();
        res.json(user);
    } catch (error) {
        res.status(500).json({message: '이용자 정보 조회 실패'});
    }
}

//이용자 정보 갱신
export const updateUser = async (req, res) => {
    const {id} = req.params;
    const {nickname, email} = req.body;
    try {
        const conn = await pool.getConnection();
        const [rows] = await conn.query(
            'UPDATE users SET nickname =? AND email = ? WHERE id = ?', [nickname, email]
        )
        conn.release();
        res.json({message: '유저 정보 수정 완료'});
    } catch (error) {
        res.status(500).json({message: '이용자 정보 수정 실패'});
    }
}

//이용자 정보 삭제
export const deleteUser = async (req, res) => {
    const {id} = req.params;
    try {
        const conn = await pool.getConnection();
        const [rows] = await conn.query(
            'DELETE FROM users WHERE id = ?', [id]
        )
        conn.release();
        res.json({message: '이용자 정보 삭제 완료'});
    } catch (error) {
        res.status().json({message: '이용자 정보 삭제 실패'})

    }
}