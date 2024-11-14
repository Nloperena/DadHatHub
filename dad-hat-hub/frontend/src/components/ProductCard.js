import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  // Extract details from product data
  const productImage = product.images?.[0]?.src || 'default_image_url';
  const productName = product.title || 'Product Name';
  const productPrice = product.variants?.[0]?.price / 100 || 0; // Price might be in cents, so divide by 100

  return (
    <div className="bg-[#593C8F] rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
      <img
        src={productImage}
        alt={productName}
        className="h-64 w-full object-cover"
      />
      <div className="p-5 text-center">
        <h3 className="text-2xl font-semibold text-[#FFD9CE] mb-2">
          {productName}
        </h3>
        <p className="text-xl font-medium text-[#8EF9F3] mb-4">
          ${productPrice.toFixed(2)}
        </p>
        <Link to={`/product/${product.id}`}>
          <button className="px-6 py-2 bg-[#DB5461] text-white font-semibold rounded-full hover:bg-[#171738] transition-all duration-300 transform hover:scale-110 mb-4">
            View Details
          </button>
        </Link>
        <button
          onClick={handleAddToCart}
          className="px-6 py-2 bg-[#8EF9F3] text-navy font-semibold rounded-full hover:bg-[#4b327a] transition-all duration-300 transform hover:scale-110"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
