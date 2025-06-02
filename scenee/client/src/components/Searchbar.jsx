import React from 'react';
import './Searchbar.css';

//검색을 하기 위한 검색창을 출력하는 컴포넌트
function SearchBar({ onSearch, className = '' }) {
	return (
		<div className={`searchbar ${className}`}>
			<input
				type="text"
				className="searchbar__input"
				placeholder="찾으시는 제목을 입력해주세요😊"
				onKeyDown={(e) => {
					if (e.key === 'Enter' && onSearch) onSearch(e.target.value);
				}}
			/>
		</div>
	);
}

export default SearchBar;
