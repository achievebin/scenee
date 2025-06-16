// src/pages/FindPasswordPage.jsx
import React, { useState } from 'react';
import styles from './FindPage.module.css';
import { Link } from 'react-router-dom';
import { requestPasswordReset } from '../../api/findApi';
export default function FindPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleFindPassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email) {
      setError('이메일을 입력하세요.');
      return;
    }

    try {
      // 실제 API 경로가 다르다면 수정하세요.
      const res = await requestPasswordReset({ email });
      setMessage(
        res.data.message || '비밀번호 재설정 링크를 해당 이메일로 발송했습니다.'
      );
    } catch (err) {
      setError(
        err.response?.data?.message || '비밀번호 찾기 중 오류가 발생했습니다.'
      );
    }
  };

  return (
    <div className={styles.FindSection}>
      <div className={styles.container}>
        {/* 상단 타이틀 */}
        <Link to="/" className={styles.title}>
          SCENEE
        </Link>

        {/* 카드 */}
        <div className={styles.card}>
          {/* 탭 헤더 */}
          <div className={styles.tabContainer}>
            <div className={styles.tabActive}>비밀번호 찾기</div>
          </div>

          {/* 카드 내부 */}
          <div className={styles.cardBody}>
            <Link to="/" className={styles.logoCircle}>
              <img
                src="/images/colorlogo.png"
                alt="#"
                className={styles.Logo}
              />
            </Link>
            <h1 className={styles.heading}>비밀번호 찾기</h1>

            <form className={styles.inputBox} onSubmit={handleFindPassword}>
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
                비밀번호 재설정 링크 받기
              </button>
            </form>
          </div>
        </div>

        {/* 푸터 링크 */}
        <div className={styles.footer}>
          <Link to="/login" className={styles.footerLink}>
            로그인으로 돌아가기
          </Link>
          <span className={styles.divider}>/</span>
          <Link to="/find-id" className={styles.footerLink}>
            아이디 찾기
          </Link>
          <span className={styles.divider}>/</span>
          <Link to="/register" className={styles.footerLink}>
            회원가입하기
          </Link>
          <span className={styles.divider}>/</span>
          <Link to="/contact" className={styles.footerLink}>
            문의하기
          </Link>
        </div>

        {/* 저작권 */}
        <div className={styles.copyRight}>
          copyright © 2025 by GLOBAL, All rights reserved.
        </div>
      </div>
    </div>
  );
}
