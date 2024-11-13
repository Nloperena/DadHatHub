// src/components/FeaturedProducts.js
import React from 'react';
import ProductCard from './ProductCard';
import { products } from '../data';

const FeaturedProducts = () => {
  return (
    <section className="py-8 px-4 bg-purple-900 rounded-lg">
      <h2 className="text-3xl font-bold text-cyan-500 mb-6 text-center">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.slice(0, 3).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
