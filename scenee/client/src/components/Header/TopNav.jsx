import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LOCAL_STORAGE_KEYS } from '../../constants/localStorageKeys'
import styles from '../Home/Header.module.css'

const TopNav = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  // 로그인 상태 확인
  useEffect(() => {
    const storedUsername = localStorage.getItem(LOCAL_STORAGE_KEYS.USERNAME_KEY) || sessionStorage.getItem(LOCAL_STORAGE_KEYS.USERNAME_KEY);
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN_KEY);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.USER_ID_KEY);
	localStorage.removeItem(LOCAL_STORAGE_KEYS.USERNAME_KEY);

	sessionStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN_KEY);
    sessionStorage.removeItem(LOCAL_STORAGE_KEYS.USER_ID_KEY);
	sessionStorage.removeItem(LOCAL_STORAGE_KEYS.USERNAME_KEY);

    setUsername('');
    navigate('/login');
  };

  return (
    <nav className={styles['top-nav']}>
      <div className={styles['top-nav__header']} id="user">
        <div className={styles['auth-links']}>
          {username ? (
            <>
              <span className={styles['welcome']}>{username}님 환영합니다</span>
              <span className={styles['divider']}>|</span>
              <Link to="/mypage" className={styles['top-mypage']}>마이페이지</Link>
              <span className={styles['divider']}>|</span>
              <button onClick={handleLogout} className={styles['top-logout']}>로그아웃</button>
            </>
          ) : (
            <>
              <Link to="/login" className={styles['top-login']}>로그인</Link>
              <span className={styles['divider']}>|</span>
              <Link to="/register" className={styles['top-sign']}>회원가입</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopNav

// import React, { useState } from 'react';
// import styles from './TopNav.module.css';
// import SearchBar from './SearchBar';

// function TopNav() {
// 	const [showSearch, setShowSearch] = useState(false);

// 	return (
	
// 			<nav className={styles["top-nav"]}>



		
// 			<div className={styles["top-nav__header"]}>
// 				<div className={styles["auth-links"]}>
// 					<a href="/login" className={styles["top-login"]}>
// 						로그인
// 					</a>
// 					<span className={styles["divider"]}>|</span>
// 					<a href="/register" className={styles["top-sign"]}>
// 						회원가입
// 					</a>
// 				</div>
// 				<div className={styles['top-nav-center']}	onMouseEnter={() => setShowSearch(true)}
// 				onMouseLeave={() => setShowSearch(false)}>	
// 				<hr className={styles["nav-divider"]} />
// 			</div>
 				
			
// 			<div className={styles["top-nav-menu"]}>
// 				<div className={styles["top-nav-left"]}>
// 					<img src="images/logo.png" alt="Logo" className={styles["top-nav-logo"]} />

// 				</div>

// 				<div className={styles["top-nav-right"]}>
// 					<div className={styles["menu-list"]}>
// 						<a href="/popular">주간베스트</a>
// 						<a href="/category">드라마 · 영화 · 애니</a>
// 						<a href="/notice">공지사항</a>
// 						<a href="/event">이벤트</a>
					
// 				</div>
// 				</div>
// 			</div>
			
// 			<SearchBar
// 				onSearch={(value) => {
// 					console.log('검색어:', value);
					
// 				}}
// 				className={showSearch ? 'visible' : ''}
// 			/>
// 			</div>
// 			</nav>
	
// 	);
// }

// export default TopNav;
