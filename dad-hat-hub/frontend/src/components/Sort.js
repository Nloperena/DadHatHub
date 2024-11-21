// src/components/Sort.js
import React from 'react';

const Sort = ({ sortOption, onSortChange }) => {
  return (
    <div className="mb-6">
      <select
        value={sortOption}
        onChange={onSortChange}
        className="w-full p-3 rounded-full bg-white text-primary focus:outline-none focus:ring-2 focus:ring-accent border-2 border-accent shadow-md"
      >
        <option value="">Sort By</option>
        <option value="priceLowHigh">Price: Low to High</option>
        <option value="priceHighLow">Price: High to Low</option>
        <option value="nameAsc">Name: A to Z</option>
        <option value="nameDesc">Name: Z to A</option>
      </select>
    </div>
  );
};

export default Sort;
