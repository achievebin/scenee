import React, { useEffect, useState } from 'react';
import { getNoticeBoards } from '../../api/noticeApi.js';
import styles from './NoticeBoard.module.css';
const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getNoticeBoards()
      .then((res) => setNotices(res.data))
      .catch((err) => console.error('공지사항 로드 에러:', err));
  }, []);

  if (!notices.length) {
    return (
      <h2 style={{ padding: '1rem', fontSize: '1.25rem' }}>
        📌 공지사항을 불러오는 중.....
      </h2>
    );
  }

  return (
    <div className="notice-board">
      <h1 className={styles.NoticeBordTitle}> 공지사항 📌</h1>
      <ul>
        {notices.map(({ id, title, created_at }) => (
          <li key={id}>
            <span className="date">
              {created_at.slice(0, 10).replace(/-/g, '.')}
            </span>
            <span className="title">{title}</span>
          </li>
        ))}
      </ul>

      {selected && (
        <div
          style={{
            marginTop: '1rem',
            padding: '1rem',
            background: '#fafafa',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          <h3 style={{ marginBottom: '0.5rem' }}>{selected.title}</h3>
          <p style={{ whiteSpace: 'pre-wrap', color: '#444' }}>
            {selected.content}
          </p>
          <button
            onClick={() => setSelected(null)}
            style={{
              marginTop: '0.75rem',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '4px',
              background: '#e63946',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            닫기
          </button>
        </div>
      )}
    </div>
  );
};

export default NoticeBoard;
