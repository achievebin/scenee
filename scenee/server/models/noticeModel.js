import pool from "../config/db.js";

// 전체 게시판
export const fetchBoards = async () => {
  const conn = await pool.getConnection();
  try {
    return await conn.query("SELECT * FROM notices ORDER BY createdAt DESC");
  } finally {
    conn.release();
  }
};

// 게시글 상세
export const fetchBoardById = async (id) => {
  const conn = await pool.getConnection();
  try {
    const rows = await conn.query("SELECT * FROM notices WHERE id = ?", [id]);
    return rows[0] || null;
  } finally {
    conn.release();
  }
};

// 공지사항 목록 (type = 0)
export const fetchNoticeBoards = async () => {
  const conn = await pool.getConnection();
  try {
    return await conn.query(
      "SELECT * FROM notices WHERE type = 0 ORDER BY createdAt DESC"
    );
  } finally {
    conn.release();
  }
};

// 이벤트 목록 (type = 1)
export const fetchEventBoards = async () => {
  const conn = await pool.getConnection();
  try {
    return await conn.query(
      "SELECT * FROM notices WHERE type = 1 ORDER BY createdAt DESC"
    );
  } finally {
    conn.release();
  }
};

// 공지/이벤트 생성
export const insertNotice = async ({
  title,
  content,
  type,
  event_date,
  thumbnail_url,
}) => {
  const conn = await pool.getConnection();
  try {
    await conn.query(
      `INSERT INTO notices 
       (title, content, type, event_date, thumbnail_url, createdAt) 
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [title, content, type, event_date, thumbnail_url]
    );
  } finally {
    conn.release();
  }
};
