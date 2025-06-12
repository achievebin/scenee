// src/pages/EventDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBoardById } from "../../api/noticeApi.js";
import styles from "./EventDetailPage.module.css";

const EventDetailPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getBoardById(id)
      .then((res) => setEvent(res.data))
      .catch((err) => console.error("상세 로드 에러:", err));
  }, [id]);

  if (!event) {
    return <h2 style={{ padding: "2rem" }}>로딩 중...</h2>;
  }

  const { title, content, event_date, thumbnail_url } = event;
  const formattedDate = event_date?.slice(0, 10).replace(/-/g, ".") ?? "";

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← 목록으로
      </button>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.date}>{formattedDate}</p>
      {thumbnail_url && (
        <img src={thumbnail_url} alt={title} className={styles.thumbnail} />
      )}
      <div className={styles.content}>{content}</div>
    </div>
  );
};

export default EventDetailPage;
