// src/components/MyPage/ProfileInfo.jsx
import React from "react";
import styles from "./ProfileInfo.module.css";

export default function ProfileInfo({ user }) {
  return (
    <div className={styles.profile}>
      <h2 className={styles.title}>{user.nickname}님의 프로필</h2>
      <div className={styles.field}>
        <span className={styles.label}>아이디</span>
        <span className={styles.value}>{user.username}</span>
      </div>
      <div className={styles.field}>
        <span className={styles.label}>이메일</span>
        <span className={styles.value}>{user.email}</span>
      </div>
    </div>
  );
}
