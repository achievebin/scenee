// src/components/Home/NoticeBoard.jsx
import React, { useEffect, useState } from "react";
import { getNoticeBoards } from "../../api/noticeApi.js";
import styles from "./NoticeBoard.module.css";
import EventBoard from "./EventBoard.jsx";


const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getNoticeBoards()
      .then((res) => setNotices(res.data))
      .catch((err) => console.error("공지사항 로드 에러:", err));
  }, []);

  if (!notices.length) {
    return (
      <h2 className={styles.waitNotice} >
        📌 공지사항을 불러오는 중.....
      </h2>
    );
  }

  return (
    <div
      className={styles.NoticeBoard}>
      <h1 className={styles.NoticeTitle}>
         공지사항 📌
      </h1>
      
      <ul className={styles.NoticeUl}>
        {notices.map(({ id, title, content, created_at, createdAt }) => {
          const rawDate = created_at ?? createdAt ?? "";
          const date = rawDate ? rawDate.slice(0, 10).replace(/-/g, ".") : "";
          
          return (
            <li
              key={id}
              onClick={() => setSelected({ id ,  title ,  content ,  date })}
             className={styles.NoticeLi}>
              
              <span className={styles.NoticeSpan}>{date}</span>
              <span className={styles.NoticeSpanTitle}>
                {title}
              </span>
              
            </li>
            
          );
          
        })}
      </ul>
      

      {selected && (
        <div className={styles.Selected}>
          <h3 className={styles.SelectedTitle}>{selected.title}</h3>
          <p className={styles.SelectedContent}>
            {selected.content}
          </p>
          <button
            onClick={() => setSelected(null)}
            className={styles.SelectedButton}>
            닫기
          </button>
        </div>
      )}
        
    </div>
  
  );
};

export default NoticeBoard;
