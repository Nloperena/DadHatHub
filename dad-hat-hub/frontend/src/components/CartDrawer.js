import React from 'react';
import { useCart } from '../context/CartContext';
import { FaTrash } from 'react-icons/fa';

const CartDrawer = ({ isOpen, toggleCart }) => {
  const { cart, removeFromCart } = useCart();

  return (
    <div
      className={`fixed ${
        window.innerWidth <= 1024 ? 'bottom-0 left-0 w-full' : 'top-0 right-0 w-full max-w-sm'
      } h-full bg-purple-900 text-white p-6 transition-transform duration-300 ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      } lg:${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      style={{ zIndex: 50 }} // Ensures the drawer stays on top of other elements
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Your Cart</h2>
        <button onClick={toggleCart} className="text-cyan-500 hover:text-cyan-300 transition-colors">
          Close
        </button>
      </div>
      {cart.length === 0 ? (
        <p className="text-center text-lg">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center bg-purple-800 p-4 rounded-lg shadow-md">
              {/* Product Image */}
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg mr-4" />
              
              {/* Product Details */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-cyan-300">{item.name}</h3>
                <p className="text-cyan-400 font-medium">${item.price.toFixed(2)}</p>
                <p className="text-gray-300">Quantity: {item.quantity}</p>
              </div>

              {/* Remove Button */}
              <button 
                onClick={() => removeFromCart(item.id)} 
                className="text-red-500 hover:text-red-400 transition-colors ml-4"
              >
                <FaTrash size={18} />
              </button>
            </div>
          ))}
          {/* Checkout Button */}
          <button className="w-full bg-white text-purple-900 font-bold py-3 rounded-full mt-4 hover:bg-gray-200 transition-all duration-300">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartDrawer;
