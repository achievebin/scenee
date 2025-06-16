import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import styles from './TopNav.module.css';
import CategoryNav from './CategoryNav.jsx';

const TopNav = () => {
  const { user, logout, isLoading } = useAuthContext();
  const navigate = useNavigate();

  // 로그아웃 처리
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={styles['top-nav']} id="user">
      <div className={styles['top-nav__left']}>
        <Link to="/" className={styles['logo-link']}>
          <img src="/images/logo.png" alt="#" className={styles['logo']} />
        </Link>
      </div>
      <CategoryNav />
      <div className={styles['auth-links']}>
        <div className={styles['top-nav-right']}>
          {!isLoading && user ? (
            <>
              <span className={styles['welcome']}>
                {user.nickname}님 환영합니다
              </span>
              <span className={styles['divider']}>|</span>
              <Link to="/mypage" className={styles['top-mypage']}>
                마이페이지
              </Link>
              <span className={styles['divider']}>|</span>
              <button onClick={handleLogout} className={styles['top-logout']}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={styles['top-login']}>
                로그인
              </Link>
              <span className={styles['divider']}>|</span>
              <Link to="/register" className={styles['top-sign']}>
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNav;
