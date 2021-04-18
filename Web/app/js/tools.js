/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"tools": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([1,"chunk-vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/components/editable-td.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/components/editable-td.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'editableTD',
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  mounted: function mounted() {
    this.$refs.editable.innerText = this.modelValue;
  },
  methods: {
    onInput: function onInput(e) {
      this.$emit('update:modelValue', e.target.innerText);
    }
  }
});

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/components/smart-cut-result.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/components/smart-cut-result.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var D_Sources_CoronaGlass_Web_client_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! regenerator-runtime/runtime.js */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_2__);



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'SmartCutResult',
  data: function data() {
    return {
      loaded: false,
      iframe: {
        src: '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>CuttingStock</title><style type="text/css">body {overflow:hidden;margin: 0;padding: 0;width: 100%;}h5 {font-size: 20px;font-weight: bold;font-family: monospace;text-align: center;width: fit-content;margin: 10px auto;border-bottom-width: 4px;border-bottom-style: solid;border-bottom-color: transparent;padding-bottom: 3px;}table {width: 100%;table-layout: fixed;border-collapse: collapse;}td {text-align: left;vertical-align: bottom;padding: 0px;color: black;background-color: transparent;border-width: 1px;border-style: solid;border-color: lightgray;border-collapse: collapse;white-space: nowrap;}</style></head><body><h5 ></h5><div style="position: relative;"><table><tr><td colspan="1" rowspan="1" style="height: 20px; width: auto;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 273.4375px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td></tr> <tr><td colspan="1" rowspan="1" style="height: 20px; width: auto;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 273.4375px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px;"></td></tr><tr><td colspan="1" rowspan="1" style="height: 20px; width: auto;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(255, 255, 255); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: bold; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 273.4375px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px;"></td></tr><tr><td colspan="1" rowspan="1" style="height: 20px; width: auto;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 128, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 273.4375px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px;"></td></tr><tr><td colspan="1" rowspan="1" style="height: 20px; width: auto; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: bold; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: thin 1px 1px 1px; border-style: solid solid double solid; text-align: center; vertical-align: bottom;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 273.4375px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px;"></td></tr><tr><td colspan="1" rowspan="1" style="height: 20px; width: auto; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: bold; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 273.4375px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px;"></td></tr><tr><td colspan="1" rowspan="1" style="height: 20px; width: auto; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: bold; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 273.4375px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px;"></td></tr><tr><td colspan="1" rowspan="1" style="height: 20px; width: auto;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 273.4375px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px;"></td></tr><tr><td colspan="1" rowspan="1" style="height: 20px; width: auto;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(255, 255, 255); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: bold; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 273.4375px; color: rgb(255, 255, 255); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: bold; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(255, 255, 255); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: bold; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td></tr><tr><td colspan="1" rowspan="1" style="height: 20px; width: auto;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 128, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 273.4375px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px;"></td></tr><tr><td colspan="1" rowspan="1" style="height: 20px; width: auto;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 273.4375px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(255, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td></tr><tr><td colspan="1" rowspan="1" style="height: 20px; width: auto;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 273.4375px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(255, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td></tr><tr><td colspan="1" rowspan="1" style="height: 20px; width: auto; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: bold; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: thin 1px 1px 1px; border-style: solid solid double solid; text-align: center; vertical-align: bottom;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 273.4375px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: thin 1px 1px 1px; border-style: solid solid double solid; text-align: center; vertical-align: bottom;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: thin 1px 1px 1px; border-style: solid solid double solid; text-align: center; vertical-align: bottom;"></td></tr><tr><td colspan="1" rowspan="1" style="height: 20px; width: auto; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: bold; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 273.4375px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td></tr><tr><td colspan="1" rowspan="1" style="height: 20px; width: auto; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: bold; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 273.4375px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td></tr><tr><td colspan="1" rowspan="1" style="height: 20px; width: auto; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: bold; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 273.4375px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td></tr><tr><td colspan="1" rowspan="1" style="height: 20px; width: auto; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: bold; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 273.4375px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td></tr><tr><td colspan="1" rowspan="1" style="height: 20px; width: auto; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: bold; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 273.4375px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td></tr><tr><td colspan="1" rowspan="1" style="height: 20px; width: auto; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: bold; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 273.4375px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td></tr><tr><td colspan="1" rowspan="1" style="height: 20px; width: auto; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: bold; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 273.4375px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td></tr><tr><td colspan="1" rowspan="1" style="height: 20px; width: auto; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: bold; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 273.4375px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td></tr><tr><td colspan="1" rowspan="1" style="height: 20px; width: auto; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: bold; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 273.4375px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td></tr><tr><td colspan="1" rowspan="1" style="height: 20px; width: auto; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: bold; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 273.4375px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td></tr><tr><td colspan="1" rowspan="1" style="height: 20px; width: auto; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: bold; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 273.4375px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td></tr><tr><td colspan="1" rowspan="1" style="height: 20px; width: auto; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: bold; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 273.4375px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td></tr><tr><td colspan="1" rowspan="1" style="height: 20px; width: auto; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: bold; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 273.4375px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td></tr><tr><td colspan="1" rowspan="1" style="height: 20px; width: auto; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: bold; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 273.4375px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td></tr><tr><td colspan="1" rowspan="1" style="height: 20px; width: auto; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: bold; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 273.4375px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td></tr><tr><td colspan="1" rowspan="1" style="height: 20px; width: auto; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: bold; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 273.4375px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td></tr><tr><td colspan="1" rowspan="1" style="height: 20px; width: auto; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: bold; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 273.4375px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td></tr><tr><td colspan="1" rowspan="1" style="height: 20px; width: auto; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: bold; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 273.4375px;"></td><td colspan="1" rowspan="1" style="height: 20px; width: 136.71875px; color: rgb(0, 0, 0); font-size: 14.666666666666666px; font-family: \'Calibri\', serif; font-weight: normal; font-style: normal; text-decoration: none; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: lightgray lightgray lightgray lightgray; text-align: center; vertical-align: bottom;"></td></tr></table></div></body></html>',
        style: null,
        wrapperStyle: null
      }
    };
  },
  props: {
    minSize: {
      required: false,
      type: String
    },
    content: {
      required: false,
      type: String
    }
  },
  computed: {
    resultTabHeight: function resultTabHeight() {
      return this.minSize;
    },
    frameContent: function frameContent() {
      if (this.content) {
        return this.content;
      }

      return this.iframe.src;
    }
  },
  mounted: function mounted() {
    this.loaded = true;
  },
  methods: {
    onFrameLoad: function () {
      var _onFrameLoad = Object(D_Sources_CoronaGlass_Web_client_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/regeneratorRuntime.mark(function _callee(frame) {
        var head, css, body, watermark;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.$nextTick();

              case 2:
                head = $(this.$refs.frame_result).contents().find("head");
                css = '<style type="text/css">body{overflow:hidden;} .watermark{-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-o-user-select: none;user-select: none;color:#d0d0d0;font-size:70pt;opacity: 0.05;-webkit-transform:rotate(-45deg);-moz-transform:rotate(-45deg);position:absolute;width:100%;margin:0;z-index:-1;left:20px;top:100px;}</style>';
                $(head).append(css); //let td = $(this.$refs.frame_result).contents().find('td:first-child:first');
                //$(td).append($('<img>', {'width': '100', 'src':'/images/logo1.png', 'alt':''}));

                body = $(this.$refs.frame_result).contents().find("body");
                watermark = '<div class="watermark"><img alt="" draggable="false" oncontextmenu="return false" onmousedown="return false;" ondragstart="return false;" src="' + window._root + 'images/logo1.png" /></div>';
                $(body).prepend(watermark);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onFrameLoad(_x) {
        return _onFrameLoad.apply(this, arguments);
      }

      return onFrameLoad;
    }(),
    printResult: function printResult() {
      //var iFrameBody = this.$refs.frame_result.contentWindow.document;
      this.$refs.frame_result.contentWindow.print();
    }
  }
});

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/components/smart-cut.vue?vue&type=script&lang=js":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/components/smart-cut.vue?vue&type=script&lang=js ***!
  \************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var D_Sources_CoronaGlass_Web_client_app_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.filter.js */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.string.trim.js */ "./node_modules/core-js/modules/es.string.trim.js");
