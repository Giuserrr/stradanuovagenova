# Strada Nuova Genova — stato dell'arte

Sito del negozio di tessuti e interior design **Strada Nuova**, Via Garibaldi 7/a, Palazzo Lomellino (Rolli/UNESCO), Genova. Gestione: **Giulia Orlandini** (terza generazione) + **Brunella**.

- Dominio: stradanuovagenova.com (Namecheap → DNS Netlify)
- Repo: github.com/Giuserrr/stradanuovagenova
- Netlify Site ID: 3119e79e-ed19-4cbd-ac5f-f4fac7233c8e (team digitalwow)
- Email negozio: stradanuova.7@gmail.com

## Stack (aggiornato 2026-05-12)

**Migrazione SEO in corso (Fasi 0-9.1 chiuse, vedi [PLAN.md](PLAN.md)).** La SPA originale è morta: il sito è ora HTML5 vanilla multi-pagina vero. 13 pagine fisiche in locale (8 contenuto + 1 hub /marchi/ + 2 brand pages + 2 noindex/admin), 5 commit pushati in produzione (Fasi 0-2 = asset condivisi + file tecnici), Fasi 3-9.1 ancora locali in attesa del push finale.

### Caratteristiche
- **HTML5 vanilla multi-pagina.** Niente framework, niente bundler
- **Catch-all SPA `/* → /index.html` rimosso** da netlify.toml in Fase 6
- Nav + footer **duplicati esplicitamente** in ogni pagina (~16-20 righe). Pattern accettato fino a 25 pagine, riduce rischio rottura Decap CMS, diff-friendly
- Marker `<!-- BUILD:X:START/END -->` per zone auto-generate (drop grid da `_data/products.json`; magazine in Fase 12)
- CSS condiviso in [assets/css/base.css](assets/css/base.css) — **blocking, non async** (anti-pattern critical inline scartato dopo lezione sister project)
- Font Inter 400+600 **self-host woff2** in [assets/fonts/](assets/fonts/) (109KB + 112KB da rsms.me). Zero richieste a Google Fonts CDN
- JS condiviso: [assets/js/nav-toggle.js](assets/js/nav-toggle.js), [assets/js/buy-product.js](assets/js/buy-product.js). Event listener no `onclick` inline
- Script Node in [tools/](tools/): `store.js`, `build-sitemap.js`, `build-drop-grid.js`, `build-magazine.js` (stub Fase 12), `smoke-test.js`
- Decap CMS v3.3.3 + Netlify Identity **invariati** su `/admin`
- Netlify Functions `create-checkout` + `request-appointment` **invariate** (`node_bundler = "nft"`)
- Build command: `npm install && npm run build` su Netlify

## Struttura

```
stradanuovagenova/
├── index.html                          ← home statica (ex SPA)
├── chi-siamo/index.html
├── appuntamento/index.html             ← form Resend + calendario
├── grazie/index.html                   ← post-Stripe, noindex
├── contatti/index.html
├── palazzo-lomellino/index.html        ← asset autorità
├── tessuti-genova/index.html           ← pillar 1523 parole
├── tendaggi-genova/index.html          ← pillar 1557 parole
├── carta-da-parati-genova/index.html   ← pillar 1929 parole
├── rivestimenti-murali-genova/index.html ← pillar 1672 parole
├── marchi/index.html                   ← hub 10 brand
├── marchi/elitis/index.html            ← brand 832 parole
├── marchi/cole-and-son/index.html      ← brand 988 parole
├── 404.html                            ← fallback
├── robots.txt llms.txt sitemap.xml
├── netlify.toml                        ← nft bundler, niente catch-all
├── package.json                        ← stripe, resend, @netlify/blobs, marked, gray-matter
├── _data/products.json                 ← CMS-managed
├── admin/index.html admin/config.yml   ← Decap CMS
├── assets/
│   ├── css/base.css
│   ├── fonts/inter-{400,600}.woff2
│   └── js/{nav-toggle,buy-product}.js
├── templates/{nav,footer}.html         ← snippet da duplicare in pagine
├── tools/                              ← build/validate scripts
│   ├── store.js                        ← NAP + JSON-LD helpers
│   ├── build-sitemap.js
│   ├── build-drop-grid.js
│   ├── build-magazine.js               (stub Fase 12)
│   └── smoke-test.js
├── magazine/{content,articles}/        ← Fase 12 placeholder
├── img/                                ← hero, palazzo-lomellino, famiglia, materie, drop (webp 1920x1080 / 1200x800)
└── netlify/functions/
    ├── create-checkout.js
    └── request-appointment.js
```

