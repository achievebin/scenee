// src/pages/ResetPasswordPage.jsx
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { useNavigate, useLocation } from 'react-router-dom';

// URL 쿼리 파라미터에서 token을 읽어오기 위한 커스텀 훅
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const query = useQuery();
  const token = query.get('token') || ''; // URL: /reset-password?token=abcdef

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // 토큰이 없으면 접근 불가 → 로그인 페이지로 리다이렉트
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleReset = async () => {
    setError('');
    setMessage('');

    if (!newPassword || !confirmPassword) {
      setError('새 비밀번호와 비밀번호 확인을 모두 입력하세요.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    try {
      // 백엔드: POST /api/find/password/reset → { token, newPassword }
      const res = await axiosInstance.post('/api/find/password/reset', {
        token,
        newPassword,
      });
      setMessage(res.data.message); // 예: "비밀번호가 성공적으로 변경되었습니다."

      // 변경 완료 후 2초 뒤 로그인 페이지로 이동
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (e) {
      const msg = e.response?.data?.message || e.message;
      setError(msg);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 20 }}>
      <h1>비밀번호 재설정</h1>

      {error && (
        <div style={{ color: 'red', fontSize: 12, marginBottom: 8 }}>
          {error}
        </div>
      )}
      {message && (
        <div style={{ color: 'green', fontSize: 12, marginBottom: 8 }}>
          {message}
        </div>
      )}

      <div style={{ marginBottom: 8 }}>
        <input
          type="password"
          placeholder="새 비밀번호"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={{ width: '100%', padding: 8 }}
        />
      </div>

      <div style={{ marginBottom: 8 }}>
        <input
          type="password"
          placeholder="새 비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{ width: '100%', padding: 8 }}
        />
      </div>

      <button
        onClick={handleReset}
        style={{
          width: '100%',
          padding: 10,
          background: '#1976d2',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
          marginTop: 10,
        }}
      >
        비밀번호 재설정
      </button>
    </div>
  );
}
