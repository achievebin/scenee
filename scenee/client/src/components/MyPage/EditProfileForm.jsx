// src/components/MyPage/EditProfileForm.jsx
import React, { useState } from "react";
import styles from "./EditProfileForm.module.css";

export default function EditProfileForm({ user, onUpdate }) {
  const [name, setName] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  const handleSubmit = e => {
    e.preventDefault();
    // TODO: API 호출 후 onUpdate
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="이름"
      />
      <input
        className={styles.input}
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="이메일"
      />
      <button type="submit" className={styles.submit}>
        수정하기
      </button>
    </form>
  );
}
