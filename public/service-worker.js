const cacheName = "pwa-cache-v2.0";
const filesToCache = ["/", "styles.css", "index.js"];

self.addEventListener("install", (event) => {
  console.log("install service worker");

  event.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(filesToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      const resource = await caches.match(event.request);

      if (resource) {
        return resource;
      }

      const response = await fetch(event.request);

      return response;
    })()
  );
});
//eslint-disable-next-line
self.addEventListener("activate", async (event) => {
  const keys = await caches.keys();

  await Promise.all(
    keys.map((key) => {
      if (key !== cacheName) {
        return caches.delete(key);
      }
    })
  );
  //eslint-disable-next-line
  clients.claim();
});
