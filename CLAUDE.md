# Strada Nuova Genova — stato dell'arte

Sito del negozio di tessuti e interior design **Strada Nuova**, Via Garibaldi 7/a, Palazzo Lomellino (Rolli/UNESCO), Genova. Gestione: **Giulia Orlandini** (terza generazione) + **Brunella**.

- Dominio: stradanuovagenova.com (Namecheap → DNS Netlify)
- Repo: github.com/Giuserrr/stradanuovagenova
- Netlify Site ID: 3119e79e-ed19-4cbd-ac5f-f4fac7233c8e (team digitalwow)
- Email negozio: stradanuova.7@gmail.com

## Stack

### Stato attuale (pre-migrazione SEO)
- SPA vanilla: **un unico [index.html](index.html)** (~1280 righe, HTML+CSS+JS inline)
- Routing SPA con `pushState`/`popstate` + hash, redirect catch-all `/* → /index.html status=200` in [netlify.toml](netlify.toml)
- CMS: **Decap CMS** v3.3.3 con git-gateway su `/admin`
- Auth CMS: **Netlify Identity** (invite-only, utente g.rizzo86@gmail.com)
- Functions Node.js con `node_bundler = "nft"`
- Pagamenti: Stripe Checkout — [netlify/functions/create-checkout.js](netlify/functions/create-checkout.js)
- Email appuntamenti: Resend API — [netlify/functions/request-appointment.js](netlify/functions/request-appointment.js)

### Stack target (post-migrazione SEO, vedi [PLAN.md](PLAN.md))
- **HTML5 vanilla multi-pagina**, ~20-25 file in cartelle dedicate (`/tessuti-genova/`, `/marchi/dedar/`, ecc.)
- **Nessun framework, nessun bundler.** Duplicazione esplicita di nav/footer per pagina (~80 righe), accettabile fino a 25 pagine, riduce rischio rottura Decap CMS
- Marker pattern `<!-- BUILD:X:START/END -->` per zone auto-generate (drop grid da products.json, magazine latest, FAQ)
- Script Node mirati in `tools/`: `build-sitemap.js`, `build-magazine.js` (`marked` + `gray-matter`), `build-drop-grid.js`, `validate-jsonld.js`, `smoke-test.js`, `gsc.js`
- CSS condiviso in `assets/css/base.css` (NON inline), font Inter self-host woff2
- Decap CMS + Netlify Functions invariati
- Catch-all SPA rimosso da netlify.toml, 404.html reale come fallback

## Struttura

```
stradanuovagenova/
├── index.html                          ← SPA completa
├── netlify.toml                        ← nft bundler + redirect SPA
├── package.json                        ← stripe, @netlify/blobs, resend
├── package-lock.json                   ← OBBLIGATORIO nel repo
├── _data/
│   └── products.json                   ← prodotti drop (CMS-managed)
├── admin/
│   ├── index.html                      ← Decap CMS + Identity widget
│   └── config.yml                      ← schema CMS
├── img/                                ← hero, palazzo-lomellino, famiglia, materie, drop (webp)
└── netlify/functions/
    ├── create-checkout.js
    └── request-appointment.js
```

## Pagine SPA

