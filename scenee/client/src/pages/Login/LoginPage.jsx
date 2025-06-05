import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/authApi.js' 
import AuthForm from '../../components/Auth/AuthForm.jsx';

export default function LoginPage() {
  const nav = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    token ? localStorage.setItem('token', token)
          : localStorage.removeItem('token');
  }, [token]);

  const handleLogin = async (data) => {
    try {
      const res = await loginUser(data);
      setToken(res.data.token);
      alert('로그인 성공');
      nav('/');
    } catch (e) {
      alert('로그인 실패: ' + (e.response?.data?.message || e.message));
    }
  };

  return <AuthForm initialMode='login' onSubmit={handleLogin}/>;
}
