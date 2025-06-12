// src/components/Home/NoticeBoard.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getNoticeBoards } from "../../api/noticeApi.js";
import styles from "./NoticeBoard.module.css";

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getNoticeBoards()
      .then((res) => setNotices(res.data))
      .catch((err) => console.error("공지사항 로드 에러:", err));
  }, []);

  // 로딩 중일 때
  if (!notices.length) {
    return (
      <Link to="/notice" className={styles.loadingLink}>
        <h2 className={styles.loadingTitle}>📌 공지사항을 불러오는 중.....</h2>
      </Link>
    );
  }

  return (
    <div className={styles.container}>
      {/* 타이틀 클릭 시 /notice 페이지로 이동 */}
      <Link to="/notice" className={styles.titleLink}>
        <h2 className={styles.title}>📌 공지사항</h2>
      </Link>

      <ul className={styles.list}>
        {notices.map(({ id, title, content, created_at, createdAt }) => {
          const rawDate = created_at ?? createdAt ?? "";
          const date = rawDate ? rawDate.slice(0, 10).replace(/-/g, ".") : "";
          return (
            <li
              key={id}
              className={styles.listItem}
              onClick={() => setSelected({ id, title, content, date })}
            >
              <span className={styles.date}>{date}</span>
              <span className={styles.itemTitle}>{title}</span>
            </li>
          );
        })}
      </ul>

      {selected && (
        <div className={styles.detail}>
          <h3 className={styles.detailTitle}>{selected.title}</h3>
          <p className={styles.detailContent}>{selected.content}</p>
          <button className={styles.closeBtn} onClick={() => setSelected(null)}>
            닫기
          </button>
        </div>
      )}
    </div>
  );
};

export default NoticeBoard;
