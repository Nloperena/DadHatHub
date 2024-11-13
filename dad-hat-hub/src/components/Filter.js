// src/components/Filter.js
import React from 'react';

const Filter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="mb-6">
      <select
        value={selectedCategory}
        onChange={onSelectCategory}
        className="w-full p-2 rounded-lg text-black"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
