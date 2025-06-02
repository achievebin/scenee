// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';

export default function RegisterPage() {
  const navigate = useNavigate();

  // --- 입력 필드 상태 ---
  const [email, setEmail] =useState('');
  const [nickname, setNickname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // --- 에러 메시지 상태 ---
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // 비밀번호 유효성 검사 정규식 (영문자 + 특수문자 최소 1개, 길이 8~19)
  const pwRegex = /^(?=.*[A-Za-z])(?=.*[!@#$%^&*])[A-Za-z!@#$%^&*]{8,19}$/;

  // --- 회원가입 처리 핸들러 ---
  const handleRegister = async () => {
    // 1) 에러 초기화
    setUsernameError('');
    setPasswordError('');

    // 2) 비밀번호 일치 검증
    if (password !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 3) 아이디 길이 검사
    if (username.length < 8) {
      setUsernameError('아이디는 최소 8자 이상이어야 합니다.');
      return;
    }

    // 4) 비밀번호 유효성 검사
    if (!pwRegex.test(password)) {
      setPasswordError('비밀번호는 8~19자, 영문자·특수문자 각각 1개 이상 포함되어야 합니다.');
      return;
    }

    // 5) 서버에 회원가입 요청 전송
    try {
      await axiosInstance.post('/api/auth/register', {
        nickname,
        email,
        username,
        password
      });
      alert('회원가입 성공!');
      navigate('/login');
    } catch (err) {
      if (err.response?.status === 409) {
        setUsernameError('이미 사용 중인 아이디입니다.');
      } else {
        alert('회원가입 실패: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 20 }}>
      <h1>회원가입</h1>

      {/* 닉네임 입력 */}
      <div style={{ marginBottom: 8 }}>
        <input
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
          required
          style={{ width: '90%', padding: 8 }}
        />
      </div>

      {/* 이메일 입력 */}
      <div style={{ marginBottom: 8 }}>
        <input
          type="text"
          placeholder="이메일"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ width: '90%', padding: 8 }}
        />
      </div>

      {/* 아이디 입력 */}
      <div style={{ marginBottom: 8 }}>
        <input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={e => {
            setUsername(e.target.value);
            setUsernameError('');
          }}
          required
          style={{ width: '90%', padding: 8 }}
        />
        {usernameError && (
          <div style={{ color: 'red', fontSize: 12, marginTop: 4 }}>
            {usernameError}
          </div>
        )}
      </div>

      {/* 비밀번호 입력 */}
      <div style={{ marginBottom: 8 }}>
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
            setPasswordError('');
          }}
          required
          style={{ width: '90%', padding: 8 }}
        />
      </div>

      {/* 비밀번호 확인 입력 */}
      <div style={{ marginBottom: 8 }}>
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={e => {
            setConfirmPassword(e.target.value);
            setPasswordError('');
          }}
          required
          style={{ width: '90%', padding: 8 }}
        />
        {passwordError && (
          <div style={{ color: 'red', fontSize: 12, marginTop: 4 }}>
            {passwordError}
          </div>
        )}
      </div>

      {/* 버튼 그룹 */}
      <div style={{ marginTop: 20 }}>
        <button
          onClick={handleRegister}
          style={{
            width: '100%',
            padding: 10,
            background: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer'
          }}
        >
          회원가입
        </button>
      </div>
    </div>
  );
}

