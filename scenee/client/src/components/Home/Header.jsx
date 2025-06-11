import React, { useState } from 'react';
import TopNav from '../Header/TopNav';
import CategoryNav from '../Header/CategoryNav';
import SearchBar from '../Header/SearchBar';

//HomePage의 최상단에 들어가는 내용을 출력하는 컴포넌트
const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const toggleSearchBar = () => setIsSearchOpen((prev) => !prev);
  return (
    <header>
      <TopNav />
      <CategoryNav onSearchClick={toggleSearchBar} />
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
};

export default Header;
