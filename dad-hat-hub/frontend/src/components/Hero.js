import React from 'react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden text-white py-32 flex flex-col items-center text-center">
      
      {/* Wave Background */}
      <div className="absolute inset-0 -z-10">
        <svg
          className="absolute top-0 left-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="url(#gradient)"
            d="M0,160L80,149.3C160,139,320,117,480,101.3C640,85,800,75,960,69.3C1120,64,1280,64,1360,64L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          ></path>
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#593C8F', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#DB5461', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#FFD9CE', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Content */}
      <h2 className="text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg">
        Discover the World of <span className="text-cyan-300">Dad Hats</span>
      </h2>
      <p className="text-xl max-w-3xl mb-12 drop-shadow">
        Simple, stylish, and crafted just for you. Find the perfect hat to complete your look.
      </p>

      {/* Button with White Outline and Text */}
      <a
        href="/shop"
        className="px-12 py-4 text-white border-2 border-white font-bold rounded-full shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-110"
      >
        Shop Now
      </a>
    </section>
  );
};

export default Hero;
