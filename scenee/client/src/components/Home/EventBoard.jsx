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

  const openEventWindow = ({ title, content, event_date, thumbnail_url }) => {
    const newWin = window.open("", "_blank", "width=600,height=500");
    newWin.document.write(`
      <html>
        <head>
          <title>${title}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 1rem; line-height: 1.5; }
            h1 { font-size: 1.5rem; margin-bottom: 0.5rem; }
            .meta { color: #555; margin-bottom: 1rem; }
            img { max-width: 100%; height: auto; margin-bottom: 1rem; border-radius: 4px; }
            .content { white-space: pre-wrap; color: #333; }
          </style>
        </head>
        <body>
          <h1>${title}</h1>
          <div class="meta">
            ${event_date ? `<strong>이벤트일:</strong> ${event_date}<br/>` : ""}
            ${
              calcDaysLeft(event_date) != null
                ? `<strong>남은 일수:</strong> ${calcDaysLeft(event_date)}일`
                : ""
            }
          </div>
          ${
            thumbnail_url ? `<img src="${thumbnail_url}" alt="${title}" />` : ""
          }
          <div class="content">${content}</div>
        </body>
      </html>
    `);
    newWin.document.close();
  };

  // const styles = {

  // };

  return (
    <div className={styles.EventBoard}>
      <Link to="/events">
        <h2 className={styles.Title}>이벤트 🎁 </h2>
      </Link>
      <ul className={styles.List}>
        {events.map((ev) => {
          const days = calcDaysLeft(ev.event_date);
          return (
            <li
              key={ev.id}
              className={styles.Item}
              onClick={() => openEventWindow(ev)}
            >
              <div className={styles.Info}>
                <span className={styles.Countdown}>
                  {days != null ? `${days}일 남음` : "날짜 미정"}
                </span>
                <span className={styles.EventTitle}>{ev.title}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EventBoard;
