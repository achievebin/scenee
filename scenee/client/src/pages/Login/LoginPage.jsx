import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance.js';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const nav = useNavigate();
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    token ? localStorage.setItem('token', token)
          : localStorage.removeItem('token');
  }, [token]);

  const handleLogin = async () => {
    try {
      const res = await axiosInstance.post('/api/auth/login', { username: u, password: p });
      setToken(res.data.token);
      alert('로그인 성공');
      nav('/');
    } catch (e) {
      alert('로그인 실패: ' + (e.response?.data?.message || e.message));
    }
  };

  return (
    <div>
      <h1>로그인</h1>
      <input placeholder="아이디" value={u} onChange={e=>setU(e.target.value)} />
      <input placeholder="비밀번호" type="password" value={p} onChange={e=>setP(e.target.value)} />
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
}
