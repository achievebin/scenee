// src/components/Home/EventBoard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
      <h2 style={{ padding: "1rem", fontSize: "1.25rem" }}>
        🎁 이벤트를 불러오는 중.....
      </h2>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header} onClick={() => navigate("/events")}>
        🎁 이벤트 목록
      </h1>
      <ul className={styles.list}>
        {events.map(({ id, title, createdAt }) => {
          const formattedDate = createdAt
            ? new Date(createdAt).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
            : "날짜 미정";

          return (
            <li
              key={id}
              className={styles.listItem}
              onClick={() => navigate(`/events/${id}`)}
            >
              <span className={styles.eventTitle}>
                {title}&nbsp;&nbsp;{/* 두 칸 띄우기 */}
                <span className={styles.date}>{formattedDate}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EventBoard;
