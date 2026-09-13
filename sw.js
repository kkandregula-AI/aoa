/* The Age of Agents — service worker.
   Strategy: network-first for pages (so new deploys show immediately when online),
   cache fallback for offline (so it still works after the first load).
   Bump CACHE whenever you change files. */
<<<<<<< HEAD
const CACHE = "age-of-agents-v6";
=======
const CACHE = "age-of-agents-v7";
>>>>>>> 3698aac (Age of Agents v3)
const CORE = [
  "./", "./index.html", "./agentic-ai.html", "./digital-workers.html",
  "./manifest.webmanifest", "./favicon.svg", "./og-image.png",
  "./icons/icon-192.png", "./icons/icon-512.png",
  "./icons/icon-maskable-512.png", "./icons/apple-touch-icon.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Pages/HTML: NETWORK-FIRST — always try the live version, fall back to cache offline.
  if (req.mode === "navigate" || (url.origin === self.location.origin && req.destination === "document")) {
    e.respondWith(
      fetch(req)
        .then((res) => { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); return res; })
        .catch(() => caches.match(req).then((r) => r || caches.match("./index.html")))
    );
    return;
  }

  // Google Fonts: cache, refresh in background (works offline after first load).
  if (/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) {
    e.respondWith(caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(req);
      const net = fetch(req).then((res) => { cache.put(req, res.clone()); return res; }).catch(() => cached);
      return cached || net;
    }));
    return;
  }

  // Other same-origin assets (icons, manifest): cache-first, then network.
  if (url.origin === self.location.origin) {
    e.respondWith(
      caches.match(req).then((cached) => cached || fetch(req).then((res) => {
        const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); return res;
      }).catch(() => Response.error()))
    );
  }
});
