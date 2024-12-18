// src/components/AboutUs.js
import React from 'react';
import { motion } from 'framer-motion';
import AboutImage from '../assets/dad-hats-about-image.png';

const AboutSection = () => {
  // Framer Motion Variants for subtle animations
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section className="relative py-12 px-4 sm:py-16 sm:px-8 overflow-hidden">
      {/* Blurred background with the hat image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${AboutImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px)',
          transform: 'scale(1.1)',
          zIndex: 0,
        }}
      ></div>

      {/* Dark translucent overlay on top of blurred image */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        style={{ zIndex: 1 }}
      ></div>

      {/* Container with text on the left and image on the right */}
      <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-stretch z-10">
        
        {/* Left Column: Text Content with subtle animation */}
        <motion.div
          className="md:w-1/2 w-full p-6 flex flex-col justify-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2
            className="text-5xl sm:text-6xl font-bold mb-6"
            style={{ color: '#D0DDD7' }}
          >
            About Us
          </h2>
          <p
            className="text-base sm:text-lg leading-relaxed mb-6"
            style={{ color: '#D0DDD7' }}
          >
            I graduated from UCF's Coding Boot Camp in 2019. Since then, I've worked to
            create a store that fulfills a simple need: a central place to find minimalistic
            dad hats. I love these hats because they quietly say a lot without being
            over-the-top. If you appreciate a simple, clean look with a subtle touch
            of personality, then DadHatHub was made for us.
          </p>
          <p
            className="text-base sm:text-lg leading-relaxed mb-6"
            style={{ color: '#D0DDD7' }}
          >
            My goal is to make this a place where you can find just about any design
            you can think of, all on a comfortable dad hat. Each hat tells your story
            without needing to shout it.
          </p>

          {/* Wrap the button in a div to prevent full-width stretching and left-align it */}
          <div className="text-left">
            <a
              href="https://NicoLoperena.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-bold rounded-full shadow-lg transition-all duration-300"
              style={{
                backgroundColor: '#D0DDD7', // Platinum background
                color: '#1C1C1B',           // Dark text for contrast
                border: '2px solid #D0DDD7',
                padding: '0.75rem 2rem',
                textDecoration: 'none',
              }}
            >
              Visit NicoLoperena.com
            </a>
          </div>
        </motion.div>

        {/* Right Column: Animate the image in */}
        <motion.div
          className="md:w-1/2 w-full p-6 flex justify-center md:justify-end items-center"
          initial="hidden"
          animate="visible"
          variants={imageVariants}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          <img
            src="https://nicoloperena.com/static/media/graduationphoto.4c05c5ccb38491fc7115.jpg"
            alt="Graduation Photo"
            className="rounded-lg shadow-lg w-full h-auto object-cover max-w-sm"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
