import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEventBoards } from "../../api/noticeApi.js";
import styles from "./EventPage.module.css";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const perPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    getEventBoards()
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("이벤트 로드 에러:", err));
  }, []);

  const totalPages = Math.ceil(events.length / perPage);
  const paged = events.slice((page - 1) * perPage, page * perPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const fmtDate = (raw) =>
    raw ? raw.slice(0, 10).replace(/-/g, ".") : "";

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>🎁 이벤트 목록</h1>

      <div className={styles.tbody}>
        {/* 헤더 행 */}
        <div className={styles.thead}>
          <span className={styles.noCell}>번호</span>
          <span className={styles.titleCell}>제목</span>
          <span className={styles.dateCell}>이벤트 날짜</span>
        </div>

        {/* 데이터 행 */}
        {paged.map(({ id, title, event_date }) => (
          <div
            key={id}
            className={styles.row}
            onClick={() => navigate(`/events/${id}`)}
          >
            <span className={styles.noCell}>{id}</span>
            <span className={styles.titleCell}>{title}</span>
            <span className={styles.dateCell}>{fmtDate(event_date)}</span>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
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

export default EventPage;