/* harmony import */ var core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_reduce_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.reduce.js */ "./node_modules/core-js/modules/es.array.reduce.js");
/* harmony import */ var core_js_modules_es_array_reduce_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_reduce_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _editable_td_vue__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./editable-td.vue */ "./src/components/editable-td.vue");
/* harmony import */ var _smart_cut_result_vue__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./smart-cut-result.vue */ "./src/components/smart-cut-result.vue");











/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'SmartCut',
  data: function data() {
    return {
      name: '',
      planks: [{
        id: 1,
        length: 7000,
        count: ''
      }],
      snippets: [{
        id: 1,
        length: '',
        apartment: '',
        floor: '',
        columns: ''
      }],
      clip: 100,
      excelFile: '',
      result: ''
    };
  },
  mounted: function mounted() {
    if (localStorage.planks) {
      var value = JSON.parse(localStorage.planks);

      if (value.length > 0) {
        this.planks = value;
      }
    }

    if (localStorage.snippets) {
      var value = JSON.parse(localStorage.snippets);

      if (value.length > 0) {
        this.snippets = value;
      }
    }
  },
  watch: {
    planks: function planks(data) {
      var value = JSON.stringify(data);
      localStorage.planks = value;
    },
    snippets: function snippets(data) {
      var value = JSON.stringify(data);
      localStorage.snippets = value;
    }
  },
  components: {
    editableTD: _editable_td_vue__WEBPACK_IMPORTED_MODULE_9__["default"],
    smartCutResult: _smart_cut_result_vue__WEBPACK_IMPORTED_MODULE_10__["default"]
  },
  computed: {
    plankTableHeight: function plankTableHeight() {
      //console.log('tableHeight', window.innerHeight,(window.innerHeight / 80 * 100) + 'px')
      return this.planks.length * 30 + 'px';
    },
    snipptetTableHeight: function snipptetTableHeight() {
      return window.innerHeight * 0.35 + 'px';
    },
    resultTabHeight: function resultTabHeight() {
      return 677 + (this.planks.length + this.snippets.length) * 29.78 + 'px';
    },
    validated: function validated() {
      if (this.snippets.filter(function (i) {
        return +i.length > 0;
      }).length > 0) {
        return true;
      }

      return false;
    }
  },
  methods: {
    init: function init() {
      var _this = this;

      try {
        axios__WEBPACK_IMPORTED_MODULE_8___default.a.get(window._root + "api/tools/smartcut/init/".concat(btoa(JSON.stringify({})))).then(function (response) {
          console.log(response);
          _this.rows = response.data;
        }).catch(function (error) {
          console.log(error.response.config.url, ": ", error.response.data.message);
          window.bootbox.alert("Error on init");
        });
      } catch (e) {
        console.log('init.error:', e);
      }
    },
    isNumeric: function isNumeric(n) {
      return isFinite(n) && parseFloat(n) == n;
    },
    plankRemove: function plankRemove(index) {
      var removeByIndex = function removeByIndex(list, index) {
        return [].concat(Object(D_Sources_CoronaGlass_Web_client_app_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(list.slice(0, index)), Object(D_Sources_CoronaGlass_Web_client_app_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(list.slice(index + 1)));
      };

      this.planks = removeByIndex(this.planks, index);
    },
    clearPlanks: function clearPlanks() {
      this.planks = [{
        id: 1,
        length: 7000,
        count: ''
      }];
    },
    plankAdd: function plankAdd() {
      this.planks.push({
        id: this.planks.length + 1,
        length: ''
      });
    },
    snippetRemove: function snippetRemove(index) {
      var removeByIndex = function removeByIndex(list, index) {
        return [].concat(Object(D_Sources_CoronaGlass_Web_client_app_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(list.slice(0, index)), Object(D_Sources_CoronaGlass_Web_client_app_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(list.slice(index + 1)));
      };

      this.snippets = removeByIndex(this.snippets, index);
    },
    snippetAdd: function snippetAdd() {
      this.snippets.push({
        id: this.snippets.length + 1,
        length: '',
        apartment: '',
        floor: '',
        columns: ''
      });
    },
    clearSnippets: function clearSnippets() {
      this.snippets = [{
        id: 1,
        length: '',
        apartment: '',
        floor: '',
        columns: ''
      }];
    },
    onSnippetsExcelChange: function onSnippetsExcelChange() {
      var _this2 = this;

      this.excelFile = this.$refs.snippets_excel_file.files[0]; //var name = this.excelFile.name;//"cut_optimization (1).xlsx"
      //var size = this.excelFile.size;// 4453
      //var type = this.excelFile.type;//"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      //if (!name.endsWith('.xlsx')) {
      //}

      var formData = new FormData(this.$refs.snippets_excel_form);
      axios__WEBPACK_IMPORTED_MODULE_8___default.a.post(window._root + 'api/tools/smartcut/import/snippets', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response) {
        if (response.data.snippets) {
          _this2.snippets = response.data.snippets;
          _this2.$refs.snippets_excel_file.value = '';
        }
      }).catch(function (error) {
        console.log(error);
        window.bootbox.alert("Error on import file");
      });
    },
    onPlanksExcelChange: function onPlanksExcelChange() {
      var _this3 = this;

      this.excelFile = this.$refs.planks_excel_file.files[0];
      var formData = new FormData(this.$refs.planks_excel_form);
      axios__WEBPACK_IMPORTED_MODULE_8___default.a.post(window._root + 'api/tools/smartcut/import/planks', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response) {
        if (response.data.planks) {
          _this3.planks = response.data.planks;
          console.log(_this3.planks);
          _this3.$refs.planks_excel_file.value = '';
        }
      }).catch(function (error) {
        console.log(error.response.config.url, ": ", error.response.data.message);
        window.bootbox.alert("Error on import file");
      });
    },
    runOptimization: function runOptimization() {
      var _this4 = this;

      var projectName = this.name;

      if (!projectName) {
        projectName = "Corona Glass Project";
      }

      var planks = this.planks.filter(function (e) {
        var str = String(e.length).trim();
        if (!str) return false;
        var value = parseFloat(str);

        if (!_this4.isNumeric(value)) {
          var error = "Invalid plank length ({str} is not number in line {str})";
          console.log(error);
          return false;
        }

        return value > 0;
      });
      var snippets = this.snippets.filter(function (e) {
        var str = String(e.length).trim();
        if (!str) return false;
        var value = parseFloat(str);

        if (!_this4.isNumeric(value)) {
          var error = "Invalid snippet length ({str} is not number in line {str})";
          console.log(error);
          return false;
        }

        return value > 0;
      });
      var pTotal = 0;

      if (planks.length > 0) {
        pTotal = planks.map(function (e) {
          return parseFloat(e.length * (e.count > 0 ? e.count : 1000000));
        }).reduce(function (a, b) {
          return a + b;
        });
      }

      console.log(pTotal);
      var sTotal = 0;

      if (snippets.length > 0) {
        sTotal = snippets.map(function (e) {
          return parseFloat(e.length);
        }).reduce(function (a, b) {
          return a + b;
        });
      }

      console.log(sTotal);

      if (pTotal <= sTotal) {
        window.bootbox.alert("There are no not enough items in the stock for cutting.");
        return;
      }

      try {
        axios__WEBPACK_IMPORTED_MODULE_8___default.a.post(window._root + "api/tools/smartcut/run", {
          projectName: projectName,
          planks: planks,
          snippets: snippets,
          clip: this.clip
        }).then(function (response) {
          _this4.result = response.data;
        }).catch(function (error) {
          console.log(error.response.config.url, ": ", error.response.data.message);
          window.bootbox.alert("Error on smartcut run");
        });
      } catch (e) {
        console.log('smartcut.run.error:', e);
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/pages/tools.vue?vue&type=script&lang=js":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/pages/tools.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_smart_cut_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/smart-cut.vue */ "./src/components/smart-cut.vue");

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'Tools',
  components: {
    SmartCut: _components_smart_cut_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  }
});

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader-v16/dist/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/components/editable-td.vue?vue&type=template&id=88a9bfce":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/components/editable-td.vue?vue&type=template&id=88a9bfce ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm-bundler.js");

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return Object(vue__WEBPACK_IMPORTED_MODULE_0__["openBlock"])(), Object(vue__WEBPACK_IMPORTED_MODULE_0__["createBlock"])(vue__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("td", {
    ref: "editable",
    contenteditable: "true",
    style: {
      cursor: 'auto'
    },
    onInput: _cache[1] || (_cache[1] = function (e) {
      return $options.onInput(e);
    })
  }, null, 544
  /* HYDRATE_EVENTS, NEED_PATCH */
  ), Object(vue__WEBPACK_IMPORTED_MODULE_0__["createCommentVNode"])("@input=\"$emit('update:modelValue', $event.target.innerText)\"")], 2112
  /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
  );
}

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader-v16/dist/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/components/smart-cut-result.vue?vue&type=template&id=7fef82c8":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/components/smart-cut-result.vue?vue&type=template&id=7fef82c8 ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm-bundler.js");

