import React, { createContext, useState, useContext } from 'react';

const SearchBarContext = createContext();

export const SearchBarProvider = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <SearchBarContext.Provider value={{ isSearchOpen, setIsSearchOpen }}>
      {children}
    </SearchBarContext.Provider>
  );
};

export const useSearchBarContext = () => useContext(SearchBarContext);
