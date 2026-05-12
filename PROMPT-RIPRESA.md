# PROMPT DI RIPRESA — STRADA NUOVA GENOVA

Incolla tutto questo in una nuova conversazione Cowork per riprendere il lavoro.

---

## CONTESTO PROGETTO

Sto costruendo il sito per **Strada Nuova**, negozio di tessuti e interior design in **Via Garibaldi 7/a, Palazzo Lomellino, Genova** (palazzo dei Rolli, patrimonio UNESCO). Il negozio è gestito da **Giulia Orlandini** (terza generazione) supportata da **Brunella**.

Il sito include una sezione **drop** (edizioni limitate di pouf acquistabili con Stripe) ispirata a Supreme: stile sobrio, scuro, pulito, zero fronzoli.

**Dominio**: stradanuovagenova.com (Namecheap, DNS puntati a Netlify)
**Repo GitHub**: https://github.com/Giuserrr/stradanuovagenova
**Netlify Site ID**: 3119e79e-ed19-4cbd-ac5f-f4fac7233c8e
**Team Netlify**: digitalwow

## STACK TECNOLOGICO

- Single Page Application vanilla (HTML + CSS + JS inline in un unico index.html)
- Navigazione SPA con pushState/popstate e hash (#sezione)
- Hosting: Netlify (free tier)
- CMS: Decap CMS con git-gateway backend — gestisce prodotti drop da `_data/products.json`
- Auth CMS: Netlify Identity (invite-only, utente: g.rizzo86@gmail.com)
- Serverless functions: Netlify Functions (Node.js) con node_bundler = "nft"
- Pagamenti: Stripe Checkout (function `create-checkout.js`)
- Email appuntamenti: Resend API (function `request-appointment.js`)
- Email notifiche negozio: stradanuova.7@gmail.com

## STRUTTURA FILE

```
stradanuovagenova/
├── index.html                          ← SPA completa (tutte le pagine)
├── netlify.toml                        ← config Netlify con nft bundler + redirect SPA
├── package.json                        ← dipendenze (stripe, @netlify/blobs, resend)
├── package-lock.json
├── _data/
│   └── products.json                   ← prodotti drop gestiti dal CMS
├── admin/
│   ├── index.html                      ← Decap CMS con identity widget
│   └── config.yml                      ← schema CMS (prodotti + info negozio)
└── netlify/functions/
    ├── create-checkout.js              ← Stripe Checkout Session
    └── request-appointment.js          ← invio email appuntamento con Resend
```

## PAGINE SPA

- `/` — Home: hero con foto negozio (placeholder), sezione Drop (griglia 6 prodotti da JSON), sezione Contatti
- `/chi-siamo` — 4 blocchi alternati foto/testo: Palazzo, Famiglia, Tessuti, Drop
- `/appuntamento` — Form (nome, email, tel, messaggio) + calendario interattivo con fasce orarie (mar-sab 9-13, 16-19)
- `/grazie` — Thank you page post-acquisto Stripe
- `/admin` — Decap CMS

## STILE

- Background: #1a1a1a, card: #242424, accento: #e8531e (arancio dal logo SN)
- Font: Inter (Google Fonts)
- Logo: monogramma SN calligrafico brush stroke arancio su fondo grigio scuro
- Ispirazione: Supreme streetwear ma sobrio. Tono: frasi corte, zero retorica, la Genova bene che non urla

## ENV VARS NECESSARIE SU NETLIFY

- `STRIPE_SECRET_KEY` — da Stripe Dashboard
- `RESEND_API_KEY` — da Resend
- `NETLIFY_SITE_ID` — 3119e79e-ed19-4cbd-ac5f-f4fac7233c8e
- `NETLIFY_BLOBS_TOKEN` — da Netlify
- `ADMIN_KEY` — password per API admin

## LEZIONI IMPARATE (NON RIPETERE QUESTI ERRORI)

1. Netlify Blobs con esbuild NON funziona — usare node_bundler = "nft"
2. Blobs dà MissingBlobsEnvironmentError con Functions v1 — serve config manuale con siteID + token
3. Resend require() va lazy dentro try/catch nella function, non al top level
4. Serve sempre package-lock.json nel repo + "npm install" come build command
5. Wrappare TUTTA la function in try/catch globale per evitare 502 muti
6. Git push rejected = qualcuno ha committato dal CMS → git stash && git pull --rebase origin main && git stash pop
7. Git Gateway perde il token GitHub periodicamente → rigenerare PAT e reinserirlo
8. Non aggiungere MAI funzionalità non richieste — solo quello che chiedo
9. Darmi sempre il comando git push dopo ogni modifica
10. Usare apici singoli nei commit per evitare problemi con zsh e !

## STATO ATTUALE (dove siamo rimasti)

- Sito live su stradanuovagenova.com con SSL attivo
- Tutte le pagine funzionanti (home, chi siamo, appuntamento, grazie)
- CMS configurato: Decap CMS su /admin con Identity abilitata e Git Gateway collegato
- CMS pagina admin bianca — PROBLEMA DA RISOLVERE: potrebbe essere un errore di caricamento Decap CMS, verificare console browser
- Prodotti drop letti da `_data/products.json` (gestito dal CMS)
- Stripe Checkout: function pronta, ma STRIPE_SECRET_KEY non ancora configurata nelle env vars
- Resend: function pronta, ma RESEND_API_KEY non ancora configurata e dominio non verificato su Resend
- Tutte le foto sono placeholder — servono foto reali del negozio e dei pouf
- Menu mobile: fixato con !important per fullscreen overlay + toggle X

## IL MIO PROFILO

Sono Giuseppe, background digital (ex product owner, ex imprenditore ecommerce). So usare git, DNS, Netlify, debug Network tab. Non servono spiegazioni base. Rispondi in italiano. Sii diretto, zero accondiscendenza. Se una mia idea è debole dimmelo subito. Non aggiungere funzionalità non richieste.