var _hoisted_1 = {
  class: "kt-portlet"
};
var _hoisted_2 = {
  class: "kt-portlet__head"
};

var _hoisted_3 = /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", {
  class: "kt-portlet__head-label"
}, [/*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("h3", {
  class: "kt-portlet__head-title"
})], -1
/* HOISTED */
);

var _hoisted_4 = {
  class: "kt-portlet__head-toolbar"
};

var _hoisted_5 = /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("i", {
  class: "flaticon2-print"
}, null, -1
/* HOISTED */
);

var _hoisted_6 = {
  class: "kt-portlet__body"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _this = this;

  return Object(vue__WEBPACK_IMPORTED_MODULE_0__["openBlock"])(), Object(vue__WEBPACK_IMPORTED_MODULE_0__["createBlock"])("div", _hoisted_1, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", _hoisted_2, [_hoisted_3, Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", _hoisted_4, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("button", {
    type: "button",
    class: "btn btn-outline-hover-info btn-elevate btn-icon",
    onClick: _cache[1] || (_cache[1] = function () {
      return $options.printResult && $options.printResult.apply($options, arguments);
    }),
    title: "Распечатать"
  }, [_hoisted_5])])]), Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])("div", _hoisted_6, [$data.loaded ? (Object(vue__WEBPACK_IMPORTED_MODULE_0__["openBlock"])(), Object(vue__WEBPACK_IMPORTED_MODULE_0__["createBlock"])("iframe", Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
    key: 0,
    ref: "frame_result",
    onLoad: _cache[2] || (_cache[2] = function ($event) {
      return $options.onFrameLoad(_this);
    })
  }, {
    style: {
      'min-height': $options.resultTabHeight
    }
  }, {
    srcdoc: $options.frameContent,
    style: {
      "border": "none",
      "overflow": "hidden"
    },
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    frameborder: "0"
  }), null, 16
  /* FULL_PROPS */
  , ["srcdoc"])) : Object(vue__WEBPACK_IMPORTED_MODULE_0__["createCommentVNode"])("v-if", true)])]);
}

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader-v16/dist/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/components/smart-cut.vue?vue&type=template&id=0f6e0d44":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/components/smart-cut.vue?vue&type=template&id=0f6e0d44 ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm-bundler.js");


