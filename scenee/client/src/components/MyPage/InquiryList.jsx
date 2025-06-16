// src/components/MyPage/InquiryList.jsx
import React, { useEffect, useState } from "react";
import { getUserInquiries } from "../../api/userApi";
import styles from "./InquiryList.module.css";

export default function InquiryList({ userId }) {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    getUserInquiries(userId)
      .then(res => setInquiries(res.data))
      .catch(() => setInquiries([]))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <p className={styles.empty}>로딩 중...</p>;
  if (!inquiries.length) return <p className={styles.empty}>작성한 문의가 없습니다.</p>;

  return (
    <ul className={styles.list}>
      {inquiries.map(q => (
        <li key={q.id} className={styles.item}>
          <div className={styles.meta}>
            <span className={styles.title}>{q.title}</span>
            <span className={q.status === "answered" ? styles.answered : styles.pending}>
              {q.status === "answered" ? "답변 완료" : "답변 대기"}
            </span>
          </div>
          <p className={styles.date}>{new Date(q.createdAt).toLocaleDateString()}</p>
        </li>
      ))}
    </ul>
  );
}
