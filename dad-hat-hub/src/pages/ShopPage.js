// src/pages/ShopPage.js
import React, { useState } from 'react';
import { products } from '../data';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination';
import ProductCard from '../components/ProductCard';

const ShopPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 6;

  const categories = [...new Set(products.map((product) => product.category))];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) =>
      selectedCategory ? product.category === selectedCategory : true
    );

  // Sorting logic
  if (sortOption === 'priceLowHigh') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'priceHighLow') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === 'nameAsc') {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === 'nameDesc') {
    filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
  }

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="bg-purple min-h-screen">
      <section className="max-w-6xl mx-auto p-8 text-white">
        {/* Headline and Subheading */}
        <h1 className="text-5xl font-bold mb-2 text-pink text-center">
          Welcome to Our Shop
        </h1>
        <p className="text-xl mb-8 text-cyan text-center">
          Explore our exclusive collection of hats
        </p>

        {/* Existing components */}
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
        <div className="flex flex-col md:flex-row md:space-x-4 mb-6">
          <Filter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryChange}
          />
          <Sort sortOption={sortOption} onSortChange={handleSortChange} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </section>
    </div>
  );
};

export default ShopPage;