var _hoisted_1 = {
  class: "kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid"
};
var _hoisted_2 = {
  class: "row"
};
var _hoisted_3 = {
  class: "col-lg-6"
};
var _hoisted_4 = {
  class: "kt-portlet"
};
var _hoisted_5 = {
  class: "kt-portlet__head"
};

var _hoisted_6 = /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("div", {
  class: "kt-portlet__head-label"
}, [/*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("h3", {
  class: "kt-portlet__head-title"
}, " Настройки ")], -1
/* HOISTED */
);

var _hoisted_7 = {
  class: "kt-portlet__head-toolbar"
};

var _hoisted_8 = /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("i", {
  class: "flaticon2-start-up"
}, null, -1
/* HOISTED */
);

var _hoisted_9 = {
  class: "kt-portlet__body"
};
var _hoisted_10 = {
  class: "kt-section kt-section--first"
};

var _hoisted_11 = /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("h3", {
  class: "kt-section__title"
}, "1. Основные:", -1
/* HOISTED */
);

var _hoisted_12 = {
  class: "kt-section__body"
};
var _hoisted_13 = {
  class: "form-group row"
};

var _hoisted_14 = /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("label", {
  class: "col-lg-3 col-form-label"
}, "Проект:", -1
/* HOISTED */
);

var _hoisted_15 = {
  class: "col-lg-6"
};

var _hoisted_16 = /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("span", {
  class: "form-text text-muted"
}, "пожалуйста введите имя проекта", -1
/* HOISTED */
);

var _hoisted_17 = {
  class: "form-group row"
};

var _hoisted_18 = /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("label", {
  class: "col-lg-3 col-form-label"
}, "Вид Маахаза:", -1
/* HOISTED */
);

var _hoisted_19 = {
  class: "col-lg-6"
};

var _hoisted_20 = /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("option", null, "83", -1
/* HOISTED */
);

var _hoisted_21 = /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("option", null, "100", -1
/* HOISTED */
);

var _hoisted_22 = /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("option", null, "116", -1
/* HOISTED */
);

var _hoisted_23 = /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("option", null, "120", -1
/* HOISTED */
);

var _hoisted_24 = /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("option", null, "130", -1
/* HOISTED */
);

var _hoisted_25 = /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("span", {
  class: "form-text text-muted"
}, "пожалуйста выберете вид маахаза", -1
/* HOISTED */
);

var _hoisted_26 = /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("div", {
  class: "kt-separator kt-separator--border-dashed kt-separator--space-lg"
}, null, -1
/* HOISTED */
);

var _hoisted_27 = /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("h3", {
  class: "kt-section__title kt-mb-0"
}, "2. Состав:", -1
/* HOISTED */
);

var _hoisted_28 = {
  class: "kt-section__body"
};
var _hoisted_29 = {
  class: "form-group row kt-mb-0"
};
var _hoisted_30 = {
  class: "col-lg-12"
};
var _hoisted_31 = {
  class: "btn-group float-right"
};
var _hoisted_32 = {
  ref: "planks_excel_form",
  method: "POST",
  enctype: "multipart/form-data"
};
var _hoisted_33 = {
  class: "btn btn-outline-hover-info btn-elevate btn-icon fileinput-button",
  title: "Загрузить Excel"
};

var _hoisted_34 = /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("i", {
  class: "flaticon-file-1",
  "aria-hidden": "true"
}, null, -1
/* HOISTED */
);

var _hoisted_35 = /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("input", {
  type: "submit",
  style: {
    "display": "none"
  }
}, null, -1
/* HOISTED */
);

var _hoisted_36 = /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("i", {
  class: "flaticon-delete"
}, null, -1
/* HOISTED */
);

var _hoisted_37 = {
  class: "form-group row"
};
var _hoisted_38 = {
  class: "v-content container-fluid"
};
var _hoisted_39 = {
  class: "table-editable"
};
var _hoisted_40 = {
  class: "table table-hover table-bordered table-responsive-md text-center table-sm"
};

var _hoisted_41 = /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("thead", null, [/*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("tr", null, [/*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("th", {
  scope: "col",
  class: "text-center"
}, "№"), /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("th", {
  scope: "col",
  class: "text-center"
}, "Длина"), /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("th", {
  scope: "col",
  class: "text-center"
}, "Колличество"), /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("th", {
  scope: "col",
  class: "text-center"
})])], -1
/* HOISTED */
);

var _hoisted_42 = {
  style: {
    "width": "10%"
  }
};
var _hoisted_43 = {
  style: {
    "width": "10%"
  }
};

var _hoisted_44 = /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("i", {
  class: "fa fa-trash"
}, null, -1
/* HOISTED */
);

var _hoisted_45 = {
  class: "row"
};
var _hoisted_46 = {
  class: "col-md-12 kt-padding-0"
};

var _hoisted_47 = /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("i", {
  class: "flaticon2-add-1"
}, null, -1
/* HOISTED */
);

var _hoisted_48 = /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("div", {
  class: "kt-separator kt-separator--border-dashed kt-separator--space-lg"
}, null, -1
/* HOISTED */
);

var _hoisted_49 = /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("h3", {
  class: "kt-section__title kt-mb-0"
}, "3. Отрезки:", -1
/* HOISTED */
);

var _hoisted_50 = {
  class: "kt-section__body"
};
var _hoisted_51 = {
  class: "form-group row kt-mb-0"
};
var _hoisted_52 = {
  class: "col-lg-12"
};
var _hoisted_53 = {
  class: "btn-group float-right"
};
var _hoisted_54 = {
  ref: "snippets_excel_form",
  method: "POST",
  enctype: "multipart/form-data"
};
var _hoisted_55 = {
  class: "btn btn-outline-hover-info btn-elevate btn-icon fileinput-button",
  title: "Загрузить Excel"
};

var _hoisted_56 = /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("i", {
  class: "flaticon-file-1",
  "aria-hidden": "true"
}, null, -1
/* HOISTED */
);

var _hoisted_57 = /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("input", {
  type: "submit",
  style: {
    "display": "none"
  }
}, null, -1
/* HOISTED */
);

var _hoisted_58 = /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("i", {
  class: "flaticon-delete"
}, null, -1
/* HOISTED */
);

var _hoisted_59 = {
  class: "form-group row"
};
var _hoisted_60 = {
  class: "v-content container-fluid"
};
var _hoisted_61 = {
  class: "table-editable"
};
var _hoisted_62 = {
  class: "table table-hover table-bordered table-responsive-md text-center table-sm"
};

var _hoisted_63 = /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("thead", null, [/*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("tr", null, [/*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("th", {
  scope: "col",
  class: "text-center"
}, "№"), /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("th", {
  scope: "col",
  class: "text-center"
}, "Длина"), /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("th", {
  scope: "col",
  class: "text-center"
}, "Квартира"), /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("th", {
  scope: "col",
  class: "text-center"
}, "Этаж"), /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("th", {
  scope: "col",
  class: "text-center"
}, "Столбы"), /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("th", {
  scope: "col",
  class: "text-center"
})])], -1
/* HOISTED */
);

var _hoisted_64 = {
  style: {
    "width": "10%"
  }
};
var _hoisted_65 = {
  style: {
    "width": "10%"
  }
};

var _hoisted_66 = /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("i", {
  class: "fa fa-trash"
}, null, -1
/* HOISTED */
);

var _hoisted_67 = {
  class: "row"
};
var _hoisted_68 = {
  class: "col-md-12 kt-padding-0"
};

var _hoisted_69 = /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("i", {
  class: "flaticon2-add-1"
}, null, -1
/* HOISTED */
);

var _hoisted_70 = {
  class: "col-lg-6"
};
var _hoisted_71 = {
  class: "row"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_editableTD = Object(vue__WEBPACK_IMPORTED_MODULE_1__["resolveComponent"])("editableTD");

  var _component_smartCutResult = Object(vue__WEBPACK_IMPORTED_MODULE_1__["resolveComponent"])("smartCutResult");

  return Object(vue__WEBPACK_IMPORTED_MODULE_1__["openBlock"])(), Object(vue__WEBPACK_IMPORTED_MODULE_1__["createBlock"])("div", _hoisted_1, [Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("div", _hoisted_2, [Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("div", _hoisted_3, [Object(vue__WEBPACK_IMPORTED_MODULE_1__["createCommentVNode"])("end::Portlet"), Object(vue__WEBPACK_IMPORTED_MODULE_1__["createCommentVNode"])("begin::Portlet"), Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("div", _hoisted_4, [Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("div", _hoisted_5, [_hoisted_6, Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("div", _hoisted_7, [Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("button", {
    type: "button",
    class: ["btn btn-info btn-elevate btn-icon", !$options.validated ? 'disabled' : ''],
    disabled: !$options.validated,
    onClick: _cache[1] || (_cache[1] = Object(vue__WEBPACK_IMPORTED_MODULE_1__["withModifiers"])(function () {
      return $options.runOptimization && $options.runOptimization.apply($options, arguments);
    }, ["prevent"])),
    title: "Начать Оптимизацию"
  }, [_hoisted_8], 10
  /* CLASS, PROPS */
  , ["disabled"])])]), Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("div", _hoisted_9, [Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("div", _hoisted_10, [_hoisted_11, Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("div", _hoisted_12, [Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("div", _hoisted_13, [_hoisted_14, Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("div", _hoisted_15, [Object(vue__WEBPACK_IMPORTED_MODULE_1__["withDirectives"])(Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("input", {
    type: "text",
    class: "form-control",
    placeholder: "имя проекта",
    "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) {
      return _ctx.name = $event;
    })
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_1__["vModelText"], _ctx.name]]), _hoisted_16])]), Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("div", _hoisted_17, [_hoisted_18, Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("div", _hoisted_19, [Object(vue__WEBPACK_IMPORTED_MODULE_1__["withDirectives"])(Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("select", {
    class: "form-control",
    "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) {
      return _ctx.clip = $event;
    })
  }, [_hoisted_20, _hoisted_21, _hoisted_22, _hoisted_23, _hoisted_24], 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_1__["vModelSelect"], _ctx.clip]]), _hoisted_25])])]), _hoisted_26, _hoisted_27, Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("div", _hoisted_28, [Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("div", _hoisted_29, [Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("div", _hoisted_30, [Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("div", _hoisted_31, [Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("form", _hoisted_32, [Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("span", _hoisted_33, [_hoisted_34, Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("input", {
    type: "file",
    ref: "planks_excel_file",
    name: "ImportExcel",
    onInput: _cache[4] || (_cache[4] = function () {
      return $options.onPlanksExcelChange && $options.onPlanksExcelChange.apply($options, arguments);
    })
  }, null, 544
  /* HYDRATE_EVENTS, NEED_PATCH */
  )]), _hoisted_35], 512
  /* NEED_PATCH */
  ), Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("button", {
    type: "button",
    class: "btn btn-outline-hover-danger btn-elevate btn-icon",
    onClick: _cache[5] || (_cache[5] = function () {
      return $options.clearPlanks && $options.clearPlanks.apply($options, arguments);
    }),
    title: "Очистить"
  }, [_hoisted_36])])])]), Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("div", _hoisted_37, [Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("div", _hoisted_38, [Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("div", _hoisted_39, [Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("table", _hoisted_40, [_hoisted_41, Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("tbody", {
    style: {
      height: $options.plankTableHeight
    }
  }, [(Object(vue__WEBPACK_IMPORTED_MODULE_1__["openBlock"])(true), Object(vue__WEBPACK_IMPORTED_MODULE_1__["createBlock"])(vue__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(vue__WEBPACK_IMPORTED_MODULE_1__["renderList"])(_ctx.planks, function (row, index) {
    return Object(vue__WEBPACK_IMPORTED_MODULE_1__["openBlock"])(), Object(vue__WEBPACK_IMPORTED_MODULE_1__["createBlock"])("tr", {
      id: "plank-".concat(index),
      key: row.id
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("td", _hoisted_42, Object(vue__WEBPACK_IMPORTED_MODULE_1__["toDisplayString"])(index + 1), 1
    /* TEXT */
    ), Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])(_component_editableTD, {
      modelValue: row.length,
      "onUpdate:modelValue": function onUpdateModelValue($event) {
        return row.length = $event;
      }
    }, null, 8
    /* PROPS */
    , ["modelValue", "onUpdate:modelValue"]), Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])(_component_editableTD, {
      modelValue: row.count,
      "onUpdate:modelValue": function onUpdateModelValue($event) {
        return row.count = $event;
      }
    }, null, 8
    /* PROPS */
    , ["modelValue", "onUpdate:modelValue"]), Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("td", _hoisted_43, [Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("span", {
      onClick: function onClick($event) {
        return $options.plankRemove(index);
      },
      style: {
        cursor: 'pointer'
      }
    }, [_hoisted_44], 8
    /* PROPS */
    , ["onClick"])])], 8
    /* PROPS */
    , ["id"]);
  }), 128
  /* KEYED_FRAGMENT */
  ))], 16
  /* FULL_PROPS */
  )]), Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("div", _hoisted_45, [Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("div", _hoisted_46, [Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("button", {
    type: "button",
    class: "btn btn-outline-hover-info btn-elevate btn-icon",
    onClick: _cache[6] || (_cache[6] = Object(vue__WEBPACK_IMPORTED_MODULE_1__["withModifiers"])(function () {
      return $options.plankAdd && $options.plankAdd.apply($options, arguments);
    }, ["prevent"])),
    title: "Добавить"
  }, [_hoisted_47]), Object(vue__WEBPACK_IMPORTED_MODULE_1__["createCommentVNode"])("<button class=\"btn btn-dark btn-block rounded-0\" @click.prevent=\"plankAdd\"><i class=\"fas fa-plus\" aria-hidden=\"true\"></i> Добавить</button>")])])])])])]), _hoisted_48, _hoisted_49, Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("div", _hoisted_50, [Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("div", _hoisted_51, [Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("div", _hoisted_52, [Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("div", _hoisted_53, [Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("form", _hoisted_54, [Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("span", _hoisted_55, [_hoisted_56, Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("input", {
    type: "file",
    ref: "snippets_excel_file",
    name: "ImportExcel",
    onInput: _cache[7] || (_cache[7] = function () {
      return $options.onSnippetsExcelChange && $options.onSnippetsExcelChange.apply($options, arguments);
    })
  }, null, 544
  /* HYDRATE_EVENTS, NEED_PATCH */
  )]), _hoisted_57], 512
  /* NEED_PATCH */
  ), Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("button", {
    type: "button",
    class: "btn btn-outline-hover-danger btn-elevate btn-icon",
    onClick: _cache[8] || (_cache[8] = function () {
      return $options.clearSnippets && $options.clearSnippets.apply($options, arguments);
    }),
    title: "Очистить"
  }, [_hoisted_58])])])]), Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("div", _hoisted_59, [Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("div", _hoisted_60, [Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("div", _hoisted_61, [Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("table", _hoisted_62, [_hoisted_63, Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("tbody", {
    style: {
      height: _ctx.snippetTableHeight
    }
  }, [(Object(vue__WEBPACK_IMPORTED_MODULE_1__["openBlock"])(true), Object(vue__WEBPACK_IMPORTED_MODULE_1__["createBlock"])(vue__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(vue__WEBPACK_IMPORTED_MODULE_1__["renderList"])(_ctx.snippets, function (row, index) {
    return Object(vue__WEBPACK_IMPORTED_MODULE_1__["openBlock"])(), Object(vue__WEBPACK_IMPORTED_MODULE_1__["createBlock"])("tr", {
      id: "snippet-".concat(index),
      key: row.id
    }, [Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("td", _hoisted_64, Object(vue__WEBPACK_IMPORTED_MODULE_1__["toDisplayString"])(index + 1), 1
    /* TEXT */
    ), Object(vue__WEBPACK_IMPORTED_MODULE_1__["createCommentVNode"])("<td contenteditable=\"true\" @input=\"event => onInputSnippet(event, index)\" v-bind:style=\"{cursor: 'auto'}\">{{row.length}}</td>"), Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])(_component_editableTD, {
      modelValue: row.length,
      "onUpdate:modelValue": function onUpdateModelValue($event) {
        return row.length = $event;
      }
    }, null, 8
    /* PROPS */
    , ["modelValue", "onUpdate:modelValue"]), Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])(_component_editableTD, {
      modelValue: row.apartment,
      "onUpdate:modelValue": function onUpdateModelValue($event) {
        return row.apartment = $event;
      }
    }, null, 8
    /* PROPS */
    , ["modelValue", "onUpdate:modelValue"]), Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])(_component_editableTD, {
      modelValue: row.floor,
      "onUpdate:modelValue": function onUpdateModelValue($event) {
        return row.floor = $event;
      }
    }, null, 8
    /* PROPS */
    , ["modelValue", "onUpdate:modelValue"]), Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])(_component_editableTD, {
      modelValue: row.columns,
      "onUpdate:modelValue": function onUpdateModelValue($event) {
        return row.columns = $event;
      }
    }, null, 8
    /* PROPS */
    , ["modelValue", "onUpdate:modelValue"]), Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("td", _hoisted_65, [Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("span", {
      onClick: function onClick($event) {
        return $options.snippetRemove(index);
      },
      style: {
        cursor: 'pointer'
      }
    }, [_hoisted_66], 8
    /* PROPS */
    , ["onClick"])])], 8
    /* PROPS */
    , ["id"]);
  }), 128
  /* KEYED_FRAGMENT */
  ))], 16
  /* FULL_PROPS */
  )]), Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("div", _hoisted_67, [Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("div", _hoisted_68, [Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("button", {
    type: "button",
    class: "btn btn-outline-hover-info btn-elevate btn-icon",
    onClick: _cache[9] || (_cache[9] = Object(vue__WEBPACK_IMPORTED_MODULE_1__["withModifiers"])(function () {
      return $options.snippetAdd && $options.snippetAdd.apply($options, arguments);
    }, ["prevent"])),
    title: "Добавить"
  }, [_hoisted_69]), Object(vue__WEBPACK_IMPORTED_MODULE_1__["createCommentVNode"])("<button class=\"btn btn-dark btn-block rounded-0\" @click.prevent=\"snippetAdd\"><i class=\"fas fa-plus\" aria-hidden=\"true\"></i> Добавить</button>")])])])])])])])])]), Object(vue__WEBPACK_IMPORTED_MODULE_1__["createCommentVNode"])("end::Portlet")]), Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("div", _hoisted_70, [Object(vue__WEBPACK_IMPORTED_MODULE_1__["createCommentVNode"])("<div class=\"kt-space-20\"></div>"), Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])("div", _hoisted_71, [Object(vue__WEBPACK_IMPORTED_MODULE_1__["createVNode"])(_component_smartCutResult, {
    minSize: $options.resultTabHeight,
    content: _ctx.result
  }, null, 8
  /* PROPS */
  , ["minSize", "content"])])])])]);
}

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader-v16/dist/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/pages/tools.vue?vue&type=template&id=268ca6f2":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./src/pages/tools.vue?vue&type=template&id=268ca6f2 ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm-bundler.js");


