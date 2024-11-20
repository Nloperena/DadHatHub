import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import Carousel from '../components/Carousel';

const ProductPage = () => {
  const { productId } = useParams(); // Product ID from route params
  const [product, setProduct] = useState(null); // Product data
  const [quantity, setQuantity] = useState(1); // Quantity selector
  const { addToCart } = useCart(); // Access cart context

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
        console.log("Fetched Product Data:", response.data);

        if (response.data.result) {
          setProduct(response.data.result); // Set product data
        } else {
          console.error('Product data not found in response.');
          setProduct(null); // Graceful fallback
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setProduct(null); // Graceful fallback on error
      }
    };

    fetchProduct();
  }, [productId]);

  // Handle case when product is null
  if (product === null) {
    return (
      <section className="bg-navy min-h-screen p-8 text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-cyan-500">Product Not Found</h1>
          <p className="text-lg text-gray-200 mt-4">
            We couldn't find the product you're looking for. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  // Handle case when product is still loading
  if (!product) {
    return <p className="text-center">Loading product...</p>;
  }

  // Safely access product details
  const productImage =
    product.sync_variants?.[0]?.product?.image ||
    product.thumbnail_url ||
    'https://via.placeholder.com/150';
  const productName = product.name || 'Product Name';
  const productDescription =
    product.sync_variants?.[0]?.product?.name || 'No description available';
  const productPrice =
    product.sync_variants?.[0]?.retail_price
      ? parseFloat(product.sync_variants[0].retail_price).toFixed(2)
      : '0.00';

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setQuantity(value);
  };

  const handleAddToCart = () => {
    if (!product.sync_variants || product.sync_variants.length === 0) {
      alert('Product variant not available.');
      return;
    }

    const variant = product.sync_variants[0]; // Select the first variant as default
    const productToAdd = {
      id: variant.id, // Use the variant ID for the cart item
      name: productName,
      image: productImage,
      price: parseFloat(productPrice), // Ensure price is a number
      quantity,
    };

    addToCart(productToAdd); // Add product to cart
  };

  return (
    <section className="bg-navy min-h-screen p-8 text-white">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start gap-8">
        <div className="w-full md:w-1/2 space-y-4">
          <Carousel images={product.sync_variants?.[0]?.files.map((file) => file.preview_url) || [productImage]} />
        </div>

        <div className="md:w-1/2 bg-purple-800 p-8 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-cyan-500 mb-4">{productName}</h1>
          <p className="text-2xl font-semibold text-cyan-300 mb-6">${productPrice}</p>
          <p className="text-lg text-gray-200 leading-relaxed mb-8">{productDescription}</p>

          <div className="mb-4 flex items-center space-x-4">
            <label htmlFor="quantity" className="text-lg font-medium text-white">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-16 p-2 border border-cyan-500 rounded-lg text-center text-navy focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

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
