// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';
import CartDrawer from './CartDrawer';

const Navbar = () => {
  const { cart } = useCart();
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
      {/* Sticky Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-primary text-textcolor p-4 flex justify-between items-center shadow-lg z-10">
        <div className="font-bold text-xl md:text-2xl lg:text-3xl">
          <Link to="/" className="hover:text-accent">Dad Hat Hub</Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/" className="hover:text-accent">Home</Link>
          <Link to="/shop" className="hover:text-accent">Shop</Link>
          <Link to="/checkout" className="hover:text-accent">Checkout</Link>
          <button onClick={toggleCart} className="relative focus:outline-none">
            <FaShoppingCart size={24} />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-secondary text-textcolor text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Cart Icon and Menu Icon */}
        <div className="md:hidden flex items-center space-x-4">
          <button onClick={toggleCart} className="relative focus:outline-none">
            <FaShoppingCart size={24} />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-secondary text-textcolor text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
          <button onClick={toggleMobileMenu} className="text-2xl focus:outline-none">
            ☰
          </button>
        </div>

        {/* Mobile Menu Links */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-primary text-textcolor py-4 space-y-4 flex flex-col items-center md:hidden">
            <Link to="/" onClick={toggleMobileMenu} className="hover:text-accent">Home</Link>
            <Link to="/shop" onClick={toggleMobileMenu} className="hover:text-accent">Shop</Link>
            <Link to="/checkout" onClick={toggleMobileMenu} className="hover:text-accent">Checkout</Link>
          </div>
        )}
      </nav>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} toggleCart={toggleCart} />

      {/* Adding padding to the top of the content so it doesn't get hidden behind the sticky navbar */}
      <div className="pt-16"></div>
    </>
  );
};

export default Navbar;
