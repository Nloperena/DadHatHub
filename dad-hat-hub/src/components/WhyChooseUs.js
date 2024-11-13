// src/components/WhyChooseUs.js
import React from 'react';
import { FaCrown, FaHatCowboy, FaMoneyBillWave, FaSmile } from 'react-icons/fa';

const WhyChooseUs = () => {
  return (
    <section className="bg-pink text-navy py-16">
      <h2 className="text-4xl font-bold text-center mb-10">Why Choose Dad Hat Hub?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-10">
        
        <div className="flex flex-col items-center text-center">
          <FaCrown className="text-5xl text-purple mb-4" />
          <h3 className="text-2xl font-semibold mb-2">High-Quality Materials</h3>
          <p className="text-lg">Crafted from the finest fabrics for a comfortable and durable fit.</p>
        </div>
        
        <div className="flex flex-col items-center text-center">
          <FaHatCowboy className="text-5xl text-purple mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Wide Variety of Styles</h3>
          <p className="text-lg">Choose from a wide range of designs to fit every style.</p>
        </div>
        
        <div className="flex flex-col items-center text-center">
          <FaMoneyBillWave className="text-5xl text-purple mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Affordable Prices</h3>
          <p className="text-lg">Get high-quality hats without breaking the bank.</p>
        </div>
        
        <div className="flex flex-col items-center text-center">
          <FaSmile className="text-5xl text-purple mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Customer Satisfaction</h3>
          <p className="text-lg">We stand behind every hat we sell. 100% satisfaction guaranteed.</p>
        </div>
        
      </div>
    </section>
  );
};

export default WhyChooseUs;
