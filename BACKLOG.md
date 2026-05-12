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

- [x] CLAUDE.md stato dell'arte
- [x] Backlog
- [x] GBP — sito web aggiornato a stradanuovagenova.com
- [x] GBP — categorie secondarie aggiunte (tende, carta da parati, interior designer, moquette/tappeti)
- [ ] GBP — descrizione: applicata? confermare
- [ ] GBP — servizi: da popolare (vedi lista pronta sotto in MOSSE SUCCESSIVE)
- [ ] GBP — foto interni Palazzo Lomellino + showroom (almeno 15-20)
- ~~GBP — Q&A precaricate~~ **CANCELLATO**: funzione Q&A spenta da Google il 3 dicembre 2025. Migrare i contenuti FAQ nel sito.
- [ ] GBP — campagna recensioni (focus su recency: 50 recenti > 300 vecchie nel 2026)
- [ ] GBP — video brevi (≤30s, almeno 1 al mese — signal emergente 2026)
- [ ] GBP — Products popolati (surface usata da "Ask Maps" Gemini per query commerciali)
- [ ] 301 sntessuti.it → stradanuovagenova.com

---

## 🟢 Fatto

- [x] Audit struttura sito esistente
- [x] Keyword research (3 slice paralleli: brand / categoria-locale / intent-competitor)
- [x] Set keyword consolidato con cluster, intent, priorità, gap

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
