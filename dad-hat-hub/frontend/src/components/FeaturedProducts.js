import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        console.log("Featured Products Data:", response.data);
        setFeaturedProducts(response.data.result.slice(0, 3)); // Adjust based on the actual API structure
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <section className="py-8 px-4 bg-purple-900 rounded-lg">
      <h2 className="text-3xl font-bold text-cyan-500 mb-6 text-center">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
