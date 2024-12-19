// src/pages/ShopPage.js
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import Sort from '../components/Sort';

const ShopPage = () => {
  const [products, setProducts] = useState([]); // Original list of products
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered and sorted products
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');

  const productsPerPage = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
        console.log('ShopPage API_BASE_URL:', API_BASE_URL); // Debugging

        const response = await fetch(`${API_BASE_URL}/api/products`);
        if (!response.ok) {
          console.error('Error fetching products:', response.statusText);
          return;
        }

        const data = await response.json();
        console.log('API Response:', data);

        if (data.products) {
          setProducts(data.products);
          setFilteredProducts(data.products); // Initialize filtered products
        } else {
          console.error('No products found in response:', data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchProducts();
  }, []); // Run once on component mount

  // Handle Search and Sort
  useEffect(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Handle Sorting
    if (sortOption) {
      filtered = [...filtered]; // Create a new array before sorting
      switch (sortOption) {
        case 'priceLowHigh':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'priceHighLow':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'nameAsc':
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'nameDesc':
          filtered.sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
          break;
      }
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when search or sort changes
  }, [searchTerm, sortOption, products]);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (loading) return <p className="text-center text-textcolor mt-8">Loading products...</p>;
  if (!loading && products.length === 0)
    return <p className="text-center text-textcolor mt-8">No products available.</p>;

  return (
    <div className="min-h-screen bg-background text-textcolor">
      {/* Header Section */}
      <section className="relative overflow-hidden py-8 md:py-12 flex flex-col items-center">
        <div className="absolute inset-0 -z-10">
        </div>

        <div className="text-center px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight text-primary">
            Welcome to Our <span className="text-accent">Shop</span>
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-6 md:mb-8">
          Explore our stylish, minimalist hats—search to find designs with the elements you love!
          </p>
        </div>
      </section>

      {/* Search and Sort Section */}
      <section className="max-w-6xl mx-auto px-6 pb-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:space-x-4">
          <div className="w-full md:w-1/2">
            <SearchBar searchTerm={searchTerm} onSearchChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div className="w-full md:w-1/2">
            <Sort sortOption={sortOption} onSortChange={(e) => setSortOption(e.target.value)} />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </section>
    </div>
  );
};

export default ShopPage;
