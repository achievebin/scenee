import react, { useState, useRef, useEffect } from 'react';
import TopNav from '../Header/TopNav';
import CategoryNav from '../Header/CategoryNav';
import SearchBar from '../Header/SearchBar';
import styles from './Header.module.css';

//HomePage의 최상단에 들어가는 내용을 출력하는 컴포넌트
export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchBarRef = useRef();

  // 클릭 외부 감지로 SearchBar 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchBarRef.current && !searchBarRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={styles.header}>
      <TopNav />
      <CategoryNav onSearchToggle={() => setIsSearchOpen((prev) => !prev)} />
      <SearchBar
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        ref={searchBarRef}
      />
    </header>
  );
}
