// src/components/AuthForm.jsx
import React, { useState } from 'react';

export default function AuthForm({mode = 'login', onSubmit}) {
  const [formData, setFormData] = useState({username: '', password: ''});
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData((formData) => ({...formData, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      await onSubmit(formData);
    } catch (err) {
      setError(err.message);
    }
    
  }

  return(
    <form onSubmit={handleSubmit}>
      <h1>{mode === 'login' ? '로그인' : '회원가입'}</h1>
      <div>
        <input name='username' placeholder="아이디" value={formData.username} onChange={handleChange}/>
      </div>
      <div>
        <input name='password' placeholder="비밀번호" type="password" value={formData.password} onChange={handleChange} required/>
      </div>
      <button type='submit'>{mode === 'login' ? '로그인' : '회원가입'}</button>
    </form>
  );
}
