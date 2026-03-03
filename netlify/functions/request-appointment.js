// Appointment request — sends email to store + confirmation to client
// ENV: RESEND_API_KEY

exports.handler = async function(event) {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
    }

    const { name, email, phone, message, date, time } = JSON.parse(event.body || '{}');

    if (!name || !email || !phone || !date || !time) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Campi obbligatori mancanti' }) };
    }

    let Resend;
    try {
      Resend = require('resend').Resend;
    } catch (e) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Resend non configurato' }) };
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Email to store
    await resend.emails.send({
      from: 'Strada Nuova <noreply@stradanuovagenova.com>',
      to: 'stradanuova.7@gmail.com',
      subject: `Richiesta appuntamento — ${name}`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 500px;">
          <h2 style="margin-bottom: 24px;">Nuova richiesta appuntamento</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #888; width: 120px;">Nome</td><td style="padding: 8px 0;"><strong>${name}</strong></td></tr>
            <tr><td style="padding: 8px 0; color: #888;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #888;">Telefono</td><td style="padding: 8px 0;"><a href="tel:${phone}">${phone}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #888;">Data</td><td style="padding: 8px 0;"><strong>${date}</strong></td></tr>
            <tr><td style="padding: 8px 0; color: #888;">Orario</td><td style="padding: 8px 0;"><strong>${time}</strong></td></tr>
            ${message ? `<tr><td style="padding: 8px 0; color: #888; vertical-align: top;">Messaggio</td><td style="padding: 8px 0;">${message}</td></tr>` : ''}
          </table>
        </div>
      `,
    });

    // Confirmation email to client
    await resend.emails.send({
      from: 'Strada Nuova <noreply@stradanuovagenova.com>',
      to: email,
      subject: 'Richiesta appuntamento ricevuta — Strada Nuova',
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 500px; color: #333;">
          <h2 style="margin-bottom: 8px;">Abbiamo ricevuto la tua richiesta</h2>
          <p style="color: #666; margin-bottom: 24px;">Riceverai una conferma definitiva a breve.</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #888; width: 120px;">Data</td><td style="padding: 8px 0;"><strong>${date}</strong></td></tr>
            <tr><td style="padding: 8px 0; color: #888;">Orario</td><td style="padding: 8px 0;"><strong>${time}</strong></td></tr>
            <tr><td style="padding: 8px 0; color: #888;">Dove</td><td style="padding: 8px 0;">Via Garibaldi 7/a, Genova</td></tr>
          </table>
          <p style="color: #666; margin-top: 24px; font-size: 14px;">
            Strada Nuova<br>
            Palazzo Lomellino, Via Garibaldi 7/a<br>
            16124 Genova
          </p>
        </div>
      `,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
    };

  } catch (err) {
    console.error('Appointment error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Errore nell\'invio: ' + (err.message || 'sconosciuto') }),
    };
  }
};
