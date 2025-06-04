import React from 'react';
import styles from './SearchBar.module.css';

//검색을 하기 위한 검색창을 출력하는 컴포넌트
function SearchBar({ onSearch }) {
	return (
		<div className={styles["searchbar"]}>
			<input
				type="text"
				className={styles["searchbar__input"]}
				placeholder="찾으시는 제목을 입력해주세요😊"
				onKeyDown={(e) => {
					if (e.key === 'Enter' && onSearch) onSearch(e.target.value);
				}}
			/>
		</div>
	);
}

export default SearchBar
