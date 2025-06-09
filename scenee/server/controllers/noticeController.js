//controller: 사용자 입력과 model, view 간의 상호작용을 제어함
//공지사항과 이벤트 관련 내용을 담당
import pool from '../config/db.js'
//mariaDB와 연결하는 객체 호출

//전체 게시판 목록
export const getBoards = async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM notice ORDER BY created_at DESC');
        conn.release();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: '전체 목록 조회 실패'})
    }
}

//게시판 글 조회
export const getBoardById = async (req, res) => {
    const {id} = req.params;
    try {
        const conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM notices WHERE id = ?', [id]);
        conn.release();
        if (rows.length > 0) res.json(rows[0]);
        else res.status(404).json({message: '공지사항이 존재하지 않습니다.'})
    } catch (error) {
        res.status(500).json({ message: '공지를 조회하는 데 실패하였습니다.'})
    }
}

//공지사항 게시판
export const getNoticeBoards = async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM notice WHERE type = 0');
        conn.release();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: '공지 목록 조회 실패'})
        //http 응답코드 500(Internet Server Error)
    }
}

//이벤트 게시판
export const getEventBoards = async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM notice WHERE type = 1');
        conn.release();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: '이벤트 목록 조회 실패'})
        //http 응답코드 500(Internet Server Error)
    }
}

//공지사항 게시판 생성 (관리자)
export const createNotice = async (req, res) => {
  const { title, content, type } = req.body;
  try {
    const conn = await pool.getConnection();
    await conn.query(
      'INSERT INTO notices (title, content, type, created_at) VALUES (?, ?, ?, NOW())',
      [title, content, type]
    );
    conn.release();
    res.status(201).json({ message: '공지 생성 완료' });
    //http 응답코드 201(Created)
  } catch (error) {
    res.status(500).json({ message: '공지 생성 실패' });
    //http 응답코드 500(Internet Server Error)
  }
};