var _hoisted_1 = /*#__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_0__["createStaticVNode"])("<div class=\"kt-subheader   kt-grid__item\" id=\"kt_subheader\"><div class=\"kt-container  kt-container--fluid \"><div class=\"kt-subheader__main\"><h3 class=\"kt-subheader__title\"> Инструменты </h3><span class=\"kt-subheader__separator kt-hidden\"></span><div class=\"kt-subheader__breadcrumbs\"><a href=\"#\" class=\"kt-subheader__breadcrumbs-home\"><i class=\"flaticon-interface-6\"></i></a><span class=\"kt-subheader__breadcrumbs-separator\"></span><a href=\"\" class=\"kt-subheader__breadcrumbs-link\"> Оптимизация резки </a></div></div></div></div>", 1);

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_SmartCut = Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("SmartCut");

  return Object(vue__WEBPACK_IMPORTED_MODULE_0__["openBlock"])(), Object(vue__WEBPACK_IMPORTED_MODULE_0__["createBlock"])(vue__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createCommentVNode"])(" begin:: Subheader "), _hoisted_1, Object(vue__WEBPACK_IMPORTED_MODULE_0__["createCommentVNode"])(" end:: Subheader "), Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(_component_SmartCut, {
    msg: ""
  })], 64
  /* STABLE_FRAGMENT */
  );
}

