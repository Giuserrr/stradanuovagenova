# Strada Nuova — Piano implementativo SEO 2026

Piano granulare, ogni fase autonoma (30 min – 2h max), pensato per essere ripreso in sessioni separate senza degradare contesto.

**Stack:** HTML5 vanilla multi-pagina + script Node mirati (`marked`, `gray-matter` solo per magazine). Decap CMS esistente + Netlify Functions esistenti invariati. Marker pattern `<!-- BUILD:X:START/END -->` per zone auto-generate.

**Filosofia:** zero framework, zero bundler. Duplicazione esplicita di nav/footer (~80 righe/pagina) per ridurre rischio rottura Decap CMS + diff-friendly. Build scripts idempotenti, fail-soft.

Per il quadro generale vedi [CLAUDE.md](CLAUDE.md). Per decisioni aperte vedi [BACKLOG.md](BACKLOG.md). Pattern e anti-pattern dettagliati in memoria persistente.

---

## Stato avanzamento (2026-05-12)

| Fase | Status | Note |
|---|---|---|
| 0 — Setup repo vanilla | ✅ pushato (`dc6da8c`, `04cbe3e`) | |
| 1 — Asset condivisi | ✅ pushato (`ae4be0b`) | base.css, font Inter, templates, store.js |
| 2 — File tecnici SEO | ✅ pushato (`76452ac`, `ec90d97`) | robots/llms/sitemap/404/smoke |
| 3 — Home | ✅ commit locale (`506d96a`) | |
| 4 — chi-siamo | ✅ commit locale (`630f1ea`) | |
| 5 — appuntamento | ✅ commit locale (`7b2fb85`) | Test Resend end-to-end rimandato a push live |
| 6 — grazie + contatti + RM catch-all | ✅ commit locale (`21291bc`) | SPA legacy ufficialmente sparita |
| 7 — palazzo-lomellino | ✅ commit locale (`bd9fade`) | GPS TBD |
| 8.1 — tessuti + tendaggi pillar | ✅ commit locale (`be17e6d`) | 1523 + 1557 parole |
| 8.2 — carta da parati + rivestimenti | ✅ commit locale (`82acfaf`) | 1929 + 1672 parole |
| 9.0 — hub /marchi/ | ✅ commit locale | 10 brand listati |
| 9.1 — Élitis + Cole & Son ⭐ | ✅ commit locale (`1a24c73`) | 832 + 988 parole |
| 9.2 — Dedar + Pierre Frey | ✅ commit locale (`ac115c8`) | 902 + 966 parole |
| 9.3 — Designers Guild + Rubelli | ✅ commit locale (`ac1eac4`) | 914 + 1010 parole |
| 9.4 — Sanderson/Morris + Zoffany | ✅ commit locale (`31d6d0e`) | 1050 + 944 parole |
| 9.5 — Houlès + Etro Tessuti | ✅ commit locale | 999 + 883 parole |
| 10 — servizi consulenza | ✅ locale | hub `/servizi/` + consulenza-arredo-tessile |
| 11 — verticali geo-luxe (3) | ⬜ | |
| 12 — magazine setup + 1° articolo | ⬜ | |
| 13 — performance pass | ⬜ | AVIF, headers, CWV |
| 13.5 — Maps embed | ⬜ blocked | API key + GPS TBD |
| 14 — GSC + Bing + IndexNow | ⬜ | |
| 15 — GBP aggiornamenti | ⬜ lato Giuseppe | |
| 16 — 301 sntessuti.it | ⬜ blocked | accesso provider |
| 17 — A11y full pass | ⬜ | |
| 18 — magazine cadenza mensile | ⬜ continuativo | |

**Workflow corrente:** commit locali sì, push solo a fine migrazione su autorizzazione esplicita.
**Smoke test localhost:** 30/30 verde. **Sitemap:** 20 URL indicizzabili (esclude grazie noindex).

---

## Decisioni cristallizzate (2026-05-12)

| Decisione | Stato |
|---|---|
| Stack | **HTML5 vanilla + script Node mirati** (no framework) |
| Nome GBP | Lasciato "Strada Nuova, rivestimenti&interior design" (Giuseppe accetta rischio) |
| Categorie GBP | Ridurre a 3 (togliere "Negozio di moquette e tappeti") |
| chi-siamo + appuntamento | Convertire in statiche (appuntamento mantiene JS form + fetch Resend) |
| Magazine | Cadenza mensile, 1 articolo/mese |
| Sntessuti.it | 301 a stradanuovagenova.com (task aperto) |
| Tigullio/Portofino | Sì ma non focus → pagina minimal (500-700 parole) |
| Servizi non erogati direttamente | Posa carta da parati ❌, confezionamento tende ❌ — niente pagine |
| Mail pubblica | `stradanuova.7@gmail.com` |
| Maps embed | Fase 13.5 dedicata dopo attivazione API |
| Brand confermati | Dedar, Pierre Frey, Élitis, Cole & Son, Designers Guild, Rubelli, Sanderson/Morris & Co, Zoffany, Houlès, Etro Tessuti. NO Casamance, NO Etro Home |
| Landing locale lunghezza | 1500-2000 parole |
| Pillar nazionale magazine | 3000-4000 parole quando il topic lo giustifica |

## Pattern adottati (vedi memoria `feedback_seo_pattern_verificati`)

