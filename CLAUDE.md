# Strada Nuova Genova — stato dell'arte

Sito del negozio di tessuti e interior design **Strada Nuova**, Via Garibaldi 7/a, Palazzo Lomellino (Rolli/UNESCO), Genova. Gestione: **Giulia Organo** (terza generazione) + **Brunella**.

- Dominio: stradanuovagenova.com (Namecheap → DNS Netlify)
- Repo: github.com/Giuserrr/stradanuovagenova
- Netlify Site ID: 3119e79e-ed19-4cbd-ac5f-f4fac7233c8e (team digitalwow)
- Email negozio: stradanuova.7@gmail.com

## Stack (aggiornato 2026-05-13 notte — post push live + serata di rifiniture)

**Migrazione SEO PUSHATA IN PRODUZIONE il 2026-05-12.** La SPA originale è ufficialmente sparita; il sito è ora HTML5 vanilla multi-pagina vero, live su stradanuovagenova.com. 28 pagine pubbliche (+ admin Decap + 404): 8 contenuto + 1 hub /marchi/ + 10 brand pages + 1 hub /servizi/ + 1 servizio + 3 verticali geo-luxe + 1 hub /magazine/ + 1 articolo + 2 noindex/admin. Smoke test 40/40 verde contro produzione. **18 commit pushati in un singolo deploy (`eb48fa9..c9ab104`) + 13 commit di rifinitura post-push nella nottata 2026-05-12 → 2026-05-13 (`8a43a78..5cdb45c`).**

### Serata 2026-05-12 → notte 2026-05-13 (13 commit)

- `8a43a78` audit fix (title magazine + 4 description >175ch)
- `e030b7d` disambiguazione brand "Strada Nuova" → "Strada Nuova Genova" su 27 file + Organization `alternateName`/`legalName` + author Person Giulia Organo nel magazine + cognome Orlandini→Organo
- `48d881e` cleanup `.claude/` + `PROMPT-RIPRESA.md` dal tracking
- `2aee2f0..77a7448` Fase 13.7: 6 drop card con foto pouf reali scontornate via rembg+u2net + magick -trim
- `3c11183` Fase 13.5: Maps embed in /contatti + `geo`+`hasMap` JSON-LD
- `544c9c8` Entity unification: GBP URL in `sameAs` Store
- `93fb6b8..5cdb45c` Fase 13.8: build-reviews.js + blocco Recensioni Google in home+contatti (5★ · 14 recensioni)
- `560fbe5` pagina /grazie/ allineata a spedizione (no più "ritiro in negozio")
- **Stripe LIVE attivato** (no commit, configurazione env vars Netlify): `STRIPE_SECRET_KEY=sk_live_...`. Flusso e-commerce funzionante in produzione su https://stradanuovagenova.com/

**Stato Fasi 0-13 + 13.5 + 13.6 + 13.7 + 13.8 chiusi (vedi [PLAN.md](PLAN.md)). Nav 8 voci + footer 4 colonne propagati su 29 file. 6 drop card con foto reali scontornate via rembg. Maps embed in `/contatti/` + `geo` + `hasMap` JSON-LD su Store/Place. **Blocco "Recensioni Google" in home+contatti** via Places API (New) + [tools/build-reviews.js](tools/build-reviews.js) — 5★ · 14 recensioni renderizzate al build. GSC verificato + sitemap submittata + 10 URL forzate. Smoke 40/40 verde. Next: Fase 14 step 2 (Bing WMT + IndexNow + Lighthouse).**