## Pagine pubblicate

| URL | File | Schema JSON-LD | Note |
|-----|------|----------------|------|
| `/` | [index.html](index.html) | Organization + WebSite + Store+LocalBusiness | Hero `<img>` fetchpriority=high, drop pre-renderato |
| `/chi-siamo/` | [chi-siamo/index.html](chi-siamo/index.html) | AboutPage + BreadcrumbList | 4 blocchi (Palazzo/Famiglia/Materia/Drop) |
| `/appuntamento/` | [appuntamento/index.html](appuntamento/index.html) | ContactPage + Service + BreadcrumbList | Form + calendario JS IIFE, orari mar-sab 10-12:30 / 16-19:30 slot 30min |
| `/grazie/` | [grazie/index.html](grazie/index.html) | (none) | Post-Stripe, **noindex,follow** |
| `/contatti/` | [contatti/index.html](contatti/index.html) | ContactPage + Store + BreadcrumbList | NAP completa + come arrivare + CTA appuntamento |
| `/palazzo-lomellino/` | [palazzo-lomellino/index.html](palazzo-lomellino/index.html) | WebPage + Place+TouristAttraction + BreadcrumbList | Asset autorità SEO, storia palazzo |
| `/tessuti-genova/` | [tessuti-genova/index.html](tessuti-genova/index.html) | CollectionPage + BreadcrumbList | Pillar 1523 parole + 6 FAQ |
| `/tendaggi-genova/` | [tendaggi-genova/index.html](tendaggi-genova/index.html) | CollectionPage + BreadcrumbList | Pillar 1557 parole + 6 FAQ |
| `/carta-da-parati-genova/` | [carta-da-parati-genova/index.html](carta-da-parati-genova/index.html) | CollectionPage + BreadcrumbList | Pillar 1929 parole, brand wallpaper + tipologie + tendenze 2026, 6 FAQ |
| `/rivestimenti-murali-genova/` | [rivestimenti-murali-genova/index.html](rivestimenti-murali-genova/index.html) | CollectionPage + BreadcrumbList | Pillar 1672 parole, boiserie + tessuto a parete + pannelli, 6 FAQ |
| `/marchi/` | [marchi/index.html](marchi/index.html) | CollectionPage + BreadcrumbList | Hub 10 brand con descrizioni |
| `/marchi/elitis/` | [marchi/elitis/index.html](marchi/elitis/index.html) | WebPage + Brand + BreadcrumbList | Brand 832 parole |
| `/marchi/cole-and-son/` | [marchi/cole-and-son/index.html](marchi/cole-and-son/index.html) | WebPage + Brand + BreadcrumbList | Brand 988 parole |
| `/admin/` | [admin/index.html](admin/index.html) | (CMS) | Decap CMS, robots disallow |

**Sitemap:** 12 URL indicizzabili (esclude `/grazie/` per noindex). Auto-generato da [tools/build-sitemap.js](tools/build-sitemap.js) con `lastmod` da `git log -1 --format=%cI`. NO priority/changefreq.

**Brand pages mancanti:** 8 link interni da pillar e hub (Dedar, Pierre Frey, Designers Guild, Rubelli, Sanderson/Morris, Zoffany, Houlès, Etro Tessuti) sono accettati come 404 interni fino alla chiusura di Fase 9.2–9.5.

## Drop / Stripe

