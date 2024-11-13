// src/components/RelatedProducts.js
import React from 'react';
import ProductCard from './ProductCard';
import { products } from '../data';

const RelatedProducts = () => {
  const relatedProducts = products.slice(0, 3);
  return (
    <section className="py-8 px-4 bg-purple-900 rounded-lg mt-8">
      <h2 className="text-3xl font-bold text-cyan-500 mb-6 text-center">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
