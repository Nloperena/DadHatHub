import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';

const FailurePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-500 to-red-700 text-white">
      <div className="relative text-center">
        {/* Animated SVG */}
        <svg
          className="absolute -z-10 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#ffffff"
            fillOpacity="0.2"
            d="M0,192L120,208C240,224,480,256,720,245.3C960,235,1200,181,1320,154.7L1440,128V320H1320C1200,320,960,320,720,320C480,320,240,320,120,320H0Z"
          />
        </svg>

        <FaTimesCircle size={96} className="text-white drop-shadow-lg mb-6" />
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Oops!</h1>
        <p className="text-xl md:text-2xl max-w-lg mx-auto mb-8">
          Something went wrong. Please try again.
        </p>
        <a
          href="/"
          className="px-6 py-3 bg-white text-red-700 font-bold rounded-full shadow-lg hover:bg-red-100 transition duration-300"
        >
          Try Again
        </a>
      </div>
    </div>
  );
};

export default FailurePage;
