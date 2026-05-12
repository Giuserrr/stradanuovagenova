#!/usr/bin/env node
// ============================================================
// sync-nav-footer.js — Fase 13.6
// Propaga templates/nav.html + templates/footer.html su tutte le pagine HTML.
// Calcola aria-current="page" sulla voce attiva in base al path del file.
//
// Uso:
//   node tools/sync-nav-footer.js --dry-run    (default, mostra diff)
//   node tools/sync-nav-footer.js --write      (applica le modifiche)
//
// Pattern matching:
//   nav    → da '<a class="skip-link"' fino al primo '</nav>'
//   footer → da '<footer class="site-footer"' fino al primo '</footer>'
//
// Idempotente: ri-eseguito su file già sincronizzati → zero modifiche.
// Esclude: admin/, node_modules/, _test-pilot/, .cache/.
// ============================================================

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const NAV_TPL_PATH = path.join(ROOT, 'templates/nav.html');
const FOOTER_TPL_PATH = path.join(ROOT, 'templates/footer.html');

const EXCLUDE_DIRS = new Set(['node_modules', '.cache', '.git', '_test-pilot', 'admin', 'magazine/content', 'magazine/articles']);
// Path file → href della voce nav che deve avere aria-current.
// Match: esatto sul path del file OPPURE descendant di un hub.
// Hub con figli: /marchi/, /magazine/. Per i descendant, aria-current resta sull'hub.
const NAV_HREFS = [
  '/tessuti-genova/',
  '/tendaggi-genova/',
  '/carta-da-parati-genova/',
  '/marchi/',
  '/magazine/',
  '/chi-siamo/',
  '/contatti/',
  '/appuntamento/'
];

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    const rel = path.relative(ROOT, full);
    if (entry.isDirectory()) {
      if (EXCLUDE_DIRS.has(entry.name)) continue;
      if (EXCLUDE_DIRS.has(rel)) continue;
      walk(full, out);
    } else if (entry.isFile() && (entry.name === 'index.html' || entry.name === '404.html')) {
      out.push(full);
    }
  }
  return out;
}

function fileToUrlPath(absPath) {
  // .../index.html → /.../  ;  .../404.html → /404.html
  const rel = '/' + path.relative(ROOT, absPath).split(path.sep).join('/');
  if (rel.endsWith('/index.html')) return rel.slice(0, -'index.html'.length);
  return rel;
}

function pickAriaHref(urlPath) {
  // Match esatto: /foo/ === href
  // Match descendant: urlPath inizia con href e href !== '/'
  // Tra più match (es. /marchi/elitis/), prendo il più lungo che combacia.
  let best = null;
  for (const h of NAV_HREFS) {
    if (urlPath === h || urlPath.startsWith(h)) {
      if (!best || h.length > best.length) best = h;
    }
  }
  return best; // può essere null
}

function applyAriaCurrent(navTpl, ariaHref) {
  if (!ariaHref) return navTpl;
  // Sostituisce SOLO la href esatta della voce attiva.
  // Pattern: href="<href>" → href="<href>" aria-current="page"
  // Già idempotente: se aria-current è già lì, lo script lo riapplica identico
  // perché PRIMA strippiamo qualunque aria-current esistente, poi lo aggiungiamo solo sulla voce giusta.
  // Strip preventivo (gestisce ri-applicazioni su file già toccati):
  let out = navTpl.replace(/ aria-current="page"/g, '');
  // Aggiungi sulla voce attiva
  const re = new RegExp(`(href="${ariaHref.replace(/[/]/g, '\\/')}")`);
  out = out.replace(re, '$1 aria-current="page"');
  return out;
}

function diff(oldStr, newStr, label) {
  if (oldStr === newStr) return null;
  const oldLines = oldStr.split('\n');
  const newLines = newStr.split('\n');
  const max = Math.max(oldLines.length, newLines.length);
  const lines = [];
  for (let i = 0; i < max; i++) {
    if (oldLines[i] !== newLines[i]) {
      if (oldLines[i] !== undefined) lines.push(`  - ${oldLines[i]}`);
      if (newLines[i] !== undefined) lines.push(`  + ${newLines[i]}`);
    }
  }
  return `[${label}] ${lines.length} righe cambiate:\n${lines.slice(0, 40).join('\n')}${lines.length > 40 ? '\n  ... (troncato)' : ''}`;
}

