// src/components/Home/EventBoard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getEventBoards } from "../../api/noticeApi.js";
import styles from "./EventBoard.module.css";

const EventBoard = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getEventBoards()
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("이벤트 로드 에러:", err));
  }, []);

  if (!events.length) {
    return (
      <Link to="/events" className={styles.loadingLink}>
        <h2 className={styles.loadingTitle}>🎁 이벤트를 불러오는 중.....</h2>
      </Link>
    );
  }

  const calcDaysLeft = (dateStr) => {
    if (!dateStr) return null;
    const diff = new Date(dateStr) - new Date();
    return diff >= 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0;
  };

  return (
    <div className={styles.container}>
      <Link to="/events" className={styles.titleLink}>
        <h2 className={styles.title}>🎁 이벤트</h2>
      </Link>

      <ul className={styles.list}>
        {events.map(({ id, title, event_date, thumbnail_url }) => {
          const daysLeft = calcDaysLeft(event_date);
          return (
            <li
              key={id}
              className={styles.item}
              onClick={() => navigate(`/events/${id}`)}
            >
              <div
                className={styles.thumbnail}
                style={{
                  backgroundImage: thumbnail_url
                    ? `url(${thumbnail_url})`
                    : "none",
                }}
              />
              <div className={styles.info}>
                <span className={styles.countdown}>
                  {daysLeft != null ? `${daysLeft}일` : "날짜 미정"}
                </span>
                <span className={styles.eventTitle}>{title}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EventBoard;
