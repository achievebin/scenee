// src/components/Home/NoticeBoard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getNoticeBoards } from "../../api/noticeApi.js";
import styles from "./NoticeBoard.module.css";

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getNoticeBoards()
      .then((res) => setNotices(res.data))
      .catch((err) => console.error("공지사항 로드 에러:", err));
  }, []);

  if (!notices.length) {
    return (
      <h2 style={{ padding: "1rem", fontSize: "1.25rem" }}>
        📌 공지사항을 불러오는 중.....
      </h2>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header} onClick={() => navigate("/notice")}>
        공지사항 📌 
      </h1>
      <ul className={styles.list}>
        {notices.map(({ id, title, created_at }) => {
          const formattedDate = created_at
            ? created_at.slice(0, 10).replace(/-/g, ".")
            : "날짜 미정";
          return (
            <li
              key={id}
              className={styles.listItem}
              onClick={() => navigate(`/notice/${id}`)}
            >
              <span className={styles.itemTitle}>{title}</span>
              <span className={styles.date}>{formattedDate}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NoticeBoard;
