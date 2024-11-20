import React, { useEffect, useState, useRef } from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const footerRef = useRef(null);
  const [isAnchored, setIsAnchored] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAnchored(entry.isIntersecting); // Update state when footer is in view
      },
      { threshold: 1.0 } // Trigger when fully visible
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) observer.unobserve(footerRef.current);
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className={`bg-navy text-white py-10 px-8 ${
        isAnchored ? 'fixed bottom-0 left-0 w-full' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Quick Links */}
        <div className="mb-6 md:mb-0">
          <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-cyan">Home</a></li>
            <li><a href="/shop" className="hover:text-cyan">Shop</a></li>
            <li><a href="/about" className="hover:text-cyan">About</a></li>
            <li><a href="/contact" className="hover:text-cyan">Contact</a></li>
          </ul>
        </div>

        {/* Social Media Icons */}
        <div className="mb-6 md:mb-0 text-center">
          <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4 justify-center">
            <a href="https://facebook.com" className="hover:text-cyan"><FaFacebook className="text-2xl" /></a>
            <a href="https://twitter.com" className="hover:text-cyan"><FaTwitter className="text-2xl" /></a>
            <a href="https://instagram.com" className="hover:text-cyan"><FaInstagram className="text-2xl" /></a>
          </div>
        </div>

        {/* Policies and Contact */}
        <div className="text-center">
          <h4 className="text-xl font-semibold mb-4">Legal</h4>
          <ul className="space-y-2">
            <li><a href="/privacy-policy" className="hover:text-cyan">Privacy Policy</a></li>
            <li><a href="/terms-of-service" className="hover:text-cyan">Terms of Service</a></li>
          </ul>
        </div>
      </div>

      <p className="text-center text-sm mt-10">
        &copy; {new Date().getFullYear()} Dad Hat Hub. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
