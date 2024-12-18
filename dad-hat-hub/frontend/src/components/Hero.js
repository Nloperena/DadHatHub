// src/components/Hero.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const [products, setProducts] = useState([]);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  useEffect(() => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    console.log("API Base URL:", API_BASE_URL);

    fetch(`${API_BASE_URL}/api/products`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.products && data.products.length > 0) {
          setProducts(data.products);
        }
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handlePrevProduct = () => {
    setCurrentProductIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const handleNextProduct = () => {
    setCurrentProductIndex((prev) => (prev + 1) % products.length);
  };

  const currentProduct = products[currentProductIndex];

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1] // Cubic-bezier for smooth easing
      }
    }
  };

  const productVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.2
      }
    }
  };

  return (
    <section
      className="relative overflow-hidden py-16 md:py-32 flex flex-col md:flex-row items-center"
      style={{
        backgroundColor: '#7E846B', 
        color: '#D0DDD7', 
      }}
    >
      {/* Decorative wave in the background */}
      <div className="absolute inset-0 overflow-hidden z-0 wave-container">
        <svg
          className="w-full h-full wave-animation"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#594E36"
            d="M0,192L40,186.7C80,181,160,171,240,176C320,181,400,203,480,186.7C560,171,640,117,720,117.3C800,117,880,171,960,192C1040,213,1120,203,1200,192C1280,181,1360,171,1400,165.3L1440,160L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
          ></path>
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center">
        {/* Text content about hats */}
        <motion.div
          className="flex-1 text-center md:text-left px-6 mb-12 md:mb-0"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div
            className="relative rounded-lg p-6 inline-block max-w-3xl"
            style={{
              backgroundColor: 'rgba(0,0,0,0.4)',
            }}
          >
            <h2
              className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight"
              style={{ color: '#D0DDD7' }}
            >
              Discover the World of{' '}
              <span style={{ color: '#D0DDD7', textDecoration: 'underline' }}>
                Dad Hats
              </span>
            </h2>
            <p
              className="text-lg md:text-xl mb-8"
              style={{ color: '#D0DDD7' }}
            >
              Simple, stylish, and crafted just for you. Find the perfect hat to complete your look.
            </p>
            <a
              href="/shop"
              className="inline-block px-8 py-3 md:px-12 md:py-4 font-bold rounded-full shadow-lg transition-all duration-300"
              style={{
                backgroundColor: '#D0DDD7',
                color: '#1C1C1B',
                border: '2px solid #D0DDD7', 
              }}
            >
              Shop Now
            </a>
          </div>
        </motion.div>

        {/* Product viewer area */}
        {currentProduct && (
          <motion.div
            className="flex-1 flex flex-col items-center relative"
            initial="hidden"
            animate="visible"
            variants={productVariants}
          >
            <div className="relative group w-full max-w-md">
              {/* Previous Product Button */}
              <button
                onClick={handlePrevProduct}
                className="absolute -left-10 top-1/2 transform -translate-y-1/2 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-all duration-300"
              >
                &#8249;
              </button>
              {/* Next Product Button */}
              <button
                onClick={handleNextProduct}
                className="absolute -right-10 top-1/2 transform -translate-y-1/2 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-all duration-300"
              >
                &#8250;
              </button>

              {/* Product image */}
              <div className="relative overflow-hidden rounded-lg shadow-lg group transition-all duration-500 ease-in-out">
                <img
                  src={currentProduct.thumbnail_url || 'https://via.placeholder.com/300'}
                  alt={currentProduct.name}
                  className="max-w-full h-auto object-contain"
                />
                <div
                  className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out"
                >
                  <div
                    className="text-center p-4 rounded-lg shadow-lg"
                    style={{
                      backgroundColor: 'rgba(208,221,215,0.9)', 
                      color: '#1C1C1B', 
                    }}
                  >
                    <h3 className="text-lg font-bold mb-2">{currentProduct.name}</h3>
                    <p className="text-xl font-semibold mb-4">
                      ${(currentProduct.price / 100).toFixed(2)}
                    </p>
                    <a
                      href={`/product/${currentProduct.id}`}
                      className="px-8 py-3 font-bold rounded-full shadow-lg transition-all duration-300"
                      style={{
                        backgroundColor: '#7E846B',
                        color: '#D0DDD7',
                      }}
                    >
                      View Product
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <style>
        {`
          .group:hover .text-center {
            transform: translateY(-30px);
          }
        `}
      </style>
    </section>
  );
};

export default Hero;
