// Import necessary modules
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env

// Initialize Express application
const app = express();

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Enable JSON parsing in request body

// Load environment variables
const PRINTIFY_API_KEY = process.env.PRINTIFY_API_KEY;
const SHOP_ID = 'YOUR_SHOP_ID'; // Replace with your actual Printify shop ID

// Route to fetch all products
app.get('/api/products', async (req, res) => {
  try {
    // Make GET request to Printify API to fetch products
    const response = await axios.get(
      `https://api.printify.com/v1/catalog/shops/${SHOP_ID}/products.json`,
      {
        headers: {
          Authorization: `Bearer ${PRINTIFY_API_KEY}`,
        },
      }
    );
    res.json(response.data); // Send response data to frontend
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Route to fetch a single product by ID
app.get('/api/products/:productId', async (req, res) => {
  const { productId } = req.params;
  try {
    // Make GET request to Printify API for a specific product
    const response = await axios.get(
      `https://api.printify.com/v1/catalog/shops/${SHOP_ID}/products/${productId}.json`,
      {
        headers: {
          Authorization: `Bearer ${PRINTIFY_API_KEY}`,
        },
      }
    );
    res.json(response.data); // Send product data to frontend
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Define the port the server will run on
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
