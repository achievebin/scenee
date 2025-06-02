// src/components/AuthForm.jsx
import React, { useState } from 'react';

export default function AuthForm({mode = 'login', onSubmit, registerField = []}) {
  const [formData, setFormData] = useState({username: '', password: '', ...Object.fromEntries(registerField.map(f => [f.name, '']))});
  //...Object.fromEntries(registerField.map(f => [f.name, ''])): registerField에 들어 있는 필드(nickname, email)의 값을 초기화화
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData((formData) => ({...formData, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    //이벤트의 기본 동작을 막는 함수 
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
      {registerField.map((field)=> (
        <input key={field.name} {...field} value={formData[field.name]} onChange={handleChange}/>
        ))}
      <button type='submit'>{mode === 'login' ? '로그인' : '회원가입'}</button>
    </form>
  );
}
