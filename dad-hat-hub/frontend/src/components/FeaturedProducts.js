// src/components/FeaturedProducts.js
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
        const response = await axios.get(`${API_BASE_URL}/api/products`);
        console.log("Featured Products Data:", response.data);
        setFeaturedProducts(response.data.products.slice(0, 3));
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <section 
      className="py-12 px-4 sm:py-16 sm:px-8 relative"
      style={{
        background: '#A5AE9E', // Ash Gray background
        color: '#2F2504',     // Dark Drab Brown text
      }}
    >
      <h2 
        className="text-5xl sm:text-6xl font-extrabold mb-8 text-center"
        style={{
          // No drop shadow now
        }}
      >
        Featured Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredProducts.map((product) => (
          <div
            key={product.id}
            className="relative bg-white p-4 rounded-lg border border-black"
            style={{
              // Reduced border size (just a thin 1px border now, no heavy shadow)
            }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