### Caratteristiche
- **HTML5 vanilla multi-pagina.** Niente framework, niente bundler
- **Catch-all SPA `/* → /index.html` rimosso** da netlify.toml in Fase 6
- Nav + footer **duplicati esplicitamente** in ogni pagina. Pattern accettato fino a 30 pagine, riduce rischio rottura Decap CMS, diff-friendly. Sync via [tools/sync-nav-footer.js](tools/sync-nav-footer.js) che usa [templates/nav.html](templates/nav.html) e [templates/footer.html](templates/footer.html) come source of truth. `--dry-run` (default) prima di `--write`. Idempotente
- Marker `<!-- BUILD:X:START/END -->` per zone auto-generate (drop grid da `_data/products.json`; magazine in Fase 12)
- CSS condiviso in [assets/css/base.css](assets/css/base.css) — **blocking, non async** (anti-pattern critical inline scartato dopo lezione sister project)
- Font Inter 400+600 **self-host woff2** in [assets/fonts/](assets/fonts/) (109KB + 112KB da rsms.me). Zero richieste a Google Fonts CDN
- JS condiviso: [assets/js/nav-toggle.js](assets/js/nav-toggle.js), [assets/js/buy-product.js](assets/js/buy-product.js). Event listener no `onclick` inline
- Script Node in [tools/](tools/): `store.js`, `build-sitemap.js`, `build-drop-grid.js`, `build-magazine.js` (stub Fase 12), `sync-nav-footer.js`, `smoke-test.js`
- Pipeline foto prodotto: **rembg** (CLI Python via pipx, modello u2net ~170MB scaricato in `~/.u2net/u2net.onnx`) + **ImageMagick 7** (`-trim` + `-resize 1100x1100` + `-extent 1200x1200` + alpha trasparente). Output WebP + AVIF in `img/drop/` con alpha per comporre su `background: #2e2e2e` della card
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
├── marchi/dedar/index.html             ← brand 902 parole
├── marchi/pierre-frey/index.html       ← brand 966 parole
├── marchi/designers-guild/index.html   ← brand 914 parole
├── marchi/rubelli/index.html           ← brand 1010 parole
├── marchi/sanderson-morris-co/index.html ← brand combinato 1050 parole
├── marchi/zoffany/index.html           ← brand 944 parole
├── marchi/houles/index.html            ← brand 999 parole (passamaneria)
├── marchi/etro-tessuti/index.html      ← brand 883 parole
├── servizi/index.html                  ← hub servizi
├── servizi/consulenza-arredo-tessile/index.html ← servizio ~1200 parole
├── tessuti-palazzi-storici-genova/index.html    ← verticale 1529 parole
├── tessuti-casa-al-mare-liguria/index.html      ← verticale 1438 parole
├── tessuti-tende-portofino-tigullio/index.html  ← verticale minimal 583 parole
├── magazine/index.html                 ← hub magazine minimal
├── magazine/quanto-costa-ritappezzare-divano-genova/index.html ← articolo pillar 1567 parole
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
│   ├── build-magazine.js               (stub, pipeline MD rimandata Fase 18)
│   ├── sync-nav-footer.js              ← Fase 13.6: sync nav+footer da templates/ a tutti gli HTML
│   └── smoke-test.js
├── magazine/{content,articles}/        ← cartelle placeholder Decap/MD pipeline (rimandata Fase 18)
├── img/                                ← hero, palazzo-lomellino, famiglia, materie, drop (webp + avif, 1920x1080 / 1200x800)
│   └── drop/                           ← 6 foto pouf scontornate via rembg (01..06.{webp,avif}, 1200x1200 con alpha trasparente)
├── _headers                            ← Netlify cache + security headers
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
| `/marchi/dedar/` | [marchi/dedar/index.html](marchi/dedar/index.html) | WebPage + Brand + BreadcrumbList | Brand 902 parole |
| `/marchi/pierre-frey/` | [marchi/pierre-frey/index.html](marchi/pierre-frey/index.html) | WebPage + Brand + BreadcrumbList | Brand 966 parole |
| `/marchi/designers-guild/` | [marchi/designers-guild/index.html](marchi/designers-guild/index.html) | WebPage + Brand + BreadcrumbList | Brand 914 parole |
| `/marchi/rubelli/` | [marchi/rubelli/index.html](marchi/rubelli/index.html) | WebPage + Brand + BreadcrumbList | Brand 1010 parole |
| `/marchi/sanderson-morris-co/` | [marchi/sanderson-morris-co/index.html](marchi/sanderson-morris-co/index.html) | WebPage + Brand[Brand,Brand] + BreadcrumbList | Brand combinato 1050 parole |
| `/marchi/zoffany/` | [marchi/zoffany/index.html](marchi/zoffany/index.html) | WebPage + Brand + BreadcrumbList | Brand 944 parole |
| `/marchi/houles/` | [marchi/houles/index.html](marchi/houles/index.html) | WebPage + Brand + BreadcrumbList | Brand 999 parole (passamaneria) |
| `/marchi/etro-tessuti/` | [marchi/etro-tessuti/index.html](marchi/etro-tessuti/index.html) | WebPage + Brand + BreadcrumbList | Brand 883 parole |
| `/servizi/` | [servizi/index.html](servizi/index.html) | CollectionPage + BreadcrumbList | Hub servizi minimal |
| `/servizi/consulenza-arredo-tessile/` | [servizi/consulenza-arredo-tessile/index.html](servizi/consulenza-arredo-tessile/index.html) | WebPage + Service + BreadcrumbList | Servizio ~1200 parole, NO offers, NO aggregateRating |
| `/tessuti-palazzi-storici-genova/` | [tessuti-palazzi-storici-genova/index.html](tessuti-palazzi-storici-genova/index.html) | CollectionPage + Place + TouristAttraction + BreadcrumbList | Verticale 1529 parole, Rolli, soprintendenza, boiserie tessile, Palazzo Lomellino case study |
| `/tessuti-casa-al-mare-liguria/` | [tessuti-casa-al-mare-liguria/index.html](tessuti-casa-al-mare-liguria/index.html) | CollectionPage + AdministrativeArea + BreadcrumbList | Verticale 1438 parole, sole/salsedine/umidità, outdoor solution-dyed, Ponente/Centro/Levante |
| `/tessuti-tende-portofino-tigullio/` | [tessuti-tende-portofino-tigullio/index.html](tessuti-tende-portofino-tigullio/index.html) | WebPage + Place + BreadcrumbList | Verticale minimal 583 parole, canale Levante non investito |
| `/magazine/` | [magazine/index.html](magazine/index.html) | CollectionPage + BreadcrumbList | Hub magazine minimal, article card scritta a mano |
| `/magazine/quanto-costa-ritappezzare-divano-genova/` | [magazine/quanto-costa-ritappezzare-divano-genova/index.html](magazine/quanto-costa-ritappezzare-divano-genova/index.html) | Article + WebPage + BreadcrumbList | Articolo pillar 1567 parole, prezzi triangolati con WebSearch, scenari A/B/C, disclaimer onesto |
| `/admin/` | [admin/index.html](admin/index.html) | (CMS) | Decap CMS, robots disallow |

