// server.js

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');
const stripe = require('stripe');
const bodyParser = require('body-parser');

// Load environment variables
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Stripe initialization
const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

// Printful API key
const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add raw body parser for the webhook endpoint
app.use(
  '/webhook',
  bodyParser.raw({ type: 'application/json' })
);

/**
 * Fetch all products from Printful.
 */
app.get('/api/products', async (req, res) => {
  try {
    const response = await axios.get('https://api.printful.com/store/products', {
      headers: { Authorization: `Bearer ${PRINTFUL_API_KEY}` },
    });

    // Fetch detailed information about each product
    const detailedProducts = await Promise.all(
      response.data.result.map(async (product) => {
        const detailsResponse = await axios.get(
          `https://api.printful.com/store/products/${product.id}`,
          {
            headers: { Authorization: `Bearer ${PRINTFUL_API_KEY}` },
          }
        );

        const details = detailsResponse.data.result;

        // Extract price, fallback to 0 if not available
        const price = details.sync_variants?.[0]?.retail_price
          ? parseFloat(details.sync_variants[0].retail_price) * 100
          : 0;

        // Use mockup image (type: preview) if available
        const mockupImage =
          details.sync_variants[0]?.files.find((file) => file.type === 'preview')
            ?.preview_url || product.thumbnail_url;

        return {
          id: product.id,
          name: product.name || 'No name available',
          thumbnail_url: mockupImage || 'default_image_url',
          price,
          variant_id: details.sync_variants?.[0]?.id || null,
        };
      })
    );

    res.status(200).json({ products: detailedProducts });
  } catch (error) {
    console.error('Error fetching products from Printful:', error.message);
    res.status(500).json({ error: 'Failed to fetch products.' });
  }
});

/**
 * Fetch a single product by ID from Printful.
 */
app.get('/api/products/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    const response = await axios.get(`https://api.printful.com/store/products/${productId}`, {
      headers: { Authorization: `Bearer ${PRINTFUL_API_KEY}` },
    });

    const product = response.data.result;

    // Extract price, fallback to 0 if not available
    const price = product.sync_variants?.[0]?.retail_price
      ? parseFloat(product.sync_variants[0].retail_price) * 100
      : 0;

    // Use mockup image (type: preview) if available
    const mockupImage =
      product.sync_variants?.[0]?.files.find((file) => file.type === 'preview')
        ?.preview_url || product.thumbnail_url;

    const formattedProduct = {
      id: product.id,
      name: product.sync_product?.name || 'No name available',
      description: product.sync_product?.description || 'No description available',
      thumbnail_url: mockupImage || 'default_image_url',
      price: price || 0,
      variant_id: product.sync_variants?.[0]?.id || null,
    };

    res.status(200).json({ result: formattedProduct });
  } catch (error) {
    console.error('Error fetching product by ID:', error.message);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

/**
 * Create Stripe Checkout session.
 */
app.post('/api/stripe/create-checkout-session', async (req, res) => {
  const { cart, customerEmail } = req.body;

  try {
    // Map cart items to Stripe line items
    const lineItems = cart.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.thumbnail_url],
        },
        unit_amount: item.price, // Price is in cents
      },
      quantity: item.quantity,
      description: `variant_id:${item.variant_id}`,
    }));

    // Create a Stripe Checkout session
    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/cancel`,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'], // Adjust as needed
      },
      customer_email: customerEmail, // Collect this from your frontend if available
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error('Stripe Checkout Session Error:', error.message);
    res.status(500).json({ error: 'Failed to create Stripe session.' });
  }
});

// Webhook endpoint to handle Stripe events
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

app.post('/webhook', bodyParser.raw({ type: 'application/json' }), (request, response) => {
  const sig = request.headers['stripe-signature'];
  let event;

  try {
    event = stripeClient.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    handleCheckoutSessionCompleted(session);
  } else {
    console.warn(`Unhandled event type ${event.type}`);
  }

  response.status(200).end();
});

// Function to handle successful checkout sessions
async function handleCheckoutSessionCompleted(session) {
  try {
    // Retrieve the session with expanded line items
    const checkoutSession = await stripeClient.checkout.sessions.retrieve(session.id, {
      expand: ['line_items', 'customer', 'customer_details'],
    });

    // Extract customer and shipping details
    const customerDetails = checkoutSession.customer_details;
    const shippingAddress = customerDetails.address;

    // Extract line items and map to Printful order items
    const orderItems = checkoutSession.line_items.data.map((item) => {
      const variantId = extractVariantIdFromDescription(item.description);
      return {
        sync_variant_id: variantId,
        quantity: item.quantity,
      };
    });

    // Prepare the order data for Printful
    const orderData = {
      recipient: {
        name: customerDetails.name,
        address1: shippingAddress.line1,
        address2: shippingAddress.line2 || '',
        city: shippingAddress.city,
        state_code: shippingAddress.state,
        country_code: shippingAddress.country,
        zip: shippingAddress.postal_code,
        email: customerDetails.email,
        phone: customerDetails.phone || '',
      },
      items: orderItems,
    };

    // Create the order in Printful
    const response = await axios.post('https://api.printful.com/orders', orderData, {
      headers: {
        Authorization: `Bearer ${PRINTFUL_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Printful order created:', response.data);
  } catch (error) {
    console.error('Error handling checkout session:', error.response?.data || error.message);
  }
}

// Helper function to extract variant_id
function extractVariantIdFromDescription(description) {
  const match = description.match(/variant_id:(\d+)/);
  return match ? parseInt(match[1], 10) : null;
}

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
