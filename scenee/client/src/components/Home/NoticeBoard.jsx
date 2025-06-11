// src/components/Home/NoticeBoard.jsx
import React, { useEffect, useState } from "react";
import { getNoticeBoards } from "../../api/noticeApi.js";

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getNoticeBoards()
      .then((res) => setNotices(res.data))
      .catch((err) => console.error("공지사항 로드 에러:", err));
  }, []);

  if (!notices.length) {
    return <h2 style={{ padding: "1rem", fontSize: "1.25rem" }}>📌 공지사항을 불러오는 중.....</h2>;
  }

  return (
    <div style={{ padding: "1rem", background: "#fff", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
      <h2 style={{ marginBottom: "0.75rem", fontSize: "1.5rem" }}>📌 공지사항</h2>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {notices.map(({ id, title, content, created_at, createdAt }) => {
          const rawDate = created_at ?? createdAt ?? "";
          const date = rawDate ? rawDate.slice(0, 10).replace(/-/g, ".") : "";
          return (
            <li
              key={id}
              onClick={() => setSelected({ id, title, content, date })}
              style={{
                padding: "0.5rem",
                borderBottom: "1px solid #eee",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <span style={{ color: "#555" }}>{date}</span>
              <span style={{ flex: 1, marginLeft: "0.5rem", color: "#333" }}>{title}</span>
            </li>
          );
        })}
      </ul>

      {selected && (
        <div
          style={{
            marginTop: "1rem",
            padding: "1rem",
            background: "#fafafa",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
          }}
        >
          <h3 style={{ marginBottom: "0.5rem" }}>{selected.title}</h3>
          <p style={{ whiteSpace: "pre-wrap", color: "#444" }}>{selected.content}</p>
          <button
            onClick={() => setSelected(null)}
            style={{
              marginTop: "0.75rem",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "4px",
              background: "#e63946",
              color: "#fff",
              cursor: "pointer"
            }}
          >
            닫기
          </button>
        </div>
      )}
    </div>
  );
};

export default NoticeBoard;
