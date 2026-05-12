// ============================================================
// store.js — single source of truth NAP + JSON-LD helpers
// Importato da tutti gli script build/validate.
// NON modificare direttamente in altri file: i dati del negozio
// vivono qui e basta.
// ============================================================

const SITE_URL = 'https://stradanuovagenova.com';

const STORE = {
  legalName: 'Strada Nuova',
  displayName: 'Strada Nuova — Tessuti, tendaggi, interior design',
  street: 'Via Garibaldi 7/a',
  postalCode: '16124',
  city: 'Genova',
  region: 'GE',
  country: 'IT',
  email: 'stradanuova.7@gmail.com',
  phone: '+390108956256',
  phoneDisplay: '010 895 6256',
  // Coordinate da inserire quando Giuseppe le manda (PLAN.md Fase 1.3)
  // Placeholder: centroide approssimativo Palazzo Lomellino (TBD)
  geo: {
    lat: null,
    lng: null
  },
  // URL GBP per hasMap (entity-merge signal verso Knowledge Graph)
  // Da popolare quando Giuseppe condivide maps.app.goo.gl/<id>
  mapsUrl: null,
  // Orari mar-sab 10:00-12:30 / 16:00-19:30
  openingHours: [
    { days: ['Tuesday','Wednesday','Thursday','Friday','Saturday'], opens: '10:00', closes: '12:30' },
    { days: ['Tuesday','Wednesday','Thursday','Friday','Saturday'], opens: '16:00', closes: '19:30' }
  ],
  // Brand confermati 2026-05-12 (vedi BACKLOG.md)
  brands: [
    'Dedar',
    'Pierre Frey',
    'Élitis',
    'Cole & Son',
    'Designers Guild',
    'Rubelli',
    'Sanderson',
    'Morris & Co',
    'Zoffany',
    'Houlès',
    'Etro Tessuti'
  ],
  social: {
    instagram: 'https://www.instagram.com/stradanuova/',
    facebook: 'https://www.facebook.com/stradanuova.7/'
  }
};

const ORG_ID = `${SITE_URL}/#org`;
const STORE_ID = `${SITE_URL}/#store`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const PALAZZO_ID = `${SITE_URL}/palazzo-lomellino/#palazzo`;

function getWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: STORE.displayName,
    inLanguage: 'it-IT',
    publisher: { '@id': ORG_ID }
  };
}

function getOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: STORE.legalName,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/img/logo.png`,
    email: STORE.email,
    telephone: STORE.phone,
    sameAs: [STORE.social.instagram, STORE.social.facebook].filter(Boolean)
  };
}

function getStoreJsonLd() {
  const obj = {
    '@context': 'https://schema.org',
    '@type': ['Store', 'LocalBusiness'],
    '@id': STORE_ID,
    name: STORE.displayName,
    url: `${SITE_URL}/`,
    image: `${SITE_URL}/img/hero.webp`,
    email: STORE.email,
    telephone: STORE.phone,
    priceRange: '€€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: STORE.street,
      postalCode: STORE.postalCode,
      addressLocality: STORE.city,
      addressRegion: STORE.region,
      addressCountry: STORE.country
    },
    openingHoursSpecification: STORE.openingHours.map(h => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes
    })),
    brand: STORE.brands.map(b => ({ '@type': 'Brand', name: b })),
    sameAs: [STORE.social.instagram, STORE.social.facebook].filter(Boolean),
    parentOrganization: { '@id': ORG_ID }
  };
  if (STORE.geo.lat !== null && STORE.geo.lng !== null) {
    obj.geo = {
      '@type': 'GeoCoordinates',
      latitude: STORE.geo.lat,
      longitude: STORE.geo.lng
    };
  }
  if (STORE.mapsUrl) {
    obj.hasMap = STORE.mapsUrl;
  }
  return obj;
}

// Cross-page @id ref: SEMPRE con name + url inline (Google processa page-by-page).
// Vedi feedback_seo_pattern_verificati: senza inline = 3 warning GSC.
function storeRef() {
  return {
    '@id': STORE_ID,
    name: STORE.displayName,
    url: `${SITE_URL}/`
  };
}

function orgRef() {
  return {
    '@id': ORG_ID,
    name: STORE.legalName,
    url: `${SITE_URL}/`
  };
}

// Helper Breadcrumb: items = [{ name, url }] dove url è path relativo (/chi-siamo)
function getBreadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${SITE_URL}/#breadcrumb-${items[items.length - 1].url.replace(/[^a-z0-9]+/gi, '-') || 'home'}`,
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url.startsWith('http') ? it.url : `${SITE_URL}${it.url}`
    }))
  };
}

// Helper rendering: array di oggetti -> <script type="application/ld+json">
// pretty=true per debug, false per produzione (più piccolo).
function renderJsonLd(graph, pretty = false) {
  const data = Array.isArray(graph)
    ? { '@context': 'https://schema.org', '@graph': graph.map(g => { const { '@context': _ctx, ...rest } = g; return rest; }) }
    : graph;
  const json = pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data);
  return `<script type="application/ld+json">${json}</script>`;
}

module.exports = {
  SITE_URL,
  STORE,
  ORG_ID,
  STORE_ID,
  WEBSITE_ID,
  PALAZZO_ID,
  getWebSiteJsonLd,
  getOrganizationJsonLd,
  getStoreJsonLd,
  storeRef,
  orgRef,
  getBreadcrumbJsonLd,
  renderJsonLd
};