### JSON-LD critici
- ✅ Cross-page `@id` ref SEMPRE con `name` + `url` inline (Google processa page-by-page)
- ❌ Service.aggregateRating + review[] (Service NON parent eligible)
- ❌ Service.offers senza `price` numerico
- ✅ `hasMap` con URL GBP `maps.app.goo.gl/<id>` su LocalBusiness
- ✅ BreadcrumbList su ogni sub-page con `@id: "#breadcrumb"`
- ✅ Wikidata sameAs solo con Q-ID reali

### Title/Description
- 30-60 char, max 7 parole, NO brand trailing, NO anno generico
- Description ~155 char, info aggiuntiva al title

### Internal linking
- Anchor variation primaria, 0 exact-match stuffing
- Pillar ↔ landing locale 2-3 link cross
- 10-15 link contestuali su pillar 3000+

### Performance anti-pattern
- ❌ Critical CSS inline + main.css async senza copertura img → CSS BLOCKING
- ❌ `class="fade-in"` su LCP element
- ≤1 `fetchpriority="high"` per pagina sul vero LCP (mai logo)

### A11y (WCAG 2.1 AA + EAA UE obbligatorio)
- `<main id="main">` + skip-link
- Hamburger `<button aria-expanded aria-controls>`
- FAQ accordion accessibile
- Heading zero-skip
- prefers-reduced-motion
- Contrasto AA verificato

---

## Struttura repo finale (target)

```
stradanuovagenova/
├── index.html                          ← home con marker DROP_GRID
├── chi-siamo/index.html                ← statica
├── appuntamento/index.html             ← statica + JS form + fetch Resend
├── grazie/index.html                   ← noindex
├── contatti/index.html
├── palazzo-lomellino/index.html
├── tessuti-genova/index.html
├── tendaggi-genova/index.html
├── carta-da-parati-genova/index.html
├── rivestimenti-murali-genova/index.html
├── tessuti-palazzi-storici-genova/index.html
├── tessuti-casa-al-mare-liguria/index.html
├── tessuti-tende-portofino-tigullio/index.html
├── marchi/
│   ├── index.html                       ← hub griglia loghi
│   ├── elitis/index.html
│   ├── cole-and-son/index.html
│   ├── dedar/index.html
│   ├── pierre-frey/index.html
│   ├── designers-guild/index.html
│   ├── rubelli/index.html
│   ├── sanderson-morris-co/index.html
│   ├── zoffany/index.html
│   ├── houles/index.html
│   └── etro-tessuti/index.html
├── servizi/
│   └── consulenza-arredo-tessile/index.html
├── magazine/
│   ├── index.html                       ← hub generato da build-magazine.js
│   ├── content/                         ← sorgenti .md (gestibili anche da Decap)
│   │   └── come-scegliere-tessuti-tende.md
│   └── articles/                        ← HTML generato (gitignored o committato? — committato)
│       └── come-scegliere-tessuti-tende/index.html
├── assets/
│   ├── css/
│   │   └── base.css                     ← stili condivisi (estratti da SPA attuale)
│   ├── fonts/
│   │   ├── inter-400.woff2
│   │   └── inter-600.woff2
│   └── js/
│       └── nav-toggle.js                ← shared JS minimo
├── _data/                               ← gestito da Decap CMS, NON TOCCARE
│   └── products.json
├── admin/                               ← Decap CMS, NON TOCCARE
│   ├── index.html
│   └── config.yml
├── img/                                 ← immagini esistenti + nuove
├── netlify/functions/                   ← INVARIATE
│   ├── create-checkout.js
│   └── request-appointment.js
├── templates/                           ← snippet HTML per marker injection
│   ├── drop-card.html
│   ├── magazine-card.html
│   └── faq-item.html
├── tools/                               ← script Node
│   ├── build-sitemap.js                 ← scansiona *.html → sitemap.xml
│   ├── build-magazine.js                ← .md → .html con marked + gray-matter
│   ├── build-drop-grid.js               ← products.json → inietta in marker home
│   ├── store.js                         ← single source NAP + JSON-LD Store
│   ├── validate-jsonld.js               ← valida tutti i JSON-LD del sito
│   ├── smoke-test.js                    ← curl status 5 URL campione
│   └── gsc.js                           ← GSC API CLI con OAuth refresh token (Fase 14)
├── netlify.toml                         ← publish=".", rimosso catch-all SPA
├── package.json                         ← aggiunti marked, gray-matter
├── package-lock.json
├── robots.txt
├── sitemap.xml                          ← generato da build
├── llms.txt
├── 404.html
├── CLAUDE.md
├── PLAN.md
└── BACKLOG.md
```

---

# 🟦 Fase 0 — Setup repo vanilla (45 min)

**Obiettivo:** struttura cartelle, package.json aggiornato, netlify.toml senza catch-all, 404 reale. Sito attuale continua a funzionare invariato.

### Task

