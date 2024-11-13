// src/components/AboutUs.js
import React from 'react';
import AboutImage from '../assets/dad-hats-about-image.png'

const AboutSection = () => {
  return (
    // Inside the AboutUs component, add an image next to the text content.
<section className="bg-pink text-navy py-16 px-8">
  <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center">
    <div className="lg:w-1/2 mb-6 lg:mb-0">
      <img src={AboutImage} alt="Our Story" className="rounded-lg shadow-lg" />
    </div>
    <div className="lg:w-1/2 text-center lg:text-left lg:ml-8">
      <h2 className="text-4xl font-bold mb-6">About Us</h2>
      <p className="text-xl leading-relaxed mb-6">
        At Dad Hat Hub, we’re all about bringing style and comfort together. We believe that a dad hat is more than just an accessory – it’s a statement of personality, comfort, and effortless style. Our hats are designed with high-quality materials, ensuring that every hat you wear is made to last.
      </p>
      <p className="text-xl leading-relaxed">
        Founded with a love for simple, timeless fashion, Dad Hat Hub is dedicated to providing you with a variety of styles to match your unique taste. Whether you’re going for a casual look or something a bit more refined, we’ve got the perfect hat for every occasion.
      </p>
    </div>
  </div>
</section>

  );
};

export default AboutSection;
