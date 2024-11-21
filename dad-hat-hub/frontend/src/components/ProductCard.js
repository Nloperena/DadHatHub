// src/components/ProductCard.js
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

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      thumbnail_url: product.thumbnail_url,
      variant_id: product.variant_id,
      quantity: 1,
    });
  };

  return (
    <div className="group relative bg-background rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Product Image */}
      <Link to={`/product/${product.id}`}>
        <img
          src={product.thumbnail_url || 'https://via.placeholder.com/150'}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
      </Link>

      {/* Overlay with Product Details */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="p-4">
          <h3 className="text-xl font-bold text-textcolor">{product.name}</h3>
          <p className="text-lg text-textcolor">
            ${product.price ? (product.price / 100).toFixed(2) : 'Price Unavailable'}
          </p>
          <button
            onClick={handleAddToCart}
            className="mt-4 bg-primary text-textcolor px-4 py-2 rounded-full hover:bg-secondary transition-colors duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
