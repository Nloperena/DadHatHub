import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch products from Printful
    const fetchProducts = async () => {
      try {
        const token = process.env.REACT_APP_PRINTFUL_API_KEY; // Ensure you've set this in frontend .env file
        const response = await axios.get(
          `https://api.printful.com/store/products`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Set the products state with the data received from the API
        setProducts(response.data.result); // Printful returns products under `result`
      } catch (err) {
        setError("Unable to fetch products from Printful.");
        console.error(err);
      }
    };

    // Call the fetch function when the component mounts
    fetchProducts();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (products.length === 0) {
    return <p>Loading products...</p>;
  }

  return (
    <section className="max-w-6xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6">Dad Hat Collection</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-purple-800 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
            <img src={product.thumbnail_url} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-2xl font-semibold text-cyan-300">{product.name}</h3>
              <p className="text-cyan-400 text-lg font-medium mb-2">${(product.variants[0].price / 100).toFixed(2)}</p>
              <button className="text-cyan-300 hover:text-cyan-500 underline transition-all duration-200">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductList;
