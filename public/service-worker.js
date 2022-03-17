const APP_PREFIX = 'BudgetTracker-';
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;

const FILES_TO_CACHE = [
  "./index.html",
  "./css/styles.css",
  "./js/index.js",
  "./js/idb.js",
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