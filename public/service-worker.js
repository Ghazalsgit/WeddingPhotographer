self.addEventListener("install", (event) => {
  console.log("installed service worker at: ", new Date().toLocaleTimeString());
  event.waitUntil(
    caches.open("v1").then((cache) => {
      return cache.addAll(["index.html", "index.css"]);
    })
  );
  self.skipWaiting();
});
self.addEventListener("activate", (event) => {
  console.log("activated service worker at: ", new Date().toLocaleTimeString());
  self.skipWaiting();
});

self.addEventListener("fetch", async (event) => {
  console.log(event.request.url); 
  if (!navigator.onLine) {
    console.log("offline");
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        } else {
          return caches.match(new Request("offline.html"));
        }
      })
    );
  } else {
    console.log("online");
    const response = await updateCache(event.request);
    return response;
  }
});

async function updateCache(request) {
  const response = await fetch(request);
  const cache = await caches.open("v1");

  cache.put(request, response.clone());

  return response;
}
