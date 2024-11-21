// src/components/Pagination.js
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center mt-8 space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 text-textcolor font-bold rounded-full transition-all duration-300 ${
          currentPage === 1
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-primary hover:bg-secondary'
        }`}
      >
        Previous
      </button>
      <span className="flex items-center px-3 py-1">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 text-textcolor font-bold rounded-full transition-all duration-300 ${
          currentPage === totalPages
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-primary hover:bg-secondary'
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
