// src/pages/CartPage.js
import React from 'react';
import { useCart } from '../context/CartContext';
import { FaTrash } from 'react-icons/fa';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  if (cart.length === 0) {
    return <p className="text-center text-xl mt-8">Your cart is empty.</p>;
  }

  const handleQuantityChange = (productId, e) => {
    const quantity = Math.max(1, parseInt(e.target.value) || 1);
    updateQuantity(productId, quantity);
  };

  return (
    <section className="max-w-4xl mx-auto p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between items-center bg-purple-800 p-4 rounded-lg shadow-md">
            <img src={item.image} alt={item.name} className="w-24 h-24 object-contain rounded-lg" />
            <div className="flex-1 ml-4">
              <h2 className="text-2xl font-semibold text-cyan-300">{item.name}</h2>
              <p className="text-lg font-medium text-cyan-400">{item.price}</p>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.id, e)}
                className="w-16 mt-2 p-2 border border-cyan-500 rounded-lg text-center text-navy focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-300 ml-4">
              <FaTrash size={20} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CartPage;
