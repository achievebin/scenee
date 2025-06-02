import React from 'react';
import './Searchbar.css';

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
