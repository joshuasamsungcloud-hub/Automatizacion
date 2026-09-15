const CACHE_NAME = 'autohub-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './datos_plc.json',
  './passwords_data.js',
  './conversion_data.js'
];

// Instala la app y guarda los archivos en el celular
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Cuando no hay internet, lee desde la memoria del celular
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devuelve el archivo guardado o lo descarga si tienes internet
        return response || fetch(event.request);
      })
  );
});
