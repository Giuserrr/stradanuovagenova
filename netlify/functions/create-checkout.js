// Stripe Checkout Session — Netlify Function
// ENV: STRIPE_SECRET_KEY

// Product catalog (mirror of frontend — source of truth for prices)
const PRODUCT_CATALOG = {
  "pouf-01": { name: "Pouf N.01", price: 38000, description: "Tessuto Dedar / Edizione di 12" },
  "pouf-02": { name: "Pouf N.02", price: 42000, description: "Tessuto Pierre Frey / Edizione di 8" },
  "pouf-03": { name: "Pouf N.03", price: 45000, description: "Velluto Designers Guild / Edizione di 6" },
  "pouf-04": { name: "Pouf N.04", price: 35000, description: "Lino naturale / Edizione di 10" },
  "pouf-05": { name: "Pouf N.05", price: 52000, description: "Jacquard Etro / Edizione di 4" },
  "pouf-06": { name: "Pouf N.06", price: 40000, description: "Bouclé / Edizione di 8" },
};

exports.handler = async function(event) {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
    }

    const { productId } = JSON.parse(event.body || '{}');

    if (!productId || !PRODUCT_CATALOG[productId]) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Prodotto non valido' }) };
    }

    const product = PRODUCT_CATALOG[productId];

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
            description: product.description,
          },
          unit_amount: product.price,
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
