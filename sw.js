// ISA / NSE500 Service Worker
const CACHE = 'isa-v1';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  clients.claim();
});

self.addEventListener('fetch', e => {
  // Never intercept Anthropic API calls
  if(e.request.url.includes('anthropic.com') ||
     e.request.url.includes('googleapis.com') ||
     e.request.url.includes('google.com')) return;

  e.respondWith(
    fetch(e.request).catch(() => new Response('Offline — please reconnect', {
      headers: {'Content-Type': 'text/plain'}
    }))
  );
});
