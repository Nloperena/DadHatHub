import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Carousel = ({ images = [] }) => {
  // Set the initial image index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle next image, looping back to the first image if at the end
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Handle previous image, looping to the last image if at the beginning
  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // If there are no images, display a placeholder
  if (images.length === 0) {
    return (
      <div className="relative w-full h-64 md:h-96 bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  // If there's only one image, disable navigation buttons
  const singleImage = images.length === 1;

  return (
    <div className="relative w-full h-64 md:h-96 overflow-hidden">
      {/* Image Stack */}
      <div className="absolute inset-0 flex items-center justify-center">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Carousel image ${index + 1}`}
            className={`absolute w-full h-full object-cover transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          />
        ))}
      </div>

      {/* Previous Button (hidden if only one image) */}
      {!singleImage && (
        <button
          onClick={prevImage}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white rounded-full p-2 focus:outline-none"
        >
          <FaChevronLeft size={24} />
        </button>
      )}

      {/* Next Button (hidden if only one image) */}
      {!singleImage && (
        <button
          onClick={nextImage}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white rounded-full p-2 focus:outline-none"
        >
          <FaChevronRight size={24} />
        </button>
      )}
    </div>
  );
};

export default Carousel;
