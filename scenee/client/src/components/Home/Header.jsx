import React from 'react';
import TopNav from '../Header/TopNav';
import CategoryNav from '../Header/CategoryNav';
import SearchBar from '../Header/SearchBar';

//HomePage의 최상단에 들어가는 내용을 출력하는 컴포넌트
const Header = () => {
  return (
    <div>
      <TopNav />
      <CategoryNav />
      <SearchBar />
    </div>
  );
};

export default Header;
