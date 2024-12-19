import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero'; // Import the standalone Hero component
import FeaturedProducts from '../components/FeaturedProducts';
import Testimonials from '../components/Testimonials';
import RelatedProducts from '../components/RelatedProducts';
import AboutSection from '../components/AboutSection';
import HatFeaturesSection from '../components/HatFeaturesSection';

const Home = () => {
  return (
    <section className="bg-navy text-white min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      
        <AboutSection />
      <HatFeaturesSection />

      {/* Featured Products Section */}
      
        <FeaturedProducts />
      

      {/* Customer Testimonials */}
      
    
     
    </section>
  );
};

export default Home;