- [x] 0.1 — Aggiornare `package.json`: aggiunti `marked` ^14, `gray-matter` ^4 + scripts `build`, `build:sitemap`, `build:magazine`, `build:drop-grid`, `validate`, `smoke-test`
- [x] 0.2 — Cartelle create: `tools/`, `templates/`, `assets/css/`, `assets/fonts/`, `assets/js/`, `magazine/content/`, `magazine/articles/` (con `.gitkeep` per tracking)
- [x] 0.3 — `netlify.toml` aggiornato: build command `npm install && npm run build`, publish `.`. **Catch-all SPA MANTENUTO temporaneamente** con annotazione: sarà rimosso in Fase 6 quando `/chi-siamo`, `/appuntamento`, `/grazie` saranno file fisici (Netlify serve i file fisici prima del catch-all, quindi le nuove pagine prevarranno automaticamente)
- [x] 0.4 — `.gitignore` aggiunto: `node_modules/`, `.cache/`, `.DS_Store`, `.env`
- [x] 0.5 — `404.html` minimal con style inline + link a home / chi-siamo / appuntamento + `noindex`
- [x] 0.6 — Stub `tools/build-sitemap.js`, `tools/build-magazine.js`, `tools/build-drop-grid.js` con commento di rinvio alla fase di implementazione
- [x] 0.7 — `npm install` ✅ (108 pkg), `npm run build` ✅ (3 stub girano), push `dc6da8c` → deploy in corso

**DoD:** deploy verde, sito attuale ancora funzionante, struttura cartelle in place.

---

# 🟦 Fase 1 — Asset condivisi (1.5h)

**Obiettivo:** CSS base + font self-host + nav/footer template + store.js single source NAP/JSON-LD.

### Task

- [x] 1.1 — Inter 400 + 600 woff2 self-host da rsms.me (109KB + 112KB) in `assets/fonts/`
- [x] 1.2 — `assets/css/base.css` (5.4KB): variabili, reset, font-face Inter, nav, footer, container/section, breadcrumb, skip-link, focus-visible, responsive, prefers-reduced-motion. CSS blocking (non async)
- [x] 1.3 — `tools/store.js`: NAP, `getStoreJsonLd()`, `getOrganizationJsonLd()`, `getWebSiteJsonLd()`, `storeRef()` con name+url inline, `getBreadcrumbJsonLd(items)`, `renderJsonLd(graph, pretty)`. Brand list 11 voci, openingHours 2 fasce, geo + hasMap placeholder
- [x] 1.4 — `templates/nav.html`: skip-link + button aria-expanded/aria-controls + voci nav (Chi siamo, Tessuti, Marchi, Magazine, Appuntamento, Instagram)
- [x] 1.5 — `templates/footer.html` con copyright + link Contatti/Instagram/Facebook
- [x] 1.6 — `assets/js/nav-toggle.js`: toggle accessibile, aria-expanded true/false, label dinamica, chiusura su voce e Escape, IIFE no globals
- [x] 1.7 — Pilota `_test-pilot/index.html` (gitignored) servito via python http.server, identità visiva confermata, font self-host caricati senza richieste Google Fonts

**DoD:** una pagina di prova carica `base.css` + font Inter self-host + nav/footer duplicato → look identico a SPA attuale.

---

# 🟦 Fase 2 — File tecnici SEO base (1h)

**Obiettivo:** robots.txt, llms.txt, sitemap auto, 404 finale, smoke-test script.

### Task

- [x] 2.1 — `robots.txt`: allow `Google-Extended`, `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `Claude-SearchBot`, `Claude-User`, `PerplexityBot`, `Perplexity-User`, `Applebot-Extended`. Disallow `Bytespider`, `CCBot`, `Diffbot`, `Omgilibot`, `ImagesiftBot`. Disallow `/admin/`, `/_data/`, `/_test-pilot/`. Sitemap pointer
- [x] 2.2 — `llms.txt` con quote summary + contatti + brand + categorie + verticali + magazine. URL puntano a pagine future
- [x] 2.3 — `tools/build-sitemap.js`: walk ricorsivo, exclude paths set, `<meta robots noindex>` check, lastmod da `git log -1 --format=%cI` con fallback mtime. NO priority/changefreq
- [x] 2.4 — `404.html` redesign: base.css, nav, footer, codice 404 grande, link Home/Chi siamo/Appuntamento/Contatti, `noindex,follow`
- [x] 2.5 — `tools/smoke-test.js`: 10 URL chiave con BASE_URL override (default produzione, fallback localhost). Verde 10/10 contro 127.0.0.1:8000
- [x] 2.6 — `package.json` scripts già OK da Fase 0: `build`, `build:sitemap`, `build:magazine`, `build:drop-grid`, `validate`, `smoke-test`

**DoD:** dopo build, `sitemap.xml` valido (può anche essere vuoto se ancora niente da indicizzare oltre home). `robots.txt`, `llms.txt`, `404.html` raggiungibili via curl.

---

# 🟦 Fase 3 — Migrazione home (1.5h)

**Obiettivo:** `index.html` con nav+footer duplicati, marker DROP_GRID per pouf, JSON-LD globale (Organization+Store+WebSite), hero con `<picture>` ottimizzato.

### Task

- [x] 3.1 — `index.html` riscritto da SPA quad-pagina (1281 righe) a home statica (~420 righe). Nav+footer duplicati dai template
- [x] 3.2 — Head: title "Strada Nuova — Tessuti e tendaggi a Genova" (44ch, 7 parole), description 155ch con brand list, canonical, OG/Twitter card, theme-color
- [x] 3.3 — Hero: `<img>` con `width/height` 1920x1080, `fetchpriority="high"`, `decoding="async"` + preload. AVIF rimandato a Fase 13 performance pass. CLS eliminato (dimensioni esplicite)
- [x] 3.4 — Marker `BUILD:DROP_GRID` + `tools/build-drop-grid.js` implementato: legge products.json, escape HTML, idempotente (no-op se nessuna differenza). 6 card pre-renderate server-side
- [x] 3.5 — Contatti: mail `stradanuova.7@gmail.com`, telefono `010 895 6256` con `tel:+390108956256`, sostituito vecchio `info@`
- [x] 3.6 — JSON-LD @graph con Organization (#org), WebSite (#website), Store+LocalBusiness (#store) con brand 11, openingHoursSpecification 2 fasce, parentOrganization
- [x] 3.7 — `nav-toggle.js` + `buy-product.js` caricati con `defer`. Mantenuto Netlify Identity widget per redirect post-invito CMS
- [x] 3.8 — Bottoni Acquista usano `data-product-id` (event delegation), fetch a `/.netlify/functions/create-checkout` invariato
- [x] 3.9 — Smoke test localhost verde, JSON-LD parser-valid (Organization+WebSite+Store)

**DoD raggiunto:** home statica, JSON-LD valido, drop grid pre-renderato (vantaggio AI bot no-JS). Verifica LCP rimandata a Fase 13.

---

# 🟦 Fase 4 — Migrazione chi-siamo (1h)

**Obiettivo:** `chi-siamo/index.html` statica con i 4 blocchi attuali.

### Task

- [x] 4.1 — `chi-siamo/index.html` creata con nav+footer duplicati
- [x] 4.2 — 4 blocchi (Palazzo Lomellino, Famiglia, Materia, Drop) spostati e arricchiti (testo originale + minimo lifting). Layout alterno con `.reverse`
- [x] 4.3 — Immagini convertite a `<img>` 1200x800, `alt` geo+contestuali (4 alt distinti), `loading="lazy"`, `decoding="async"`. Nessun LCP candidate qui
- [x] 4.4 — Title "Tre generazioni di tessuti a Genova — Strada Nuova" (51ch). Description con keyword Palazzo Lomellino/Rolli/UNESCO
- [x] 4.5 — Breadcrumb visivo (Home > Chi siamo) + JSON-LD BreadcrumbList con `@id #breadcrumb`
- [x] 4.6 — JSON-LD AboutPage con isPartOf=WebSite, about=Store, mainEntity=Organization (TUTTI inline name+url)
- [x] 4.7 — `curl /chi-siamo/` ritorna HTML completo (testato in locale)

