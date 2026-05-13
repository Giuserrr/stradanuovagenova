#!/usr/bin/env node
// ============================================================
// build-drop-grid.js
// Legge _data/products.json e inietta le card del drop tra i marker
// <!-- BUILD:DROP_GRID:START --> e <!-- BUILD:DROP_GRID:END --> di
// index.html. Il pre-rendering statico è un win SEO grosso: i crawler
// AI (no-JS) e Google vedono i prodotti senza dipendere da fetch.
// ============================================================

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PRODUCTS_FILE = path.join(ROOT, '_data', 'products.json');
const INDEX_FILE = path.join(ROOT, 'index.html');
const START_MARKER = '<!-- BUILD:DROP_GRID:START -->';
const END_MARKER = '<!-- BUILD:DROP_GRID:END -->';

function escapeHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttr(s) { return escapeHtml(s); }

function renderImgBlock(p, num) {
  if (!p.image) {
    return `<div class="drop-card-img" role="img" aria-label="${escapeAttr(p.name)}"><span class="placeholder-label">${num}</span></div>`;
  }
  const webp = p.image;
  const avif = webp.replace(/\.webp$/i, '.avif');
  const alt = `${p.name} — ${p.detail}`;
  return `<div class="drop-card-img">
          <picture>
            <source srcset="${escapeAttr(avif)}" type="image/avif">
            <img src="${escapeAttr(webp)}" alt="${escapeAttr(alt)}" width="1200" height="1200" loading="lazy" decoding="async">
          </picture>
        </div>`;
}

function renderCard(p, i) {
  const num = String(i + 1).padStart(2, '0');
  const available = p.available && p.stock > 0;
  const imgBlock = renderImgBlock(p, num);
  const stockLine = available
    ? (p.lastPiece
        ? `\n        <div class="drop-card-stock highlight">Ultimo pezzo disponibile</div>`
        : `\n        <div class="drop-card-stock">${p.stock} disponibil${p.stock === 1 ? 'e' : 'i'}</div>`)
    : '';
  const cta = available
    ? `<button type="button" class="drop-card-status available" data-product-id="${escapeAttr(p.id)}">Acquista</button>`
    : `<button type="button" class="drop-card-status soldout" disabled>Esaurito</button>`;

  return `      <article class="drop-card">
        ${imgBlock}
        <div class="drop-card-info">
          <div>
            <h3 class="drop-card-name">${escapeHtml(p.name)}</h3>
            <p class="drop-card-detail">${escapeHtml(p.detail)}</p>
          </div>
          <div class="drop-card-price">&euro;${escapeHtml(p.price)}</div>
        </div>${stockLine}
        ${cta}
      </article>`;
}

function build() {
  if (!fs.existsSync(PRODUCTS_FILE)) {
    console.warn(`[build-drop-grid] ${PRODUCTS_FILE} non trovato — skip`);
    return;
  }
  if (!fs.existsSync(INDEX_FILE)) {
    console.warn(`[build-drop-grid] ${INDEX_FILE} non trovato — skip`);
    return;
  }

  const data = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
  const products = Array.isArray(data.products) ? data.products : [];

  const cards = products.length
    ? products.map(renderCard).join('\n')
    : '      <p style="color:var(--text-dim);grid-column:1/-1;padding:20px 0;">Nessun prodotto disponibile al momento.</p>';

  const html = fs.readFileSync(INDEX_FILE, 'utf8');
  const startIdx = html.indexOf(START_MARKER);
  const endIdx = html.indexOf(END_MARKER);
  if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) {
    console.error('[build-drop-grid] marker non trovati in index.html — abort');
    process.exit(1);
  }

  const before = html.slice(0, startIdx + START_MARKER.length);
  const after = html.slice(endIdx);
  const next = `${before}\n${cards}\n      ${after}`;

  // Idempotenza: scrivi solo se cambia
  if (next === html) {
    console.log(`[build-drop-grid] no-op (${products.length} prodotti, nessuna differenza)`);
    return;
  }
  fs.writeFileSync(INDEX_FILE, next, 'utf8');
  console.log(`[build-drop-grid] ${products.length} prodotti iniettati in index.html`);
}

build();