**Sitemap:** 27 URL indicizzabili (esclude `/grazie/` per noindex). Auto-generato da [tools/build-sitemap.js](tools/build-sitemap.js) con `lastmod` da `git log -1 --format=%cI`. NO priority/changefreq.

**Fase 9 chiusa:** tutte e 10 le brand page sono online in locale. Niente link interni rotti residui da Fase 9.

**Fase 10 chiusa:** hub `/servizi/` + pagina servizio `/servizi/consulenza-arredo-tessile/` online in locale. Service JSON-LD senza offers/aggregateRating (Service non parent-eligible rich snippet). Esplicita disambiguazione cosa facciamo vs cosa NON facciamo (posa carta, confezionamento tende, ritappezzeria affidati ad artigiani esterni).

**Fase 11 chiusa:** 3 verticali geo-luxe online in locale. `tessuti-palazzi-storici-genova` (1529 parole, asset autorità più forte del sito insieme a `palazzo-lomellino`). `tessuti-casa-al-mare-liguria` (1438 parole, taglio tecnico su sole/salsedine/umidità + distinzione Ponente/Centro/Levante). `tessuti-tende-portofino-tigullio` (583 parole, canale non investito ma presidiato per query).

**Fase 12 chiusa (minimal):** hub `/magazine/` + 1° articolo pillar `quanto-costa-ritappezzare-divano-genova` (1567 parole, alto intent commerciale, prezzi triangolati con WebSearch nazionale/regionale, scenari A/B/C concreti, disclaimer onesto su cosa NON facciamo direttamente). Build script Markdown→HTML rimandato a Fase 18 (cadenza mensile). Tono asciutto richiesto esplicitamente da Giuseppe ("non scrivere come AI").

**Fase 13 chiusa (parziale):** AVIF generati con ImageMagick per tutte e 5 le immagini (hero 263→136 KB, materie 137→112 KB, palazzo-lomellino 107→86 KB, drop 162→129 KB, famiglia 111→90 KB). `<picture>` wrapping su 13 `<img>` con fallback WebP. Preload AVIF con `type="image/avif"` su 8 hero LCP. `_headers` Netlify: cache immutable 1 anno su `/assets/*` e `/img/*`, security headers globali (X-Content-Type-Options, X-Frame-Options SAMEORIGIN per compat Decap Identity, Referrer-Policy, Permissions-Policy minimal, HSTS 2 anni). **NO CSP** ora (rompe Stripe/Decap/Identity senza test). **PSI + Lighthouse rimandati a post-push live.**