function syncFile(absPath, navTpl, footerTpl, write) {
  const original = fs.readFileSync(absPath, 'utf8');
  const urlPath = fileToUrlPath(absPath);
  const ariaHref = pickAriaHref(urlPath);
  const navWithAria = applyAriaCurrent(navTpl, ariaHref);

  const NAV_RE = /<a class="skip-link"[\s\S]*?<\/nav>/;
  const FOOTER_RE = /<footer class="site-footer"[\s\S]*?<\/footer>/;

  const skipFile = absPath.endsWith('/admin/index.html');
  if (skipFile) return { skipped: true };

  let updated = original;
  const navMatch = NAV_RE.exec(updated);
  const footerMatch = FOOTER_RE.exec(updated);

  const issues = [];
  if (!navMatch) issues.push('nessuna nav trovata');
  if (!footerMatch) issues.push('nessun footer trovato');

  if (navMatch) updated = updated.replace(NAV_RE, navWithAria.trimEnd());
  if (footerMatch) updated = updated.replace(FOOTER_RE, footerTpl.trimEnd());

  if (updated === original) {
    return { unchanged: true, issues };
  }

  const navDiff = navMatch ? diff(navMatch[0], navWithAria.trimEnd(), 'NAV') : null;
  const footerDiff = footerMatch ? diff(footerMatch[0], footerTpl.trimEnd(), 'FOOTER') : null;

  if (write) {
    fs.writeFileSync(absPath, updated, 'utf8');
  }

  return { changed: true, navDiff, footerDiff, ariaHref, urlPath, issues };
}

function main() {
  const args = process.argv.slice(2);
  const write = args.includes('--write');
  const verbose = args.includes('--verbose');
  if (!write && !args.includes('--dry-run') && args.length === 0) {
    // default = dry-run
  }

  const navTpl = fs.readFileSync(NAV_TPL_PATH, 'utf8')
    .replace(/^<!--[\s\S]*?-->\s*/, '');
  const footerTpl = fs.readFileSync(FOOTER_TPL_PATH, 'utf8')
    .replace(/^<!--[\s\S]*?-->\s*/, '');

  const files = walk(ROOT).sort();
  console.log(`[sync-nav-footer] mode = ${write ? 'WRITE' : 'DRY-RUN'}`);
  console.log(`[sync-nav-footer] files candidati: ${files.length}`);

  let changed = 0, unchanged = 0, skipped = 0, errors = 0;
  for (const f of files) {
    const rel = path.relative(ROOT, f);
    const r = syncFile(f, navTpl, footerTpl, write);
    if (r.skipped) {
      skipped++;
      console.log(`  · ${rel} (skipped)`);
      continue;
    }
    if (r.issues && r.issues.length) {
      errors += r.issues.length;
      console.warn(`  ⚠ ${rel} → ${r.issues.join('; ')}`);
    }
    if (r.unchanged) {
      unchanged++;
      if (verbose) console.log(`  = ${rel} (no change)`);
      continue;
    }
    if (r.changed) {
      changed++;
      const ariaLabel = r.ariaHref || '(nessuna voce attiva)';
      console.log(`  ${write ? '✓' : '∆'} ${rel}  [aria-current: ${ariaLabel}]`);
      if (verbose) {
        if (r.navDiff) console.log(r.navDiff);
        if (r.footerDiff) console.log(r.footerDiff);
      }
    }
  }

  console.log(`\n[sync-nav-footer] ${write ? 'scritti' : 'da scrivere'}: ${changed} · invariati: ${unchanged} · skip: ${skipped} · warning: ${errors}`);
  if (!write && changed > 0) {
    console.log(`[sync-nav-footer] dry-run completo. Rilancia con --write per applicare.`);
  }
}

main();
