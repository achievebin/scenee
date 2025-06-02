// src/pages/RegisterPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/AuthForm';
import { registerUser } from '../../api/authApi';

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    try {
      const res = await registerUser(data);
      alert('회원가입 성공');
      navigate('/login');
    } catch (err) {
      alert('회원가입 실패:' + (e.response?.data?.message || e.message));
    }
  }

  const registerField = [
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

  return <AuthForm mode='register' onSubmit={handleRegister} registerField={registerField}/>;
}

