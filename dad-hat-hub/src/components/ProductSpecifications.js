// src/components/ProductSpecifications.js
import React from 'react';

const ProductSpecifications = ({ specifications }) => {
  return (
    <div className="bg-purple-800 p-6 rounded-lg shadow-md mb-8">
      <h3 className="text-xl font-semibold text-cyan-500 mb-4">Product Specifications</h3>
      <table className="text-gray-200 w-full">
        <tbody>
          {specifications.map((spec, index) => (
            <tr key={index} className="border-b border-purple-600 last:border-none">
              <td className="py-2 font-semibold">{spec.name}:</td>
              <td className="py-2">{spec.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductSpecifications;
    