// controller: 사용자 입력과 model, view 간의 상호작용을 제어함
import pool from '../config/db.js'; // mariadb 연결 객체

// 자신의 정보를 가져오기 - GET /api/user/me
export const getMyInfo = async (req, res) => {
  const userId = req.user.id;
  try {
    const rows = await pool.query(
      'SELECT id, username, nickname, email FROM users WHERE id = ?',
      [userId]
    );
    const user = rows.length > 0 ? rows[0] : null;
    if (!user) {
      return res.status(404).json({ message: '이용자를 찾을 수 없습니다.' });
    }
    res.json(user);
  } catch (error) {
    console.error('getMyInfo error:', error);
    res.status(500).json({ message: '내 정보 조회 실패' });
  }
};

// 다른 이용자의 정보를 가져오기 - GET /api/user/:id
export const getInfoById = async (req, res) => {
  const { id } = req.params;
  try {
    const rows = await pool.query(
      'SELECT id, username FROM users WHERE id = ?',
      [id]
    );
    const user = rows.length > 0 ? rows[0] : null;
    if (!user) {
      return res.status(404).json({ message: '이용자를 찾을 수 없습니다.' });
    }
    res.json(user);
  } catch (error) {
    console.error('getInfoById error:', error);
    res.status(500).json({ message: '이용자 정보 조회 실패' });
  }
};

// 이용자 정보 갱신 - PUT /api/user/:id
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { nickname, email } = req.body;
  try {
    const result = await pool.query(
      'UPDATE users SET nickname = ?, email = ? WHERE id = ?',
      [nickname, email, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '해당 유저가 없습니다.' });
    }
    res.json({ message: '유저 정보 수정 완료' });
  } catch (error) {
    console.error('updateUser error:', error);
    res.status(500).json({ message: '이용자 정보 수정 실패' });
  }
};

// 이용자 정보 삭제 - DELETE /api/user/:id
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM users WHERE id = ?',
      [id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '해당 유저가 없습니다.' });
    }
    res.status(200).json({ message: '이용자 정보 삭제 완료' });
  } catch (error) {
    console.error('deleteUser error:', error);
    res.status(500).json({ message: '이용자 정보 삭제 실패' });
  }
};