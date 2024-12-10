import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  // If variants aren't provided, fall back to a single default variant
  const variants = product.variants && product.variants.length > 0 
    ? product.variants 
    : [{ 
        variant_id: product.variant_id || 'default', 
        name: product.name, 
        price: product.price, 
        thumbnail_url: product.thumbnail_url 
      }];

  const [currentVariantIndex, setCurrentVariantIndex] = useState(0);

  useEffect(() => {
    // Reset to first variant if product changes
    setCurrentVariantIndex(0);
  }, [product]);

  const currentVariant = variants[currentVariantIndex];

  const handleAddToCart = () => {
    if (!currentVariant.variant_id) {
      alert('Product variant_id is not available');
      return;
    }

    addToCart({
      id: product.id,
      name: currentVariant.name,
      price: currentVariant.price,
      thumbnail_url: currentVariant.thumbnail_url,
      variant_id: currentVariant.variant_id,
      quantity: 1,
    });
  };

  const handlePrevVariant = (e) => {
    e.stopPropagation();
    setCurrentVariantIndex((prev) => 
      prev === 0 ? variants.length - 1 : prev - 1
    );
  };

  const handleNextVariant = (e) => {
    e.stopPropagation();
    setCurrentVariantIndex((prev) =>
      (prev + 1) % variants.length
    );
  };

  return (
    <div
      className="relative w-full bg-white border border-black rounded-lg p-4 transition-transform duration-300 hover:scale-105 hover:-rotate-1"
      style={{ transformOrigin: 'center center' }}
    >
      <div className="relative w-full flex items-center justify-center mb-4">
        {/* If multiple variants, show arrows */}
        {variants.length > 1 && (
          <>
            <button
              onClick={handlePrevVariant}
              className="absolute left-0 px-2 py-1 bg-black text-white font-bold rounded-l"
            >
              &larr;
            </button>
            <button
              onClick={handleNextVariant}
              className="absolute right-0 px-2 py-1 bg-black text-white font-bold rounded-r"
            >
              &rarr;
            </button>
          </>
        )}

        {/* Product Image */}
        <Link to={`/product/${product.id}`} className="block">
          <img
            src={currentVariant.thumbnail_url || 'https://via.placeholder.com/150'}
            alt={currentVariant.name}
            className="w-full h-auto object-contain max-h-64"
            style={{ maxHeight: '16rem' }} // Ensures a consistent image height area
          />
        </Link>
      </div>

      {/* Product Info */}
      <h3 className="text-lg font-semibold text-black mb-2">
        {currentVariant.name}
      </h3>
      <p className="text-base text-black mb-4">
        {currentVariant.price ? `$${(currentVariant.price / 100).toFixed(2)}` : 'Price Unavailable'}
      </p>

      {/* Actions */}
      <div className="flex space-x-2">
        <button
          onClick={handleAddToCart}
          className="px-3 py-1 border border-black bg-white font-semibold hover:bg-black hover:text-white transition-colors duration-300"
        >
          Add to Cart
        </button>
        <Link
          to={`/product/${product.id}`}
          className="px-3 py-1 border border-black bg-white font-semibold hover:bg-black hover:text-white transition-colors duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
