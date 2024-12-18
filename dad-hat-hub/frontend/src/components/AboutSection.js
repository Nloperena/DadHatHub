import React from 'react';
import { motion } from 'framer-motion';
import AboutImage from '../assets/dad-hats-about-image.png';

const AboutSection = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section className="relative py-12 px-4 sm:py-16 sm:px-8 overflow-hidden">
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

      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        style={{ zIndex: 1 }}
      ></div>

      <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-stretch z-10">
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
            Welcome to DadHatHub! I'm Nicholas, a UCF Coding Boot Camp
            graduate and a passionate creator with years of experience in design
            and web development. DadHatHub is my latest project, born out of
            my love for minimalist dad hats and a desire to create a space
            dedicated to cool, clean designs.
          </p>
          <p
            className="text-base sm:text-lg leading-relaxed mb-6"
            style={{ color: '#D0DDD7' }}
          >
            This website is a made-to-order business, meaning every hat is
            printed just for you after purchase. I wanted to challenge myself
            with building this platform while offering something unique—a
            catalog-style shop where simplicity meets personality. If you're like
            me and love subtle, stylish accessories that speak volumes without
            being loud, DadHatHub is your perfect fit.
          </p>
          <div className="text-left">
            <a
              href="https://NicoLoperena.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-bold rounded-full shadow-lg transition-all duration-300"
              style={{
                backgroundColor: '#D0DDD7',
                color: '#1C1C1B',
                border: '2px solid #D0DDD7',
                padding: '0.75rem 2rem',
                textDecoration: 'none',
              }}
            >
              Visit NicoLoperena.com
            </a>
          </div>
        </motion.div>

        <motion.div
          className="md:w-1/2 w-full p-6 flex justify-center md:justify-end items-center"
          initial="hidden"
          animate="visible"
          variants={imageVariants}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          <img
            src="https://nicoloperena.com/static/media/graduationphoto.4c05c5ccb38491fc7115.jpg"
            alt="Dad Hat Display"
            className="rounded-lg shadow-lg w-full h-auto object-cover max-w-sm"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
