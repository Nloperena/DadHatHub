const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend requests
app.use(cors({ origin: 'http://localhost:3000' }));

// Proxy route to fetch all products from Printful
app.get('/api/products', async (req, res) => {
  try {
    const response = await axios.get('https://api.printful.com/store/products', {
      headers: {
        Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
      }
    });
    res.json(response.data); // Send the data back to the frontend
  } catch (error) {
    console.error('Error fetching products from Printful:', error.message);
    res.status(500).send('Server Error: Unable to fetch products');
  }
});

// Proxy route to fetch a single product by ID from Printful
app.get('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`https://api.printful.com/store/products/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
      }
    });
    res.json(response.data); // Send the single product data back to the frontend
  } catch (error) {
    console.error(`Error fetching product ${id} from Printful:`, error.message);
    res.status(500).send(`Server Error: Unable to fetch product with ID ${id}`);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
