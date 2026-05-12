// nav-toggle.js — toggle menu mobile accessibile.
// Pattern: <button aria-expanded> + <ul id="navLinks">, aria-expanded
// aggiornato true/false, label cambia "Apri menu"/"Chiudi menu", icona
// hamburger/X. Niente onclick inline, niente onclick="toggleMenu()".
// Caricato con <script defer src="/assets/js/nav-toggle.js"></script>.

(function () {
  'use strict';

  function init() {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.getElementById('navLinks');
    if (!toggle || !links) return;

    const icon = toggle.querySelector('.nav-toggle-icon');

    function open() {
      links.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Chiudi menu');
      if (icon) icon.innerHTML = '&#10005;';
    }
    function close() {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Apri menu');
      if (icon) icon.innerHTML = '&#9776;';
    }
    function toggleMenu() {
      if (links.classList.contains('open')) close();
      else open();
    }

    toggle.addEventListener('click', toggleMenu);

    // Chiudi su click voce
    links.addEventListener('click', function (e) {
      const a = e.target.closest('a');
      if (a) close();
    });

    // Chiudi con Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && links.classList.contains('open')) {
        close();
        toggle.focus();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
