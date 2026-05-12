// buy-product.js — handler click su bottoni drop.
// Event delegation su elementi con data-product-id. Niente onclick inline.

(function () {
  'use strict';

  function buy(btn) {
    const productId = btn.getAttribute('data-product-id');
    if (!productId) return;
    const orig = btn.textContent;
    btn.textContent = 'UN MOMENTO…';
    btn.disabled = true;

    fetch('/.netlify/functions/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: productId })
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data && data.url) {
          window.location.href = data.url;
          return;
        }
        alert((data && data.error) || 'Errore. Riprova.');
        btn.textContent = orig;
        btn.disabled = false;
      })
      .catch(function () {
        alert('Errore di connessione. Riprova.');
        btn.textContent = orig;
        btn.disabled = false;
      });
  }

  function init() {
    document.addEventListener('click', function (e) {
      const btn = e.target.closest('[data-product-id]');
      if (btn) buy(btn);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
