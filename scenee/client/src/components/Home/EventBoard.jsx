// src/components/Home/EventBoard.jsx
import React, { useEffect, useState } from "react";
import { getEventBoards } from "../../api/noticeApi.js";
import styles from "./EventBoard.module.css";

const EventBoard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEventBoards()
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("이벤트 로드 에러:", err));
  }, []);

  if (!events.length) {
    return (
      <h2 style={{ padding: "1rem", fontSize: "1.25rem" }}>
        🎁 이벤트를 불러오는 중.....
      </h2>
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

  const styles = {
    board: {
      padding: "1rem",
      background: "#fff",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    title: {
      marginBottom: "0.75rem",
      fontSize: "1.5rem",
    },
    list: {
      display: "flex",
      flexWrap: "wrap",
      gap: "1rem",
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    item: {
      flex: "1 1 calc(33.333% - 1rem)",
      background: "#fafafa",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
    },
    thumbnail: {
      width: "100%",
      height: "120px",
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    info: {
      padding: "0.75rem",
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    countdown: {
      fontWeight: "bold",
      color: "#e63946",
    },
    eventTitle: {
      color: "#333",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  };

  return (
    <div style={styles.board}>
      <h2 style={styles.title}>🎁 이벤트</h2>
      <ul style={styles.list}>
        {events.map((ev) => {
          const days = calcDaysLeft(ev.event_date);
          return (
            <li
              key={ev.id}
              style={styles.item}
              onClick={() => openEventWindow(ev)}
            >
              <div
                style={{
                  ...styles.thumbnail,
                  backgroundImage: ev.thumbnail_url
                    ? `url(${ev.thumbnail_url})`
                    : "none",
                }}
              />
              <div style={styles.info}>
                <span style={styles.countdown}>
                  {days != null ? `${days}일 남음` : "날짜 미정"}
                </span>
                <span style={styles.eventTitle}>{ev.title}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EventBoard;
