import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNoticeBoards } from '../../api/noticeApi.js';
import styles from './NoticePage.module.css';

const NoticePage = () => {
  const [notices, setNotices] = useState([]);
  const [page, setPage] = useState(1);
  const perPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    getNoticeBoards()
      .then((res) => setNotices(res.data))
      .catch((err) => console.error('공지사항 로드 에러:', err));
  }, []);

  const totalPages = Math.ceil(notices.length / perPage);
  const paged = notices.slice((page - 1) * perPage, page * perPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const fmt = (raw) => (raw ? raw.slice(0, 10).replace(/-/g, '.') : '');

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>📌 공지사항</h1>

      <div className={styles.tbody}>
        {/* 헤더 행 */}
        <div className={styles.thead}>
          <span className={styles.noCell}>번호</span>
          <span className={styles.titleCell}>제목</span>
          <span className={styles.dateCell}>등록일</span>
        </div>

        {/* 데이터 행 */}
        {paged.map(({ id, title, created_at, createdAt }) => {
          const dateRaw = created_at ?? createdAt ?? '';
          return (
            <div
              key={id}
              className={styles.row}
              onClick={() => navigate(`/notice/${id}`)}
            >
              <span className={styles.noCell}>{id}</span>
              <span className={styles.titleCell}>{title}</span>
              <span className={styles.dateCell}>{fmt(dateRaw)}</span>
            </div>
          );
        })}
      </div>

      {/* 페이지 네비게이션 */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          {pages.map((p) => (
            <button
              key={p}
              className={
                p === page
                  ? `${styles.pageButton} ${styles.pageButtonActive}`
                  : styles.pageButton
              }
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default NoticePage;
