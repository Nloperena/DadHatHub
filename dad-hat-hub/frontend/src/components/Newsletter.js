// src/components/Newsletter.js
import React from 'react';

const Newsletter = () => {
  return (
    <section className="bg-purple text-white py-16 px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Stay in the Loop</h2>
        <p className="text-lg mb-8">
          Join our newsletter to receive exclusive deals, style tips, and product updates!
        </p>
        <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-auto px-4 py-3 rounded-lg text-navy focus:outline-none focus:ring-2 focus:ring-cyan"
          />
          <button
            type="submit"
            className="px-8 py-3 bg-cyan text-navy font-semibold rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
