// src/components/MyPage/WishList.jsx
import React, { useEffect, useState } from "react";
import { getUserWishlist } from "../../api/userApi";
import styles from "./WishList.module.css";

export default function WishList({ userId }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    getUserWishlist(userId)
      .then(res => setItems(res.data))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <p className={styles.empty}>로딩 중...</p>;
  if (!items.length) return <p className={styles.empty}>찜한 내역이 없습니다.</p>;

  return (
    <div className={styles.grid}>
      {items.map(item => (
        <div key={item.id} className={styles.card}>
          <img src={item.posterUrl} alt={item.title} />
          <h4>{item.title}</h4>
        </div>
      ))}
    </div>
  );
}
