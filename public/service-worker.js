const APP_PREFIX = 'BudgetTracker-';
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;

const FILES_TO_CACHE = [
  './index.html',
  './css/styles.css',
  './js/index.js',
  './js/idb.js',
  './manifest.json',
  './images/icons/icon-512x512.png',
  './images/icons/icon-384x384.png',
  './images/icons/icon-192x192.png',
  './images/icons/icon-152x152.png',
  './images/icons/icon-144x144.png',
  './images/icons/icon-128x128.png',
  './images/icons/icon-96x96.png',
  './images/icons/icon-72x72.png',
];

// Cache resources and install the service worker
self.addEventListener('install', function (e) {
  e.waitUntil(
    // find the cache by name and then add every file in the `FILES_TO_CACHE` array to the cache
    caches.open(CACHE_NAME).then(function (cache) {
      console.info('installing cache : ' + CACHE_NAME);
      return cache.addAll(FILES_TO_CACHE);
    })
  );
}); // service workers run before the window object is created so we use self to instantiate listeners on the service worker

// Delete outdated caches
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      // `keyList` contains all cache names under your username.github.io
      // filter out ones that has this app prefix to create keeplist
      let cacheKeeplist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX);
      });
      // add current cache name to keeplist
      cacheKeeplist.push(CACHE_NAME);

      return Promise.all(
        keyList.map(function (key, i) {
          if (cacheKeeplist.indexOf(key) === -1) {
            console.info('deleting cache : ' + keyList[i]);
            return caches.delete(keyList[i]);
          }
        })
      );
    })
  );
});

// Respond with cached resources
self.addEventListener('fetch', function (e) {
  console.info('fetch request : ' + e.request.url);
  e.respondWith(
    // see if the resource already exists in `caches`
    caches.match(e.request).then(function (request) {
      if (request) {
        // if cache is available, respond with cache
        console.info('responding with cache : ' + e.request.url);
        return request;
      } else {
        // if there are no cache, try fetching request
        console.info('file is not cached, fetching : ' + e.request.url);
        return fetch(e.request);
      }
    })
  );
});
