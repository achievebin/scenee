import React, { useEffect, useState } from "react";
import { getEventBoards } from "../../api/noticeApi.js";
import styles from './EventBoard.module.css';

const EventBoard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEventBoards()
      .then((res) => setEvents(res.data))
      .catch((err) => {
        console.error("API 에러 응답 데이터:", err.response.data);
        console.error("전체 에러 객체:", err);
      });
  }, []);

  const calcDaysLeft = (dateStr) => {
    const today = new Date();
    const eventDate = new Date(dateStr);
    const diff = eventDate - today;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="event-board">
      <h1 className={styles.EventSectionTitle}>이벤트 🎁 </h1>
      <div className="event-list">
        {events.map(({ id, title, event_date, thumbnail_url }) => (
          <div
            key={id}
            className="event-card"
            style={{ backgroundImage: `url(${thumbnail_url})` }}
          >
            <div className="countdown">{calcDaysLeft(event_date)}일</div>
            <div className="event-title">{title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventBoard;
