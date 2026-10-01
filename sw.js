// Self-destruct worker: replaces the old PWA service worker from the games
// era, unregisters everything, clears old caches, and gets out of the way.
// Every visit must fetch fresh — no app shell is ever cached again.
self.addEventListener('install', (e) => {
  self.skipWaiting()
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    (async () => {
      const names = await caches.keys()
      await Promise.all(names.map((n) => caches.delete(n)))
      await self.registration.unregister()
      const clients = await self.clients.matchAll({ type: 'window' })
      clients.forEach((c) => c.navigate(c.url))
    })()
  )
})

self.addEventListener('fetch', () => {})
