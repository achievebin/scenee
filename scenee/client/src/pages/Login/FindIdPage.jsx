// src/pages/FindIdPage.jsx
import React, { useState } from 'react';
import styles from './FindPage.module.css';
import axios from 'axios'; // axiosInstance를 쓰신다면 그것을 불러오세요.

export default function FindIdPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleFindId = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email) {
      setError('이메일을 입력하세요.');
      return;
    }

    try {
      // 실제 API 경로가 다르다면 수정하세요.
      const res = await axios.post('/api/find/id', { email });
      setMessage(res.data.message || '가입된 아이디를 해당 이메일로 발송했습니다.');
    } catch (err) {
      setError(err.response?.data?.message || '아이디 찾기 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className={styles.container}>
      {/* 상단 타이틀 */}
      <div className={styles.title}>SCENEE</div>

      {/* 카드 */}
      <div className={styles.card}>
        {/* 탭 헤더 */}
        <div className={styles.tabContainer}>
          <div className={styles.tabActive}>아이디 찾기</div>
        </div>

        {/* 카드 내부 */}
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

      {/* 푸터 링크 */}
      <div className={styles.footer}>
        <a className={styles.footerLink} href="/login">로그인으로 돌아가기</a>
        <span className={styles.divider}>/</span>
        <a className={styles.footerLink} href="/find-password">비밀번호 찾기</a>
        <span className={styles.divider}>/</span>
        <a className={styles.footerLink} href="/register">회원가입하기</a>
        <span className={styles.divider}>/</span>
        <a className={styles.footerLink} href="/contact">문의하기</a>
      </div>

      {/* 저작권 */}
      <div className={styles.copyRight}>
        copyright © 2025 by GLOBAL, All rights reserved.
      </div>
    </div>
  );
}
