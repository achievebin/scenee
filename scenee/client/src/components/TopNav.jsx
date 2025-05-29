import React from 'react'
import LoginPage from '../pages/Login/LoginPage'
import RegisterPage from '../pages/Register/RegisterPage'
import { Link } from 'react-router-dom';

//Header에 들어가는 로그인 회원가입 페이지로 이동할 수 있는 공간을 담은 컴포넌트
const TopNav = () => {
  return (
    <header id='user'>
      <Link to="login"><button >Login</button></Link>
      <Link to="register"><button>sign</button></Link>
    </header>
  )
}

export default TopNav

