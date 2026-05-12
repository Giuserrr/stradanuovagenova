#!/usr/bin/env node
// ============================================================
// build-sitemap.js
// Scansiona ricorsivamente *.html dalla root, esclude paths
// non indicizzabili (admin/, 404.html, _test-pilot/, magazine/content/,
// pagine con <meta robots ... noindex>). Per ogni file produce un <url>
// con <loc> assoluto e <lastmod> dal git log (cI = strict ISO-8601).
// Niente <priority> niente <changefreq>: Google li ignora dal 2024 e
// includerli è considerato spam-signal nel 2026.
// ============================================================

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { SITE_URL } = require('./store');

const ROOT = path.resolve(__dirname, '..');

const EXCLUDE_DIRS = new Set([
  'node_modules', '.git', '.cache', 'admin', '_test-pilot',
  'magazine/content', 'templates', 'netlify', '_data', 'tools', 'assets', 'img'
]);

const EXCLUDE_FILES = new Set([
  '404.html'
]);

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    const rel = path.relative(ROOT, full);
    if (entry.isDirectory()) {
      if (EXCLUDE_DIRS.has(entry.name) || EXCLUDE_DIRS.has(rel)) continue;
      walk(full, acc);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      if (EXCLUDE_FILES.has(entry.name)) continue;
      acc.push(full);
    }
  }
  return acc;
}

function isNoindex(file) {
  const html = fs.readFileSync(file, 'utf8');
  // Match <meta name="robots" ... content="...noindex..."> in qualsiasi ordine
  return /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html)
      || /<meta[^>]+content=["'][^"']*noindex[^"']*["'][^>]+name=["']robots["']/i.test(html);
}

function urlFor(file) {
  const rel = path.relative(ROOT, file).split(path.sep).join('/');
  // index.html -> ''  |  foo/bar/index.html -> 'foo/bar/' |  foo.html -> 'foo.html'
  let urlPath;
  if (rel === 'index.html') {
    urlPath = '';
  } else if (rel.endsWith('/index.html')) {
    urlPath = rel.slice(0, -'index.html'.length);
  } else {
    urlPath = rel;
  }
  return `${SITE_URL}/${urlPath}`;
}

function lastModFor(file) {
  try {
    const rel = path.relative(ROOT, file);
    const out = execSync(`git log -1 --format=%cI -- "${rel}"`, { cwd: ROOT, encoding: 'utf8' }).trim();
    if (out) return out;
  } catch (_) { /* file non tracciato o git non disponibile */ }
  // fallback su mtime filesystem
  return fs.statSync(file).mtime.toISOString();
}

function build() {
  const files = walk(ROOT).filter(f => !isNoindex(f));
  files.sort();

  const urls = files.map(f => {
    const loc = urlFor(f);
    const lastmod = lastModFor(f);
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;

  const out = path.join(ROOT, 'sitemap.xml');
  fs.writeFileSync(out, xml, 'utf8');
  console.log(`[build-sitemap] ${files.length} URL → sitemap.xml`);
  files.forEach(f => console.log(`  • ${urlFor(f)}`));
}

build();
