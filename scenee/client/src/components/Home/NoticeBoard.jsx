import React, { useEffect, useState } from 'react';
import { getNoticeBoards } from '../../api/noticeApi.js';

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    getNoticeBoards()
      .then(res => setNotices(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="notice-board">
      <h2>📌 공지사항</h2>
      <ul>
        {notices.map(({ id, title, created_at }) => (
          <li key={id}>
            <span className="date">{created_at.slice(0, 10).replace(/-/g, '.')}</span>
            <span className="title">{title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoticeBoard;
