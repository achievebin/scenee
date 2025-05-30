// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // 회원가입 처리
  const handleRegister = async () => {
    // 1) 비밀번호 일치 검증
    if (password !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다');
      return;
    }

    // 2) 에러 초기화
    setUsernameError('');
    setPasswordError('');

    try {
      await axiosInstance.post('/api/auth/register', {
        username,
        password
      });
      alert('회원가입 성공!');
      navigate('/login');
    } catch (err) {
      if (err.response?.status === 409) {
        // 아이디 중복 에러
        setUsernameError('이미 사용 중인 아이디입니다');
      } else {
        alert('회원가입 실패: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 20 }}>
      <h1>회원가입</h1>

      {/* 아이디 입력 */}
      <div style={{ marginBottom: 8 }}>
        <input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={e => {
            setUsername(e.target.value);
            setUsernameError('');  // 입력 시 에러 초기화
          }}
          minLength="4"
          style={{ width: '100%', padding: 8 }}
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
          title='8~20자, 영문 숫자 특수문자 하나 이상 포함'
          pattern='(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}'
          onChange={e => {
            setPassword(e.target.value);
            setPasswordError('');
          }}
          
          style={{ width: '100%', padding: 8 }}
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
          style={{ width: '100%', padding: 8 }}
        />
        {passwordError && (
          <div style={{ color: 'red', fontSize: 12, marginTop: 4 }}>
            {passwordError}
          </div>
        )}
      </div>

      {/* 버튼 그룹 */}
      <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
        <button
          onClick={handleRegister}
          style={{
            flex: 1,
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
