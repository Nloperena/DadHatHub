import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const { addToCart } = useCart();

  // Map variant names to colors
  const variantColors = {
    Black: '#000000',
    Navy: '#001F54',
    Cranberry: '#B22222',
    Spruce: '#2E8B57',
    'Dark Grey': '#A9A9A9',
    'Green Camo': '#556B2F',
    Khaki: '#F0E68C',
    Stone: '#D3D3D3',
    Pink: '#FFC0CB',
    'Light Blue': '#ADD8E6',
    White: '#FFFFFF',
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Use environment variable for backend URL
      console.log(`Fetching product with ID: ${id}`);
      try {
        const response = await fetch(`${API_BASE_URL}/api/products/${id}`);
        const data = await response.json();

        console.log('Fetched product data:', data);

        setProduct(data);

        if (data.variants && data.variants.length > 0) {
          console.log('Default Variant:', data.variants[0]);
          setSelectedVariant(data.variants[0]);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleVariantChange = (variant) => {
    console.log('Selected Variant:', variant);
    setSelectedVariant(variant); // Update the selected variant and image
  };

  const handleAddToCart = () => {
    if (!selectedVariant) {
      alert('No variant selected.');
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      variant: selectedVariant.name.split(' / ')[1], // Only the color
      price: selectedVariant.price,
      thumbnail_url: selectedVariant.thumbnail_url || product.thumbnail_url,
      variant_id: selectedVariant.id,
      quantity: 1,
    });

    console.log('Added to Cart:', {
      id: product.id,
      name: product.name,
      variant: selectedVariant.name.split(' / ')[1],
      price: selectedVariant.price,
      thumbnail_url: selectedVariant.thumbnail_url || product.thumbnail_url,
      variant_id: selectedVariant.id,
    });
  };

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-background text-textcolor rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row">
        {/* Product Image */}
        <img
          src={selectedVariant?.thumbnail_url || product.thumbnail_url || 'https://via.placeholder.com/300'}
          alt={product.name}
          className="w-full md:w-1/2 rounded-lg object-cover shadow-md"
        />

        {/* Product Details */}
        <div className="flex flex-col p-4">
          <h1 className="text-4xl font-bold text-primary mb-4">{product.name}</h1> {/* Product name */}
          <p className="text-lg text-secondary mb-4">{product.description}</p>
          <p className="text-2xl font-semibold mb-6">
            ${selectedVariant ? (selectedVariant.price / 100).toFixed(2) : 'Price Unavailable'}
          </p>

          {/* Variant Selector */}
          <div className="variant-selector mb-6">
            <h3 className="text-lg font-semibold mb-2">Choose Variant:</h3>
            <div className="flex flex-wrap gap-3">
              {product.variants.map((variant) => {
                const colorName = variant.name.split(' / ')[1]; // Extract the color name
                const backgroundColor = variantColors[colorName] || '#CCCCCC'; // Fallback color

                return (
                  <button
                    key={variant.id}
                    className={`p-2 border-2 rounded-lg ${
                      selectedVariant?.id === variant.id ? 'border-primary' : 'border-secondary'
                    }`}
                    style={{
                      backgroundColor: selectedVariant?.id === variant.id ? backgroundColor : '#F8F9FA', // Default background when not selected
                      color: selectedVariant?.id === variant.id ? '#FFFFFF' : '#000000', // White text when selected
                    }}
                    onClick={() => handleVariantChange(variant)}
                  >
                    {colorName}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className={`mt-6 px-6 py-3 rounded-lg text-white ${
              selectedVariant ? 'bg-primary hover:bg-secondary' : 'bg-gray-500 cursor-not-allowed'
            }`}
            disabled={!selectedVariant}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
