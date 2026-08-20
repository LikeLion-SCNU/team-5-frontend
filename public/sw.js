/**
 * 시간은행 서비스워커
 * - 정적 자산: 캐시 우선 (오프라인에서도 앱 껍데기가 뜬다)
 * - /api 요청: 항상 네트워크 (원장·인증 데이터는 캐시하지 않는다)
 * - 내비게이션: 네트워크 우선, 실패 시 캐시된 index.html
 */
const CACHE = 'timebank-v1'
const PRECACHE = ['/', '/manifest.webmanifest', '/icon.svg', '/icons/timebank-appicon-192.png']

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()))
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url)
  if (e.request.method !== 'GET' || url.pathname.startsWith('/api')) return

  // SPA 내비게이션: 네트워크 우선, 오프라인이면 캐시된 index
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          const copy = res.clone()
          caches.open(CACHE).then((c) => c.put('/', copy))
          return res
        })
        .catch(() => caches.match('/')),
    )
    return
  }

  // 정적 자산: 캐시 우선, 없으면 네트워크 후 캐시
  e.respondWith(
    caches.match(e.request).then(
      (cached) =>
        cached ||
        fetch(e.request).then((res) => {
          if (res.ok && url.origin === location.origin) {
            const copy = res.clone()
            caches.open(CACHE).then((c) => c.put(e.request, copy))
          }
          return res
        }),
    ),
  )
})
