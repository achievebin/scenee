// src/components/AuthForm.jsx
import React, { useState } from 'react';
import styles from './Authform.module.css';
import { Link } from 'react-router-dom';

export default function AuthForm({ initialMode = 'login', onSubmit, registerField = [], usernameError = '', passwordError = '', confirmPasswordError = '' }) {
  // 초기 formData에 username, password와 registerField에 정의된 필드 초기화
  // 내부에서 mode를 관리
  const [mode, setMode] = useState(initialMode);

  // registerField에 정의된 추가 필드 초기화
  const initialRegisterFields = Object.fromEntries(
    registerField.map(f => [f.name, ''])
  );
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    ...initialRegisterFields
  });
  const [error, setError] = useState(null);
  const [keepLogin, setKeepLogin] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      await onSubmit(formData, mode, keepLogin);
    } catch (err) {
      setError(err.message || '알 수 없는 오류가 발생했습니다.');
    }
  };

  // 푸터의 회원가입/로그인 토글 함수
  const toggleMode = () => {
    setError(null);
    setMode(prev => (prev === 'login' ? 'register' : 'login'));
    // formData 초기화 (필요하다면)
    setFormData({
      username: '',
      password: '',
      ...initialRegisterFields
    });
    setKeepLogin(false);
  };

  return (
    <form className={styles["login-container"]} onSubmit={handleSubmit}>
      {/* 상단 타이틀 */}
      <div className={styles["login-title"]}>SCENEE</div>

      {/* 로그인/회원가입 카드 */}
      <div className={styles["login-card"]}>
        {/* 탭 헤더: mode에 따라 “ID로 로그인” 또는 “회원가입” */}
        <div className={styles["login-tab-container"]}>
          <div className={styles["login-tab active"]}>
            {mode === 'login' ? 'ID로 로그인' : '회원가입'}
          </div>
        </div>

        {/* 카드 내부 바디 */}
        <div className={styles["login-card-body"]}>
          {/* 원형 로고 (S) */}
          <div className={styles["login-logo"]}>S</div>

          {/* mode에 따라 제목 변경 */}
          <h1 className={styles["auth-heading"]}>
            {mode === 'login' ? '로그인' : '회원가입'}
          </h1>

          {/* 입력 필드 박스: 아이디, 비밀번호, 그리고 추가 입력(registerField) */}
          <div className={styles["input-box"]}>
            <input
              className={styles["login-input"]}
              name="username"
              placeholder="아이디"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {usernameError && <div className="field-error">{usernameError}</div>}
            <input
              className={styles["login-input"]}
              name="password"
              type="password"
              placeholder="비밀번호"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {passwordError && <div className={styles["field-error"]}>{passwordError}</div>}
            {mode === 'register' && registerField.map(field => (
              <input
                key={field.name}
                className={styles["login-input"]}
                {...field}
                value={formData[field.name]}
                onChange={handleChange}
                required={field.required || false}
                {...field.name === 'confirmPassword' && confirmPasswordError && (
                  <div className={styles["field-error"]}>{confirmPasswordError}</div>
                )}
              />
            ))}
          </div>

          {/* 로그인 모드일 때만 “로그인 상태 유지” 체크박스 표시 */}
          {mode === 'login' && (
            <label className={styles["login-checkbox-container"]}>
              <input
                id="keepLoggedIn"
                type="checkbox"
                className={styles["login-checkbox"]}
                checked={keepLogin}
                onChange={() => setKeepLogin(prev => !prev)}
              />
              <span className={styles["login-checkbox-label"]}>로그인 상태 유지</span>
            </label>
          )}

          {/* 에러 메시지 */}
          {error && (
            <div className={styles["login-error"]}>{error}</div>
          )}

          {/* 제출 버튼: 로그인 모드일 때 '로그인', 회원가입 모드일 때 '회원가입' */}
          <button className={styles["login-button"]} type="submit">
            {mode === 'login' ? '로그인' : '회원가입'}
          </button>
        </div>
      </div>

      {/* 카드 아래 푸터 링크 (아이디 찾기 / 비밀번호 찾기 / 토글 버튼 / 문의하기) */}
      <div className={styles["login-footer"]}>
        <Link to = "/find-id">아이디 찾기</Link>
        <span className={styles["divider"]}>/</span>
        <Link to = "/find-password">비밀번호 찾기</Link>
        <span className={styles["divider"]}>/</span>
        <button 
          type="button"
          className={styles["footer-toggle-button"]}
          onClick={toggleMode}
        >
          {mode === 'login' ? '회원가입하기' : '로그인하기'}
        </button>
        <span className={styles["divider"]}>/</span>
        <Link to="/contact">문의하기</Link>
      </div>

      {/* 저작권 표시 */}
      <div className={styles["login-copyright"]}>
        copyright © 2025 by GLOBAL, All rights reserved.
      </div>
    </form>
  );
}
