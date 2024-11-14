import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cart, updateQuantity } = useCart();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (cart.length === 0) {
    return <p className="text-center text-xl mt-8">Your cart is empty. Go back to the shop to add items!</p>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate an order submission here, ideally to a backend server.
    console.log('Order submitted:', { ...customerInfo, cart });
    setIsSubmitted(true);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-purple-800 text-white rounded-lg mt-8">
      <h1 className="text-3xl font-bold text-cyan-500 mb-6">Checkout</h1>

      {isSubmitted ? (
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-cyan-300">Thank you for your order!</h2>
          <p className="text-lg text-gray-300">We have received your order and will be processing it shortly.</p>
        </div>
      ) : (
        <>
          {/* Cart Summary */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center bg-purple-700 p-4 rounded-lg shadow-md">
                  <div>
                    <h3 className="text-lg font-semibold text-cyan-300">{item.name}</h3>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 bg-cyan-500 text-navy font-bold rounded-full"
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <span className="text-lg font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 bg-cyan-500 text-navy font-bold rounded-full"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <p className="text-cyan-400 font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="text-right mt-4 text-lg font-semibold text-cyan-300">
              Total: ${calculateTotal()}
            </div>
          </div>

          {/* Checkout Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Customer Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={customerInfo.name}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg border border-cyan-500 bg-navy text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={customerInfo.email}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg border border-cyan-500 bg-navy text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <input
                type="text"
                name="address"
                placeholder="Street Address"
                value={customerInfo.address}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg border border-cyan-500 bg-navy text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={customerInfo.city}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg border border-cyan-500 bg-navy text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <input
                type="text"
                name="zip"
                placeholder="Zip Code"
                value={customerInfo.zip}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg border border-cyan-500 bg-navy text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Payment Information (Mock) */}
            <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>
            <p className="text-lg text-gray-300 mb-4">Note: Payment processing is currently simulated.</p>
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              required
              className="w-full p-3 rounded-lg border border-cyan-500 bg-navy text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="expiry"
                placeholder="MM/YY"
                required
                className="w-full p-3 rounded-lg border border-cyan-500 bg-navy text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                required
                className="w-full p-3 rounded-lg border border-cyan-500 bg-navy text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 mt-6 bg-white text-purple-900 font-bold rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
            >
              Place Order
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Checkout;