| Path | Sorgente | Note |
|------|----------|------|
| `/` | [index.html:717-780](index.html#L717-L780) | Hero (img/hero.webp) + sezione Drop (#drop, griglia da JSON) + Contatti (#contatti) |
| `/chi-siamo` | [index.html:782-829](index.html#L782-L829) | 4 blocchi alternati foto/testo: Palazzo, Famiglia, Materia, Drop |
| `/appuntamento` | [index.html:831-871](index.html#L831-L871) | Form (nome, email, tel, msg) + calendario interattivo; orari mar-sab 9-13 / 16-19, slot ogni 30 min ([index.html:1005-1014](index.html#L1005-L1014)) |
| `/grazie` | [index.html:873-881](index.html#L873-L881) | Post-checkout Stripe |
| `/admin` | [admin/index.html](admin/index.html) | Decap CMS |

## Drop / Stripe

- Prodotti in [_data/products.json](_data/products.json): 6 pouf (N.01–N.06), schema `{id, name, detail, price, stock, available, image, stripePrice}`
- Render lato client da `fetch('/_data/products.json')` con cache buster ([index.html:898-908](index.html#L898-L908))
- Acquisto chiama `POST /.netlify/functions/create-checkout` con `{productId}` → ritorna URL Stripe Checkout
- La function legge `products.json` da filesystem (NON da JSON in build), valida `available && stock > 0`, crea sessione one-shot con `price_data` dinamico (no Stripe Price ID fisso necessario), shipping IT-only
- Success URL → `/grazie?session_id=…`, cancel URL → `/#drop`

## Appuntamento / Resend

- Function manda 2 email: una al negozio (`stradanuova.7@gmail.com`) e una di conferma al cliente
- From: `Strada Nuova <noreply@stradanuovagenova.com>` — **richiede dominio verificato su Resend**
- Require di `resend` è lazy dentro try/catch (NON top level — vedi lezioni imparate)

## CMS

- Backend git-gateway su branch `main`, scrive su `_data/products.json` e `_data/info.json` (quest'ultimo non esiste ancora, lo crea al primo save)
- Schema con 2 collection: "Prodotti Drop" (list widget) + "Info Negozio" (email/tel/social)
- Media folder: `img/`
- Le scritture del CMS sono commit sul repo → se il dev lavora in locale e c'è stato un save CMS: `git stash && git pull --rebase origin main && git stash pop`

## Stile

- Palette: `--bg #1a1a1a`, `--bg-card #242424`, `--text #f0f0f0`, `--text-dim #888`, `--accent #e8531e` (arancio logo SN), `--accent-hover #ff6a35`, `--border #333`
- Font: Inter (400/500/600/700) da Google Fonts
- Ispirazione: Supreme streetwear ma sobrio. Tono frasi corte, zero retorica
- Mobile: menu fullscreen overlay con `!important` ([index.html:645+](index.html#L645)), toggle X ↔ ☰

## ENV vars su Netlify

| Variabile | Stato | Uso |
|-----------|-------|-----|
| `STRIPE_SECRET_KEY` | ⚠️ da verificare se configurata | create-checkout.js |
| `RESEND_API_KEY` | ⚠️ da verificare + dominio Resend da verificare | request-appointment.js |
| `NETLIFY_SITE_ID` | da config Identity | git-gateway |
| `NETLIFY_BLOBS_TOKEN` | non in uso attivo nelle functions correnti | (riservato per Blobs futuri) |
| `ADMIN_KEY` | non in uso attivo | (riservato) |

## Stato attuale (aggiornato al 2026-05-12)

✅ Site live con SSL su stradanuovagenova.com
✅ Tutte e 4 le pagine SPA funzionanti
✅ CMS Decap configurato su `/admin` con Identity widget e Decap v3.3.3 pinned
✅ Foto reali caricate in img/ (hero, palazzo-lomellino, famiglia, materie, drop)
✅ Menu mobile fix con !important + toggle X
✅ Calendario appuntamenti funzionante (orari mar-sab)
✅ GBP migrato a stradanuovagenova.com (era su sntessuti.it)
✅ GBP categorie secondarie aggiunte
✅ Audit SEO 2026 completato con fonti datate (vedi memoria `feedback_seo_2026` + `feedback_seo_pattern_verificati`)
✅ Decisione stack target: HTML5 vanilla multi-pagina (vedi [PLAN.md](PLAN.md))
✅ Brand trattati confermati (10 brand premium, vedi [BACKLOG.md](BACKLOG.md))

🟡 **In partenza:** migrazione da SPA singola a multi-pagina HTML5 vanilla SEO-first (18 fasi descritte in [PLAN.md](PLAN.md))

⚠️ **Da verificare/finire:**
- `STRIPE_SECRET_KEY` configurata sulle env vars Netlify? Senza, il checkout torna 500
- `RESEND_API_KEY` configurata? E dominio `stradanuovagenova.com` verificato su Resend (altrimenti `from: noreply@...` non parte)
- Stock dei pouf NON viene decrementato dopo acquisto (no webhook Stripe)
- Conferma manuale appuntamenti: la mail è solo "richiesta ricevuta"
- `_data/info.json` non esiste ancora — il CMS lo creerà al primo save dalla collection "Info Negozio"
- 301 da sntessuti.it (vedi BACKLOG)
- Coordinate GPS esatte negozio + URL `maps.app.goo.gl/<id>` GBP per `hasMap` JSON-LD

## Lezioni imparate (NON ripetere)

1. Netlify Blobs con esbuild NON funziona → `node_bundler = "nft"` in [netlify.toml](netlify.toml)
2. Blobs dà `MissingBlobsEnvironmentError` con Functions v1 → serve config manuale con siteID + token se mai si riattiva
3. `require('resend')` / `require('stripe')` vanno **lazy dentro try/catch** nella function, non top-level
4. `package-lock.json` deve stare nel repo + build command `npm install`
5. Wrappare TUTTA la function in try/catch globale per evitare 502 muti
6. Git push rejected = qualcuno ha committato dal CMS → `git stash && git pull --rebase origin main && git stash pop`
7. Git Gateway perde periodicamente il token GitHub → rigenerare PAT e reinserirlo nelle settings Netlify Identity
8. **Non aggiungere MAI funzionalità non richieste** — solo quello che chiede Giuseppe
9. Dare sempre il comando `git push` dopo ogni modifica
10. Apici singoli nei commit message per evitare problemi con zsh + `!`

## File da ignorare / sporcizia repo

- `.DS_Store` (root e `img/`) — untracked, andrebbero in `.gitignore` ma per ora non è un problema
- `PROMPT-RIPRESA.md` — untracked, è il vecchio bootstrap prompt; questo file lo sostituisce. Si può cancellare quando vuoi

## Profilo utente

Giuseppe Rizzo — background digital (ex product owner, ex imprenditore e-commerce). Sa git, DNS, Netlify, Network tab. **Risposte in italiano, dirette, zero accondiscendenza, niente spiegazioni base, niente feature non richieste.** Se un'idea è debole va detto subito.
