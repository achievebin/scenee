import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/authApi';
import AuthForm from '../../components/Auth/AuthForm';
import { useAuthContext } from '../../contexts/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const handleLogin = async (data, mode, keepLogin) => {
    try {
      const res = await loginUser(data);
      const { token } = res.data;

      if (!token) {
        alert('로그인 실패: 응답 정보가 없습니다.');
        return;
      }

      // AuthContext를 통한 로그인 상태 설정
      await login(token, keepLogin ? 'local' : 'session');

      alert('로그인 성공');
      navigate('/');
    } catch (e) {
      alert('로그인 실패: ' + (e.response?.data?.message || e.message));
    }
  };

  return <AuthForm mode="login" onSubmit={handleLogin} />;
}
