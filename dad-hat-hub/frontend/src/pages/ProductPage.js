import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import Carousel from '../components/Carousel';

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
        console.log("Product Data:", response.data); // Log to inspect the response structure
        setProduct(response.data.result); // Assuming `result` holds the main product data
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  // Show loading message if the product data hasn't loaded yet
  if (!product) return <p className="text-center">Loading product...</p>;

  // Access product details from `sync_product` and pricing from the first variant in `sync_variants`
  const productImage = product.sync_product?.thumbnail_url || 'default_image_url';
  const productName = product.sync_product?.name || 'Product Name';
  const productDescription = product.sync_product?.description || 'No description available';
  const productPrice = product.sync_variants?.[0]?.price ? (product.sync_variants[0].price / 100).toFixed(2) : '0.00';

  const handleQuantityChange = (e) => {
    setQuantity(Math.max(1, parseInt(e.target.value) || 1));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <section className="bg-navy min-h-screen p-8 text-white">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start gap-8">
        <div className="w-full md:w-1/2 space-y-4">
          {/* Pass the product image to Carousel as an array */}
          <Carousel images={productImage ? [productImage] : []} />
        </div>

        <div className="md:w-1/2 bg-purple-800 p-8 rounded-lg shadow-md">
          {/* Display product name */}
          <h1 className="text-4xl font-bold text-cyan-500 mb-4">{productName}</h1>
          
          {/* Display product price */}
          <p className="text-2xl font-semibold text-cyan-300 mb-6">
            ${productPrice}
          </p>
          
          {/* Display product description */}
          <p className="text-lg text-gray-200 leading-relaxed mb-8">{productDescription}</p>

          {/* Quantity selector */}
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

          {/* Add to Cart button */}
          <button
            onClick={handleAddToCart}
            className="px-8 py-3 bg-cyan-500 text-navy font-semibold rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
