import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/authApi';
import { LOCAL_STORAGE_KEYS } from '../../constants/localStorageKeys';
import AuthForm from '../../components/Auth/AuthForm';

export default function LoginPage() {
  const nav = useNavigate();

  const handleLogin = async (data, mode, keepLogin) => {
    try {
      const res = await loginUser(data);
      const { token, username, userId } = res.data;

    if (!token || !username || !userId) {
      alert('로그인 실패: 응답 정보가 부족합니다.');
      return;
    }

      // localStorage 저장
      localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN_KEY, token);
      localStorage.setItem(LOCAL_STORAGE_KEYS.USERNAME_KEY, username);
      localStorage.setItem(LOCAL_STORAGE_KEYS.USER_ID_KEY, userId);

      alert('로그인 성공');
      nav('/');
    } catch (e) {
      alert('로그인 실패: ' + (e.response?.data?.message || e.message));
    }
  };

  return <AuthForm initialMode="login" onSubmit={handleLogin} />;
}

