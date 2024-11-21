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
        className="w-full p-3 rounded-full bg-white text-primary placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent border-2 border-accent shadow-md"
      />
    </div>
  );
};

export default SearchBar;
