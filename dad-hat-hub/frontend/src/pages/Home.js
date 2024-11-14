// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import FeaturedProducts from '../components/FeaturedProducts';
import Testimonials from '../components/Testimonials';
import RelatedProducts from '../components/RelatedProducts';
import AboutSection from '../components/AboutSection';

const Home = () => {
  return (
    <section className="bg-navy text-white min-h-screen">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-purple-800">
        <h1 className="text-5xl font-bold mb-4">Welcome to Dad Hat Hub</h1>
        <p className="text-lg mb-6">Discover the best dad hats around. Simple, stylish, and made just for you.</p>
        <Link to="/shop" className="px-8 py-3 bg-cyan-500 text-navy font-semibold rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105">
          Shop Now
        </Link>
      </div>

    {/* About Section */}
    <section className="py-16 px-8 bg-purple-900 text-gray-200">
        <AboutSection />
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-8">
        <FeaturedProducts />
      </section>

      

      {/* Customer Testimonials */}
      <section className="py-16 px-8">
        <Testimonials />
      </section>

      {/* Related Products Section */}
      <section className=" bg-purple-900">
        <RelatedProducts />
      </section>
    </section>
  );
};

export default Home;
