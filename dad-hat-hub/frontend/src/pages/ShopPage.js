import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination';
import ProductCard from '../components/ProductCard';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 6;

  // Fetch products from backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data.data); // Assuming the API response contains products under `data`
        setFilteredProducts(response.data.data); // Set initial filtered products
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search term and category
  useEffect(() => {
    let updatedProducts = products
      .filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((product) =>
        selectedCategory ? product.category === selectedCategory : true
      );

    // Sorting logic
    if (sortOption === 'priceLowHigh') {
      updatedProducts.sort((a, b) => a.variants[0].price - b.variants[0].price);
    } else if (sortOption === 'priceHighLow') {
      updatedProducts.sort((a, b) => b.variants[0].price - a.variants[0].price);
    } else if (sortOption === 'nameAsc') {
      updatedProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'nameDesc') {
      updatedProducts.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFilteredProducts(updatedProducts);
  }, [products, searchTerm, selectedCategory, sortOption]);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

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

  if (loading) return <p>Loading products...</p>;
  if (products.length === 0) return <p>No products available.</p>;

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
        <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        <div className="flex flex-col md:flex-row md:space-x-4 mb-6">
          <Filter
            categories={[...new Set(products.map((product) => product.category))]}
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
