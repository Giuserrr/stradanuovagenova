#!/usr/bin/env node
// ============================================================
// sync-favicon.js
// Inserisce/aggiorna il blocco <link rel="icon"> in ogni HTML pubblico,
// delimitato dai marker <!-- favicon --> / <!-- /favicon -->.
// Idempotente: re-run = no diff se nulla cambia.
// Usage: node tools/sync-favicon.js [--write]
// ============================================================

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const WRITE = process.argv.includes('--write');

const FAVICON_BLOCK = `<!-- favicon -->
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/img/favicon-16x16.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<!-- /favicon -->`;

const FILES = [
  '404.html',
  'index.html',
  'appuntamento/index.html',
  'carta-da-parati-genova/index.html',
  'chi-siamo/index.html',
  'contatti/index.html',
  'grazie/index.html',
  'magazine/index.html',
  'magazine/quanto-costa-ritappezzare-divano-genova/index.html',
  'marchi/index.html',
  'marchi/cole-and-son/index.html',
  'marchi/dedar/index.html',
  'marchi/designers-guild/index.html',
  'marchi/elitis/index.html',
  'marchi/etro-tessuti/index.html',
  'marchi/houles/index.html',
  'marchi/pierre-frey/index.html',
  'marchi/rubelli/index.html',
  'marchi/sanderson-morris-co/index.html',
  'marchi/zoffany/index.html',
  'palazzo-lomellino/index.html',
  'rivestimenti-murali-genova/index.html',
  'servizi/index.html',
  'servizi/consulenza-arredo-tessile/index.html',
  'tendaggi-genova/index.html',
  'tessuti-casa-al-mare-liguria/index.html',
  'tessuti-genova/index.html',
  'tessuti-palazzi-storici-genova/index.html',
  'tessuti-tende-portofino-tigullio/index.html',
];

const BLOCK_RE = /<!-- favicon -->[\s\S]*?<!-- \/favicon -->\n?/;
const VIEWPORT_RE = /(<meta name="viewport"[^>]*>\n)/;

let changed = 0;
let untouched = 0;
const errors = [];

for (const rel of FILES) {
  const file = path.join(ROOT, rel);
  if (!fs.existsSync(file)) {
    errors.push(`missing: ${rel}`);
    continue;
  }
  const src = fs.readFileSync(file, 'utf8');
  let next;
  if (BLOCK_RE.test(src)) {
    next = src.replace(BLOCK_RE, FAVICON_BLOCK + '\n');
  } else if (VIEWPORT_RE.test(src)) {
    next = src.replace(VIEWPORT_RE, `$1${FAVICON_BLOCK}\n`);
  } else {
    errors.push(`no viewport meta: ${rel}`);
    continue;
  }
  if (next === src) {
    untouched++;
    continue;
  }
  if (WRITE) fs.writeFileSync(file, next, 'utf8');
  changed++;
  console.log(`[sync-favicon] ${WRITE ? 'wrote' : 'would write'}: ${rel}`);
}

console.log(`\n[sync-favicon] ${changed} ${WRITE ? 'changed' : 'to change'}, ${untouched} unchanged${errors.length ? `, ${errors.length} errors` : ''}`);
if (errors.length) {
  errors.forEach(e => console.error(`  ✗ ${e}`));
  process.exit(1);
}
if (!WRITE && changed > 0) {
  console.log(`\nRun with --write to apply.`);
}