- Prodotti in [_data/products.json](_data/products.json): 6 pouf (N.01–N.06), schema `{id, name, detail, price, stock, available, image, stripePrice}`
- **Pre-rendering server-side**: [tools/build-drop-grid.js](tools/build-drop-grid.js) inietta le card tra `<!-- BUILD:DROP_GRID:START/END -->` di index.html. Idempotente. Vantaggio: AI bot no-JS vedono i prodotti
- Bottone "Acquista" usa `data-product-id`, [assets/js/buy-product.js](assets/js/buy-product.js) fa event delegation → fetch `/.netlify/functions/create-checkout`
- Function legge `products.json` da filesystem, valida `available && stock > 0`, crea sessione one-shot Stripe con `price_data` dinamico, shipping IT-only
- Success URL → `/grazie/?session_id=…`, cancel URL → `/#drop`

## Appuntamento / Resend

- Function manda 2 email: una al negozio (`stradanuova.7@gmail.com`) e una di conferma al cliente
- From: `Strada Nuova <noreply@stradanuovagenova.com>` — **richiede dominio verificato su Resend**
- Require di `resend` è lazy dentro try/catch (NON top level — vedi lezioni imparate)
- Calendario page-scoped IIFE, orari mar-sab 10:00-12:30 / 16:00-19:30 (corretti rispetto SPA originale che aveva 9-13/16-19)

## CMS

