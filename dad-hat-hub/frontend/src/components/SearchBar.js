// src/components/SearchBar.js
import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search hats..."
        value={searchTerm}
        onChange={onSearchChange}
        className="w-full p-2 rounded-lg text-black"
      />
    </div>
  );
};

export default SearchBar;
