// src/components/MyPage/MyPageTabs.jsx
import React from "react";
import styles from "./MyPageTabs.module.css";

export default function MyPageTabs({ activeTab, onChange }) {
  return (
    <nav className={styles.tabs}>
      <button
        className={`${styles.tab} ${activeTab === "wish" ? styles.active : ""}`}
        onClick={() => onChange("wish")}
      >
        찜
      </button>
      <button
        className={`${styles.tab} ${activeTab === "review" ? styles.active : ""}`}
        onClick={() => onChange("review")}
      >
        리뷰
      </button>
      <button
        className={`${styles.tab} ${activeTab === "inquiry" ? styles.active : ""}`}
        onClick={() => onChange("inquiry")}
      >
        문의
      </button>
    </nav>
  );
}
