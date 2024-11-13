// src/components/Hero.js
import React from 'react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-purple to-pink text-center py-24 text-white flex flex-col items-center">
      <h2 className="text-5xl font-extrabold mb-4">Welcome to Dad Hat Hub</h2>
      <p className="text-xl max-w-2xl mb-10">
        Discover the best dad hats around. Simple, stylish, and crafted just for you.
      </p>
      <a href="/shop" className="px-10 py-4 bg-cyan text-navy font-semibold rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105">
        Shop Now
      </a>
    </section>
  );
};

export default Hero;
