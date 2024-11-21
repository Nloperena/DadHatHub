import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '../context/CartContext';

// Load Stripe with your publishable key
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const { cart } = useCart();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handles input changes for customer information
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Submits the checkout request
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
  
    try {
      // Checkout.js - handleSubmit function
  const response = await fetch('http://localhost:5000/api/stripe/create-checkout-session', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    cart: cart.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      variant_id: item.variant_id,
      thumbnail_url: item.thumbnail_url, // Include thumbnail_url here
    })),
    customerInfo,
  }),
});


  
      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }
  
      const { id } = await response.json();
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId: id });
  
      if (error) {
        setErrorMessage(error.message);
      }
    } catch (error) {
      console.error('Error during checkout:', error.message);
      setErrorMessage('An error occurred during checkout. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {errorMessage && <p className="text-red-500 mb-4"><strong>Error:</strong> {errorMessage}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Customer Information Fields */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={customerInfo.name}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={customerInfo.email}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded"
        />
        <input
          type="text"
          name="address"
          placeholder="Street Address"
          value={customerInfo.address}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={customerInfo.city}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded"
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={customerInfo.state}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded"
        />
        <input
          type="text"
          name="zip"
          placeholder="Zip Code"
          value={customerInfo.zip}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 text-white ${
            isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          } rounded transition-all`}
        >
          {isSubmitting ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
