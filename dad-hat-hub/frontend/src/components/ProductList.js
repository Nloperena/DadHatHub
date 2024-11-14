import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch products from Printify
    const fetchProducts = async () => {
      try {
        // Replace YOUR_TOKEN_HERE with the actual token you provided.
        const token = "YOUR_JWT_TOKEN_HERE";
        const shopId = "YOUR_SHOP_ID_HERE"; // Replace with your actual Printify Shop ID

        const response = await axios.get(
          `https://api.printify.com/v1/shops/${shopId}/products.json`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Set the products state with the data received from the API
        setProducts(response.data.data);
      } catch (err) {
        setError("Unable to fetch products from Printify.");
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
            <img src={product.images[0].src} alt={product.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-2xl font-semibold text-cyan-300">{product.title}</h3>
              <p className="text-cyan-400 text-lg font-medium mb-2">${product.variants[0].price / 100}</p>
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