**DoD raggiunto:** pagina indicizzabile, contenuto visibile no-JS, JSON-LD parser-valid.

---

# 🟦 Fase 5 — Migrazione appuntamento (2h) ⚠️ delicata

**Obiettivo:** `appuntamento/index.html` con form + calendario + fetch Resend invariato.

### Task

- [x] 5.1 — `appuntamento/index.html` creata con nav+footer duplicati
- [x] 5.2 — Form (nome/email/tel/messaggio + autocomplete) + calendario + slot orari
- [x] 5.3 — JS calendario riscritto come IIFE (no globals), event listener no onclick inline, `button[data-day]` e `button[data-time]` per a11y. CSS page-scoped in `<style>`
- [x] 5.4 — fetch a `/.netlify/functions/request-appointment` invariato. Reset form+calendario su success
- [x] 5.5 — Title "Prenota appuntamento — Strada Nuova Genova" (45ch), description 156ch
- [x] 5.6 — JSON-LD: ContactPage + Service (serviceType + areaServed Genova+Liguria + availableChannel servicePostalAddress, provider=Store inline). **NO offers** (no price). **NO aggregateRating** (Service non parent eligible)
- [x] 5.7 — Breadcrumb visivo + BreadcrumbList @id
- [ ] 5.8 — Test end-to-end Resend: rimandato a push live (richiede RESEND_API_KEY + dominio verificato Resend, non testabile in localhost)

**Aggiunta non prevista:** orari calendario corretti da `9-13/16-19` (SPA originale, errato) a `10:00-12:30/16:00-19:30` (orari ufficiali da CLAUDE.md/contatti). Slot 30 min.

**DoD raggiunto in locale.** Verifica end-to-end Resend rimandata.

---

# 🟦 Fase 6 — Grazie + Contatti dedicata (1h)

### Task

- [x] 6.1 — `grazie/index.html` noindex,follow, escluso automaticamente da sitemap (build-sitemap legge il meta robots)
- [x] 6.2 — `contatti/index.html`: NAP, orari, social, "Come arrivare" (auto/piedi/metro), riquadro Palazzo Lomellino con anchor a chi-siamo, CTA box appuntamento. JSON-LD ContactPage + Store completo + BreadcrumbList
- [x] 6.3 — `templates/footer.html` ha link "Contatti" → `/contatti/` (era già lì)
- [x] 6.4 — Nav: aggiunta voce "Contatti" su tutte le pagine pillar (in home punta a `/#contatti` per scroll, su altre pagine a `/contatti/`)
- [x] **EXTRA: rimosso catch-all SPA da `netlify.toml`.** Ora le 5 pagine fisiche prevalgono, fallback a 404.html per path inesistenti

**DoD raggiunto.**

---

# 🟦 Fase 7 — Palazzo Lomellino (1h) ⭐ asset autorità

**Obiettivo:** pagina dedicata al palazzo come asset SEO unico.

### Task

