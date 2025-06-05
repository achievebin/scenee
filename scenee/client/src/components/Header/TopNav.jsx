import React from 'react'
import { Link } from 'react-router-dom';
import styles from '../Home/Header.module.css'

//Header에 들어가는 로그인 회원가입 페이지로 이동할 수 있는 공간을 담은 컴포넌트
const TopNav = () => {
  return (
	<nav className={styles['top-nav']}>
		<div className={styles['top-nav__header']} id='user'>
			<div className={styles['auth-links']}>
				<Link to="login" className={styles["top-login"]}>로그인</Link>
				<span className={styles["divider"]}>|</span>
				<Link to="register" className={styles["top-sign"]}>회원가입</Link>
			</div>
		</div>
	</nav>
  )
}

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
