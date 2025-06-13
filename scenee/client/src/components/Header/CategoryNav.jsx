import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchBarContext } from '../../contexts/SearchBarContext';
import SearchIcon from '../../assets/images/search.svg';
import styles from './CategoryNav.module.css';

//카테고리별 검색을 위한 컴포넌트
export default function CategoryNav() {
  const { isSearchOpen, setIsSearchOpen } = useSearchBarContext();
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
          <button
            className={styles.categoryButton}
            key={cat}
            onClick={() => handleClick(cat)}
          >
            {cat.replace('_', ' ').toUpperCase()}
          </button>
        ))}
        <button
          onClick={toggleSearch}
          aria-label="검색 열기"
          className={styles.search_bar_button}
        >
          <img
            src={SearchIcon}
            alt="검색"
            width="25"
            height="25"
            className={styles.SearchIconImg}
          />
        </button>
      </div>
    </div>
  );
}
