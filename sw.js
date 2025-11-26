// sw.js
const CACHE_NAME = "testy-cache-v1";
const URLS_TO_CACHE = [
  "/",
  "/index.html",
  "/about.html",
  "/auth.html",
  "/profile.html",
  "/rtp-mtp.html",
  "/questions.js",
  "/styles.css",    // if you have external css
  "/script.js",     // if you split JS
  "/favicon/favicon-32x32.png"
];

// Install – cache core files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_CACHE))
  );
});

// Activate – clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
});

// Fetch – try cache first, then network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch(() =>
          caches.match("/index.html") // fallback if totally offline
        )
      );
    })
  );
});