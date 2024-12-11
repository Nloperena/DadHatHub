import React from 'react';

const SuccessPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: '#A5AE9E' }}>
      <div className="text-center">
        {/* Success Icon */}
        <div className="bg-white rounded-full p-4 mb-6" style={{ backgroundColor: '#D0DDD7' }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16"
            style={{ color: '#7E846B' }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        {/* Success Text */}
        <h1 className="text-4xl font-bold mb-4" style={{ color: '#2F2504' }}>Thank You!</h1>
        <p className="text-lg mb-6" style={{ color: '#594E36' }}>Your order has been successfully placed.</p>
        {/* Button */}
        <a
          href="/"
          className="px-6 py-3 rounded shadow"
          style={{
            backgroundColor: '#7E846B',
            color: '#D0DDD7',
            fontWeight: 'bold',
          }}
        >
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default SuccessPage;
