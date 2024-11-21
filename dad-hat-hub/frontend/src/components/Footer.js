// src/components/Footer.js
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-primary text-textcolor py-10 px-8 mt-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start">
        {/* Quick Links */}
        <div className="mb-6 md:mb-0">
          <h4 className="text-xl font-semibold mb-4 text-accent">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-accent">Home</a></li>
            <li><a href="/shop" className="hover:text-accent">Shop</a></li>
            <li><a href="/about" className="hover:text-accent">About</a></li>
            <li><a href="/contact" className="hover:text-accent">Contact</a></li>
          </ul>
        </div>

        {/* Social Media Icons */}
        <div className="mb-6 md:mb-0 text-center">
          <h4 className="text-xl font-semibold mb-4 text-accent">Follow Us</h4>
          <div className="flex space-x-4 justify-center">
            <a href="https://facebook.com" className="hover:text-accent"><FaFacebook className="text-2xl" /></a>
            <a href="https://twitter.com" className="hover:text-accent"><FaTwitter className="text-2xl" /></a>
            <a href="https://instagram.com" className="hover:text-accent"><FaInstagram className="text-2xl" /></a>
          </div>
        </div>

        {/* Legal Links */}
        <div className="text-center">
          <h4 className="text-xl font-semibold mb-4 text-accent">Legal</h4>
          <ul className="space-y-2">
            <li><a href="/privacy-policy" className="hover:text-accent">Privacy Policy</a></li>
            <li><a href="/terms-of-service" className="hover:text-accent">Terms of Service</a></li>
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
