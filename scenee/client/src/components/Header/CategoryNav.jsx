import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchBarContext } from '../../contexts/SearchBarContext';
import SearchIcon from '../../assets/images/search.svg';
import styles from './CategoryNav.module.css';

const categoryLabels = {
  popular: '인기순',
  top_rated: '평점 높은 순',
  upcoming: '개봉 예정작',
  now_playing: '현재 상영작',
};

const genres = [
  { id: 28, name: '액션' },
  { id: 35, name: '코미디' },
  { id: 18, name: '드라마' },
  { id: 27, name: '공포' },
  { id: 10749, name: '로맨스' },
  { id: 878, name: 'SF' },
  { id: 16, name: '애니메이션' },
];

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
    <div className={styles.category_nav}>
      {/* 카테고리 버튼 */}
      {Object.entries(categoryLabels).map(([cat, label]) => (
        <button
          className={styles.categoryButton}
          key={cat}
          onClick={() => handleClick(cat)}
        >
          {label}
        </button>
      ))}

      {/* 장르 hover */}
      <div className={styles.genreWrapper}>
        <button className={styles.genreButton}>장르별 ▼</button>
        <ul className={styles.genreList}>
          {genres.map((genre) => (
            <li key={genre.id}>
              <button
                className={styles.genreItem}
                onClick={() => navigate(`/search?genre=${genre.id}`)}
              >
                {genre.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* 검색 아이콘 */}
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
  );
}