- Backend git-gateway su branch `main`, scrive su `_data/products.json` e `_data/info.json` (quest'ultimo non esiste ancora, lo crea al primo save)
- Schema con 2 collection: "Prodotti Drop" (list widget) + "Info Negozio" (email/tel/social)
- Media folder: `img/`
- Dopo un save CMS: `git stash && git pull --rebase origin main && git stash pop`
- **Trigger build:** quando il CMS committa, l'hook Netlify rilancia `npm install && npm run build` → `build-drop-grid` re-inietta automaticamente le card aggiornate nella home

## SEO highlights

- **JSON-LD pattern:** ogni cross-page `@id` ref ha `name` + `url` inline (Google processa page-by-page, no resolution cross-page)
- **Title:** 30-60 char, max 7 parole, no brand trailing, no anno generico
- **Description:** ~155 char, info aggiuntiva al title, no keyword stuffing
- **Internal linking:** anchor variation primaria, 0 exact-match stuffing
- **A11y:** skip-link, `<main id="main">`, `<button aria-expanded>` per hamburger, `aria-live="polite"` per status, prefers-reduced-motion in base.css
- **robots.txt:** allow AI bot (Google-Extended, GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Applebot-Extended). Disallow Bytespider/CCBot/Diffbot/Omgilibot/ImagesiftBot
- **llms.txt:** indice markdown delle pagine principali per crawler AI
- **NO FAQPage schema:** Google ha rimosso rich result in maggio 2026. FAQ tenute come HTML semantico (`<details>`/`<summary>`)
- **NO Service.offers** senza price, **NO Service.aggregateRating** (Service non parent eligible rich snippet)

## Stile

- Palette: `--bg #1a1a1a`, `--bg-card #242424`, `--text #f0f0f0`, `--text-dim #888`, `--accent #e8531e` (arancio logo SN), `--accent-hover #ff6a35`, `--border #333`
- Font: Inter 400/600 self-host woff2
- Ispirazione: Supreme streetwear ma sobrio. Tono frasi corte, zero retorica
- Mobile: menu fullscreen overlay con `!important`, toggle X ↔ ☰

## ENV vars su Netlify

| Variabile | Stato | Uso |
|-----------|-------|-----|
| `STRIPE_SECRET_KEY` | ⚠️ da verificare se configurata | create-checkout.js |
| `RESEND_API_KEY` | ⚠️ da verificare + dominio Resend da verificare | request-appointment.js |
| `NETLIFY_SITE_ID` | da config Identity | git-gateway |
| `NETLIFY_BLOBS_TOKEN` | non in uso attivo nelle functions correnti | (riservato per Blobs futuri) |
| `ADMIN_KEY` | non in uso attivo | (riservato) |

## Stato (2026-05-12)

✅ Sito live con SSL su stradanuovagenova.com
✅ Migrazione SPA → multi-pagina **completata fino a Fase 9.1** (13 pagine fisiche)
✅ CMS Decap configurato su `/admin` con Identity widget, Decap v3.3.3 pinned
✅ Foto reali in img/ (hero, palazzo-lomellino, famiglia, materie, drop)
✅ GBP migrato a stradanuovagenova.com, categorie secondarie aggiunte
✅ robots.txt, llms.txt, sitemap.xml, 404.html, JSON-LD su tutte le pagine
✅ 4 pillar online: tessuti-genova (1523) + tendaggi-genova (1557) + carta-da-parati-genova (1929) + rivestimenti-murali-genova (1672)
✅ Hub `/marchi/` + brand pages Élitis (832) e Cole & Son (988)
✅ Smoke test 22/22 verde contro localhost

🟡 **In corso:** Fasi 9.2 → 18 (8 brand pages rimanenti, servizi, verticali, magazine, performance, a11y) — vedi [PLAN.md](PLAN.md)

⚠️ **Workflow attuale:** commit locali sì, push solo a fine migrazione su autorizzazione esplicita (vedi memoria `feedback_push_locale`)

⚠️ **Da verificare/finire:**
- `STRIPE_SECRET_KEY` configurata sulle env vars Netlify? Senza, il checkout torna 500
- `RESEND_API_KEY` configurata? Dominio `stradanuovagenova.com` verificato su Resend?
- Test end-to-end form appuntamento Fase 5 (rimandato a push live)
- Stock pouf NON decrementato dopo acquisto (no webhook Stripe)
- `_data/info.json` non esiste ancora — il CMS lo creerà al primo save
- Coordinate GPS esatte negozio + Place ID GBP per `hasMap` (Fase 13.5)
- 301 da sntessuti.it (richiede accesso provider vecchio sito)

## Lezioni imparate (NON ripetere)

1. Netlify Blobs con esbuild NON funziona → `node_bundler = "nft"` in [netlify.toml](netlify.toml)
2. Blobs dà `MissingBlobsEnvironmentError` con Functions v1 → serve config manuale con siteID + token se mai si riattiva
3. `require('resend')` / `require('stripe')` vanno **lazy dentro try/catch** nella function, non top-level
4. `package-lock.json` deve stare nel repo + build command `npm install`
5. Wrappare TUTTA la function in try/catch globale per evitare 502 muti
6. Git push rejected = qualcuno ha committato dal CMS → `git stash && git pull --rebase origin main && git stash pop`
7. Git Gateway perde periodicamente il token GitHub → rigenerare PAT e reinserirlo nelle settings Netlify Identity
8. **Non aggiungere MAI funzionalità non richieste** — solo quello che chiede Giuseppe
9. Apici singoli nei commit message per evitare problemi con zsh + `!`
10. **Critical CSS inline + main.css async senza copertura img → CLS massivo.** Mantenere CSS blocking, accettare ~50ms FCP extra (lezione costata 1 revert su sister project)
11. **Cross-page `@id` reference senza inline `name`+`url`** → 3 warning GSC. Sempre includerli
12. **Service.offers senza `price`** o **Service.aggregateRating** → schema invalido. Service non parent eligible rich snippet
13. **`fade-in` su elemento LCP candidate** → Lighthouse aspetta la transizione, LCP crash

## File da ignorare

- `.DS_Store` (root e `img/`) — coperti da `.gitignore`
- `PROMPT-RIPRESA.md` — vecchio bootstrap prompt, da cancellare
- `_test-pilot/` — pagine di test locali, in `.gitignore`
- `node_modules/`, `.cache/`, `.env*` — in `.gitignore`

## Profilo utente

Giuseppe Rizzo — background digital (ex product owner, ex imprenditore e-commerce). Sa git, DNS, Netlify, Network tab. **Risposte in italiano, dirette, zero accondiscendenza, niente spiegazioni base, niente feature non richieste.** Se un'idea è debole va detto subito.
