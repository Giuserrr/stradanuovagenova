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
- [ ] 301 sntessuti.it → stradanuovagenova.com — serve accesso al provider del vecchio sito
- [ ] Coordinate GPS esatte del negozio (Giuseppe le manderà → Fase 1.3 store.js + Fase 7 + Fase 13.5)
- [ ] Attivazione Google Maps API per embed `/contatti` (Fase 13.5)
- [ ] URL GBP `maps.app.goo.gl/<id>` per `hasMap` nello Store JSON-LD (Fase 1.3)
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

### Migrazione sito SEO (lavoro locale, no push)
- [x] **Fase 0** setup repo vanilla (pushato `dc6da8c`)
- [x] **Fase 1** asset condivisi base.css/font/templates/store.js (pushato `ae4be0b`)
- [x] **Fase 2** robots.txt + llms.txt + sitemap.xml + 404.html (pushato `76452ac`)
- [x] **Fase 3** home statica (locale `506d96a`)
- [x] **Fase 4** chi-siamo (locale `630f1ea`)
- [x] **Fase 5** appuntamento + form Resend (locale `7b2fb85`, test end-to-end rimandato)
- [x] **Fase 6** grazie + contatti + rimosso catch-all SPA (locale `21291bc`)
- [x] **Fase 7** palazzo-lomellino asset autorità (locale `bd9fade`)
- [x] **Fase 8.1** pillar tessuti-genova (1523 parole) + tendaggi-genova (1557 parole) (locale `be17e6d`)
- [x] **Fase 8.2** pillar carta-da-parati-genova (1929 parole) + rivestimenti-murali-genova (1672 parole) (locale)
- [x] **Fase 9.0** hub /marchi/ (locale)
- [x] **Fase 9.1** Élitis (832 parole) + Cole & Son (988 parole) (locale)
- [ ] Fase 9.2 Dedar + Pierre Frey
- [ ] Fase 9.3 Designers Guild + Rubelli
- [ ] Fase 9.4 Sanderson/Morris/Zoffany
- [ ] Fase 9.5 Houlès + Etro Tessuti
- [ ] Fase 10 servizi consulenza
- [ ] Fase 11 verticali geo-luxe
- [ ] Fase 12 magazine setup + 1° articolo
- [ ] Fase 13 performance pass (AVIF, headers, CWV)
- [ ] Fase 14 GSC + Bing + IndexNow + gsc.js
- [ ] Fase 17 a11y full pass

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
