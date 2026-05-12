# Strada Nuova — Backlog decisioni & azioni

Backlog operativo per il lavoro SEO/sito. Aggiornato man mano. Per il quadro di stack/struttura vedere [CLAUDE.md](CLAUDE.md).

---

## 🔴 Decisioni bloccanti (chiuse — vedi [PLAN.md](PLAN.md))

- [x] Migrare GBP a `stradanuovagenova.com` (2026-05-12)
- [x] Nome GBP — Giuseppe accetta rischio, lascia "Strada Nuova, rivestimenti&interior design"
- [x] Categorie GBP — ridurre a 3 (togliere "Negozio di moquette e tappeti")
- [x] Conversione chi-siamo + appuntamento a statiche — confermato (appuntamento mantiene logica Resend)
- [x] Magazine — cadenza mensile
- [x] Stack — Astro (decisione assunta su criterio SEO 2026)

## 🟡 Decisioni ancora aperte

- [x] **STACK confermato: HTML5 vanilla + script Node mirati** (no framework, no bundler). Pattern marker per zone dinamiche.
- [x] **Brand confermati 2026-05-12:** Dedar, Pierre Frey, Élitis, Cole & Son, Designers Guild, Rubelli, Sanderson/Morris & Co, Zoffany, Houlès, **Etro Tessuti** (NON Etro Home). **NO Casamance.**
- [x] Tigullio/Portofino — sì ma non focus
- [x] Mail pubblica — `stradanuova.7@gmail.com`
- [x] Servizi non erogati direttamente — solo "Consulenza d'arredo tessile"
- [x] **Nav top globale a 8 voci (deciso 2026-05-12 post-verifica competitor):** Tessuti / Tendaggi / Carta da parati / Marchi / Magazine / Chi siamo / Contatti / Appuntamento. Razionale: i competitor genovesi (Pittaluga, Taddei, Tende SRL) nascondono le keyword pillar sotto dropdown "Prodotti" → esponendole top-level otteniamo anchor exact-match site-wide come vantaggio competitivo SEO interno.
- [x] **Footer 4 colonne (Catalogo / Specializzazioni / Negozio / Strada Nuova-NAP)** — linka tutte le pagine non in nav top (Rivestimenti murali, Servizi, 3 verticali geo-luxe, Palazzo Lomellino, Drop).
- [x] **Trigger di promozione nav futuri (criteri oggettivi):**
  - Rivestimenti murali → nav se GSC CTR>1% e impressions>200/mese per 2 mesi consecutivi
  - Servizi → nav quando aggiungiamo secondo servizio reale
  - Verticali geo-luxe → nav se diventano top-5 per impressions GSC
  - Voce candidata all'uscita quando un nuovo entrante sale: "Carta da parati" se si rivela inferiore in volume
- [ ] 301 sntessuti.it → stradanuovagenova.com — serve accesso al provider del vecchio sito
- [x] Coordinate GPS esatte del negozio (44.41133147877727, 8.933433457224718) — fornite 2026-05-12 sera
- [x] Attivazione Google Maps API per embed `/contatti` — fatto 2026-05-12 sera (Maps JS + Places + Embed API, chiave referrer-restricted, carta virtuale 0€ cap)
- [x] URL GBP per `hasMap` JSON-LD — usato `https://www.google.com/maps/place/?q=place_id:ChIJR-TtRF1D0xIReS_hRVSpVhI`
- [ ] **Brand realmente trattati** (servono per scrivere le brand-page e la descrizione GBP corretta). Conferma sì/no per:
  - Dedar — sì/no
  - Pierre Frey — sì/no
  - Élitis — sì/no (⭐ opportunità più alta del set se sì)
  - Cole & Son — sì/no (⭐ buco di mercato)
  - Designers Guild — sì/no
  - Rubelli — sì/no
  - Sanderson / Morris & Co / Zoffany — sì/no
  - Houlès (passamaneria) — sì/no
  - Casamance — sì/no
  - Etro Home — sì/no
  - Altri da aggiungere: ?
- [ ] **Split SPA → pagine HTML statiche.** Senza non si può fare SEO multi-pagina seria. Conferma o opzione "low-effort" (meta dinamici su SPA, sconsigliato).
- [ ] **Servizi propri o in subappalto?**
  - Posa carta da parati — proprio / artigiano esterno / non offerto
  - Confezionamento tende — proprio / artigiano esterno / non offerto
  - Tappezzeria/restauro divani — sì/no
