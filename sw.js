/* QUÉT ĐIỂM — lưu app vào máy để chạy không cần mạng. Phiên bản: a6b4f6e1b6 */
var V = 'quet-diem-a6b4f6e1b6';
var FILES = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './apple-touch-icon.png'];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(V).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== V; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== self.location.origin) return;
  e.respondWith(caches.open(V).then(function (c) {
    return c.match(e.request, { ignoreSearch: true }).then(function (r) { return r || c.match('./index.html'); });
  }));
});
