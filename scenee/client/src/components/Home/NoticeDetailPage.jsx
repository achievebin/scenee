// src/pages/NoticeDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getBoardById } from "../../api/noticeApi.js";
import styles from "./NoticePage.module.css"; // 목록과 같은 스타일 사용

const NoticeDetailPage = () => {
  const { id } = useParams();
  const [notice, setNotice] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getBoardById(id)
      .then((res) => setNotice(res.data))
      .catch((err) => console.error("상세 로드 에러:", err));
  }, [id]);

  if (!notice) {
    return <h2 className={styles.header}>로딩 중...</h2>;
  }

  const raw = notice.created_at ?? notice.createdAt ?? "";
  const date = raw.slice(0, 10).replace(/-/g, ".");

  return (
    <div className={styles.container}>
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "1rem",
          background: "transparent",
          border: "none",
          color: "#bbb",
          cursor: "pointer",
        }}
      >
        ← 목록으로
      </button>
      <h1 className={styles.header}>{notice.title}</h1>
      <p className={styles.dateCell}>{date}</p>
      <div
        style={{
          marginTop: "1rem",
          padding: "1rem",
          background: "#fafafa",
          borderRadius: "8px",
        }}
      >
        <p style={{ whiteSpace: "pre-wrap", color: "#333" }}>
          {notice.content}
        </p>
      </div>
    </div>
  );
};

export default NoticeDetailPage;
