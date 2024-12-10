import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [randomProduct, setRandomProduct] = useState(null);

  useEffect(() => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    console.log('API_BASE_URL:', API_BASE_URL);

    fetch(`${API_BASE_URL}/api/products`)
      .then((response) => {
        console.log('Raw Response:', response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched Data:', data);
        if (data.products && data.products.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.products.length);
          const product = data.products[randomIndex];
          setRandomProduct(product);
        }
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <section
      className="relative overflow-hidden text-textcolor py-16 md:py-32 flex flex-col md:flex-row items-center"
      style={{
        // Flipped gradient: top darker, bottom lighter
        background: 'linear-gradient(to top, #D0DDD7 0%, #A5AE9E 100%)'
      }}
    >
      {/* Static wave on top of the gradient background */}
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

      {/* Content */}
      <div className="flex-1 text-center md:text-left px-6 relative z-10">
        <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-primary">
          Discover the World of <span className="text-accent">Dad Hats</span>
        </h2>
        <p className="text-lg md:text-xl max-w-3xl mb-8 md:mb-12">
          Simple, stylish, and crafted just for you. Find the perfect hat to complete your look.
        </p>
        <a
          href="/shop"
          className="inline-block px-8 py-3 md:px-12 md:py-4 text-textcolor border-2 border-primary font-bold rounded-full shadow-lg bg-secondary hover:bg-primary hover:text-background transition-all duration-300"
        >
          Shop Now
        </a>
      </div>

      {randomProduct && (
        <div className="flex-1 flex justify-center mt-12 md:mt-0 relative z-10">
          <img
            src={randomProduct.thumbnail_url}
            alt={randomProduct.name}
            className="max-w-full h-auto object-contain rounded-lg shadow-lg"
          />
        </div>
      )}

      
    </section>
  );
};

export default Hero;