/***/ }),

/***/ "./src/components/editable-td.vue":
/*!****************************************!*\
  !*** ./src/components/editable-td.vue ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _editable_td_vue_vue_type_template_id_88a9bfce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editable-td.vue?vue&type=template&id=88a9bfce */ "./src/components/editable-td.vue?vue&type=template&id=88a9bfce");
/* harmony import */ var _editable_td_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./editable-td.vue?vue&type=script&lang=js */ "./src/components/editable-td.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport */


_editable_td_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"].render = _editable_td_vue_vue_type_template_id_88a9bfce__WEBPACK_IMPORTED_MODULE_0__["render"]
/* hot reload */
if (false) {}

_editable_td_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"].__file = "src/components/editable-td.vue"

/* harmony default export */ __webpack_exports__["default"] = (_editable_td_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

/***/ }),

/***/ "./src/components/editable-td.vue?vue&type=script&lang=js":
/*!****************************************************************!*\
  !*** ./src/components/editable-td.vue?vue&type=script&lang=js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_editable_td_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/babel-loader/lib!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader-v16/dist??ref--0-1!./editable-td.vue?vue&type=script&lang=js */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/components/editable-td.vue?vue&type=script&lang=js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_editable_td_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* empty/unused harmony star reexport */ 

/***/ }),

