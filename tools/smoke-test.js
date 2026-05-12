#!/usr/bin/env node
// ============================================================
// smoke-test.js — verifica HTTP base
// Default: testa contro https://stradanuovagenova.com (produzione).
// Override con BASE_URL=http://127.0.0.1:8000 npm run smoke-test
// Status atteso: 200 per pagine normali, 404 per /404.html (path noindex).
// Exit code 1 se anche un solo URL devia.
// ============================================================

const BASE = (process.env.BASE_URL || 'https://stradanuovagenova.com').replace(/\/$/, '');

// Path da testare e status atteso. Aggiornare man mano che si aggiungono pagine.
const URLS = [
  { path: '/',                expected: 200, note: 'home' },
  { path: '/chi-siamo/',      expected: 200, note: 'chi-siamo' },
  { path: '/appuntamento/',   expected: 200, note: 'appuntamento' },
  { path: '/robots.txt',      expected: 200, note: 'robots' },
  { path: '/llms.txt',        expected: 200, note: 'llms' },
  { path: '/sitemap.xml',     expected: 200, note: 'sitemap' },
  { path: '/assets/css/base.css',           expected: 200, note: 'css' },
  { path: '/assets/fonts/inter-400.woff2',  expected: 200, note: 'font 400' },
  { path: '/assets/fonts/inter-600.woff2',  expected: 200, note: 'font 600' },
  { path: '/assets/js/nav-toggle.js',       expected: 200, note: 'nav-toggle' },
  { path: '/404.html',        expected: 200, note: '404 reale (servito 200 se richiesto direttamente)' },
  { path: '/sicuramentenonesiste',          expected: 404, note: 'fallback 404 (sito statico)' }
];

function fetchStatus(url) {
  return new Promise((resolve) => {
    const lib = url.startsWith('https') ? require('https') : require('http');
    const req = lib.get(url, { headers: { 'user-agent': 'strada-nuova-smoke/1.0' } }, (res) => {
      // Segui 1 livello di redirect per loggare il finale
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        resolve({ status: res.statusCode, location: res.headers.location });
        return;
      }
      resolve({ status: res.statusCode });
      res.resume();
    });
    req.on('error', (err) => resolve({ status: 0, error: err.message }));
    req.setTimeout(10000, () => { req.destroy(); resolve({ status: 0, error: 'timeout' }); });
  });
}

(async () => {
  console.log(`[smoke-test] BASE = ${BASE}`);
  let failures = 0;
  for (const t of URLS) {
    const url = BASE + t.path;
    const r = await fetchStatus(url);
    const ok = r.status === t.expected;
    const tag = ok ? '✓' : '✗';
    const extra = r.location ? ` → ${r.location}` : (r.error ? ` (${r.error})` : '');
    console.log(`  ${tag} ${r.status}  ${t.path}${extra}  [${t.note}]`);
    if (!ok) failures++;
  }
  if (failures > 0) {
    console.error(`[smoke-test] ${failures} test falliti`);
    process.exit(1);
  }
  console.log('[smoke-test] OK');
})();
