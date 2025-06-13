// src/pages/EventPage.jsx
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

  const fmtDate = (raw) => (raw ? raw.slice(0, 10).replace(/-/g, ".") : "");

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>🎁 이벤트 목록</h1>
      <table className={styles.table}>
        {/* ... */}
        <tbody>
          {paged.map(({ id, title, event_date }) => (
            <tr
              key={id}
              onClick={() => navigate(`/events/${id}`)}
              className={styles.row}
            >
              <td className={styles.td}>{id}</td>
              <td className={styles.td}>{title}</td>
              <td className={styles.td}>{fmtDate(event_date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
    </div>
  );
};

export default EventPage;
