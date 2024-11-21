import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!product.variant_id) {
      alert('Product variant_id is not available');
      return;
    }

    // Add the product to the cart with all necessary details
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      thumbnail_url: product.thumbnail_url, // Ensure this is included
      variant_id: product.variant_id,
      quantity: 1,
    });
  };

  return (
    <div className="bg-gradient-to-b from-[#171738] to-[#593C8F] rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105 p-4">
      <div className="relative w-full h-48 flex items-center justify-center overflow-hidden rounded-lg bg-[#FFFFFF10]">
        <img
          src={product.thumbnail_url || 'https://via.placeholder.com/150'}
          alt={product.name}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="mt-4 text-center">
        <h3 className="text-xl font-bold text-[#FFD9CE]">{product.name}</h3>
        <p className="text-lg text-[#8EF9F3] mt-2">
          ${product.price ? (product.price / 100).toFixed(2) : 'Price Unavailable'}
        </p>
      </div>
      <div className="flex justify-center mt-6 space-x-4">
        <Link to={`/product/${product.id}`}>
          <button className="bg-[#DB5461] text-white px-4 py-2 rounded-full hover:bg-[#FFD9CE] hover:text-[#593C8F] transition duration-300">
            View Details
          </button>
        </Link>
        <button
          onClick={handleAddToCart}
          className="bg-[#8EF9F3] text-[#171738] px-4 py-2 rounded-full hover:bg-[#FFD9CE] hover:text-[#593C8F] transition duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
