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

  // Calculate totals
  const subTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 500; // Example shipping cost in cents ($5.00)
  const taxRate = 0.07; // Example tax rate (7%)
  const tax = Math.round(subTotal * taxRate);
  const total = subTotal + shipping + tax;

  // Handle input changes for customer information
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Submit the checkout request
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
      console.log('Checkout API_BASE_URL:', API_BASE_URL); // Debugging

      const response = await fetch(`${API_BASE_URL}/api/stripe/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cart: cart.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            variant_id: item.variant_id,
            thumbnail_url: item.thumbnail_url,
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
    <div className="max-w-6xl mx-auto mt-4 p-4">
      {/* Checkout Header */}
      <div className="relative bg-primary text-textcolor rounded-lg overflow-hidden mb-6">
        <div className="relative p-6 text-center">
          <h1 className="text-3xl font-bold mb-2">Secure Checkout</h1>
          <p className="text-base">Complete your purchase by providing your payment details.</p>
        </div>
      </div>

      {errorMessage && (
        <p className="text-red-500 mb-4 text-center">
          <strong>Error:</strong> {errorMessage}
        </p>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Cart Summary */}
        <div className="w-full lg:w-1/2 bg-primary text-background p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-3 text-textcolor">Order Summary</h2>
          <div className="space-y-3">
            {cart.map((item) => (
              <div key={`${item.id}-${item.variant_id}`} className="flex items-center">
                <img
                  src={item.thumbnail_url || 'https://via.placeholder.com/80'}
                  alt={item.name}
                  className="w-14 h-14 object-cover rounded mr-3"
                />
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-textcolor">{item.name}</h3>
                  <p className="text-sm text-secondary">Variant: {item.variant}</p>
                  <p className="text-sm text-secondary">Quantity: {item.quantity}</p>
                </div>
                <p className="text-base font-bold text-textcolor">
                  ${(item.price * item.quantity / 100).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <hr className="my-3 border-textcolor" />
          <div className="space-y-1 text-textcolor text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${(subTotal / 100).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${(shipping / 100).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (7%)</span>
              <span>${(tax / 100).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${(total / 100).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="w-full lg:w-1/2 bg-primary text-background p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-3 text-textcolor">Billing Details</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Customer Information Fields */}
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={customerInfo.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-secondary rounded bg-secondary text-textcolor placeholder-textcolor focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={customerInfo.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-secondary rounded bg-secondary text-textcolor placeholder-textcolor focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
            <input
              type="text"
              name="address"
              placeholder="Street Address"
              value={customerInfo.address}
              onChange={handleChange}
              required
              className="w-full p-2 border border-secondary rounded bg-secondary text-textcolor placeholder-textcolor focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
            <div className="flex flex-col md:flex-row md:space-x-3">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={customerInfo.city}
                onChange={handleChange}
                required
                className="w-full md:w-1/2 p-2 border border-secondary rounded bg-secondary text-textcolor placeholder-textcolor focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent mb-3 md:mb-0"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={customerInfo.state}
                onChange={handleChange}
                required
                className="w-full md:w-1/4 p-2 border border-secondary rounded bg-secondary text-textcolor placeholder-textcolor focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent mb-3 md:mb-0"
              />
              <input
                type="text"
                name="zip"
                placeholder="Zip Code"
                value={customerInfo.zip}
                onChange={handleChange}
                required
                className="w-full md:w-1/4 p-2 border border-secondary rounded bg-secondary text-textcolor placeholder-textcolor focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 text-primary font-bold ${
                isSubmitting ? 'bg-gray-500 cursor-not-allowed' : 'bg-background hover:bg-accent'
              } rounded transition-all duration-300`}
            >
              {isSubmitting ? 'Processing...' : 'Pay Now'}
            </button>

            {/* Powered by Stripe */}
            <div className="mt-3 text-center">
              <p className="text-sm text-textcolor">
                Payments powered by{' '}
                <a
                  href="https://stripe.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Stripe
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
