import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import SearchIcon from '../../assets/images/search.svg';
import styles from './CategoryNav.module.css';

//Header에 들어가는 카테고리 출력 컴포넌트
export default function CategoryNav() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = (category) => {
    navigate(`/search?category=${category}`); // 예: popular, top_rated
  };

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
  };

  return (
    <div>
      <div className={styles.category_nav}>
        {['popular', 'top_rated', 'upcoming', 'now_playing'].map((cat) => (
          <button className={styles.categoryButton}key={cat} onClick={() => handleClick(cat)}>
            {cat.replace('_', ' ').toUpperCase()}
          </button>
        ))}
        <button
          onClick={toggleSearch}
          aria-label="검색 열기"
          className={styles.search_bar_button}
        >
          <img src={SearchIcon} alt="검색" width="20" height="20" />
        </button>

        {isSearchOpen && (
          <div className={styles.search_bar_container}>
            <SearchBar
              isOpen={isSearchOpen}
              onClose={() => setIsSearchOpen(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
