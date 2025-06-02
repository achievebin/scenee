import React from 'react';
import TopNav from './TopNav';
import CategoryNav from './CategoryNav';
import SearchBar from './Searchbar';

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
