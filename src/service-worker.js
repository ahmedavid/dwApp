// /**
//  * Check out https://googlechrome.github.io/sw-toolbox/ for
//  * more info on how to use sw-toolbox to custom configure your service worker.
//  */
//
//
// 'use strict';
// importScripts('./build/sw-toolbox.js');
//
// self.toolbox.options.cache = {
//   name: 'ionic-cache'
// };
//
// // pre-cache our key assets
// self.toolbox.precache(
//   [
//     '/**/*',
//     './build/main.js',
//     './build/main.css',
//     './build/polyfills.js',
//     'index.html',
//     'manifest.json'
//   ]
// );
//
//
//
// // dynamically cache any other local assets
// self.toolbox.router.any('/*', self.toolbox.cacheFirst);
//
// // for any other requests go to the network, cache,
// // and then only use that cached resource if your user goes offline
// self.toolbox.router.default = self.toolbox.networkFirst;


self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('dwAppCache').then(function(cache) {
      var precache_urls =[
      '/',
      './build/main.js',
      './build/0.js',
      './build/1.js',
      './build/2.js',
      './build/main.css',
      './build/polyfills.js',
      'index.html',
      'manifest.json'
    ];

      return cache.addAll(precache_urls);
    })
  );
});


self.addEventListener('fetch', function(event) {
  console.log(event.request.url);
  event.request.url = event.request.url.replace(/^https:\/\//i, 'http://');
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request).then(function(response) {
          cache.addAll(response);
        });
    })
  );
});
