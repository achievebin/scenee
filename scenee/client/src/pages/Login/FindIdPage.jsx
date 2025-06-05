// src/pages/FindIdPage.jsx :contentReference[oaicite:3]{index=3}
import React, { useState } from 'react';
import styles from './FindPage.module.css';  // 스타일 모듈 (프로젝트 상황에 맞게 수정)
import { Link } from 'react-router-dom';
import { getIdByEmail } from '../../api/findApi';

export default function FindIdPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleFindId = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email.trim()) {
      setError('이메일을 입력하세요.');
      return;
    }

    try {
      const res = await getIdByEmail({ email: email.trim() });
      if (res.data.data && res.data.data.username) {
        setMessage(`가입된 아이디: ${res.data.data.username}`);
      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || '아이디 찾기 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>SCENEE</div>

      <div className={styles.card}>
        <div className={styles.tabContainer}>
          <div className={styles.tabActive}>아이디 찾기</div>
        </div>

        <div className={styles.cardBody}>
          <div className={styles.logoCircle}>S</div>
          <h1 className={styles.heading}>아이디 찾기</h1>

          <form className={styles.inputBox} onSubmit={handleFindId}>
            <input
              className={styles.inputField}
              type="email"
              name="email"
              placeholder="가입 시 등록한 이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error && <div className={styles.errorMsg}>{error}</div>}
            {message && <div className={styles.successMsg}>{message}</div>}

            <button className={styles.submitButton} type="submit">
              아이디 찾기
            </button>
          </form>
        </div>
      </div>

      <div className={styles.footer}>
        <Link to="/login" className={styles.footerLink}>로그인으로 돌아가기</Link>
        <span className={styles.divider}>/</span>
        <Link to="/find-password" className={styles.footerLink}>비밀번호 찾기</Link>
        <span className={styles.divider}>/</span>
        <Link to="/register" className={styles.footerLink}>회원가입하기</Link>
        <span className={styles.divider}>/</span>
        <Link to="/contact" className={styles.footerLink}>문의하기</Link>
      </div>

      <div className={styles.copyRight}>
        copyright © 2025 by GLOBAL, All rights reserved.
      </div>
    </div>
  );
}
