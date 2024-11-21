import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [randomProduct, setRandomProduct] = useState(null);

  useEffect(() => {
    // Fetch products from your API
    fetch('http://localhost:5000/api/products')
      .then((response) => response.json())
      .then((data) => {
        if (data.products && data.products.length > 0) {
          // Pick a random product
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
    <section className="relative overflow-hidden text-textcolor py-16 md:py-32 flex flex-col md:flex-row items-center bg-background">
      {/* Wave Background */}
      {/* ... SVG code with updated gradient colors ... */}

      {/* Content */}
      <div className="flex-1 text-center md:text-left px-6">
        <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-primary">
          Discover the World of <span className="text-accent">Dad Hats</span>
        </h2>
        <p className="text-lg md:text-xl max-w-3xl mb-8 md:mb-12">
          Simple, stylish, and crafted just for you. Find the perfect hat to complete your look.
        </p>

        {/* Button with Custom Styles */}
        <a
          href="/shop"
          className="inline-block px-8 py-3 md:px-12 md:py-4 text-textcolor border-2 border-primary font-bold rounded-full shadow-lg bg-secondary hover:bg-primary hover:text-background transition-all duration-300"
        >
          Shop Now
        </a>
      </div>

      {/* Image of Random Product */}
      {randomProduct && (
        <div className="flex-1 flex justify-center mt-12 md:mt-0">
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
