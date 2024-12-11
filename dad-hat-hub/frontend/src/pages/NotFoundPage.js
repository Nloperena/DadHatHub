import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: '#594E36' }}>
      <div className="text-center">
        {/* 404 Icon */}
        <div className="rounded-full p-4 mb-6" style={{ backgroundColor: '#7E846B' }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16"
            style={{ color: '#D0DDD7' }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6M9 16h6M7 8h10" />
          </svg>
        </div>
        {/* 404 Text */}
        <h1 className="text-4xl font-bold mb-4" style={{ color: '#A5AE9E' }}>404 - Page Not Found</h1>
        <p className="text-lg mb-6" style={{ color: '#D0DDD7' }}>
          The page you’re looking for doesn’t exist.
        </p>
        {/* Buttons */}
        <div className="flex space-x-4">
          <a
            href="/"
            className="px-6 py-3 rounded shadow"
            style={{
              backgroundColor: '#2F2504',
              color: '#D0DDD7',
              fontWeight: 'bold',
            }}
          >
            Go Home
          </a>
          <a
            href="/contact"
            className="px-6 py-3 rounded shadow"
            style={{
              backgroundColor: '#7E846B',
              color: '#D0DDD7',
              fontWeight: 'bold',
            }}
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
