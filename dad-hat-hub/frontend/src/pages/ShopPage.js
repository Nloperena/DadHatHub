import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

const ShopPage = () => {
  const [products, setProducts] = useState([]); // Original list of products
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered and sorted products
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      if (products.length > 0) return; // Prevent re-fetching if data already exists
      try {
        const response = await fetch('http://localhost:5000/api/products');
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
  }, [products]); // Dependency array ensures this runs only when products change

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  if (loading) return <p>Loading products...</p>;
  if (!loading && products.length === 0) return <p>No products available.</p>;

  return (
    <div className="bg-purple min-h-screen">
      <section className="max-w-6xl mx-auto p-8 text-white">
        <h1 className="text-5xl font-bold mb-2 text-pink text-center">Welcome to Our Shop</h1>
        <p className="text-xl mb-8 text-cyan text-center">Explore our exclusive collection of hats</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(filteredProducts.length / productsPerPage)}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
};

export default ShopPage;
