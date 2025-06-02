import React from 'react';
import TopNav from './TopNav';
import CategoryNav from './CategoryNav';
import SearchBar from './SearchBar';

//HomePage의 최상단에 들어가는 내용을 출력하는 컴포넌트
const header = () => {
	return (
		<div>
			<TopNav />
			<CategoryNav />
			<SearchBar />
		</div>
	);
};

export default header;
