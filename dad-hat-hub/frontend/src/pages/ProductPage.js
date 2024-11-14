// src/pages/ProductPage.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data';
import { useCart } from '../context/CartContext';
import { FaStar } from 'react-icons/fa';
import Carousel from '../components/Carousel';

const ProductPage = () => {
  const { productId } = useParams();
  const product = products.find((p) => p.id === parseInt(productId));
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!product) return <p className="text-center">Product not found</p>;

  const handleQuantityChange = (e) => {
    setQuantity(Math.max(1, parseInt(e.target.value) || 1));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  // Filter out the current product and take the first 3 products as related
  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <section className="bg-navy min-h-screen p-8 text-white">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start gap-8">

        {/* Product Image Carousel */}
        <div className="w-full md:w-1/2 space-y-4">
          <Carousel images={product.images} />
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 bg-purple-800 p-8 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-cyan-500 mb-4">{product.name}</h1>
          <p className="text-2xl font-semibold text-cyan-300 mb-6">${product.price}</p>
          <p className="text-lg text-gray-200 leading-relaxed mb-8">{product.description}</p>

          {/* Product Specifications */}
          <div className="bg-navy p-4 rounded-lg mb-8 shadow-md">
            <h3 className="text-xl font-semibold text-cyan-500 mb-2">Product Specifications</h3>
            <table className="text-gray-200 w-full">
              <tbody>
                <tr>
                  <td className="py-2">Material:</td>
                  <td className="py-2">100% Cotton</td>
                </tr>
                <tr>
                  <td className="py-2">Size:</td>
                  <td className="py-2">One Size Fits All</td>
                </tr>
                <tr>
                  <td className="py-2">Care Instructions:</td>
                  <td className="py-2">Machine Washable</td>
                </tr>
                <tr>
                  <td className="py-2">Available Colors:</td>
                  <td className="py-2">Black, Navy, Gray</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Quantity Selector */}
          <div className="mb-4 flex items-center space-x-4">
            <label htmlFor="quantity" className="text-lg font-medium text-white">Quantity:</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-16 p-2 border border-cyan-500 rounded-lg text-center text-navy focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="px-8 py-3 bg-cyan-500 text-navy font-semibold rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-bold text-cyan-500 mb-6">Customer Reviews</h2>
        {product.reviews && product.reviews.length > 0 ? (
          product.reviews.map((review, index) => (
            <div key={index} className="bg-purple-800 p-4 rounded-lg mb-4 shadow-md">
              <div className="flex items-center mb-2">
                {[...Array(review.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <p className="font-semibold text-cyan-300">{review.name}</p>
              <p className="text-gray-200">{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No reviews yet. Be the first to review!</p>
        )}
      </div>

      {/* Related Products */}
      <div className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-bold text-cyan-500 mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className="bg-purple-800 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
              <img src={relatedProduct.image} alt={relatedProduct.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-2xl font-semibold text-cyan-300">{relatedProduct.name}</h3>
                <p className="text-cyan-400 text-lg font-medium mb-2">{relatedProduct.price}</p>
                <a href={`/product/${relatedProduct.id}`} className="text-cyan-300 hover:text-cyan-500 underline transition-all duration-200">
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
