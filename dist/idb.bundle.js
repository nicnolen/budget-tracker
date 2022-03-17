/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public/js/idb.js":
/*!**************************!*\
  !*** ./public/js/idb.js ***!
  \**************************/
/***/ (() => {

eval("// Create variable to hold db connection\nlet db;\n// Establish a connection to IndexedDB database called `budget_tracker`\nconst request = indexedDB.open('budget_tracker', 1);\n\n// This event will emit if a new database is made or if the database version changes (nonexistant to version 1, v1 to v2, etc.)\nrequest.onupgradeneeded = function (event) {\n  // save a reference to the database\n  const db = event.target.result;\n  // create an object store (table) called `new_transaction`, set it to have an auto incrementing primary key of sorts\n  db.createObjectStore('new_transaction', { autoIncrement: true });\n};\n\n// Upon a successful creation\nrequest.onsuccess = function (event) {\n  // when db is successfully created with its object store (from onupgradedneeded event above) or simply established a connection, save reference to db in global variable\n  db = event.target.result;\n\n  // check if app is online, if yes run uploadBudget function to send all local db data to api\n  if (navigator.onLine) {\n    // upload any remnant transactions in IndexedDB\n    uploadTransaction();\n  }\n};\n\n// If anything goes wrong with the database\nrequest.onerror = function (event) {\n  // log error here\n  console.error(event.target.errorCode);\n};\n\n// This function will be executed if we attempt to submit a new budget and there's no internet connection\nfunction saveRecord(record) {\n  // open a new transaction with the database with read and write permissions\n  const transaction = db.transaction(['new_transaction'], 'readwrite');\n\n  // access the object store for `new_transaction`\n  const transactionObjectStore = transaction.objectStore('new_transaction');\n\n  // add record to your store with add method\n  transactionObjectStore.add(record);\n}\n\n// Handle collecting data from the `new_transaction` object store in IndexedDB and POST it to the server\nfunction uploadTransaction() {\n  // open a transaction on your database\n  const transaction = db.transaction(['new_transaction'], 'readwrite');\n\n  // access the object store\n  const transactionObjectStore = transaction.objectStore('new_transaction');\n\n  // get all records from store and set to a variable\n  const getAll = transactionObjectStore.getAll();\n\n  // upon successful .getAll() execution, run this function\n  getAll.onsuccess = function () {\n    // if there was data in indexedDb's store, send it to the api server\n    if (getAll.result.length > 0) {\n      fetch('/api/transaction', {\n        method: 'POST',\n        body: JSON.stringify(getAll.result),\n        headers: {\n          Accept: 'application/json, text/plain, */*',\n          'Content-Type': 'application/json',\n        },\n      })\n        .then(response => response.json())\n        .then(serverResponse => {\n          if (serverResponse.message) {\n            throw new Error(serverResponse);\n          }\n          // open one more transaction\n          const transaction = db.transaction(['new_transaction'], 'readwrite');\n          // access the new_transaction object store\n          const transactionObjectStore =\n            transaction.objectStore('new_transaction');\n          // clear all items in your store\n          transactionObjectStore.clear();\n\n          alert('All saved transactions have been submitted!');\n        })\n        .catch(err => {\n          console.error(err);\n        });\n    }\n  };\n}\n\n// Listen for the app coming back online\nwindow.addEventListener('online', uploadTransaction);\n\n\n//# sourceURL=webpack://budget-app/./public/js/idb.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./public/js/idb.js"]();
/******/ 	
/******/ })()
;