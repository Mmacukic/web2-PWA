const CACHE_NAME = 'pwa-app-cache-v1';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/icon.png',
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(STATIC_ASSETS);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            return cachedResponse || fetch(event.request);
        })
    );
});

self.addEventListener('sync', event => {
    if (event.tag === 'sync-data') {
        event.waitUntil(syncData());
    }
});

async function syncData() {
    // Example of background sync logic
    console.log('Background sync is running');
    // Simulate a push notification after syncing
    self.registration.showNotification('Sync Complete!', {
        body: 'Your data has been successfully synced.',
        icon: '/icon.png'
    });
}

self.addEventListener('push', event => {
    const data = event.data.json();
    self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/icon.png',
    });
});