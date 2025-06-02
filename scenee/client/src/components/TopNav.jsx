import React, { useState } from 'react';
import './TopNav.css';
import SearchBar from './Searchbar';



function TopNav() {
	const [showSearch, setShowSearch] = useState(false);

	return (
	
			<nav className="top-nav">



		
			<div className="top-nav__header">
				<div className="auth-links">
					<a href="/login" className="top-login">
						로그인
					</a>
					<span className="divider">|</span>
					<a href="/signup" className="top-sign">
						회원가입
					</a>
				</div>
				<div className='top-nav-center'	onMouseEnter={() => setShowSearch(true)}
				onMouseLeave={() => setShowSearch(false)}>	
				<hr className="nav-divider" />
			</div>
 				
			
			<div className="top-nav-menu">
				<div className="top-nav-left">
					<img src="images/logo.png" alt="Logo" className="top-nav-logo" />

				</div>

				<div className="top-nav-right">
					<div className="menu-list">
						<a href="/popular">주간베스트</a>
						<a href="/category">드라마 · 영화 · 애니</a>
						<a href="/notice">공지사항</a>
						<a href="/event">이벤트</a>
					
				</div>
				</div>
			</div>
			
			<SearchBar
				onSearch={(value) => {
					console.log('검색어:', value);
					
				}}
				className={showSearch ? 'visible' : ''}
			/>
			</div>
			</nav>
	
	);
}

export default TopNav;
