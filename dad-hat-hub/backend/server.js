const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');
const stripe = require('stripe');
const { xmlBuilder } = require('xmlbuilder2'); // For generating XML

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
// Do not apply express.json() and express.urlencoded() globally here
// They will be applied after the webhook route

// Stripe webhook endpoint secret
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

/**
 * Webhook endpoint to handle Stripe events.
 * Must be defined before body parsing middleware.
 */
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripeClient.webhooks.constructEvent(req.body, sig, endpointSecret);
    console.log('Webhook Verified:', event);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      console.log('Payment successful:', session);
      handleCheckoutSessionCompleted(session);
    } else {
      console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).send('Webhook received!');
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

// Apply JSON parsing middleware only AFTER the webhook route
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Fetch all products from Printful.
 */
app.get('/api/products', async (req, res) => {
  try {
    const response = await axios.get('https://api.printful.com/store/products', {
      headers: { Authorization: `Bearer ${PRINTFUL_API_KEY}` },
    });

    const detailedProducts = await Promise.all(
      response.data.result.map(async (product) => {
        const detailsResponse = await axios.get(
          `https://api.printful.com/store/products/${product.id}`,
          {
            headers: { Authorization: `Bearer ${PRINTFUL_API_KEY}` },
          }
        );

        const details = detailsResponse.data.result;
        const price = details.sync_variants?.[0]?.retail_price
          ? parseFloat(details.sync_variants[0].retail_price) * 100
          : 0;
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
 * Fetch specific product details by ID from Printful.
 */
app.get('/api/products/:id', async (req, res) => {
  const productId = req.params.id;
  console.log(`Fetching product with ID: ${productId}`);

  try {
    const response = await axios.get(`https://api.printful.com/store/products/${productId}`, {
      headers: { Authorization: `Bearer ${PRINTFUL_API_KEY}` },
    });

    const product = response.data.result;

    const productDetails = {
      id: product.sync_product.id,
      name: product.sync_product.name,
      description: product.sync_product.description || 'No description available',
      thumbnail_url: product.sync_product.thumbnail_url,
      variants: product.sync_variants.map((variant) => ({
        id: variant.id,
        name: variant.name,
        price: parseFloat(variant.retail_price) * 100,
        thumbnail_url: variant.files?.find((file) => file.type === 'preview')?.preview_url || null,
      })),
    };

    console.log('Processed Product Details:', productDetails);
    res.status(200).json(productDetails);
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}:`, error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * Create Stripe Checkout session.
 */
app.post('/api/stripe/create-checkout-session', async (req, res) => {
  const { cart, customerInfo } = req.body;

  try {
    const lineItems = cart.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.thumbnail_url],
          metadata: {
            variant_id: item.variant_id,
            product_id: item.id,
          },
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    }));

    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      customer_email: customerInfo.email,
      success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/cancel`,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
      billing_address_collection: 'required',
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error('Stripe Checkout Session Error:', error);
    res.status(500).json({ error: 'Failed to create Stripe session.' });
  }
});

/**
 * Generate Sitemap
 */
app.get('/sitemap.xml', async (req, res) => {
  try {
    const response = await axios.get('https://api.printful.com/store/products', {
      headers: { Authorization: `Bearer ${PRINTFUL_API_KEY}` },
    });

    const productUrls = response.data.result.map((product) => ({
      loc: `/product/${product.id}`,
      priority: 0.9,
      changefreq: 'weekly',
    }));

    const staticPages = [
      { loc: '/', priority: 1.0, changefreq: 'daily' },
      { loc: '/shop', priority: 0.8, changefreq: 'daily' },
      { loc: '/checkout', priority: 0.5, changefreq: 'never' },
      { loc: '/success', priority: 0.5, changefreq: 'never' },
      { loc: '/failure', priority: 0.5, changefreq: 'never' },
    ];

    const urls = [...staticPages, ...productUrls];

    const urlset = {
      urlset: {
        '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
        url: urls.map((url) => ({
          loc: `${process.env.BASE_URL}${url.loc}`,
          priority: url.priority,
          changefreq: url.changefreq,
        })),
      },
    };

    const sitemap = xmlBuilder.create(urlset).end({ prettyPrint: true });

    res.setHeader('Content-Type', 'application/xml');
    res.send(sitemap);
  } catch (error) {
    console.error('Error generating sitemap:', error.message);
    res.status(500).json({ error: 'Failed to generate sitemap.' });
  }
});

/**
 * Handle successful Stripe checkout sessions.
 */
async function handleCheckoutSessionCompleted(session) {
  try {
    const orderData = {
      recipient: {
        name: session.customer_details.name,
        address1: session.customer_details.address.line1,
        city: session.customer_details.address.city,
        state_code: session.customer_details.address.state,
        country_code: session.customer_details.address.country,
        zip: session.customer_details.address.postal_code,
        email: session.customer_email,
      },
      items: session.display_items.map((item) => ({
        sync_variant_id: item.custom.metadata.variant_id,
        quantity: item.quantity,
      })),
    };

    await axios.post('https://api.printful.com/orders', orderData, {
      headers: { Authorization: `Bearer ${PRINTFUL_API_KEY}` },
    });
  } catch (error) {
    console.error('Error handling checkout session:', error.message);
  }
}

/**
 * Start the server.
 */
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
