// src/components/Testimonials.js
import React from 'react';
import { FaStar } from 'react-icons/fa';

const testimonials = [
  {
    name: "Alex J.",
    rating: 5,
    text: "These hats are top quality! I love the style and the fit. Will definitely buy more.",
  },
  {
    name: "Jordan T.",
    rating: 4,
    text: "Great variety and affordable prices. My go-to place for dad hats.",
  },
  {
    name: "Taylor S.",
    rating: 5,
    text: "The customer service is amazing! They really go above and beyond.",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-navy text-white py-16">
      <h2 className="text-4xl font-bold text-center mb-10">What Our Customers Say</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-10">
        
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white text-navy p-6 rounded-lg shadow-lg text-center transform transition duration-300 hover:scale-105"
          >
            <div className="flex justify-center mb-3">
              {[...Array(testimonial.rating)].map((_, i) => (
                <FaStar key={i} className="text-yellow-500 text-lg" />
              ))}
            </div>
            <p className="text-lg mb-4 font-medium">"{testimonial.text}"</p>
            <p className="font-semibold text-xl text-purple">{testimonial.name}</p>
          </div>
        ))}

      </div>
    </section>
  );
};

export default Testimonials;