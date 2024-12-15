import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Footer() {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const generateStars = (count) =>
    Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 2,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.4 + 0.6,
      delay: Math.random() * 2,
    }));

  const stars = generateStars(50);

  return (
    <footer className="bg-[#2F2504] text-[#D0DDD7] py-12 relative overflow-hidden">
      {/* Footer Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 text-center lg:text-left">
        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="/"
                className="hover:text-white transition duration-300 hover:underline"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/shop"
                className="hover:text-white transition duration-300 hover:underline"
              >
                Shop
              </a>
            </li>
          </ul>
        </div>

        {/* About Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">About Dad Hat Hub</h3>
          <p>
            Dad Hat Hub is about timeless style and simplicity. Our hats are
            made for everyone. Designed by a solo designer with a passion for
            clean, accessible fashion.
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 text-center relative">
        <div className="text-sm mb-4">
          © {new Date().getFullYear()} Dad Hat Hub. Designed by Nico Loperena.
        </div>

        {/* Love This Website Button */}
        <motion.div
          className="relative bg-[#593C8F] text-white text-sm font-bold rounded-full px-6 py-3 mx-auto shadow-lg cursor-pointer hover:bg-[#8EF9F3] transition-all duration-300 w-max"
          onClick={togglePopup}
        >
          Love this website?
        </motion.div>
      </div>

      {/* Twinkling Stars */}
      {stars.map((star) => (
        <motion.div
          key={`star-${star.id}`}
          className="absolute"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
          }}
          animate={{
            opacity: [0, star.opacity, 0],
            scale: [0.7, 1.1, 0.7],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.5,
            delay: star.delay,
          }}
        >
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="50" fill="#fff" />
          </svg>
        </motion.div>
      ))}

      {/* Modal Popup */}
      <AnimatePresence>
        {showPopup && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-[#2F2504] text-[#D0DDD7] border border-gray-700 rounded-lg p-6 w-72 sm:w-96 shadow-lg relative"
                initial={{ y: 300, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 300, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={togglePopup}
                  className="absolute top-2 right-2 text-gray-300 hover:text-white"
                >
                  Close
                </button>
                <h4 className="text-xl font-bold mb-2">Hi, I’m Nico!</h4>
                <p className="text-sm mb-4">
                  I design websites, e-commerce stores, and apps with a passion
                  for creativity and minimalism. Partner with me to bring your
                  vision to life.
                </p>
                <a
                  href="https://nicoloperena.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-[#593C8F] text-white text-center py-2 rounded-md hover:bg-[#8EF9F3] transition-all duration-300"
                >
                  Visit My Website
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </footer>
  );
}

export default Footer;
