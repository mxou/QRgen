const CACHE_NAME = "qrgen-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/assets/style.css",
  "/assets/qrcode.min.js",
  "/assets/img/logo192.png",
  "/assets/img/logo512.png"
];

// Installation du service worker et mise en cache des ressources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Activation et suppression des anciens caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      );
    })
  );
});

// Interception des requêtes et récupération depuis le cache
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
