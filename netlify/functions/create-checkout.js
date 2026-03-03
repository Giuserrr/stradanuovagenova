// Stripe Checkout Session — Netlify Function
// ENV: STRIPE_SECRET_KEY
// Reads product data from _data/products.json (CMS-managed)

const fs = require('fs');
const path = require('path');

function loadProducts() {
  try {
    const filePath = path.join(__dirname, '..', '..', '_data', 'products.json');
    const raw = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(raw);
    return data.products || [];
  } catch (e) {
    console.error('Errore lettura products.json:', e);
    return [];
  }
}

exports.handler = async function(event) {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
    }

    const { productId } = JSON.parse(event.body || '{}');

    const products = loadProducts();
    const product = products.find(p => p.id === productId);

    if (!productId || !product) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Prodotto non valido' }) };
    }

    if (!product.available || product.stock <= 0) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Prodotto non disponibile' }) };
    }

    let stripe;
    try {
      stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    } catch (e) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Stripe non configurato' }) };
    }

    const origin = event.headers.origin || event.headers.referer || 'https://stradanuovagenova.com';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'eur',
          product_data: {
            name: product.name,
            description: product.detail,
          },
          unit_amount: product.price * 100, // prezzo in centesimi
        },
        quantity: 1,
      }],
      success_url: `${origin}/grazie?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#drop`,
      shipping_address_collection: {
        allowed_countries: ['IT'],
      },
      metadata: {
        productId: productId,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };

  } catch (err) {
    console.error('Checkout error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Errore nella creazione del pagamento: ' + (err.message || 'sconosciuto') }),
    };
  }
};
