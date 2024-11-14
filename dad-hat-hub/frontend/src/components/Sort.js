// src/components/Sort.js
import React from 'react';

const Sort = ({ sortOption, onSortChange }) => {
  return (
    <div className="mb-6">
      <select
        value={sortOption}
        onChange={onSortChange}
        className="w-full p-2 rounded-lg text-black"
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
