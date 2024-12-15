import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [products, setProducts] = useState([]);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  useEffect(() => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

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

  return (
    <section
      className="relative overflow-hidden text-textcolor py-16 md:py-32 flex flex-col md:flex-row items-center"
      style={{
        background: 'linear-gradient(to top, #D0DDD7 0%, #A5AE9E 100%)',
      }}
    >
      {/* Static wave on top */}
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

      {/* Content Container */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center">
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left px-6">
          <div className="relative bg-black bg-opacity-50 rounded-lg p-6 inline-block max-w-3xl">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-white">
              Discover the World of <span className="text-accent">Dad Hats</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              Simple, stylish, and crafted just for you. Find the perfect hat to complete your look.
            </p>
            <a
              href="/shop"
              className="inline-block px-8 py-3 md:px-12 md:py-4 text-white border-2 border-primary font-bold rounded-full shadow-lg bg-secondary hover:bg-primary hover:text-background transition-all duration-300"
            >
              Shop Now
            </a>
          </div>
        </div>

        {/* Product Viewer */}
        {currentProduct && (
          <div className="flex-1 flex flex-col items-center mt-12 md:mt-0 relative">
            <div className="relative group w-full max-w-md">
              {/* Arrows */}
              <button
                onClick={handlePrevProduct}
                className="absolute -left-10 top-1/2 transform -translate-y-1/2 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-all duration-300"
              >
                &#8249; {/* Left arrow */}
              </button>
              <button
                onClick={handleNextProduct}
                className="absolute -right-10 top-1/2 transform -translate-y-1/2 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-all duration-300"
              >
                &#8250; {/* Right arrow */}
              </button>

              {/* Product Image with Overlay */}
              <div className="relative overflow-hidden rounded-lg shadow-lg group transition-all duration-500 ease-in-out">
                <img
                  src={currentProduct.thumbnail_url || 'https://via.placeholder.com/300'}
                  alt={currentProduct.name}
                  className="max-w-full h-auto object-contain"
                />
                <div
                  className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out"
                >
                  {/* Button and Name/Price */}
                  <div className="text-center p-4 bg-white bg-opacity-90 rounded-lg shadow-lg">
                    <h3 className="text-lg font-bold text-[#2F2504] mb-2">{currentProduct.name}</h3>
                    <p className="text-xl font-semibold text-[#2F2504] mb-4">
                      ${(currentProduct.price / 100).toFixed(2)}
                    </p>
                    <a
                      href={`/product/${currentProduct.id}`}
                      className="px-8 py-3 text-white bg-primary font-bold rounded-full shadow-lg hover:bg-accent transition-all duration-300"
                    >
                      View Product
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Animations */}
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
