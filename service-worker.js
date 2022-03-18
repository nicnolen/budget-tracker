const APP_PREFIX = 'BudgetTracker-';
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;

const FILES_TO_CACHE = [
  './index.html',
  './public/css/styles.css',
  './dist/client/app.bundle.js',
  './dist/client/idb.bundle.js',
];

// Cache resources and install the service worker
self.addEventListener('install', function (e) {
  e.waitUntil(
    // find the cache by name and then add every file in the `FILES_TO_CACHE` array to the cache
    caches.open(CACHE_NAME).then(function (cache) {
      console.info('Installing cache: ' + CACHE_NAME);
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
            console.log('deleting cache : ' + keyList[i]);
            return caches.delete(keyList[i]);
          }
        })
      );
    })
  );
});

// Respond with cached resources
self.addEventListener('fetch', function (e) {
  console.log('fetch request : ' + e.request.url);
  e.respondWith(
    // see if the resource already exists in `caches`
    caches.match(e.request).then(function (request) {
      if (request) {
        // if cache is available, respond with cache
        console.log('responding with cache : ' + e.request.url);
        return request;
      } else {
        // if there are no cache, try fetching request
        console.log('file is not cached, fetching : ' + e.request.url);
        return fetch(e.request);
      }
    })
  );
});
