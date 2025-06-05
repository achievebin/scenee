// src/pages/RegisterPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/Auth/AuthForm';
import { registerUser } from '../../api/authApi';
import { validateUserName, validatePassword, verifyPasswordMatch } from '../../utils/validations';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPassword] = useState('');

  const handleRegister = async (data) => {
    //에러 메시지 초기화
    setUsernameError('');
    setPasswordError('');
    setConfirmPassword('');

    //이용자 아이디 자리수 검증증
    const usernameErrorMsg = validateUserName(data.username);
    if (usernameErrorMsg) {
      setUsernameError(usernameErrorMsg);
      return;
    }
    //이용자 패스워드 조건 검증
    const passwordErrorMsg = validatePassword(data.password);
    if (passwordErrorMsg) {
      setPasswordError(passwordErrorMsg);
      return;
    }
    //이용자 패스워드 일치 조건 검증
    const confirmPasswordMatchMsg = verifyPasswordMatch(data.password, data.confirmPassword);
    if (confirmPasswordMatchMsg) {
      setPasswordError(confirmPasswordMatchMsg);
      return;
    }

    try {
      const res = await registerUser(data);
      alert('회원가입 성공');
      navigate('/login');
    } catch (err) {
      alert('회원가입 실패:' + (err.response?.data?.message || err.message));
    }
  }

  const registerField = [
    {
      name: 'confirmPassword',
      type: 'password',
      placeholder: '비밀번호 확인',
      required: true
    },
    {
      name: 'nickname',
      type: 'text',
      placeholder: '닉네임'
    },
    {
      name: 'email',
      type: 'email',
      placeholder: '이메일',
      required: true
    },
  ];

  return <AuthForm initialMode='register' onSubmit={handleRegister} registerField={registerField} usernameError={usernameError} passwordError={passwordError} confirmpassworderror={confirmPasswordError}/>;
}

