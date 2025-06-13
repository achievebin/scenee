import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchBar.module.css';

//검색을 하기 위한 검색창을 출력하는 컴포넌트
export default function SearchBar({ isOpen, onClose }) {
  //열고 닫기
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  //검색창 바깥을 클릭하면 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      //검색창에 내용이 없을 경우
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  //검색창 주목
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) return;
    navigate(`/search?query=${encodeURIComponent(trimmedQuery)}`);
    setSearchQuery('');
    onClose?.();
  };

  if (!isOpen) return null;

  return isOpen ? (
    <div className={styles.SearchSection}>
    <form ref={wrapperRef} onSubmit={handleSubmit} className={styles.searchBar}>
      <input
        type="text"
        ref={inputRef}
        className={styles.searchbar__input}
        placeholder="찾으시는 제목을 입력해주세요😊"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSubmit(e);
        }}
      />
    </form>
    </div>
  ) : null;
}