**Push live 2026-05-12 (commit `eb48fa9..c9ab104`):** 18 commit fino a quel momento in locale spinti in un singolo deploy. Sito multi-pagina ora live su https://stradanuovagenova.com. Smoke test 40/40 verde contro produzione. AVIF servito con `cache-control: public,max-age=31536000,immutable`. Security headers attivi (HSTS 2 anni, X-Frame-Options SAMEORIGIN, ecc.). Meta `google-site-verification=scnsJjaFbiL0tt1tOwIuGKWbw4iKpPGD4KwO07uFNFE` in [index.html:11](index.html#L11) — verifica GSC pendente (Giuseppe deve aggiungere proprietà via "Prefisso URL → Tag HTML" oppure Domain property via TXT DNS su Netlify).

---

## Architettura informativa: nav + footer

**Definita 2026-05-12 dopo verifica competitor Pittaluga / Taddei / Tende SRL.** Source of truth: [templates/nav.html](templates/nav.html) + [templates/footer.html](templates/footer.html), propagati su tutti gli HTML pubblici via [tools/sync-nav-footer.js](tools/sync-nav-footer.js) (Fase 13.6). NON modificare nav/footer file-per-file: passa dai template e rilancia lo script con `--dry-run` prima di `--write`.

### Nav top — 8 voci (in ordine)

| # | Voce | Link | Razionale |
|---|------|------|-----------|
| 1 | Tessuti | `/tessuti-genova/` | Pillar keyword #1 + opportunità competitor |
| 2 | Tendaggi | `/tendaggi-genova/` | Pillar keyword #2 + opportunità competitor |
| 3 | Carta da parati | `/carta-da-parati-genova/` | Pillar keyword in crescita + opportunità competitor |
| 4 | Marchi | `/marchi/` | Hub 10 brand → link juice ai brand singoli |
| 5 | Magazine | `/magazine/` | Editorial signal + freshness |
| 6 | Chi siamo | `/chi-siamo/` | Brand asset, standard settore |
| 7 | Contatti | `/contatti/` | NAP, local SEO + UX standard |
| 8 | Appuntamento | `/appuntamento/` | CTA primaria (style differenziato) |

