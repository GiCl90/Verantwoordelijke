const CACHE = 'verantwoordelijke-v1';

const STATISCH = [
  'index.html',
  'login.html',
  'js/config.js',
  'js/index.js',
  'js/login.js',
  'js/sw-register.js',
  'manifest.json',
  'manifest-login.json',
  'assets/icon-192.png',
  'assets/logo-color.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(STATISCH)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Supabase API-calls altijd naar het netwerk
  if (e.request.url.includes('supabase.co')) {
    e.respondWith(fetch(e.request));
    return;
  }

  // CDN-scripts altijd naar het netwerk
  if (e.request.url.includes('cdn.') || e.request.url.includes('unpkg.com') || e.request.url.includes('jsdelivr')) {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
    return;
  }

  // Eigen bestanden: netwerk eerst, cache als fallback
  e.respondWith(
    fetch(e.request)
      .then(resp => {
        const copy = resp.clone();
        caches.open(CACHE).then(cache => cache.put(e.request, copy));
        return resp;
      })
      .catch(() => caches.match(e.request))
  );
});
