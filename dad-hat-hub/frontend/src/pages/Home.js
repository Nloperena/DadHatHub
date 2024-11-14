import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero'; // Import the standalone Hero component
import FeaturedProducts from '../components/FeaturedProducts';
import Testimonials from '../components/Testimonials';
import RelatedProducts from '../components/RelatedProducts';
import AboutSection from '../components/AboutSection';

const Home = () => {
  return (
    <section className="bg-navy text-white min-h-screen">
      {/* Hero Section */}
      <Hero />

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
      <section className="bg-purple-900">
        <RelatedProducts />
      </section>
    </section>
  );
};

export default Home;