- [x] 7.1 — `palazzo-lomellino/index.html`: storia Cinquecento, committente Nicolosio Lomellino, affreschi Strozzi+Benso, contesto Rolli (Alessi, lista 1500, UNESCO 2006), architettura, relazione con il negozio, link esterno Associazione Palazzo Lomellino e info Rolli Days
- [ ] 7.2 — Coordinate GPS: **rimandate** (TBD da Giuseppe). JSON-LD `Place` ha address ma niente `geo` né `hasMap` per ora
- [x] 7.3 — JSON-LD: WebPage + `Place + TouristAttraction` (alternateName, containedInPlace=City Genova, publicAccess=false) + BreadcrumbList 3 livelli + mentions Store inline. Schema LandmarksOrHistoricalBuildings scartato (è sub-type LocalBusiness, non adatto a palazzo come edificio)
- [x] 7.4 — Internal link a /chi-siamo/, /appuntamento/, brand list inline preparata per Fase 9. Anchor variation rispettata
- [x] 7.5 — Title "Palazzo Lomellino, Via Garibaldi 7/a — Strada Nuova" (56ch). Description con Rolli/UNESCO/Via Garibaldi

**DoD raggiunto** (con coordinate GPS aggiunte in seguito).

---

# 🟦 Fase 8 — Pillar di categoria (3-4h totali, 2 sotto-fasi) ⭐ core SEO

**Obiettivo:** 4 landing locali, ognuna 1500-2000 parole (aggiornato).

### Fase 8.1 — Tessuti + Tendaggi (1.5-2h)

