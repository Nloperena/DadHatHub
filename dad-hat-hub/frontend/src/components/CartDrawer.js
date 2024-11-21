// src/components/CartDrawer.js
import React from 'react';
import { useCart } from '../context/CartContext';
import { FaTrash, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CartDrawer = ({ isOpen, toggleCart }) => {
  const { cart, removeFromCart } = useCart();

  return (
    <div
      className={`fixed inset-y-0 right-0 w-full max-w-md bg-background text-textcolor shadow-lg transform transition-transform duration-300 z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
      style={{ borderLeft: '4px solid #7E846B' }} // Added left border
    >
      <div className="flex justify-between items-center p-4 border-b-4 border-secondary">
        <h2 className="text-2xl font-bold text-primary">Your Cart</h2>
        <button
          onClick={toggleCart}
          className="text-primary hover:text-accent transition-colors"
        >
          <FaTimes size={24} />
        </button>
      </div>
      {cart.length === 0 ? (
        <p className="text-center text-lg mt-6">Your cart is empty.</p>
      ) : (
        <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 150px)' }}>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center bg-secondary bg-opacity-20 p-4 rounded-lg mb-4 border-l-4 border-accent"
            >
              <img
                src={item.thumbnail_url || 'https://via.placeholder.com/80'}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg mr-4"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-primary">{item.name}</h3>
                <p className="text-lg text-primary font-bold">
                  ${item.price ? (item.price / 100).toFixed(2) : 'N/A'}
                </p>
                <p className="text-sm text-primary">Quantity: {item.quantity}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-400 transition-colors ml-4"
              >
                <FaTrash size={18} />
              </button>
            </div>
          ))}
          <Link to="/checkout">
            <button
              onClick={toggleCart}
              className="w-full bg-primary text-textcolor font-bold py-3 rounded-full mt-4 hover:bg-secondary transition-all duration-300"
            >
              Proceed to Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartDrawer;