- [ ] **Mercato yacht/Tigullio**: è davvero un canale commerciale o no? Decide se fare la verticale `tessuti-yacht-liguria` (blue ocean).
- [ ] **Pagine brand: quali fare per prime?** Dipende dalla risposta sui brand. Proposta default se trattano tutto: Élitis → Cole & Son → Dedar → Sanderson/Morris.

---

## 🟡 In corso

### Migrazione sito SEO — TUTTI I COMMIT PUSHATI IN PRODUZIONE (2026-05-12)
Push avvenuto il 2026-05-12: 18 commit `eb48fa9..c9ab104` ora live su stradanuovagenova.com. Smoke test 40/40 verde contro produzione. La SPA legacy è ufficialmente sparita.

- [x] **Fase 0** setup repo vanilla (pushato `dc6da8c`)
- [x] **Fase 1** asset condivisi base.css/font/templates/store.js (pushato `ae4be0b`)
- [x] **Fase 2** robots.txt + llms.txt + sitemap.xml + 404.html (pushato `76452ac`)
- [x] **Fase 3** home statica (pushato `506d96a`)
- [x] **Fase 4** chi-siamo (pushato `630f1ea`)
- [x] **Fase 5** appuntamento + form Resend (pushato `7b2fb85`, **test end-to-end con form vivo ora possibile**)
- [x] **Fase 6** grazie + contatti + rimosso catch-all SPA (pushato `21291bc`)
- [x] **Fase 7** palazzo-lomellino asset autorità (pushato `bd9fade`)
- [x] **Fase 8.1** pillar tessuti-genova (1523 parole) + tendaggi-genova (1557 parole) (pushato `be17e6d`)
- [x] **Fase 8.2** pillar carta-da-parati-genova (1929 parole) + rivestimenti-murali-genova (1672 parole) (pushato `82acfaf`)
- [x] **Fase 9.0 – 9.5** hub /marchi/ + 10 brand pages (pushato `1a24c73`, `ac115c8`, `ac1eac4`, `31d6d0e`, `cab751f`)
- [x] **Fase 10** servizi consulenza: hub `/servizi/` + `/servizi/consulenza-arredo-tessile/` (pushato `d8d0181`)
- [x] **Fase 11** verticali geo-luxe: palazzi-storici (1529) + casa-al-mare (1438) + Tigullio (583) (pushato `6ffab92`)
- [x] **Fase 12** magazine + 1° articolo ritappezzeria (1567 parole) (pushato `0d61b72`)
- [x] **Fase 13** performance pass parziale: AVIF + picture wrap + _headers (pushato `7f8bfcd`). **Lighthouse/PSI da fare ORA che è live**
- [x] **GSC meta verification** inserito in home (pushato `c9ab104`)
- [x] **Fase 13.6** Nav+Footer sync — 29 file aggiornati via [tools/sync-nav-footer.js](tools/sync-nav-footer.js), smoke 40/40, idempotenza verificata
- [x] **Fase 13.7** Drop foto reali — 6 pouf scontornati via rembg+u2net + magick -trim, render `<picture>` AVIF+WebP, object-fit contain (`bed2a01`, `77a7448`)
- [x] **Audit Kimi integrato (2026-05-12 sera)** — disambiguazione brand "Strada Nuova"→"Strada Nuova Genova" su 27 file (og:site_name) + Organization JSON-LD `alternateName`/`legalName`; author Person nel magazine article (Giulia Organo); correzione cognome storico Orlandini→Organo (`e030b7d`). Scartati FAQPage schema (Google rimosso mag 2026) e PWA (over-engineering)
- [x] **Fase 14 step 1** GSC verificato + sitemap submittata + 10 URL forzate via "Richiedi indicizzazione"
- [x] **Fase 13.8** Recensioni Google in home+contatti via Places API (New) + tools/build-reviews.js (5★ · 14 recensioni live)
- [ ] **Fase 14 step 2** Bing Webmaster Tools (import da GSC) + IndexNow + Lighthouse audit live + `tools/gsc.js` — **NEXT**
- [ ] Fase 17 a11y full pass
- [ ] Fase 18 magazine build pipeline MD + cadenza mensile

