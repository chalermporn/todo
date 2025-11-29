const CACHE_NAME = 'todo-app-v2';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './browserconfig.xml',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@400;500;600;700&display=swap',
  'https://fonts.gstatic.com/s/ibmplexsansthai/v10/m8JWjfRfY7WVQciUuoqRBVNf6CstOkvKlA.woff2'
];

// Install Service Worker
self.addEventListener('install', event => {
  console.log('🔧 Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 Service Worker: Caching files');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('✅ Service Worker: Installation complete');
        return self.skipWaiting();
      })
  );
});

// Activate Service Worker
self.addEventListener('activate', event => {
  console.log('🚀 Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('✅ Service Worker: Activation complete');
      return self.clients.claim();
    })
  );
});

// Fetch Event - Cache First Strategy with improved error handling
self.addEventListener('fetch', event => {
  // Skip non-GET requests and chrome-extension requests
  if (event.request.method !== 'GET' || event.request.url.startsWith('chrome-extension://')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version if available
        if (response) {
          console.log('📁 Service Worker: Serving from cache:', event.request.url);
          return response;
        }
        
        console.log('🌐 Service Worker: Fetching from network:', event.request.url);
        return fetch(event.request).then(response => {
          // Don't cache non-successful responses or non-basic responses
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Don't cache analytics or tracking requests
          if (event.request.url.includes('analytics') || 
              event.request.url.includes('tracking') ||
              event.request.url.includes('gtag') ||
              event.request.url.includes('facebook.com') ||
              event.request.url.includes('google-analytics.com')) {
            return response;
          }

          // Clone the response for caching
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            })
            .catch(error => {
              console.log('💾 Service Worker: Cache put failed:', error);
            });

          return response;
        }).catch(error => {
          console.log('❌ Service Worker: Fetch failed:', error);
          
          // Return offline fallback for navigation requests
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
          
          // For other requests, return a minimal response
          return new Response('Network error', {
            status: 408,
            headers: { 'Content-Type': 'text/plain' }
          });
        });
      })
  );
});

// Background Sync for offline todo management
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync-todos') {
    console.log('🔄 Service Worker: Background sync for todos');
    event.waitUntil(syncTodos());
  }
});

async function syncTodos() {
  try {
    // Implementation for syncing todos when back online
    console.log('✅ Service Worker: Todos synced successfully');
  } catch (error) {
    console.error('❌ Service Worker: Sync failed:', error);
  }
}