/***/ "./src/components/editable-td.vue?vue&type=template&id=88a9bfce":
/*!**********************************************************************!*\
  !*** ./src/components/editable-td.vue?vue&type=template&id=88a9bfce ***!
  \**********************************************************************/
/*! exports provided: render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_v16_dist_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_editable_td_vue_vue_type_template_id_88a9bfce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/babel-loader/lib!../../node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader-v16/dist??ref--0-1!./editable-td.vue?vue&type=template&id=88a9bfce */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader-v16/dist/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/components/editable-td.vue?vue&type=template&id=88a9bfce");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_v16_dist_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_editable_td_vue_vue_type_template_id_88a9bfce__WEBPACK_IMPORTED_MODULE_0__["render"]; });



/***/ }),

/***/ "./src/components/smart-cut-result.vue":
/*!*********************************************!*\
  !*** ./src/components/smart-cut-result.vue ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _smart_cut_result_vue_vue_type_template_id_7fef82c8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./smart-cut-result.vue?vue&type=template&id=7fef82c8 */ "./src/components/smart-cut-result.vue?vue&type=template&id=7fef82c8");
/* harmony import */ var _smart_cut_result_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./smart-cut-result.vue?vue&type=script&lang=js */ "./src/components/smart-cut-result.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport */


_smart_cut_result_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"].render = _smart_cut_result_vue_vue_type_template_id_7fef82c8__WEBPACK_IMPORTED_MODULE_0__["render"]
/* hot reload */
if (false) {}

_smart_cut_result_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"].__file = "src/components/smart-cut-result.vue"

/* harmony default export */ __webpack_exports__["default"] = (_smart_cut_result_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

/***/ }),

/***/ "./src/components/smart-cut-result.vue?vue&type=script&lang=js":
/*!*********************************************************************!*\
  !*** ./src/components/smart-cut-result.vue?vue&type=script&lang=js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_smart_cut_result_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/babel-loader/lib!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader-v16/dist??ref--0-1!./smart-cut-result.vue?vue&type=script&lang=js */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/components/smart-cut-result.vue?vue&type=script&lang=js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_smart_cut_result_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* empty/unused harmony star reexport */ 

/***/ }),

/***/ "./src/components/smart-cut-result.vue?vue&type=template&id=7fef82c8":
/*!***************************************************************************!*\
  !*** ./src/components/smart-cut-result.vue?vue&type=template&id=7fef82c8 ***!
  \***************************************************************************/