- [x] 8.1.1 — `tessuti-genova/index.html` — **1523 parole**: hero materie.webp, lista 10 brand cliccabili a /marchi/*, tipologie (tende/divani/parete/su misura), processo consulenza 4 step, esempi applicazioni (palazzi storici/case mare/Tigullio) con anchor a verticali Fase 11, 6 FAQ. CollectionPage + BreadcrumbList. FAQ HTML semantico (NO FAQPage schema)
- [x] 8.1.2 — `tendaggi-genova/index.html` — **1557 parole**: hero hero.webp, tipologie tende (classiche/pannello/vetro/pacchetto/soffitti alti), tessuti consigliati per ognuna, sezione passamaneria con anchor a Houlès, finissaggio+confezione (con disclaimer "non confezioniamo direttamente"), 6 FAQ specifiche

**DoD raggiunto:** title 30-60ch, description 155ch, canonical, OG image, JSON-LD valido, 10+ internal link, 0 anchor exact-match stuffing.

### Fase 8.2 — Carta da parati + Rivestimenti (1.5-2h) ✅

- [x] 8.2.1 — `carta-da-parati-genova/index.html` (1929 parole) — brand Élitis/Cole & Son/Designers Guild/Zoffany (+ Sanderson/Pierre Frey), tipologie vinilica/TNT/tessile/materica, tendenze 2026 (Cloud Dancer Pantone, neoclassico, Morris revival, materica), 6 FAQ incluso "quanto costa al metro" + bagno/cucina + campioni a casa. NO posa come servizio nostro (tappezzieri esterni). Hero `materie.webp`
- [x] 8.2.2 — `rivestimenti-murali-genova/index.html` (1672 parole) — boiserie tessile (tecnica, tessuti adatti — damaschi seta Rubelli, sete Dedar, lini Pierre Frey), tessuto a parete con bordura + passamaneria Houlès, pannelli modulari. Applicazioni Rolli/centro storico/Carignano. 6 FAQ. Hero `palazzo-lomellino.webp` (cattura autorità). NO posa diretta
- Link bidirezionali: home → 4 pillar (anchor variato "tessuti/tendaggi/carta da parati/rivestimenti murali"); tessuti-genova → carta da parati + rivestimenti murali; rivestimenti-murali ↔ carta-da-parati ↔ palazzo-lomellino ↔ marchi/*
- JSON-LD: CollectionPage + BreadcrumbList con `isPartOf`+`about` inline name+url. Niente FAQPage schema (rich result rimosso mag 2026)
- Smoke test: aggiornato a 19 URL, tutti 200 in locale. Sitemap: 9 URL indicizzabili

**DoD raggiunto:** entrambe le pagine online in locale, internal link bidirezionali pillar ↔ brand attivi (target brand-page in arrivo in Fase 9).

---

# 🟦 Fase 9 — Pagine brand (5 sotto-fasi, ~5h totali)

**Obiettivo:** 10 brand pages + hub. Ordine = opportunità SEO. Ogni pagina 600-1000 parole, foto vere campionario, ZERO copia da sito ufficiale brand.

### Fase 9.0 — Hub `/marchi/` (45 min) ✅

- [x] 9.0.1 — `marchi/index.html` con lista 10 brand + 2-3 righe descrittive + link alla brand page. Niente loghi reali (placeholder grafico, hub testuale)
- [x] 9.0.2 — JSON-LD CollectionPage + BreadcrumbList con `about`+`isPartOf` inline

### Fase 9.1 — Élitis + Cole & Son (1h) ⭐ priorità massima blue ocean ✅

- [x] 9.1.1 — `marchi/elitis/index.html` (832 parole): cifra materica, produzione, applicazioni Genova/Liguria (parete-soggetto, contemp. + materiali naturali, palazzi storici riletti), workflow showroom, prezzi indicativi 120-500 €/m. Link a /marchi/cole-and-son/, /carta-da-parati-genova/, /rivestimenti-murali-genova/
- [x] 9.1.2 — `marchi/cole-and-son/index.html` (988 parole): storia 1875 Royal Warrant, pattern iconici (Hummingbirds/Woods/Palm Jungle/Versailles/Botanical Botanica), applicazioni genovesi (ingresso, bagno cieco, sala da pranzo, camera padronale), prezzi 80-350 €/m. Link a /marchi/elitis/
- JSON-LD pattern: WebPage + about Brand inline (name, url ufficiale, description) + BreadcrumbList 3 livelli
- Le altre 8 brand pages restano 404 fino a Fase 9.2-9.5: i link da pillar a /marchi/dedar/ ecc. sono link interni "broken" accettati nel piano

### Fase 9.2 — Dedar + Pierre Frey (1h) ✅

- [x] 9.2.1 — `marchi/dedar/index.html` (902 parole): casa familiare Como 1976, sintesi ricerca contemporanea + tradizione tessile italiana. 4 famiglie prodotto (tende, rivestimento, carta, contract). 3 applicazioni genovesi: tendaggi palazzi storici, ritappezzeria contemporanea, boiserie tessile rappresentanza. Prezzi 80-500 €/m
- [x] 9.2.2 — `marchi/pierre-frey/index.html` (966 parole): casa francese 1935 + archivi Braquenié (1824) e Le Manach (1829) + Boussac. 5 famiglie (stampe archivio, contemporanei, outdoor, carta, tappeti). 4 applicazioni: palazzi storici, boiserie, case mare (linea Outdoor), case ottocentesche collina. Prezzi 80-800 €/m, forbice più ampia del catalogo
- Stesso JSON-LD pattern WebPage + Brand inline. Link a fratello brand (Dedar↔Pierre Frey) per side navigation

### Fase 9.3 — Designers Guild + Rubelli (1h) ✅

- [x] 9.3.1 — `marchi/designers-guild/index.html` (914 parole): brand di Tricia Guild dal 1970, total look colore (tessuto + carta + vernice + Christian Lacroix Maison). 4 applicazioni: stanze bambini, studi, camera padronale di rottura, Lacroix barocco-contemporaneo. Prezzi 60-220 €/m
- [x] 9.3.2 — `marchi/rubelli/index.html` (1010 parole): manifattura veneziana dal 1858, referenza europea damaschi seta e soprarizzo. 3 nuclei (sete operate, velluti, contemporanei + Armani/Casa, Donghia). 3 applicazioni: boiserie palazzi, tendaggi importanti, ritappezzeria mobili antichi. Prezzi 100-2000 €/m, esempio budget boiserie completa

### Fase 9.4 — Sanderson/Morris + Zoffany (1h) ✅

- [x] 9.4.1 — `marchi/sanderson-morris-co/index.html` (1050 parole): copre due brand sister del Sanderson Design Group. Sanderson dal 1860 (country inglese, botanico) + Morris &amp; Co (archivio William Morris, Willow Bough/Strawberry Thief/Pimpernel, 200 anni dalla nascita). 4 applicazioni genovesi (studio/biblioteca, stanze bambini, camera padronale Morris parete-soggetto, dimore Ottocento Carignano). JSON-LD `about: [Brand, Brand]` array per copertura corretta dei due brand. Prezzi 60-300 €/m
- [x] 9.4.2 — `marchi/zoffany/index.html` (944 parole): brand inglese più adatto a Genova del catalogo (palette terrosa desaturata, damaschi neoclassici, motivi persiani). 4 applicazioni (Rolli salone, sala da pranzo collina, studio/biblioteca, bagno rappresentanza). Sezione "carta o tessuto" per il coordinato. Prezzi 70-320 €/m

### Fase 9.5 — Houlès + Etro Tessuti (1h) ✅

- [x] 9.5.1 — `marchi/houles/index.html` (999 parole): casa francese passamaneria dal 1928. 5 famiglie prodotto (cordoncini, bordure, frange, tirelle, galloni). 4 applicazioni (boiserie tessile obbligatorio, tendaggi importanti, mobili antichi, cuscini/accessori). Prezzi per metro lineare 8-150 €/m. Esempio budget integrato boiserie completa.
- [x] 9.5.2 — `marchi/etro-tessuti/index.html` (883 parole): divisione tessuti d'arredamento di Etro (Milano 1968). Disambiguazione esplicita Etro Tessuti vs Etro Home in apertura (richiesta da decisione brand). Cifra paisley signature, palette mediterranee, jacquard complessi. 4 applicazioni (ritappezzeria contemporanea, cuscini/plaid, tendaggi mediterranei, interni di personalità). Prezzi 90-600 €/m

### Template brand page (600-1000 parole)

1. H1: "Rivenditore {Brand} a Genova — Strada Nuova"
2. Hero con foto campionario reale in showroom (mai foto del brand)
3. Sezione "Il nostro rapporto con {Brand}" (da quando, perché, esperienza)
4. Collezioni disponibili nel nostro campionario
5. Tipologie d'uso (tendaggi / divani / parati / etc.) con anchor a pillar
6. Fasce prezzo indicative se conosciute
7. CTA appuntamento per vedere campionario
8. JSON-LD: `WebPage` + `Brand` mentioned + ref `#store` inline + `BreadcrumbList`

**DoD per ognuna:** zero copia da sito brand ufficiale, foto first-party, schema valido, 2-3 link interni a pillar.

---

# 🟦 Fase 10 — Servizi (1h)

**Obiettivo:** una sola pagina servizio reale (consulenza), niente pagine per servizi non erogati direttamente.

### Task

- [x] 10.0 — `servizi/index.html` hub minimal con il servizio (CollectionPage + BreadcrumbList)
- [x] 10.1 — `servizi/consulenza-arredo-tessile/index.html` (~1200 parole): cosa facciamo + cosa NON facciamo direttamente (posa carta, confezionamento, ritappezzeria) + workflow 3 step + audience + aree servite Genova/Liguria
- [x] 10.2 — JSON-LD: WebPage + `Service` con `provider` = `@id #store` inline name+url + `serviceType` + `areaServed` City Genova + AdministrativeArea Liguria + `audience` + BreadcrumbList. **Senza `offers` e senza `aggregateRating`** (Service non è parent eligible)
- [x] 10.3 — CTA verso `/appuntamento`

**DoD:** pagina online, schema Service valido senza warning. ✅ commit locale (smoke test 32/32 verde).

---

# 🟦 Fase 11 — Verticali geo-luxe (2-3h)

### Task

- [ ] 11.1 — `tessuti-palazzi-storici-genova/index.html` (1500-2000 parole) — angolo unico Strada Nuova: tessuti per dimore d'epoca, vincoli soprintendenza, tessuti per Rolli, case study Palazzo Lomellino come sede
- [ ] 11.2 — `tessuti-casa-al-mare-liguria/index.html` (1500-2000 parole) — tessuti per salsedine/umidità, lino, outdoor, applicazioni Liguria, sezioni "tessuti per ville Tigullio" senza enfasi forte
- [ ] 11.3 — `tessuti-tende-portofino-tigullio/index.html` **versione minimal** (500-700 parole) — Tigullio è canale ma non focus, pagina presente per intercettare query ma non investita

**DoD:** 3 pagine online, internal link a pillar + brand correlati.

---

# 🟦 Fase 12 — Magazine setup + primo articolo (2h)

**Obiettivo:** pipeline MD → HTML, hub, primo articolo pillar.

### Task

- [ ] 12.1 — `tools/build-magazine.js`: scansiona `magazine/content/*.md`, parsing YAML frontmatter con `gray-matter`, body Markdown con `marked`. Per ogni file: output `magazine/articles/{slug}/index.html` con layout articolo (nav+footer duplicati, hero image, contenuto, breadcrumb, JSON-LD Article + author Person nested)
- [ ] 12.2 — Schema YAML frontmatter: `title, slug, description, date, author (name+url+sameAs), image, tags, faq` (opzionale)
- [ ] 12.3 — `magazine/index.html` (hub): marker `<!-- BUILD:MAGAZINE_LATEST:START -->` ... build-magazine.js inietta lista articoli ordinati per data
- [ ] 12.4 — Primo articolo: `magazine/content/come-scegliere-tessuti-per-tende-genova.md` (3000-4000 parole) — pillar nazionale didattico, NO prezzi, NO CTA locale forte, 10-15 internal link contestuali ai pillar locali
- [ ] 12.5 — Eseguire `npm run build:magazine` → verifica generazione HTML
- [ ] 12.6 — Aggiornare `build-sitemap.js` per includere `magazine/articles/**/index.html`

**DoD:** primo articolo accessibile via URL, hub mostra lista, schema Article validato.

---

# 🟦 Fase 13 — Performance pass (1.5h)

### Task

- [ ] 13.1 — PageSpeed Insights su 5 pagine campione (home, chi-siamo, tessuti-genova, marchi/elitis, magazine/articolo) — target LCP < 2.5s mobile, INP < 200ms, CLS < 0.1
- [ ] 13.2 — `_headers` Netlify: cache-control immutable per `/assets/*`, `/img/*`, `/fonts/*`. Security headers (CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy)
- [ ] 13.3 — Verifica peso hero ottimizzato (target < 80KB AVIF, < 120KB WebP)
- [ ] 13.4 — Verifica `≤1 fetchpriority="high"` per pagina (sul vero LCP, mai logo)
- [ ] 13.5 — Lighthouse SEO + Best Practices ≥ 95 su 5 pagine campione

**DoD:** CWV pass, Lighthouse SEO ≥ 95 ovunque.

---

# 🟦 Fase 13.5 — Maps embed in /contatti (30 min, dopo attivazione API Giuseppe)

### Task

- [ ] 13.5.1 — Attivare Maps JavaScript API + Places API su Google Cloud Console
- [ ] 13.5.2 — Restringere chiave a referrer `stradanuovagenova.com`
- [ ] 13.5.3 — Aggiungere chiave come env var Netlify (`PUBLIC_MAPS_KEY`)
- [ ] 13.5.4 — Embed mappa lazy in `/contatti/` con coordinate GPS esatte + Place ID GBP
- [ ] 13.5.5 — Aggiornare JSON-LD Store con `hasMap` URL `maps.app.goo.gl/<id>`

**DoD:** mappa visibile lazy in /contatti, chiave non leakata in repo, LCP non penalizzato.

---

# 🟦 Fase 14 — Search Console + Bing + IndexNow + tools/gsc.js (1.5h)

### Task

- [ ] 14.1 — Verifica proprietà Google Search Console (DNS o meta tag)
- [ ] 14.2 — Submit sitemap su GSC
- [ ] 14.3 — Verifica proprietà Bing Webmaster Tools, submit sitemap
- [ ] 14.4 — IndexNow: generare chiave UUID, file `<uuid>.txt` in root, endpoint ping ai principali (Bing, Yandex, Naver) via Netlify build hook
- [ ] 14.5 — `tools/gsc.js`: CLI Node con OAuth refresh token (workaround bug "service account email not found" mag 2026). Subcomandi: `sites`, `sitemaps`, `query --days 28`, `pages --days 28`, `inspect <url>`. One-shot `gsc-auth.js` apre browser, callback localhost, salva refresh_token in `~/.config/strada-nuova/gsc-oauth.json`

**DoD:** entrambe le console ricevono dati, sitemap discovered, GSC API funziona localmente.

---

# 🟦 Fase 15 — GBP aggiornamenti urgenti (1h, lato GBP)

### Task

- [ ] 15.1 — Rimuovere categoria "Negozio di moquette e tappeti"
- [ ] 15.2 — Applicare descrizione Proposta A (vedi conversazione precedente — verificare se già fatto)
- [ ] 15.3 — Popolare Servizi GBP: voci predefinite + voci brand-specific (Dedar, Pierre Frey, Élitis, Cole & Son, Designers Guild, Rubelli, Sanderson, Zoffany, Houlès, Etro Tessuti)
- [ ] 15.4 — Upload 5-10 foto iniziali (interni Lomellino, vetrina, palazzo, tessuti, dettagli)
- [ ] 15.5 — Cadenza post (1-2/settimana) e foto (1/settimana minimo)
- [ ] 15.6 — Lanciare campagna recensioni (link via Whatsapp/email a clienti recenti)
- [ ] 15.7 — Aggiungere video showroom GBP (≤30s, signal emergente 2026)

**DoD:** scheda GBP completa, dinamica, attiva.

---

# 🟦 Fase 16 — 301 sntessuti.it (30min-1h, dipende da accesso)

### Task

- [ ] 16.1 — Verificare provider/CMS di sntessuti.it
- [ ] 16.2 — 301 wildcard: `sntessuti.it/*` → `stradanuovagenova.com/`
- [ ] 16.3 — Verifica con curl: `curl -I https://sntessuti.it/` → 301 + Location header

**DoD:** redirect 301 attivo, autorità storica trasferita.

---

# 🟦 Fase 17 — A11y full pass (1.5h) ⭐ EAA UE obbligatorio dal giugno 2025

**Obiettivo:** conformità WCAG 2.1 AA su tutte le pagine. Non opzionale, è legge UE.

### Task

- [ ] 17.1 — Aggiungere `<a class="skip-link">` come primo elemento `<body>` su TUTTE le pagine (modifica `templates/nav.html`)
- [ ] 17.2 — `<main id="main">` wrapping del contenuto su tutte le pagine
- [ ] 17.3 — Sostituire `onclick="toggleMenu()"` con event listener in `assets/js/nav-toggle.js`. Aggiornare `aria-expanded` true/false
- [ ] 17.4 — FAQ accordion sulle pillar pages: implementare con `role="button"`, `tabindex="0"`, `aria-expanded`, `aria-controls`, handler Enter/Space con preventDefault
- [ ] 17.5 — Heading hierarchy zero-skip: audit con `grep -rE '<h[1-6]' --include='*.html'` su tutte le pagine, verifica nessun salto (h1 → h3 senza h2)
- [ ] 17.6 — `prefers-reduced-motion` in `base.css`: disabilita animation/transition + forza `.fade-in {opacity:1}`
- [ ] 17.7 — Audit contrasti: verificare con tool tipo `pa11y` o WAVE; minimo 4.5:1 small text
- [ ] 17.8 — Verifica focus visibile: outline non rimosso, alternative custom OK
- [ ] 17.9 — Smoke a11y: `npx pa11y https://stradanuovagenova.com/` (e altre 4 URL) → 0 errori critical

**DoD:** Lighthouse Accessibility ≥ 95 su 5 pagine campione, pa11y 0 errori critical.

---

# 🟦 Fase 18 — Magazine cadenza mensile (continuo, dopo Fase 12)

### Pipeline iniziale 12 mesi

1. Come scegliere tessuto per tende
2. Quanto costa ritappezzare un divano a Genova
3. Come abbinare carta da parati e tende
4. Tendenze carta da parati 2026
5. Tessuti per soffitti alti nei palazzi genovesi
6. Restauro tessile nei palazzi dei Rolli
7. Tessuti per case al mare in Liguria
8. Élitis: la carta da parati materica francese a Genova
9. Cole & Son: il wallpaper inglese di pregio
10. Tende per yacht: tessuti tecnici per nautica
11. Tessuti antimacchia per famiglie e animali domestici
12. Boiserie tessile: rivestire le pareti in tessuto

Ogni articolo: 3000-4000 parole se pillar nazionale, 1500-2000 se locale-conversion. Frontmatter YAML completo. Build automatico al push.

---

# Note operative

- **Ad ogni fase:** commit + push, deploy Netlify verde, `npm run smoke-test` su 5 URL campione (status 200)
- **Mai modificare:** `netlify/functions/*` (logica Stripe/Resend), `admin/config.yml`, `_data/products.json` (CMS)
- **Dopo modifica CMS:** `git pull --rebase origin main` prima di lavorare
- **Ordine token-aware:** fasi 0→7 prerequisiti hard sequenziali; fasi 8→12 parallelizzabili (pillar e brand sono pagine indipendenti); fase 17 a11y dopo le pagine ma può anche essere distribuita in linea
- **Mail pubblica ovunque:** `stradanuova.7@gmail.com`
- **Workflow 1-at-a-time:** ogni task ha conferma utente prima di passare al successivo, JSON validation dopo OGNI modifica JSON-LD
- **Tracciamento progresso:** marcare ✅ le checkbox in questo file ad ogni task completato. PLAN.md è la fonte di verità del progresso.
