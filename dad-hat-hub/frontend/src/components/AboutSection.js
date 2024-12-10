// src/components/AboutUs.js
import React from 'react';
import AboutImage from '../assets/dad-hats-about-image.png';

const AboutSection = () => {
  return (
    <section 
      className="py-12 px-4 sm:py-16 sm:px-8"
      style={{
        background: '#7E846B', // Reseda green background
        color: '#D0DDD7',     // Platinum text
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
        {/* Image Section */}
        <div className="md:w-1/2 w-full mb-8 md:mb-0 relative">
          <img
            src={AboutImage}
            alt="Our Story"
            className="w-full h-auto object-cover rounded-lg"
            style={{
              // Keeping the image with previous styling (no mention to remove this shadow)
              // If you also want to remove image shadow, remove the filter line below.
              filter: 'drop-shadow(10px 10px 0 #000)',
            }}
          />
        </div>
        {/* Text Content */}
        <div className="md:w-1/2 w-full text-center md:text-left md:pl-12">
          <h2 
            className="text-5xl sm:text-6xl font-bold mb-6"
            style={{
              // Removed text shadow from the headline
            }}
          >
            About Us
          </h2>
          <p className="text-base sm:text-lg leading-relaxed mb-6">
            At Dad Hat Hub, we’re all about bringing style and comfort together.
            We believe that a dad hat is more than just an accessory – it’s a
            statement of personality, comfort, and effortless style. Our hats
            are designed with high-quality materials, ensuring that every hat
            you wear is made to last.
          </p>
          <p className="text-base sm:text-lg leading-relaxed">
            Founded with a love for simple, timeless fashion, Dad Hat Hub is
            dedicated to providing you with a variety of styles to match your
            unique taste. Whether you’re going for a casual look or something a
            bit more refined, we’ve got the perfect hat for every occasion.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
  