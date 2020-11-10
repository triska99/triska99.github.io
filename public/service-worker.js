importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

if (workbox)
    console.log(`Workbox berhasil dimuat`);
else
    console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
    { url: '/index.html', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/schedule-info.html', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/register-service-worker.js', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/action.js', revision: '1' },
    { url: '/icon/icon-48.png', revision: '1' },
    { url: '/icon/icon-96.png', revision: '1' },
    { url: '/icon/icon-192.png', revision: '1' },
    { url: '/icon/icon-512.png', revision: '1' },
    { url: '/icon/notification.png', revision: '1' },
],
    {
        ignoreURLParametersMatching: [/.*/]
    });

// Menyimpan cache dari football.org
workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'APIFETCH',
    })
);

workbox.routing.registerRoute(
    new RegExp('/pages/'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'pages'
    })
);


// Menyimpan cache dari CSS Google Fonts
workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com\/icon\?family\=Material\+Icons/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'material-icons',
    })
);
// Menyimpan cache untuk file font selama 1 tahun
workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com\/\s\/\materialicons\/\v55\/\flUhRq6tzZclQEJ-Vdg-IuiaDsNc\.woff2/,
    new workbox.strategies.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }),
        ],
    })
);
// self.addEventListener("install", function (event) {
//     event.waitUntil(
//         caches.open(CACHE_NAME).then(function (cache) {
//             return cache.addAll(urlsToCache);
//         })
//     );
// });

// self.addEventListener("activate", event => {
//     event.waitUntil(
//         caches.keys().then(cacheNames => {
//             return Promise.all(
//                 cacheNames.map(cacheName => {
//                     if (cacheName != CACHE_NAME) {
//                         console.log(`ServiceWorker: cache ${cacheName} dihapus`);
//                         return caches.delete(cacheName);
//                     }
//                 })
//             );
//         })
//     );
// });

// self.addEventListener("fetch", (event) => {
//     const base_url = "https://api.football-data.org/v2/";
//     if (event.request.url.indexOf(base_url) > -1) {
//         event.respondWith(
//             caches.open(CACHE_NAME).then((cache) => fetch(event.request)
//                 .then((response) => {
//                     cache.put(event.request.url, response.clone());
//                     return response;
//                 }))
//         );
//     } else {
//         event.respondWith(
//             caches.match(event.request, { 'ignoreSearch': true })
//                 .then((response) => response || fetch(event.request))
//         );
//     }
// });
// Push Notifikasi service worker
self.addEventListener('push', (event) => {
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    const options = {
        body: body,
        icon: 'icon/notification.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});