/*! exports provided: render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_v16_dist_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_smart_cut_result_vue_vue_type_template_id_7fef82c8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/babel-loader/lib!../../node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader-v16/dist??ref--0-1!./smart-cut-result.vue?vue&type=template&id=7fef82c8 */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader-v16/dist/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/components/smart-cut-result.vue?vue&type=template&id=7fef82c8");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_v16_dist_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_smart_cut_result_vue_vue_type_template_id_7fef82c8__WEBPACK_IMPORTED_MODULE_0__["render"]; });



/***/ }),

/***/ "./src/components/smart-cut.vue":
/*!**************************************!*\
  !*** ./src/components/smart-cut.vue ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _smart_cut_vue_vue_type_template_id_0f6e0d44__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./smart-cut.vue?vue&type=template&id=0f6e0d44 */ "./src/components/smart-cut.vue?vue&type=template&id=0f6e0d44");
/* harmony import */ var _smart_cut_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./smart-cut.vue?vue&type=script&lang=js */ "./src/components/smart-cut.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport */


_smart_cut_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"].render = _smart_cut_vue_vue_type_template_id_0f6e0d44__WEBPACK_IMPORTED_MODULE_0__["render"]
/* hot reload */
if (false) {}

_smart_cut_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"].__file = "src/components/smart-cut.vue"

/* harmony default export */ __webpack_exports__["default"] = (_smart_cut_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

/***/ }),

/***/ "./src/components/smart-cut.vue?vue&type=script&lang=js":
/*!**************************************************************!*\
  !*** ./src/components/smart-cut.vue?vue&type=script&lang=js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_smart_cut_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/babel-loader/lib!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader-v16/dist??ref--0-1!./smart-cut.vue?vue&type=script&lang=js */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/components/smart-cut.vue?vue&type=script&lang=js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_smart_cut_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* empty/unused harmony star reexport */ 

/***/ }),

/***/ "./src/components/smart-cut.vue?vue&type=template&id=0f6e0d44":
/*!********************************************************************!*\
  !*** ./src/components/smart-cut.vue?vue&type=template&id=0f6e0d44 ***!
  \********************************************************************/
/*! exports provided: render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_v16_dist_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_smart_cut_vue_vue_type_template_id_0f6e0d44__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/babel-loader/lib!../../node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader-v16/dist??ref--0-1!./smart-cut.vue?vue&type=template&id=0f6e0d44 */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader-v16/dist/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/components/smart-cut.vue?vue&type=template&id=0f6e0d44");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_v16_dist_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_smart_cut_vue_vue_type_template_id_0f6e0d44__WEBPACK_IMPORTED_MODULE_0__["render"]; });



/***/ }),

/***/ "./src/pages/tools.js":
/*!****************************!*\
  !*** ./src/pages/tools.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var D_Sources_CoronaGlass_Web_client_app_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var D_Sources_CoronaGlass_Web_client_app_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(D_Sources_CoronaGlass_Web_client_app_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var D_Sources_CoronaGlass_Web_client_app_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.promise.js */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var D_Sources_CoronaGlass_Web_client_app_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(D_Sources_CoronaGlass_Web_client_app_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var D_Sources_CoronaGlass_Web_client_app_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.object.assign.js */ "./node_modules/core-js/modules/es.object.assign.js");
/* harmony import */ var D_Sources_CoronaGlass_Web_client_app_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(D_Sources_CoronaGlass_Web_client_app_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var D_Sources_CoronaGlass_Web_client_app_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.promise.finally.js */ "./node_modules/core-js/modules/es.promise.finally.js");
/* harmony import */ var D_Sources_CoronaGlass_Web_client_app_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(D_Sources_CoronaGlass_Web_client_app_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm-bundler.js");
/* harmony import */ var _tools_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tools.vue */ "./src/pages/tools.vue");






Object(vue__WEBPACK_IMPORTED_MODULE_4__["createApp"])(_tools_vue__WEBPACK_IMPORTED_MODULE_5__["default"]).mount('#app');

/***/ }),

/***/ "./src/pages/tools.vue":
/*!*****************************!*\
  !*** ./src/pages/tools.vue ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tools_vue_vue_type_template_id_268ca6f2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools.vue?vue&type=template&id=268ca6f2 */ "./src/pages/tools.vue?vue&type=template&id=268ca6f2");
/* harmony import */ var _tools_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tools.vue?vue&type=script&lang=js */ "./src/pages/tools.vue?vue&type=script&lang=js");
/* empty/unused harmony star reexport */


_tools_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"].render = _tools_vue_vue_type_template_id_268ca6f2__WEBPACK_IMPORTED_MODULE_0__["render"]
/* hot reload */
if (false) {}

_tools_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"].__file = "src/pages/tools.vue"

/* harmony default export */ __webpack_exports__["default"] = (_tools_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

/***/ }),

/***/ "./src/pages/tools.vue?vue&type=script&lang=js":
/*!*****************************************************!*\
  !*** ./src/pages/tools.vue?vue&type=script&lang=js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_tools_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/babel-loader/lib!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader-v16/dist??ref--0-1!./tools.vue?vue&type=script&lang=js */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/pages/tools.vue?vue&type=script&lang=js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_tools_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* empty/unused harmony star reexport */ 

/***/ }),

/***/ "./src/pages/tools.vue?vue&type=template&id=268ca6f2":
/*!***********************************************************!*\
  !*** ./src/pages/tools.vue?vue&type=template&id=268ca6f2 ***!
  \***********************************************************/
/*! exports provided: render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_v16_dist_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_tools_vue_vue_type_template_id_268ca6f2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/babel-loader/lib!../../node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader-v16/dist??ref--0-1!./tools.vue?vue&type=template&id=268ca6f2 */ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader-v16/dist/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/pages/tools.vue?vue&type=template&id=268ca6f2");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_v16_dist_templateLoader_js_ref_6_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_tools_vue_vue_type_template_id_268ca6f2__WEBPACK_IMPORTED_MODULE_0__["render"]; });



/***/ }),

/***/ 1:
/*!**********************************!*\
  !*** multi ./src/pages/tools.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Sources\CoronaGlass\Web\client-app\src\pages\tools.js */"./src/pages/tools.js");


/***/ })

/******/ });
//# sourceMappingURL=tools.js.map