import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';

const RelatedProducts = () => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        console.log("Related Products Data:", response.data);
        setRelatedProducts(response.data.result.slice(0, 3)); // Adjust based on the actual API structure
      } catch (error) {
        console.error('Error fetching related products:', error);
      }
    };

    fetchRelatedProducts();
  }, []);

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
