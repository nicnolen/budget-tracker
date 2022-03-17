const APP_PREFIX = 'BudgetTracker-';
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;

const FILES_TO_CACHE = [
  "./index.html",
  "./css/styles.css",
  "./js/index.js",
  "./js/idb.js",
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    // find the cache by name and then add every file in the `FILES_TO_CACHE` array to the cache
    caches.open(CACHE_NAME).then(function (cache) {
      console.info('Installing cache: ' + CACHE_NAME);
      return cache.addAll(FILES_TO_CACHE);
    })
  );
}); // service workers run before the window object is created so we use self to instantiate listeners on the service worker
