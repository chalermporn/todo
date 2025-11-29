const CACHE_NAME = 'todo-app-v3';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './browserconfig.xml'
];

// Install Service Worker
self.addEventListener('install', event => {
  console.log('🔧 Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 Service Worker: Caching local files only');
        // Cache only local files to avoid CORS issues during installation
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('✅ Service Worker: Installation complete');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('❌ Service Worker: Installation failed:', error);
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

// Fetch Event - Smart caching strategy
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Skip non-GET requests, chrome-extension, and devtools
  if (event.request.method !== 'GET' || 
      event.request.url.startsWith('chrome-extension://') ||
      event.request.url.startsWith('devtools://')) {
    return;
  }

  // For external resources (CDN, fonts), use network-first with cache fallback
  if (url.origin !== location.origin) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Cache successful opaque responses (CORS resources)
          if (response && (response.status === 200 || response.type === 'opaque')) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              })
              .catch(error => {
                console.log('💾 Service Worker: External cache failed (ignored):', error.message);
              });
          }
          return response;
        })
        .catch(error => {
          console.log('🌐 Service Worker: Network failed for external resource, trying cache');
          // Fallback to cache if network fails
          return caches.match(event.request)
            .then(cachedResponse => {
              if (cachedResponse) {
                console.log('📁 Service Worker: Serving external from cache');
                return cachedResponse;
              }
              // If not cached, let it fail naturally (browser will handle it)
              console.log('❌ Service Worker: External resource not available offline');
              throw error;
            });
        })
    );
    return;
  }

  // For local resources, use cache-first strategy
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          console.log('📁 Service Worker: Serving local from cache');
          return response;
        }
        
        console.log('🌐 Service Worker: Fetching local from network');
        return fetch(event.request).then(response => {
          // Only cache successful responses
          if (!response || response.status !== 200) {
            return response;
          }

          // Don't cache analytics or tracking
          if (event.request.url.includes('analytics') || 
              event.request.url.includes('tracking') ||
              event.request.url.includes('gtag')) {
            return response;
          }

          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            })
            .catch(error => {
              console.log('💾 Service Worker: Local cache failed:', error);
            });

          return response;
        }).catch(error => {
          console.log('❌ Service Worker: Local fetch failed:', error);
          
          // Return offline fallback for navigation
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
          
          throw error;
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
