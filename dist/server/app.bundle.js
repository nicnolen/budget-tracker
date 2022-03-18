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

/***/ "./models/transaction.js":
/*!*******************************!*\
  !*** ./models/transaction.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nconst Schema = mongoose.Schema;\n\nconst transactionSchema = new Schema(\n  {\n    name: {\n      type: String,\n      trim: true,\n      required: \"Enter a name for transaction\"\n    },\n    value: {\n      type: Number,\n      required: \"Enter an amount\"\n    },\n    date: {\n      type: Date,\n      default: Date.now\n    }\n  }\n);\n\nconst Transaction = mongoose.model(\"Transaction\", transactionSchema);\n\nmodule.exports = Transaction;\n\n\n//# sourceURL=webpack://budget-app/./models/transaction.js?");

/***/ }),

/***/ "./routes/api.js":
/*!***********************!*\
  !*** ./routes/api.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const router = (__webpack_require__(/*! express */ \"express\").Router)();\nconst Transaction = __webpack_require__(/*! ../models/transaction.js */ \"./models/transaction.js\");\n\nrouter.post(\"/api/transaction\", ({body}, res) => {\n  Transaction.create(body)\n    .then(dbTransaction => {\n      res.json(dbTransaction);\n    })\n    .catch(err => {\n      res.status(404).json(err);\n    });\n});\n\nrouter.post(\"/api/transaction/bulk\", ({body}, res) => {\n  Transaction.insertMany(body)\n    .then(dbTransaction => {\n      res.json(dbTransaction);\n    })\n    .catch(err => {\n      res.status(404).json(err);\n    });\n});\n\nrouter.get(\"/api/transaction\", (req, res) => {\n  Transaction.find({}).sort({date: -1})\n    .then(dbTransaction => {\n      res.json(dbTransaction);\n    })\n    .catch(err => {\n      res.status(404).json(err);\n    });\n});\n\nmodule.exports = router;\n\n//# sourceURL=webpack://budget-app/./routes/api.js?");

/***/ }),

/***/ "./server.js":
/*!*******************!*\
  !*** ./server.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst logger = __webpack_require__(/*! morgan */ \"morgan\");\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst compression = __webpack_require__(/*! compression */ \"compression\");\n\nconst PORT = process.env.PORT || 3001;\nconst MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/budget';\n\nconst app = express();\n\napp.use(logger('dev'));\n\napp.use(compression());\napp.use(express.urlencoded({ extended: true }));\napp.use(express.json());\n\napp.use('/public', express.static('public'));\n\nmongoose.connect(MONGODB_URI, {\n  useNewUrlParser: true,\n  useFindAndModify: false,\n});\n\n// routes\napp.use(__webpack_require__(/*! ./routes/api.js */ \"./routes/api.js\"));\n\napp.listen(PORT, () => {\n  console.log(`App running on port ${PORT}!`);\n});\n\n\n//# sourceURL=webpack://budget-app/./server.js?");

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("compression");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("mongoose");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("morgan");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./server.js");
/******/ 	
/******/ })()
;