### GBP (lato Giuseppe)
- [x] GBP — sito web aggiornato a stradanuovagenova.com
- [x] GBP — categorie secondarie aggiunte
- [ ] GBP — descrizione: applicata? confermare
- [ ] GBP — servizi: da popolare (lista in MOSSE SUCCESSIVE)
- [ ] GBP — rimuovere categoria "Negozio di moquette e tappeti"
- [ ] GBP — foto interni Palazzo Lomellino + showroom (almeno 15-20)
- ~~GBP — Q&A precaricate~~ **CANCELLATO**: Google ha disattivato il 3 dic 2025
- [ ] GBP — campagna recensioni (focus su recency 2026)
- [ ] GBP — video brevi (≤30s, almeno 1 al mese)
- [ ] GBP — Products popolati (surface "Ask Maps" Gemini)
- [ ] 301 sntessuti.it → stradanuovagenova.com (richiede accesso provider)

---

## 🟢 Fatto

- [x] Audit struttura sito esistente
- [x] Keyword research (3 slice paralleli: brand / categoria-locale / intent-competitor)
- [x] Set keyword consolidato con cluster, intent, priorità, gap
- [x] SPA → multi-pagina (8 pagine pubblicate in locale: home + chi-siamo + appuntamento + grazie + contatti + palazzo-lomellino + tessuti-genova + tendaggi-genova)
- [x] Robots.txt con policy AI bot granulare, llms.txt indice markdown
- [x] Sitemap auto-generato da git log, esclude noindex
- [x] JSON-LD globale (Organization+Store+WebSite) + page-specific (AboutPage, ContactPage, Service, Place+TouristAttraction, CollectionPage, BreadcrumbList) tutti con cross-page @id ref name+url inline
- [x] Catch-all SPA `/* → /index.html` rimosso, ora sito statico multi-pagina vero

---

## 📋 Roadmap SEO 2026 (aggiornata post-audit del 2026-05-12)

### Fase 0 — Local (senza toccare codice)
1. GBP: descrizione nuova, categorie secondarie, prodotti, servizi, foto
2. GBP: post settimanali (eventi Rolli Days, nuovi tessuti, brand)
3. Recensioni: campagna invio link recensione a clienti recenti
4. NAP coerente ovunque (sito + Facebook + Instagram + directory)
5. Bing Places (gemello di GBP, low-cost)

### Fase 1 — Sito strutturale
1. Decisione split SPA
2. Creare scheletro pagine: `/tessuti-genova`, `/tendaggi-genova`, `/carta-da-parati-genova`, `/rivestimenti-murali-genova`, `/contatti`
3. Title/meta/canonical/OG per ogni pagina
4. JSON-LD `Store` / `LocalBusiness` in home + Place per Palazzo Lomellino
5. Sitemap.xml + robots.txt + 404 reale
6. Convertire immagini di background CSS in `<img>` con `alt` significativi

### Fase 2 — Brand pages
1. `/marchi/élitis` (priorità massima se trattato)
2. `/marchi/cole-and-son`
3. `/marchi/dedar`
4. `/marchi/pierre-frey`
5. Altri secondo decisione brand

### Fase 3 — Verticali geo-luxe (blue ocean)
1. `/tessuti-per-palazzi-storici-genova`
2. `/tessuti-casa-al-mare-liguria`
3. `/tende-portofino-tigullio` (se confermato canale)

### Fase 4 — Magazine / long-tail
1. Hub `/magazine`
2. Primi 4 articoli pillar: "come scegliere tessuto per tende", "quanto costa ritappezzare un divano", "come abbinare carta da parati e tende", "tendenze carta da parati 2026"

### Fase 5 — Tecnico
1. Performance: ottimizzare hero.webp (oggi 263KB), lazy loading
2. Stripe webhook → decremento stock pouf automatico (se si tiene il drop)
3. Search Console + Bing Webmaster setup, sitemap submit
4. Monitoraggio: GA4 o Plausible

---

## ⚠️ Aperti tecnici (dal CLAUDE.md)

- `STRIPE_SECRET_KEY` configurata su Netlify?
- `RESEND_API_KEY` configurata + dominio verificato su Resend?
- Stock pouf non decresce dopo acquisto (no webhook Stripe)
- `_data/info.json` non esiste ancora