**Razionale competitor (sources):** [Pittaluga](https://www.pitcasa.com/), [Taddei](https://www.tessutigenovataddei.com/), [Tende SRL](https://www.tendesrl.it/) tutti nascondono le keyword pillar sotto dropdown "Prodotti". Esponendole top-level otteniamo anchor exact-match site-wide su 28 pagine = vantaggio competitivo SEO interno.

### Footer — 4 colonne (mobile 2-col)

- **Catalogo:** Tessuti · Tendaggi · Carta da parati · **Rivestimenti murali** · Marchi
- **Specializzazioni:** Tessuti palazzi storici · Casa al mare Liguria · Portofino e Tigullio · Servizi consulenza · Palazzo Lomellino
- **Negozio:** Chi siamo · Magazine · Drop · Appuntamento · Contatti
- **Strada Nuova:** NAP completa (Via Garibaldi 7/a · +39 010 895 6256 · stradanuova.7@gmail.com) · orari Mar-Sab 10-12:30 / 16-19:30 · Instagram · Facebook · © 2026

### Pagine fuori dal nav top (raggiungibili da footer + cross-link in-content)

- `/rivestimenti-murali-genova/` — pillar 1672 parole
- `/servizi/` + `/servizi/consulenza-arredo-tessile/`
- `/tessuti-palazzi-storici-genova/`, `/tessuti-casa-al-mare-liguria/`, `/tessuti-tende-portofino-tigullio/` — verticali geo-luxe
- `/palazzo-lomellino/` — asset autorità

### Trigger di promozione nav (criteri oggettivi, monitorabili via GSC)

- **Rivestimenti murali → entra nel nav** se CTR>1% e impressions>200/mese per 2 mesi consecutivi
- **Servizi → entra nel nav** quando aggiungiamo secondo servizio reale
- **Verticali geo-luxe → entrano nel nav** se diventano top-5 per impressions
- **Magazine → resta nel nav** finché ≥3 articoli (oggi 1, trigger di uscita se non cresce in 6 mesi)
- Candidato all'uscita per far spazio: "Carta da parati" se search volume risulta inferiore al nuovo entrante

---

**Fase 13.6 chiusa (2026-05-12):** nav 8 voci + footer 4 colonne propagati su 29 file via [tools/sync-nav-footer.js](tools/sync-nav-footer.js). Aria-current calcolato dal path file (descendant `/marchi/elitis/` marca Marchi nel nav). CTA Appuntamento differenziata con classe `.nav-cta` (border arancio, hover full background). Footer responsive: 4 col @desktop, 2 col @900px, 1 col @480px. Smoke test 40/40 verde post-sync. Script idempotente verificato (re-run = 0 modifiche).

## Drop / Stripe

- Prodotti in [_data/products.json](_data/products.json): 6 pouf (N.01–N.06), schema `{id, name, detail, price, stock, available, image, stripePrice}`
- **Pre-rendering server-side**: [tools/build-drop-grid.js](tools/build-drop-grid.js) inietta le card tra `<!-- BUILD:DROP_GRID:START/END -->` di index.html. Idempotente. Vantaggio: AI bot no-JS vedono i prodotti
- **Foto pouf scontornate (2026-05-12 sera):** sostituiti i placeholder `<div role="img">` con `<picture><source AVIF><img WebP></picture>` con `alt` indicizzabile + `loading="lazy"`. Pipeline: `rembg i in.jpg out.png` (u2net) → `magick out.png -trim +repage -resize 1100x1100 -background none -gravity center -extent 1200x1200`. CSS `.drop-card-img` con `object-fit: contain` + `background: #2e2e2e` (fa da fondo neutro al pouf scontornato). Mapping sorgenti: 01=IMG_7902 (Dedar), 02=IMG_7904 (Pierre Frey), 03=IMG_7898 (Designers Guild), 04=IMG_7905 (Lino), 05=IMG_7901 (Etro), 06=IMG_7892 (Bouclé)
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
- **Nav top site-wide con keyword pillar esposte:** anchor exact-match "Tessuti" / "Tendaggi" / "Carta da parati" presenti su tutte le 28 pagine. Vantaggio competitivo verificato vs Pittaluga/Taddei/Tende SRL che nascondono in dropdown. Footer 4 colonne assicura che ogni pagina non-nav (rivestimenti murali, servizi, verticali, palazzo) sia 1 click via footer da ogni altra pagina (crawl depth ≤2 garantita)

## Stile

- Palette: `--bg #1a1a1a`, `--bg-card #242424`, `--text #f0f0f0`, `--text-dim #888`, `--accent #e8531e` (arancio logo SN), `--accent-hover #ff6a35`, `--border #333`
- Font: Inter 400/600 self-host woff2
- Ispirazione: Supreme streetwear ma sobrio. Tono frasi corte, zero retorica
- Mobile: menu fullscreen overlay con `!important`, toggle X ↔ ☰

## ENV vars su Netlify

| Variabile | Stato | Uso |
|-----------|-------|-----|
| `STRIPE_SECRET_KEY` | ✅ configurata LIVE (`sk_live_...`) 2026-05-13 | create-checkout.js. Flusso end-to-end testato in test mode con `sk_test_...` (4242 4242 4242 4242 → checkout → /grazie/), poi switch a live. Account Stripe attivato "strada nuova srls" |
| `RESEND_API_KEY` | ⚠️ da verificare + dominio Resend da verificare | request-appointment.js |
| `GOOGLE_PLACES_API_KEY` | ✅ configurata 2026-05-13 (chiave server-side, no referrer restriction, API restriction: Places API New) | build-reviews.js |
| `GOOGLE_PLACE_ID` | ✅ configurata 2026-05-13 (`ChIJR-TtRF1D0xIReS_hRVSpVhI`) | build-reviews.js |
| `NETLIFY_SITE_ID` | da config Identity | git-gateway |
| `NETLIFY_BLOBS_TOKEN` | non in uso attivo nelle functions correnti | (riservato per Blobs futuri) |
| `ADMIN_KEY` | non in uso attivo | (riservato) |

## Stato (aggiornato 2026-05-12, post push live)

✅ Sito live con SSL su stradanuovagenova.com — **TUTTA la migrazione multi-pagina ora in produzione** (18 commit pushati 2026-05-12)
✅ Migrazione SPA → multi-pagina **completata fino a Fase 13** (28 pagine fisiche + AVIF + _headers live)
✅ CMS Decap configurato su `/admin` con Identity widget, Decap v3.3.3 pinned
✅ Foto reali in img/ (hero, palazzo-lomellino, famiglia, materie, drop)
✅ GBP migrato a stradanuovagenova.com, categorie secondarie aggiunte
✅ robots.txt, llms.txt, sitemap.xml, 404.html, JSON-LD su tutte le pagine
✅ 4 pillar online: tessuti-genova (1523) + tendaggi-genova (1557) + carta-da-parati-genova (1929) + rivestimenti-murali-genova (1672)
✅ Hub `/marchi/` + **tutte le 10 brand pages**: Élitis (832) + Cole & Son (988) + Dedar (902) + Pierre Frey (966) + Designers Guild (914) + Rubelli (1010) + Sanderson/Morris (1050) + Zoffany (944) + Houlès (999) + Etro Tessuti (883)
✅ Hub `/servizi/` + servizio `/servizi/consulenza-arredo-tessile/` (~1200 parole, Service JSON-LD valido)
✅ 3 verticali geo-luxe: palazzi-storici (1529) + casa-al-mare-liguria (1438) + tende-portofino-tigullio minimal (583)
✅ Hub `/magazine/` + 1° articolo "quanto costa ritappezzare un divano a Genova" (1567 parole, prezzi triangolati con WebSearch)
✅ AVIF su tutte le immagini + `<picture>` wrapping con fallback WebP + `_headers` Netlify (cache immutable + security headers) — **tutto live**
✅ Smoke test 40/40 verde contro https://stradanuovagenova.com
✅ Meta `google-site-verification` inserito in home (commit `c9ab104`, live)

✅ **Fase 13.6 chiusa:** nav 8 voci (Tessuti / Tendaggi / Carta da parati / Marchi / Magazine / Chi siamo / Contatti / Appuntamento-CTA) + footer 4 colonne (Catalogo / Specializzazioni / Negozio / NAP) propagati su 29 file. Pagine non più orfane: rivestimenti-murali, servizi, 3 verticali geo-luxe, palazzo-lomellino sono tutte raggiungibili in 1 click via footer da qualunque pagina.

✅ **Audit Kimi integrato (2026-05-12 sera):** review esterna ricevuta, accettati 3 fix dei 5 punti proposti — disambiguazione brand "Strada Nuova" vs "Musei di Strada Nuova" (og:site_name → "Strada Nuova Genova" su 27 file + Organization JSON-LD `alternateName`+`legalName`), author Person nel magazine article (Giulia Organo + jobTitle + worksFor), correzione cognome storico Orlandini→Organo in chi-siamo/CLAUDE.md/memoria. Scartati 2 punti: FAQPage schema (Google ha rimosso rich result mag 2026), Service Worker/PWA (over-engineering). Verificato che `loading="lazy"` era già a posto (Kimi aveva allucinato su quello).

✅ **Fase 13.7 chiusa (sera 2026-05-12):** 6 drop card con foto reali pouf showroom scontornate via rembg+u2net e ricomposte con magick. Sostituito il render `<div role="img" style="background-image">` con `<picture>` `<source>` AVIF + `<img>` WebP indicizzabile (alt = nome + detail), `loading=lazy` (sono below-fold), `object-fit: contain` su card background #2e2e2e. Cancellate dal repo le 4 immagini AI Gemini iniziali e i loro PNG sorgenti in `~/Downloads/`.

✅ **Fase 14 step 1 chiuso (sera 2026-05-12):** GSC verificato via Prefisso URL+meta tag, sitemap.xml submittata (27 URL), 10 URL forzate via "Richiedi indicizzazione" (home + 4 pillar + hub marchi + palazzo-lomellino + tessuti-palazzi-storici + magazine articolo + chi-siamo). Bing Webmaster Tools + IndexNow ancora da fare.

🟡 **Next: Fase 14 step 2** (Bing WMT + IndexNow + Lighthouse audit live), poi Fasi 15-18 (GBP, 301, a11y, magazine mensile)

⚠️ **Workflow attuale:** dopo il push del 2026-05-12 si torna a "commit + push frequenti" — migrazione chiusa, le piccole modifiche vanno live subito. La memoria `feedback_push_locale` resta valida per future migrazioni grosse

⚠️ **Da verificare/finire:**
- ~~`STRIPE_SECRET_KEY` configurata sulle env vars Netlify? Senza, il checkout torna 500~~ ✅ chiusa 2026-05-13: configurata `sk_live_...`, smoke test live OK con redirect a /grazie/
- `RESEND_API_KEY` configurata? Dominio `stradanuovagenova.com` verificato su Resend? — ANCORA APERTA, il form appuntamento non manda email finché non risolta
- Test end-to-end form appuntamento Fase 5 (rimandato a push live)
- Stock pouf NON decrementato dopo acquisto (no webhook Stripe)
- `_data/info.json` non esiste ancora — il CMS lo creerà al primo save
- ~~Coordinate GPS esatte negozio + Place ID GBP per `hasMap` (Fase 13.5)~~ ✅ chiusa: GPS `44.41133147877727, 8.933433457224718` + Place ID `ChIJR-TtRF1D0xIReS_hRVSpVhI` + Maps API key client-side con restrizioni referrer `*.stradanuovagenova.com/*`
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
14. **`Cache-Control: immutable` su asset con nome non versionato** → browser non rivalida mai, vedi sempre vecchio CSS/JS anche dopo push. Soluzione: aggiungere `?v=<data>` ai `<link>`/`<script>` quando cambi `base.css`, `nav-toggle.js`, `buy-product.js`. Pattern: bump del query string ad ogni modifica asset
15. **Background removal foto prodotto:** rembg+u2net via `pip install` su Python 3.14 fallisce (PEP 668 external-managed). Soluzione: `pipx install 'rembg[cli]'` + `pipx inject rembg onnxruntime`. Per pouf con frange morbide il modello u2net è ok ma può lasciare bordi sfilacciati — il rimedio è `-trim` (riduce al bounding box reale) + `-resize 1100x1100 -extent 1200x1200` (padding alpha al 92%) per dimensione uniforme tra card diverse. Sfondo PNG/WebP/AVIF trasparente + CSS `.drop-card-img background: #2e2e2e` = look edge-to-edge senza dover replicare gradient
16. **`object-fit: cover` su card prodotto con foto verticale** → il soggetto viene tagliato. `object-fit: contain` + background neutro card è il pattern showroom (Hay, Vitra). Allineato meglio con foto product-on-white o scontornate
17. **Places API ha 2 versioni distinte in Google Cloud:** `Places API` (legacy) e `Places API (New)`. L'endpoint `places.googleapis.com/v1/places/{place_id}` richiede la "(New)". Attivare entrambe non fa danno; restrizioni API della chiave devono includere "(New)" altrimenti `API_KEY_SERVICE_BLOCKED` 403. Anche dopo attivazione, ~1-2 min di propagazione prima che le chiamate vadano a buon fine
18. **Maps client-side vs Places server-side richiedono chiavi distinte:** client-side (iframe Maps Embed) ha referrer-restriction HTTP `*.dominio/*` perché finisce in HTML pubblico; server-side (build-reviews.js da Netlify build) NON può avere referrer-restriction perché build server ha referrer vuoto. Soluzione: 2 chiavi separate sullo stesso progetto Cloud, ognuna con scope diverso. Spending cap 0€ via carta virtuale protegge entrambe

## File da ignorare

- `.DS_Store` (root e `img/`) — coperti da `.gitignore`
- `PROMPT-RIPRESA.md` — vecchio bootstrap prompt, da cancellare
- `_test-pilot/` — pagine di test locali, in `.gitignore`
- `node_modules/`, `.cache/`, `.env*` — in `.gitignore`

## Profilo utente

Giuseppe Rizzo — background digital (ex product owner, ex imprenditore e-commerce). Sa git, DNS, Netlify, Network tab. **Risposte in italiano, dirette, zero accondiscendenza, niente spiegazioni base, niente feature non richieste.** Se un'idea è debole va detto subito.
