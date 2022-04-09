(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 3));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 4);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var realAtob;

var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;

if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");}

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;var result = '';var r1;var r2;var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 |
      (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));

      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) :
      r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) :
      String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}

function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

function getLocale() {
  // 优先使用 $locale
  var app = getApp({
    allowDefault: true });

  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return wx.getSystemInfoSync().language || 'zh-Hans';
}

function setLocale(locale) {
  var app = getApp();
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {return fn({
        locale: locale });});

    return true;
  }
  return false;
}

var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}

if (typeof global !== 'undefined') {
  global.getLocale = getLocale;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale,
  setLocale: setLocale,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}

function initHook(name, options, isComponent) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"e-vegetables","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var messages = {};

var locale;

{
  locale = wx.getSystemInfoSync().language;
}

function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}

initI18nMessages();

var i18n = (0, _uniI18n.initVueI18n)(
locale,
{});

var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {var _this2 = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this2.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    } } };


var setLocale$1 = i18n.setLocale;
var getLocale$1 = i18n.getLocale;

function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale() });

  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {return watch(v);});
    } });

}

function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}

// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initAppLocale(_vue.default, vm, wx.getSystemInfoSync().language || 'zh-Hans');

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 13:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 14:
/*!*************************************!*\
  !*** E:/github/e-vegetables/api.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.myRequest = void 0; // const url="139.159.142.192"
var url = "http://127.0.0.1:5000"; //请求的路径指向
var myRequest = function myRequest(options) {
  return new Promise(function (resolve, reject) {
    uni.request({
      url: url + options.url, //请求的相关链接
      method: options.method || 'POST', //请求的方式
      data: options.data || {}, //请求需传入的对象
      success: function success(res) {
        resolve(res); //返回请求成功结果
      },
      fail: function fail(err) {
        reject(err); //返回请求失败信息
      } });});};exports.myRequest = myRequest;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 15:
/*!**************************************!*\
  !*** E:/github/e-vegetables/Json.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
/* 购物车 */
var cartList = [
  // {
  // 	id: 1,
  // 	image:"//img11.360buyimg.com/n1/jfs/t1/213876/27/14846/355508/622f4519E6a427e77/dece36ab6aebcfd1.jpg",
  // 	// attr_val: '春装款 L',
  // 	stock: 15,
  // 	title: "东北白糯玉米棒 单根200g以上*10根支真空速食 新鲜甜黏玉米粒 健康轻食 早餐食材 蔬菜 杂粮粗粮",
  // 	price: 38.90,
  // 	number: 1
  // },
  // {
  // 	id: 3,
  // 	image: "//img10.360buyimg.com/n1/jfs/t3136/256/4264521311/242911/7120bcad/583a969bN25b1937f.jpg",
  // 	// attr_val: '激光导航 扫拖一体',
  // 	stock: 3,
  // 	title: "京百味 河南铁棍山药 750g 简装 新鲜蔬菜",
  // 	price: 34.90,
  // 	number: 5
  // },
];




var orderList = [
{
  time: '2022-04-06 11:37',
  state: 9,
  goodsList: [{
    title: "绿行者 山东红又红番茄 2.5kg/箱 沙瓤西红柿 自然成熟 新鲜蔬菜 健康轻食",
    price: 49.90,
    image: "//img11.360buyimg.com/n1/jfs/t1/100895/5/21274/566928/620bbd8aE4a690ee1/0af4568e60ae8811.jpg",

    number: 1
    // attr: '珊瑚粉 M'
  }] },

{
  time: '2022-04-06 11:37',
  state: 1,
  goodsList: [{
    title: "绿行者 山东草莓番茄 2.5kg 生吃西红柿  脆皮水果柿子 酸甜多汁 健康轻食",
    price: 82.90,
    image: "//img14.360buyimg.com/n1/jfs/t1/160750/2/21368/149131/617abb5eE989b4f96/eb5303653101ea3f.jpg",

    number: 1 }] },


{
  time: '2022-04-06 11:37',
  state: 1,
  goodsList: [{
    title: "京百味 河南铁棍山药 750g 简装 新鲜蔬菜",
    price: 34.90,
    image: "//img10.360buyimg.com/n1/jfs/t3610/297/1953111791/446635/4a5b1006/583a969eNdfc973ad.jpg",
    number: 1
    // attr: '白色-高帮 39'
  }] },

{
  time: '2019-04-06 11:37',
  state: 1,
  goodsList: [{
    image: 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/3358098495/O1CN01dhYyid2Ccl5MWLDok_!!3358098495.jpg_430x430q90.jpg' },

  {
    image: 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i3/3358098495/O1CN01AWsnFA2Ccl5OzvqsL_!!3358098495.jpg_430x430q90.jpg' }] },



{
  time: '2019-04-06 11:37',
  state: 1,
  goodsList: [{
    image: 'https://img.alicdn.com/imgextra/i4/3470687433/O1CN0124mMQOSERr18L1h_!!3470687433.jpg_430x430q90.jpg' },

  {
    image: 'https://img.alicdn.com/imgextra/i3/2888462616/O1CN01ERra5J1VCAbZaKI5n_!!0-item_pic.jpg_430x430q90.jpg' },

  {
    image: 'https://gd3.alicdn.com/imgextra/i3/819381730/O1CN01YV4mXj1OeNhQIhQlh_!!819381730.jpg_400x400.jpg' }] }];





var cateList = [{
  id: 1,
  name: '蔬菜豆制品' },

{
  id: 2,
  name: '时令水果' },

{
  id: 3,
  name: '鲜肉禽类' },

{
  id: 4,
  name: '冻肉禽类' },

{
  id: 5,
  name: '方便速食' },

{
  id: 6,
  name: '加工调理' },

{
  id: 7,
  name: '海鲜水产' },

{
  id: 8,
  name: '蛋类' },

{
  id: 9,
  name: '米面粮油' },

{
  id: 10,
  name: '休闲酒类' },

//二级分类
{
  id: 1,
  pid: 1,
  name: '蔬菜豆制品' },

{
  id: 2,
  pid: 2,
  name: '时令水果' },

{
  id: 3,
  pid: 3,
  name: '鲜肉禽类' },

{
  id: 4,
  pid: 4,
  name: '冻肉禽类' },

{
  id: 5,
  pid: 5,
  name: '方便速食' },

{
  id: 6,
  pid: 6,
  name: '加工调理' },

{
  id: 7,
  pid: 7,
  name: '海鲜水产' },

{
  id: 8,
  pid: 8,
  name: '蛋类' },

{
  id: 9,
  pid: 9,
  name: '米面粮油' },

{
  id: 10,
  pid: 10,
  name: '休闲酒类' },



//三级分类
{
  id: 101,
  pid: 1,
  name: '叶菜',
  picture: 'data:image/jpeg;base64,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' },

{
  id: 102,
  pid: 1,
  name: '番茄',
  picture: 'data:image/jpeg;base64,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' },

{
  id: 103,
  pid: 1,
  name: '豆类',
  picture: 'data:image/jpeg;base64,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' },

{
  id: 104,
  pid: 1,
  name: '菌菇类',
  picture: 'data:image/jpeg;base64,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' },

{
  id: 105,
  pid: 1,
  name: '葱姜蒜',
  picture: 'data:image/jpeg;base64,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' },


//时令水果
{
  id: 106,
  pid: 2,
  name: '热带水果',
  picture: 'data:image/jpeg;base64,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' },

{
  id: 107,
  pid: 2,
  name: '瓜类',
  picture: 'data:image/jpeg;base64,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' },

{
  id: 108,
  pid: 2,
  name: '浆果类',
  picture: 'data:image/jpeg;base64,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' },

{
  id: 109,
  pid: 2,
  name: '苹果蕉梨',
  picture: 'data:image/jpeg;base64,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TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGQ0ZDNUFGMjE0QUQxMUVBQjk0QkE1RjA2MzY1NTlDMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGQ0ZDNUFGMTE0QUQxMUVBQjk0QkE1RjA2MzY1NTlDMyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0iODI3ODgyM0JFNzJERjI3MEI5NDg1MzRBMjVDM0Q0QzEiIHN0UmVmOmRvY3VtZW50SUQ9IjgyNzg4MjNCRTcyREYyNzBCOTQ4NTM0QTI1QzNENEMxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+' },

{
  id: 110,
  pid: 2,
  name: '柑橘橙柚',
  picture: 'data:image/jpeg;base64,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' },



{
  id: 112,
  pid: 2,
  name: '其他',
  picture: 'data:image/jpeg;base64,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' },


//鲜肉禽类
{
  id: 113,
  pid: 3,
  name: '鲜猪肉',
  picture: '/static/img/category/3/1.jpg' },

{
  id: 114,
  pid: 3,
  name: '鲜鸡肉',
  picture: '/static/img/category/3/2.jpg' },

{
  id: 115,
  pid: 3,
  name: '鲜牛肉',
  picture: '/static/img/category/3/3.jpg' },

{
  id: 116,
  pid: 3,
  name: '鲜羊肉',
  picture: '/static/img/category/3/4.jpg' },

{
  id: 117,
  pid: 3,
  name: '鲜鸭肉',
  picture: '/static/img/category/3/5.jpg' },


//冻肉
{
  id: 118,
  pid: 4,
  name: '冻猪肉',
  picture: '/static/img/category/4/1.jpg' },

{
  id: 119,
  pid: 4,
  name: '冻鸡肉',
  picture: '/static/img/category/4/2.jpg' },
{
  id: 120,
  pid: 4,
  name: '冻牛肉',
  picture: '/static/img/category/4/3.jpg' },
{
  id: 121,
  pid: 4,
  name: '冻羊肉',
  picture: '/static/img/category/4/4.jpg' },
{
  id: 122,
  pid: 4,
  name: '冻鸭肉',
  picture: '/static/img/category/4/5.jpg' },



//方便
{
  id: 123,
  pid: 5,
  name: '香肠火腿',

  picture: '/static/img/category/5/1.jpg' },

{
  id: 124,
  pid: 5,
  name: '酱卤熟食',
  picture: '/static/img/category/5/2.jpg' },
{
  id: 125,
  pid: 5,
  name: '粉面水饺',
  picture: '/static/img/category/5/3.jpg' },
{
  id: 126,
  pid: 5,
  name: '包子馒头',
  picture: '/static/img/category/5/4.jpg' },

//加工
{
  id: 127,
  pid: 6,
  name: '鱼糜火锅料',

  picture: '/static/img/category/6/1.jpg' },

{
  id: 128,
  pid: 6,
  name: '肉糜火锅料',
  picture: '/static/img/category/6/2.jpg' },

{
  id: 129,
  pid: 6,
  name: '火锅底料',
  picture: '/static/img/category/6/3.jpg' },
{
  id: 130,
  pid: 6,
  name: '调理料',
  picture: '/static/img/category/6/4.jpg' },

//海鲜

{
  id: 131,
  pid: 7,
  name: '热带鱼',

  picture: '/static/img/category/7/1.jpg' },

{
  id: 132,
  pid: 7,
  name: '冻虾/虾仁',
  picture: '/static/img/category/7/2.jpg' },
{
  id: 133,
  pid: 7,
  name: '鲜活鱼',
  picture: '/static/img/category/7/3.jpg' },
{
  id: 134,
  pid: 7,
  name: '其他水产品',
  picture: '/static/img/category/7/4.jpg' },
{
  id: 135,
  pid: 7,
  name: '其他干货水产',
  picture: '/static/img/category/7/5.jpg' },

//蛋类
{
  id: 136,
  pid: 8,
  name: '鲜蛋',
  picture: '/static/img/category/8/1.jpg' },

{
  id: 137,
  pid: 8,
  name: '加工蛋',
  picture: '/static/img/category/8/2.jpg' },

//米面粮油
{
  id: 138,
  pid: 9,
  name: '大米',
  picture: '/static/img/category/9/1.jpg' },

{
  id: 139,
  pid: 9,
  name: '杂粮',
  picture: '/static/img/category/9/2.jpg' },

{
  id: 140,
  pid: 9,
  name: '面粉',
  picture: '/static/img/category/9/3.jpg' },

{
  id: 141,
  pid: 9,
  name: '调和油',
  picture: '/static/img/category/9/4.jpg' },

{
  id: 142,
  pid: 9,
  name: '其他油类',
  picture: '/static/img/category/9/5.jpg' },


//休闲酒类
{
  id: 143,
  pid: 10,
  name: '牛奶饮品',
  picture: '/static/img/category/10/1.jpg' },

{
  id: 144,
  pid: 10,
  name: '碳酸饮料',
  picture: '/static/img/category/10/2.jpg' },

{
  id: 145,
  pid: 10,
  name: '茶饮料',
  picture: '/static/img/category/10/3.jpg' },

{
  id: 146,
  pid: 10,
  name: '果汁',
  picture: '/static/img/category/10/4.jpg' },

{
  id: 147,
  pid: 10,
  name: '饮用水',
  picture: '/static/img/category/10/5.jpg' },

{
  id: 148,
  pid: 10,
  name: '功能性饮料',
  picture: '/static/img/category/10/6.jpg' },

{
  id: 149,
  pid: 10,
  name: '酒类',
  picture: '/static/img/category/10/7.jpg' }];var _default =




{

  cartList: cartList,

  orderList: orderList,
  cateList: cateList };exports.default = _default;

/***/ }),

/***/ 198:
/*!*************************************************************************************************!*\
  !*** E:/github/e-vegetables/uni_modules/uni-search-bar/components/uni-search-bar/i18n/index.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _en = _interopRequireDefault(__webpack_require__(/*! ./en.json */ 199));
var _zhHans = _interopRequireDefault(__webpack_require__(/*! ./zh-Hans.json */ 200));
var _zhHant = _interopRequireDefault(__webpack_require__(/*! ./zh-Hant.json */ 201));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =
{
  en: _en.default,
  'zh-Hans': _zhHans.default,
  'zh-Hant': _zhHant.default };exports.default = _default;

/***/ }),

/***/ 199:
/*!************************************************************************************************!*\
  !*** E:/github/e-vegetables/uni_modules/uni-search-bar/components/uni-search-bar/i18n/en.json ***!
  \************************************************************************************************/
/*! exports provided: uni-search-bar.cancel, uni-search-bar.placeholder, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-search-bar.cancel\":\"cancel\",\"uni-search-bar.placeholder\":\"Search enter content\"}");

/***/ }),

/***/ 2:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 200:
/*!*****************************************************************************************************!*\
  !*** E:/github/e-vegetables/uni_modules/uni-search-bar/components/uni-search-bar/i18n/zh-Hans.json ***!
  \*****************************************************************************************************/
/*! exports provided: uni-search-bar.cancel, uni-search-bar.placeholder, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-search-bar.cancel\":\"cancel\",\"uni-search-bar.placeholder\":\"请输入搜索内容\"}");

/***/ }),

/***/ 201:
/*!*****************************************************************************************************!*\
  !*** E:/github/e-vegetables/uni_modules/uni-search-bar/components/uni-search-bar/i18n/zh-Hant.json ***!
  \*****************************************************************************************************/
/*! exports provided: uni-search-bar.cancel, uni-search-bar.placeholder, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-search-bar.cancel\":\"cancel\",\"uni-search-bar.placeholder\":\"請輸入搜索內容\"}");

/***/ }),

/***/ 22:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 23);

/***/ }),

/***/ 23:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 24);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 24:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 265:
/*!*************************************************************************************!*\
  !*** E:/github/e-vegetables/uni_modules/uni-forms/components/uni-forms/validate.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 22));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _createSuper(Derived) {var hasNativeReflectConstruct = _isNativeReflectConstruct();return function _createSuperInternal() {var Super = _getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var pattern = {
  email: /^\S+?@\S+?\.\S+?$/,
  idcard: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
  url: new RegExp(
  "^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
  'i') };


var FORMAT_MAPPING = {
  "int": 'integer',
  "bool": 'boolean',
  "double": 'number',
  "long": 'number',
  "password": 'string'
  // "fileurls": 'array'
};

function formatMessage(args) {var resources = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var defaultMessage = ['label'];
  defaultMessage.forEach(function (item) {
    if (args[item] === undefined) {
      args[item] = '';
    }
  });

  var str = resources;
  for (var key in args) {
    var reg = new RegExp('{' + key + '}');
    str = str.replace(reg, args[key]);
  }
  return str;
}

function isEmptyValue(value, type) {
  if (value === undefined || value === null) {
    return true;
  }

  if (typeof value === 'string' && !value) {
    return true;
  }

  if (Array.isArray(value) && !value.length) {
    return true;
  }

  if (type === 'object' && !Object.keys(value).length) {
    return true;
  }

  return false;
}

var types = {
  integer: function integer(value) {
    return types.number(value) && parseInt(value, 10) === value;
  },
  string: function string(value) {
    return typeof value === 'string';
  },
  number: function number(value) {
    if (isNaN(value)) {
      return false;
    }
    return typeof value === 'number';
  },
  "boolean": function boolean(value) {
    return typeof value === 'boolean';
  },
  "float": function float(value) {
    return types.number(value) && !types.integer(value);
  },
  array: function array(value) {
    return Array.isArray(value);
  },
  object: function object(value) {
    return typeof value === 'object' && !types.array(value);
  },
  date: function date(value) {
    return value instanceof Date;
  },
  timestamp: function timestamp(value) {
    if (!this.integer(value) || Math.abs(value).toString().length > 16) {
      return false;
    }
    return true;
  },
  file: function file(value) {
    return typeof value.url === 'string';
  },
  email: function email(value) {
    return typeof value === 'string' && !!value.match(pattern.email) && value.length < 255;
  },
  url: function url(value) {
    return typeof value === 'string' && !!value.match(pattern.url);
  },
  pattern: function pattern(reg, value) {
    try {
      return new RegExp(reg).test(value);
    } catch (e) {
      return false;
    }
  },
  method: function method(value) {
    return typeof value === 'function';
  },
  idcard: function idcard(value) {
    return typeof value === 'string' && !!value.match(pattern.idcard);
  },
  'url-https': function urlHttps(value) {
    return this.url(value) && value.startsWith('https://');
  },
  'url-scheme': function urlScheme(value) {
    return value.startsWith('://');
  },
  'url-web': function urlWeb(value) {
    return false;
  } };var


RuleValidator = /*#__PURE__*/function () {

  function RuleValidator(message) {_classCallCheck(this, RuleValidator);
    this._message = message;
  }_createClass(RuleValidator, [{ key: "validateRule", value: function () {var _validateRule = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(

      fieldKey, fieldValue, value, data, allData) {var result, rules, hasRequired, message, i, rule, vt, now, resultExpr;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                result = null;

                rules = fieldValue.rules;

                hasRequired = rules.findIndex(function (item) {
                  return item.required;
                });if (!(
                hasRequired < 0)) {_context.next = 8;break;}if (!(
                value === null || value === undefined)) {_context.next = 6;break;}return _context.abrupt("return",
                result);case 6:if (!(

                typeof value === 'string' && !value.length)) {_context.next = 8;break;}return _context.abrupt("return",
                result);case 8:



                message = this._message;if (!(

                rules === undefined)) {_context.next = 11;break;}return _context.abrupt("return",
                message['default']);case 11:


                i = 0;case 12:if (!(i < rules.length)) {_context.next = 35;break;}
                rule = rules[i];
                vt = this._getValidateType(rule);

                Object.assign(rule, {
                  label: fieldValue.label || "[\"".concat(fieldKey, "\"]") });if (!


                RuleValidatorHelper[vt]) {_context.next = 20;break;}
                result = RuleValidatorHelper[vt](rule, value, message);if (!(
                result != null)) {_context.next = 20;break;}return _context.abrupt("break", 35);case 20:if (!




                rule.validateExpr) {_context.next = 26;break;}
                now = Date.now();
                resultExpr = rule.validateExpr(value, allData, now);if (!(
                resultExpr === false)) {_context.next = 26;break;}
                result = this._getMessage(rule, rule.errorMessage || this._message['default']);return _context.abrupt("break", 35);case 26:if (!




                rule.validateFunction) {_context.next = 32;break;}_context.next = 29;return (
                  this.validateFunction(rule, value, data, allData, vt));case 29:result = _context.sent;if (!(
                result !== null)) {_context.next = 32;break;}return _context.abrupt("break", 35);case 32:i++;_context.next = 12;break;case 35:





                if (result !== null) {
                  result = message.TAG + result;
                }return _context.abrupt("return",

                result);case 37:case "end":return _context.stop();}}}, _callee, this);}));function validateRule(_x, _x2, _x3, _x4, _x5) {return _validateRule.apply(this, arguments);}return validateRule;}() }, { key: "validateFunction", value: function () {var _validateFunction = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(


      rule, value, data, allData, vt) {var result, callbackMessage, res;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
                result = null;_context2.prev = 1;

                callbackMessage = null;_context2.next = 5;return (
                  rule.validateFunction(rule, value, allData || data, function (message) {
                    callbackMessage = message;
                  }));case 5:res = _context2.sent;
                if (callbackMessage || typeof res === 'string' && res || res === false) {
                  result = this._getMessage(rule, callbackMessage || res, vt);
                }_context2.next = 12;break;case 9:_context2.prev = 9;_context2.t0 = _context2["catch"](1);

                result = this._getMessage(rule, _context2.t0.message, vt);case 12:return _context2.abrupt("return",

                result);case 13:case "end":return _context2.stop();}}}, _callee2, this, [[1, 9]]);}));function validateFunction(_x6, _x7, _x8, _x9, _x10) {return _validateFunction.apply(this, arguments);}return validateFunction;}() }, { key: "_getMessage", value: function _getMessage(


    rule, message, vt) {
      return formatMessage(rule, message || rule.errorMessage || this._message[vt] || message['default']);
    } }, { key: "_getValidateType", value: function _getValidateType(

    rule) {
      var result = '';
      if (rule.required) {
        result = 'required';
      } else if (rule.format) {
        result = 'format';
      } else if (rule.arrayType) {
        result = 'arrayTypeFormat';
      } else if (rule.range) {
        result = 'range';
      } else if (rule.maximum !== undefined || rule.minimum !== undefined) {
        result = 'rangeNumber';
      } else if (rule.maxLength !== undefined || rule.minLength !== undefined) {
        result = 'rangeLength';
      } else if (rule.pattern) {
        result = 'pattern';
      } else if (rule.validateFunction) {
        result = 'validateFunction';
      }
      return result;
    } }]);return RuleValidator;}();


var RuleValidatorHelper = {
  required: function required(rule, value, message) {
    if (rule.required && isEmptyValue(value, rule.format || typeof value)) {
      return formatMessage(rule, rule.errorMessage || message.required);
    }

    return null;
  },

  range: function range(rule, value, message) {var

    range =

    rule.range,errorMessage = rule.errorMessage;

    var list = new Array(range.length);
    for (var i = 0; i < range.length; i++) {
      var item = range[i];
      if (types.object(item) && item.value !== undefined) {
        list[i] = item.value;
      } else {
        list[i] = item;
      }
    }

    var result = false;
    if (Array.isArray(value)) {
      result = new Set(value.concat(list)).size === list.length;
    } else {
      if (list.indexOf(value) > -1) {
        result = true;
      }
    }

    if (!result) {
      return formatMessage(rule, errorMessage || message['enum']);
    }

    return null;
  },

  rangeNumber: function rangeNumber(rule, value, message) {
    if (!types.number(value)) {
      return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
    }var


    minimum =



    rule.minimum,maximum = rule.maximum,exclusiveMinimum = rule.exclusiveMinimum,exclusiveMaximum = rule.exclusiveMaximum;
    var min = exclusiveMinimum ? value <= minimum : value < minimum;
    var max = exclusiveMaximum ? value >= maximum : value > maximum;

    if (minimum !== undefined && min) {
      return formatMessage(rule, rule.errorMessage || message['number'][exclusiveMinimum ?
      'exclusiveMinimum' : 'minimum']);

    } else if (maximum !== undefined && max) {
      return formatMessage(rule, rule.errorMessage || message['number'][exclusiveMaximum ?
      'exclusiveMaximum' : 'maximum']);

    } else if (minimum !== undefined && maximum !== undefined && (min || max)) {
      return formatMessage(rule, rule.errorMessage || message['number'].range);
    }

    return null;
  },

  rangeLength: function rangeLength(rule, value, message) {
    if (!types.string(value) && !types.array(value)) {
      return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
    }

    var min = rule.minLength;
    var max = rule.maxLength;
    var val = value.length;

    if (min !== undefined && val < min) {
      return formatMessage(rule, rule.errorMessage || message['length'].minLength);
    } else if (max !== undefined && val > max) {
      return formatMessage(rule, rule.errorMessage || message['length'].maxLength);
    } else if (min !== undefined && max !== undefined && (val < min || val > max)) {
      return formatMessage(rule, rule.errorMessage || message['length'].range);
    }

    return null;
  },

  pattern: function pattern(rule, value, message) {
    if (!types['pattern'](rule.pattern, value)) {
      return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
    }

    return null;
  },

  format: function format(rule, value, message) {
    var customTypes = Object.keys(types);
    var format = FORMAT_MAPPING[rule.format] ? FORMAT_MAPPING[rule.format] : rule.format || rule.arrayType;

    if (customTypes.indexOf(format) > -1) {
      if (!types[format](value)) {
        return formatMessage(rule, rule.errorMessage || message.typeError);
      }
    }

    return null;
  },

  arrayTypeFormat: function arrayTypeFormat(rule, value, message) {
    if (!Array.isArray(value)) {
      return formatMessage(rule, rule.errorMessage || message.typeError);
    }

    for (var i = 0; i < value.length; i++) {
      var element = value[i];
      var formatResult = this.format(rule, element, message);
      if (formatResult !== null) {
        return formatResult;
      }
    }

    return null;
  } };var


SchemaValidator = /*#__PURE__*/function (_RuleValidator) {_inherits(SchemaValidator, _RuleValidator);var _super = _createSuper(SchemaValidator);

  function SchemaValidator(schema, options) {var _this;_classCallCheck(this, SchemaValidator);
    _this = _super.call(this, SchemaValidator.message);

    _this._schema = schema;
    _this._options = options || null;return _this;
  }_createClass(SchemaValidator, [{ key: "updateSchema", value: function updateSchema(

    schema) {
      this._schema = schema;
    } }, { key: "validate", value: function () {var _validate = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(

      data, allData) {var result;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
                result = this._checkFieldInSchema(data);if (
                result) {_context3.next = 5;break;}_context3.next = 4;return (
                  this.invokeValidate(data, false, allData));case 4:result = _context3.sent;case 5:return _context3.abrupt("return",

                result.length ? result[0] : null);case 6:case "end":return _context3.stop();}}}, _callee3, this);}));function validate(_x11, _x12) {return _validate.apply(this, arguments);}return validate;}() }, { key: "validateAll", value: function () {var _validateAll = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4(


      data, allData) {var result;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:
                result = this._checkFieldInSchema(data);if (
                result) {_context4.next = 5;break;}_context4.next = 4;return (
                  this.invokeValidate(data, true, allData));case 4:result = _context4.sent;case 5:return _context4.abrupt("return",

                result);case 6:case "end":return _context4.stop();}}}, _callee4, this);}));function validateAll(_x13, _x14) {return _validateAll.apply(this, arguments);}return validateAll;}() }, { key: "validateUpdate", value: function () {var _validateUpdate = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5(


      data, allData) {var result;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:
                result = this._checkFieldInSchema(data);if (
                result) {_context5.next = 5;break;}_context5.next = 4;return (
                  this.invokeValidateUpdate(data, false, allData));case 4:result = _context5.sent;case 5:return _context5.abrupt("return",

                result.length ? result[0] : null);case 6:case "end":return _context5.stop();}}}, _callee5, this);}));function validateUpdate(_x15, _x16) {return _validateUpdate.apply(this, arguments);}return validateUpdate;}() }, { key: "invokeValidate", value: function () {var _invokeValidate = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6(


      data, all, allData) {var result, schema, key, value, errorMessage;return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:
                result = [];
                schema = this._schema;_context6.t0 = _regenerator.default.keys(
                schema);case 3:if ((_context6.t1 = _context6.t0()).done) {_context6.next = 15;break;}key = _context6.t1.value;
                value = schema[key];_context6.next = 8;return (
                  this.validateRule(key, value, data[key], data, allData));case 8:errorMessage = _context6.sent;if (!(
                errorMessage != null)) {_context6.next = 13;break;}
                result.push({
                  key: key,
                  errorMessage: errorMessage });if (

                all) {_context6.next = 13;break;}return _context6.abrupt("break", 15);case 13:_context6.next = 3;break;case 15:return _context6.abrupt("return",


                result);case 16:case "end":return _context6.stop();}}}, _callee6, this);}));function invokeValidate(_x17, _x18, _x19) {return _invokeValidate.apply(this, arguments);}return invokeValidate;}() }, { key: "invokeValidateUpdate", value: function () {var _invokeValidateUpdate = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee7(


      data, all, allData) {var result, key, errorMessage;return _regenerator.default.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:
                result = [];_context7.t0 = _regenerator.default.keys(
                data);case 2:if ((_context7.t1 = _context7.t0()).done) {_context7.next = 13;break;}key = _context7.t1.value;_context7.next = 6;return (
                  this.validateRule(key, this._schema[key], data[key], data, allData));case 6:errorMessage = _context7.sent;if (!(
                errorMessage != null)) {_context7.next = 11;break;}
                result.push({
                  key: key,
                  errorMessage: errorMessage });if (

                all) {_context7.next = 11;break;}return _context7.abrupt("break", 13);case 11:_context7.next = 2;break;case 13:return _context7.abrupt("return",


                result);case 14:case "end":return _context7.stop();}}}, _callee7, this);}));function invokeValidateUpdate(_x20, _x21, _x22) {return _invokeValidateUpdate.apply(this, arguments);}return invokeValidateUpdate;}() }, { key: "_checkFieldInSchema", value: function _checkFieldInSchema(


    data) {
      var keys = Object.keys(data);
      var keys2 = Object.keys(this._schema);
      if (new Set(keys.concat(keys2)).size === keys2.length) {
        return '';
      }

      var noExistFields = keys.filter(function (key) {
        return keys2.indexOf(key) < 0;
      });
      var errorMessage = formatMessage({
        field: JSON.stringify(noExistFields) },
      SchemaValidator.message.TAG + SchemaValidator.message['defaultInvalid']);
      return [{
        key: 'invalid',
        errorMessage: errorMessage }];

    } }]);return SchemaValidator;}(RuleValidator);


function Message() {
  return {
    TAG: "",
    default: '验证错误',
    defaultInvalid: '提交的字段{field}在数据库中并不存在',
    validateFunction: '验证无效',
    required: '{label}必填',
    'enum': '{label}超出范围',
    timestamp: '{label}格式无效',
    whitespace: '{label}不能为空',
    typeError: '{label}类型无效',
    date: {
      format: '{label}日期{value}格式无效',
      parse: '{label}日期无法解析,{value}无效',
      invalid: '{label}日期{value}无效' },

    length: {
      minLength: '{label}长度不能少于{minLength}',
      maxLength: '{label}长度不能超过{maxLength}',
      range: '{label}必须介于{minLength}和{maxLength}之间' },

    number: {
      minimum: '{label}不能小于{minimum}',
      maximum: '{label}不能大于{maximum}',
      exclusiveMinimum: '{label}不能小于等于{minimum}',
      exclusiveMaximum: '{label}不能大于等于{maximum}',
      range: '{label}必须介于{minimum}and{maximum}之间' },

    pattern: {
      mismatch: '{label}格式不匹配' } };


}


SchemaValidator.message = new Message();var _default =

SchemaValidator;exports.default = _default;

/***/ }),

/***/ 3:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou'){//百度、快手 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' &&
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    // NOTE 此处将 != 修改为 !==。涉及地方太多恐怕测试不到，如果出现数据对比问题，将其修改回来。
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"e-vegetables","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"e-vegetables","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"e-vegetables","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"e-vegetables","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }

  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      (this.$scope['_triggerEvent'] || this.$scope['triggerEvent'])
        .call(this.$scope, event, {
          __args__: toArray(arguments, 1)
        })
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value)
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value)
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 350:
/*!**********************************************************************************!*\
  !*** E:/github/e-vegetables/uni_modules/uni-icons/components/uni-icons/icons.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "id": "2852637",
  "name": "uniui图标库",
  "font_family": "uniicons",
  "css_prefix_text": "uniui-",
  "description": "",
  "glyphs": [
  {
    "icon_id": "25027049",
    "name": "yanse",
    "font_class": "color",
    "unicode": "e6cf",
    "unicode_decimal": 59087 },

  {
    "icon_id": "25027048",
    "name": "wallet",
    "font_class": "wallet",
    "unicode": "e6b1",
    "unicode_decimal": 59057 },

  {
    "icon_id": "25015720",
    "name": "settings-filled",
    "font_class": "settings-filled",
    "unicode": "e6ce",
    "unicode_decimal": 59086 },

  {
    "icon_id": "25015434",
    "name": "shimingrenzheng-filled",
    "font_class": "auth-filled",
    "unicode": "e6cc",
    "unicode_decimal": 59084 },

  {
    "icon_id": "24934246",
    "name": "shop-filled",
    "font_class": "shop-filled",
    "unicode": "e6cd",
    "unicode_decimal": 59085 },

  {
    "icon_id": "24934159",
    "name": "staff-filled-01",
    "font_class": "staff-filled",
    "unicode": "e6cb",
    "unicode_decimal": 59083 },

  {
    "icon_id": "24932461",
    "name": "VIP-filled",
    "font_class": "vip-filled",
    "unicode": "e6c6",
    "unicode_decimal": 59078 },

  {
    "icon_id": "24932462",
    "name": "plus_circle_fill",
    "font_class": "plus-filled",
    "unicode": "e6c7",
    "unicode_decimal": 59079 },

  {
    "icon_id": "24932463",
    "name": "folder_add-filled",
    "font_class": "folder-add-filled",
    "unicode": "e6c8",
    "unicode_decimal": 59080 },

  {
    "icon_id": "24932464",
    "name": "yanse-filled",
    "font_class": "color-filled",
    "unicode": "e6c9",
    "unicode_decimal": 59081 },

  {
    "icon_id": "24932465",
    "name": "tune-filled",
    "font_class": "tune-filled",
    "unicode": "e6ca",
    "unicode_decimal": 59082 },

  {
    "icon_id": "24932455",
    "name": "a-rilidaka-filled",
    "font_class": "calendar-filled",
    "unicode": "e6c0",
    "unicode_decimal": 59072 },

  {
    "icon_id": "24932456",
    "name": "notification-filled",
    "font_class": "notification-filled",
    "unicode": "e6c1",
    "unicode_decimal": 59073 },

  {
    "icon_id": "24932457",
    "name": "wallet-filled",
    "font_class": "wallet-filled",
    "unicode": "e6c2",
    "unicode_decimal": 59074 },

  {
    "icon_id": "24932458",
    "name": "paihangbang-filled",
    "font_class": "medal-filled",
    "unicode": "e6c3",
    "unicode_decimal": 59075 },

  {
    "icon_id": "24932459",
    "name": "gift-filled",
    "font_class": "gift-filled",
    "unicode": "e6c4",
    "unicode_decimal": 59076 },

  {
    "icon_id": "24932460",
    "name": "fire-filled",
    "font_class": "fire-filled",
    "unicode": "e6c5",
    "unicode_decimal": 59077 },

  {
    "icon_id": "24928001",
    "name": "refreshempty",
    "font_class": "refreshempty",
    "unicode": "e6bf",
    "unicode_decimal": 59071 },

  {
    "icon_id": "24926853",
    "name": "location-ellipse",
    "font_class": "location-filled",
    "unicode": "e6af",
    "unicode_decimal": 59055 },

  {
    "icon_id": "24926735",
    "name": "person-filled",
    "font_class": "person-filled",
    "unicode": "e69d",
    "unicode_decimal": 59037 },

  {
    "icon_id": "24926703",
    "name": "personadd-filled",
    "font_class": "personadd-filled",
    "unicode": "e698",
    "unicode_decimal": 59032 },

  {
    "icon_id": "24923351",
    "name": "back",
    "font_class": "back",
    "unicode": "e6b9",
    "unicode_decimal": 59065 },

  {
    "icon_id": "24923352",
    "name": "forward",
    "font_class": "forward",
    "unicode": "e6ba",
    "unicode_decimal": 59066 },

  {
    "icon_id": "24923353",
    "name": "arrowthinright",
    "font_class": "arrow-right",
    "unicode": "e6bb",
    "unicode_decimal": 59067 },

  {
    "icon_id": "24923353",
    "name": "arrowthinright",
    "font_class": "arrowthinright",
    "unicode": "e6bb",
    "unicode_decimal": 59067 },

  {
    "icon_id": "24923354",
    "name": "arrowthinleft",
    "font_class": "arrow-left",
    "unicode": "e6bc",
    "unicode_decimal": 59068 },

  {
    "icon_id": "24923354",
    "name": "arrowthinleft",
    "font_class": "arrowthinleft",
    "unicode": "e6bc",
    "unicode_decimal": 59068 },

  {
    "icon_id": "24923355",
    "name": "arrowthinup",
    "font_class": "arrow-up",
    "unicode": "e6bd",
    "unicode_decimal": 59069 },

  {
    "icon_id": "24923355",
    "name": "arrowthinup",
    "font_class": "arrowthinup",
    "unicode": "e6bd",
    "unicode_decimal": 59069 },

  {
    "icon_id": "24923356",
    "name": "arrowthindown",
    "font_class": "arrow-down",
    "unicode": "e6be",
    "unicode_decimal": 59070 },
  {
    "icon_id": "24923356",
    "name": "arrowthindown",
    "font_class": "arrowthindown",
    "unicode": "e6be",
    "unicode_decimal": 59070 },

  {
    "icon_id": "24923349",
    "name": "arrowdown",
    "font_class": "bottom",
    "unicode": "e6b8",
    "unicode_decimal": 59064 },
  {
    "icon_id": "24923349",
    "name": "arrowdown",
    "font_class": "arrowdown",
    "unicode": "e6b8",
    "unicode_decimal": 59064 },

  {
    "icon_id": "24923346",
    "name": "arrowright",
    "font_class": "right",
    "unicode": "e6b5",
    "unicode_decimal": 59061 },

  {
    "icon_id": "24923346",
    "name": "arrowright",
    "font_class": "arrowright",
    "unicode": "e6b5",
    "unicode_decimal": 59061 },

  {
    "icon_id": "24923347",
    "name": "arrowup",
    "font_class": "top",
    "unicode": "e6b6",
    "unicode_decimal": 59062 },

  {
    "icon_id": "24923347",
    "name": "arrowup",
    "font_class": "arrowup",
    "unicode": "e6b6",
    "unicode_decimal": 59062 },

  {
    "icon_id": "24923348",
    "name": "arrowleft",
    "font_class": "left",
    "unicode": "e6b7",
    "unicode_decimal": 59063 },

  {
    "icon_id": "24923348",
    "name": "arrowleft",
    "font_class": "arrowleft",
    "unicode": "e6b7",
    "unicode_decimal": 59063 },

  {
    "icon_id": "24923334",
    "name": "eye",
    "font_class": "eye",
    "unicode": "e651",
    "unicode_decimal": 58961 },

  {
    "icon_id": "24923335",
    "name": "eye-filled",
    "font_class": "eye-filled",
    "unicode": "e66a",
    "unicode_decimal": 58986 },

  {
    "icon_id": "24923336",
    "name": "eye-slash",
    "font_class": "eye-slash",
    "unicode": "e6b3",
    "unicode_decimal": 59059 },

  {
    "icon_id": "24923337",
    "name": "eye-slash-filled",
    "font_class": "eye-slash-filled",
    "unicode": "e6b4",
    "unicode_decimal": 59060 },

  {
    "icon_id": "24923305",
    "name": "info-filled",
    "font_class": "info-filled",
    "unicode": "e649",
    "unicode_decimal": 58953 },

  {
    "icon_id": "24923299",
    "name": "reload-01",
    "font_class": "reload",
    "unicode": "e6b2",
    "unicode_decimal": 59058 },

  {
    "icon_id": "24923195",
    "name": "mic_slash_fill",
    "font_class": "micoff-filled",
    "unicode": "e6b0",
    "unicode_decimal": 59056 },

  {
    "icon_id": "24923165",
    "name": "map-pin-ellipse",
    "font_class": "map-pin-ellipse",
    "unicode": "e6ac",
    "unicode_decimal": 59052 },

  {
    "icon_id": "24923166",
    "name": "map-pin",
    "font_class": "map-pin",
    "unicode": "e6ad",
    "unicode_decimal": 59053 },

  {
    "icon_id": "24923167",
    "name": "location",
    "font_class": "location",
    "unicode": "e6ae",
    "unicode_decimal": 59054 },

  {
    "icon_id": "24923064",
    "name": "starhalf",
    "font_class": "starhalf",
    "unicode": "e683",
    "unicode_decimal": 59011 },

  {
    "icon_id": "24923065",
    "name": "star",
    "font_class": "star",
    "unicode": "e688",
    "unicode_decimal": 59016 },

  {
    "icon_id": "24923066",
    "name": "star-filled",
    "font_class": "star-filled",
    "unicode": "e68f",
    "unicode_decimal": 59023 },

  {
    "icon_id": "24899646",
    "name": "a-rilidaka",
    "font_class": "calendar",
    "unicode": "e6a0",
    "unicode_decimal": 59040 },

  {
    "icon_id": "24899647",
    "name": "fire",
    "font_class": "fire",
    "unicode": "e6a1",
    "unicode_decimal": 59041 },

  {
    "icon_id": "24899648",
    "name": "paihangbang",
    "font_class": "medal",
    "unicode": "e6a2",
    "unicode_decimal": 59042 },

  {
    "icon_id": "24899649",
    "name": "font",
    "font_class": "font",
    "unicode": "e6a3",
    "unicode_decimal": 59043 },

  {
    "icon_id": "24899650",
    "name": "gift",
    "font_class": "gift",
    "unicode": "e6a4",
    "unicode_decimal": 59044 },

  {
    "icon_id": "24899651",
    "name": "link",
    "font_class": "link",
    "unicode": "e6a5",
    "unicode_decimal": 59045 },

  {
    "icon_id": "24899652",
    "name": "notification",
    "font_class": "notification",
    "unicode": "e6a6",
    "unicode_decimal": 59046 },

  {
    "icon_id": "24899653",
    "name": "staff",
    "font_class": "staff",
    "unicode": "e6a7",
    "unicode_decimal": 59047 },

  {
    "icon_id": "24899654",
    "name": "VIP",
    "font_class": "vip",
    "unicode": "e6a8",
    "unicode_decimal": 59048 },

  {
    "icon_id": "24899655",
    "name": "folder_add",
    "font_class": "folder-add",
    "unicode": "e6a9",
    "unicode_decimal": 59049 },

  {
    "icon_id": "24899656",
    "name": "tune",
    "font_class": "tune",
    "unicode": "e6aa",
    "unicode_decimal": 59050 },

  {
    "icon_id": "24899657",
    "name": "shimingrenzheng",
    "font_class": "auth",
    "unicode": "e6ab",
    "unicode_decimal": 59051 },

  {
    "icon_id": "24899565",
    "name": "person",
    "font_class": "person",
    "unicode": "e699",
    "unicode_decimal": 59033 },

  {
    "icon_id": "24899566",
    "name": "email-filled",
    "font_class": "email-filled",
    "unicode": "e69a",
    "unicode_decimal": 59034 },

  {
    "icon_id": "24899567",
    "name": "phone-filled",
    "font_class": "phone-filled",
    "unicode": "e69b",
    "unicode_decimal": 59035 },

  {
    "icon_id": "24899568",
    "name": "phone",
    "font_class": "phone",
    "unicode": "e69c",
    "unicode_decimal": 59036 },

  {
    "icon_id": "24899570",
    "name": "email",
    "font_class": "email",
    "unicode": "e69e",
    "unicode_decimal": 59038 },

  {
    "icon_id": "24899571",
    "name": "personadd",
    "font_class": "personadd",
    "unicode": "e69f",
    "unicode_decimal": 59039 },

  {
    "icon_id": "24899558",
    "name": "chatboxes-filled",
    "font_class": "chatboxes-filled",
    "unicode": "e692",
    "unicode_decimal": 59026 },

  {
    "icon_id": "24899559",
    "name": "contact",
    "font_class": "contact",
    "unicode": "e693",
    "unicode_decimal": 59027 },

  {
    "icon_id": "24899560",
    "name": "chatbubble-filled",
    "font_class": "chatbubble-filled",
    "unicode": "e694",
    "unicode_decimal": 59028 },

  {
    "icon_id": "24899561",
    "name": "contact-filled",
    "font_class": "contact-filled",
    "unicode": "e695",
    "unicode_decimal": 59029 },

  {
    "icon_id": "24899562",
    "name": "chatboxes",
    "font_class": "chatboxes",
    "unicode": "e696",
    "unicode_decimal": 59030 },

  {
    "icon_id": "24899563",
    "name": "chatbubble",
    "font_class": "chatbubble",
    "unicode": "e697",
    "unicode_decimal": 59031 },

  {
    "icon_id": "24881290",
    "name": "upload-filled",
    "font_class": "upload-filled",
    "unicode": "e68e",
    "unicode_decimal": 59022 },

  {
    "icon_id": "24881292",
    "name": "upload",
    "font_class": "upload",
    "unicode": "e690",
    "unicode_decimal": 59024 },

  {
    "icon_id": "24881293",
    "name": "weixin",
    "font_class": "weixin",
    "unicode": "e691",
    "unicode_decimal": 59025 },

  {
    "icon_id": "24881274",
    "name": "compose",
    "font_class": "compose",
    "unicode": "e67f",
    "unicode_decimal": 59007 },

  {
    "icon_id": "24881275",
    "name": "qq",
    "font_class": "qq",
    "unicode": "e680",
    "unicode_decimal": 59008 },

  {
    "icon_id": "24881276",
    "name": "download-filled",
    "font_class": "download-filled",
    "unicode": "e681",
    "unicode_decimal": 59009 },

  {
    "icon_id": "24881277",
    "name": "pengyouquan",
    "font_class": "pyq",
    "unicode": "e682",
    "unicode_decimal": 59010 },

  {
    "icon_id": "24881279",
    "name": "sound",
    "font_class": "sound",
    "unicode": "e684",
    "unicode_decimal": 59012 },

  {
    "icon_id": "24881280",
    "name": "trash-filled",
    "font_class": "trash-filled",
    "unicode": "e685",
    "unicode_decimal": 59013 },

  {
    "icon_id": "24881281",
    "name": "sound-filled",
    "font_class": "sound-filled",
    "unicode": "e686",
    "unicode_decimal": 59014 },

  {
    "icon_id": "24881282",
    "name": "trash",
    "font_class": "trash",
    "unicode": "e687",
    "unicode_decimal": 59015 },

  {
    "icon_id": "24881284",
    "name": "videocam-filled",
    "font_class": "videocam-filled",
    "unicode": "e689",
    "unicode_decimal": 59017 },

  {
    "icon_id": "24881285",
    "name": "spinner-cycle",
    "font_class": "spinner-cycle",
    "unicode": "e68a",
    "unicode_decimal": 59018 },

  {
    "icon_id": "24881286",
    "name": "weibo",
    "font_class": "weibo",
    "unicode": "e68b",
    "unicode_decimal": 59019 },

  {
    "icon_id": "24881288",
    "name": "videocam",
    "font_class": "videocam",
    "unicode": "e68c",
    "unicode_decimal": 59020 },

  {
    "icon_id": "24881289",
    "name": "download",
    "font_class": "download",
    "unicode": "e68d",
    "unicode_decimal": 59021 },

  {
    "icon_id": "24879601",
    "name": "help",
    "font_class": "help",
    "unicode": "e679",
    "unicode_decimal": 59001 },

  {
    "icon_id": "24879602",
    "name": "navigate-filled",
    "font_class": "navigate-filled",
    "unicode": "e67a",
    "unicode_decimal": 59002 },

  {
    "icon_id": "24879603",
    "name": "plusempty",
    "font_class": "plusempty",
    "unicode": "e67b",
    "unicode_decimal": 59003 },

  {
    "icon_id": "24879604",
    "name": "smallcircle",
    "font_class": "smallcircle",
    "unicode": "e67c",
    "unicode_decimal": 59004 },

  {
    "icon_id": "24879605",
    "name": "minus-filled",
    "font_class": "minus-filled",
    "unicode": "e67d",
    "unicode_decimal": 59005 },

  {
    "icon_id": "24879606",
    "name": "micoff",
    "font_class": "micoff",
    "unicode": "e67e",
    "unicode_decimal": 59006 },

  {
    "icon_id": "24879588",
    "name": "closeempty",
    "font_class": "closeempty",
    "unicode": "e66c",
    "unicode_decimal": 58988 },

  {
    "icon_id": "24879589",
    "name": "clear",
    "font_class": "clear",
    "unicode": "e66d",
    "unicode_decimal": 58989 },

  {
    "icon_id": "24879590",
    "name": "navigate",
    "font_class": "navigate",
    "unicode": "e66e",
    "unicode_decimal": 58990 },

  {
    "icon_id": "24879591",
    "name": "minus",
    "font_class": "minus",
    "unicode": "e66f",
    "unicode_decimal": 58991 },

  {
    "icon_id": "24879592",
    "name": "image",
    "font_class": "image",
    "unicode": "e670",
    "unicode_decimal": 58992 },

  {
    "icon_id": "24879593",
    "name": "mic",
    "font_class": "mic",
    "unicode": "e671",
    "unicode_decimal": 58993 },

  {
    "icon_id": "24879594",
    "name": "paperplane",
    "font_class": "paperplane",
    "unicode": "e672",
    "unicode_decimal": 58994 },

  {
    "icon_id": "24879595",
    "name": "close",
    "font_class": "close",
    "unicode": "e673",
    "unicode_decimal": 58995 },

  {
    "icon_id": "24879596",
    "name": "help-filled",
    "font_class": "help-filled",
    "unicode": "e674",
    "unicode_decimal": 58996 },

  {
    "icon_id": "24879597",
    "name": "plus-filled",
    "font_class": "paperplane-filled",
    "unicode": "e675",
    "unicode_decimal": 58997 },

  {
    "icon_id": "24879598",
    "name": "plus",
    "font_class": "plus",
    "unicode": "e676",
    "unicode_decimal": 58998 },

  {
    "icon_id": "24879599",
    "name": "mic-filled",
    "font_class": "mic-filled",
    "unicode": "e677",
    "unicode_decimal": 58999 },

  {
    "icon_id": "24879600",
    "name": "image-filled",
    "font_class": "image-filled",
    "unicode": "e678",
    "unicode_decimal": 59000 },

  {
    "icon_id": "24855900",
    "name": "locked-filled",
    "font_class": "locked-filled",
    "unicode": "e668",
    "unicode_decimal": 58984 },

  {
    "icon_id": "24855901",
    "name": "info",
    "font_class": "info",
    "unicode": "e669",
    "unicode_decimal": 58985 },

  {
    "icon_id": "24855903",
    "name": "locked",
    "font_class": "locked",
    "unicode": "e66b",
    "unicode_decimal": 58987 },

  {
    "icon_id": "24855884",
    "name": "camera-filled",
    "font_class": "camera-filled",
    "unicode": "e658",
    "unicode_decimal": 58968 },

  {
    "icon_id": "24855885",
    "name": "chat-filled",
    "font_class": "chat-filled",
    "unicode": "e659",
    "unicode_decimal": 58969 },

  {
    "icon_id": "24855886",
    "name": "camera",
    "font_class": "camera",
    "unicode": "e65a",
    "unicode_decimal": 58970 },

  {
    "icon_id": "24855887",
    "name": "circle",
    "font_class": "circle",
    "unicode": "e65b",
    "unicode_decimal": 58971 },

  {
    "icon_id": "24855888",
    "name": "checkmarkempty",
    "font_class": "checkmarkempty",
    "unicode": "e65c",
    "unicode_decimal": 58972 },

  {
    "icon_id": "24855889",
    "name": "chat",
    "font_class": "chat",
    "unicode": "e65d",
    "unicode_decimal": 58973 },

  {
    "icon_id": "24855890",
    "name": "circle-filled",
    "font_class": "circle-filled",
    "unicode": "e65e",
    "unicode_decimal": 58974 },

  {
    "icon_id": "24855891",
    "name": "flag",
    "font_class": "flag",
    "unicode": "e65f",
    "unicode_decimal": 58975 },

  {
    "icon_id": "24855892",
    "name": "flag-filled",
    "font_class": "flag-filled",
    "unicode": "e660",
    "unicode_decimal": 58976 },

  {
    "icon_id": "24855893",
    "name": "gear-filled",
    "font_class": "gear-filled",
    "unicode": "e661",
    "unicode_decimal": 58977 },

  {
    "icon_id": "24855894",
    "name": "home",
    "font_class": "home",
    "unicode": "e662",
    "unicode_decimal": 58978 },

  {
    "icon_id": "24855895",
    "name": "home-filled",
    "font_class": "home-filled",
    "unicode": "e663",
    "unicode_decimal": 58979 },

  {
    "icon_id": "24855896",
    "name": "gear",
    "font_class": "gear",
    "unicode": "e664",
    "unicode_decimal": 58980 },

  {
    "icon_id": "24855897",
    "name": "smallcircle-filled",
    "font_class": "smallcircle-filled",
    "unicode": "e665",
    "unicode_decimal": 58981 },

  {
    "icon_id": "24855898",
    "name": "map-filled",
    "font_class": "map-filled",
    "unicode": "e666",
    "unicode_decimal": 58982 },

  {
    "icon_id": "24855899",
    "name": "map",
    "font_class": "map",
    "unicode": "e667",
    "unicode_decimal": 58983 },

  {
    "icon_id": "24855825",
    "name": "refresh-filled",
    "font_class": "refresh-filled",
    "unicode": "e656",
    "unicode_decimal": 58966 },

  {
    "icon_id": "24855826",
    "name": "refresh",
    "font_class": "refresh",
    "unicode": "e657",
    "unicode_decimal": 58967 },

  {
    "icon_id": "24855808",
    "name": "cloud-upload",
    "font_class": "cloud-upload",
    "unicode": "e645",
    "unicode_decimal": 58949 },

  {
    "icon_id": "24855809",
    "name": "cloud-download-filled",
    "font_class": "cloud-download-filled",
    "unicode": "e646",
    "unicode_decimal": 58950 },

  {
    "icon_id": "24855810",
    "name": "cloud-download",
    "font_class": "cloud-download",
    "unicode": "e647",
    "unicode_decimal": 58951 },

  {
    "icon_id": "24855811",
    "name": "cloud-upload-filled",
    "font_class": "cloud-upload-filled",
    "unicode": "e648",
    "unicode_decimal": 58952 },

  {
    "icon_id": "24855813",
    "name": "redo",
    "font_class": "redo",
    "unicode": "e64a",
    "unicode_decimal": 58954 },

  {
    "icon_id": "24855814",
    "name": "images-filled",
    "font_class": "images-filled",
    "unicode": "e64b",
    "unicode_decimal": 58955 },

  {
    "icon_id": "24855815",
    "name": "undo-filled",
    "font_class": "undo-filled",
    "unicode": "e64c",
    "unicode_decimal": 58956 },

  {
    "icon_id": "24855816",
    "name": "more",
    "font_class": "more",
    "unicode": "e64d",
    "unicode_decimal": 58957 },

  {
    "icon_id": "24855817",
    "name": "more-filled",
    "font_class": "more-filled",
    "unicode": "e64e",
    "unicode_decimal": 58958 },

  {
    "icon_id": "24855818",
    "name": "undo",
    "font_class": "undo",
    "unicode": "e64f",
    "unicode_decimal": 58959 },

  {
    "icon_id": "24855819",
    "name": "images",
    "font_class": "images",
    "unicode": "e650",
    "unicode_decimal": 58960 },

  {
    "icon_id": "24855821",
    "name": "paperclip",
    "font_class": "paperclip",
    "unicode": "e652",
    "unicode_decimal": 58962 },

  {
    "icon_id": "24855822",
    "name": "settings",
    "font_class": "settings",
    "unicode": "e653",
    "unicode_decimal": 58963 },

  {
    "icon_id": "24855823",
    "name": "search",
    "font_class": "search",
    "unicode": "e654",
    "unicode_decimal": 58964 },

  {
    "icon_id": "24855824",
    "name": "redo-filled",
    "font_class": "redo-filled",
    "unicode": "e655",
    "unicode_decimal": 58965 },

  {
    "icon_id": "24841702",
    "name": "list",
    "font_class": "list",
    "unicode": "e644",
    "unicode_decimal": 58948 },

  {
    "icon_id": "24841489",
    "name": "mail-open-filled",
    "font_class": "mail-open-filled",
    "unicode": "e63a",
    "unicode_decimal": 58938 },

  {
    "icon_id": "24841491",
    "name": "hand-thumbsdown-filled",
    "font_class": "hand-down-filled",
    "unicode": "e63c",
    "unicode_decimal": 58940 },

  {
    "icon_id": "24841492",
    "name": "hand-thumbsdown",
    "font_class": "hand-down",
    "unicode": "e63d",
    "unicode_decimal": 58941 },

  {
    "icon_id": "24841493",
    "name": "hand-thumbsup-filled",
    "font_class": "hand-up-filled",
    "unicode": "e63e",
    "unicode_decimal": 58942 },

  {
    "icon_id": "24841494",
    "name": "hand-thumbsup",
    "font_class": "hand-up",
    "unicode": "e63f",
    "unicode_decimal": 58943 },

  {
    "icon_id": "24841496",
    "name": "heart-filled",
    "font_class": "heart-filled",
    "unicode": "e641",
    "unicode_decimal": 58945 },

  {
    "icon_id": "24841498",
    "name": "mail-open",
    "font_class": "mail-open",
    "unicode": "e643",
    "unicode_decimal": 58947 },

  {
    "icon_id": "24841488",
    "name": "heart",
    "font_class": "heart",
    "unicode": "e639",
    "unicode_decimal": 58937 },

  {
    "icon_id": "24839963",
    "name": "loop",
    "font_class": "loop",
    "unicode": "e633",
    "unicode_decimal": 58931 },

  {
    "icon_id": "24839866",
    "name": "pulldown",
    "font_class": "pulldown",
    "unicode": "e632",
    "unicode_decimal": 58930 },

  {
    "icon_id": "24813798",
    "name": "scan",
    "font_class": "scan",
    "unicode": "e62a",
    "unicode_decimal": 58922 },

  {
    "icon_id": "24813786",
    "name": "bars",
    "font_class": "bars",
    "unicode": "e627",
    "unicode_decimal": 58919 },

  {
    "icon_id": "24813788",
    "name": "cart-filled",
    "font_class": "cart-filled",
    "unicode": "e629",
    "unicode_decimal": 58921 },

  {
    "icon_id": "24813790",
    "name": "checkbox",
    "font_class": "checkbox",
    "unicode": "e62b",
    "unicode_decimal": 58923 },

  {
    "icon_id": "24813791",
    "name": "checkbox-filled",
    "font_class": "checkbox-filled",
    "unicode": "e62c",
    "unicode_decimal": 58924 },

  {
    "icon_id": "24813794",
    "name": "shop",
    "font_class": "shop",
    "unicode": "e62f",
    "unicode_decimal": 58927 },

  {
    "icon_id": "24813795",
    "name": "headphones",
    "font_class": "headphones",
    "unicode": "e630",
    "unicode_decimal": 58928 },

  {
    "icon_id": "24813796",
    "name": "cart",
    "font_class": "cart",
    "unicode": "e631",
    "unicode_decimal": 58929 }] };exports.default = _default;

/***/ }),

/***/ 358:
/*!**************************************************************************************************!*\
  !*** E:/github/e-vegetables/uni_modules/uni-dateformat/components/uni-dateformat/date-format.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.formatDate = formatDate;exports.friendlyDate = friendlyDate; // yyyy-MM-dd hh:mm:ss.SSS 所有支持的类型
function pad(str) {var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  str += '';
  while (str.length < length) {
    str = '0' + str;
  }
  return str.slice(-length);
}

var parser = {
  yyyy: function yyyy(dateObj) {
    return pad(dateObj.year, 4);
  },
  yy: function yy(dateObj) {
    return pad(dateObj.year);
  },
  MM: function MM(dateObj) {
    return pad(dateObj.month);
  },
  M: function M(dateObj) {
    return dateObj.month;
  },
  dd: function dd(dateObj) {
    return pad(dateObj.day);
  },
  d: function d(dateObj) {
    return dateObj.day;
  },
  hh: function hh(dateObj) {
    return pad(dateObj.hour);
  },
  h: function h(dateObj) {
    return dateObj.hour;
  },
  mm: function mm(dateObj) {
    return pad(dateObj.minute);
  },
  m: function m(dateObj) {
    return dateObj.minute;
  },
  ss: function ss(dateObj) {
    return pad(dateObj.second);
  },
  s: function s(dateObj) {
    return dateObj.second;
  },
  SSS: function SSS(dateObj) {
    return pad(dateObj.millisecond, 3);
  },
  S: function S(dateObj) {
    return dateObj.millisecond;
  } };


// 这都n年了iOS依然不认识2020-12-12，需要转换为2020/12/12
function getDate(time) {
  if (time instanceof Date) {
    return time;
  }
  switch (typeof time) {
    case 'string':
      {
        // 2020-12-12T12:12:12.000Z、2020-12-12T12:12:12.000
        if (time.indexOf('T') > -1) {
          return new Date(time);
        }
        return new Date(time.replace(/-/g, '/'));
      }
    default:
      return new Date(time);}

}

function formatDate(date) {var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy/MM/dd hh:mm:ss';
  if (!date && date !== 0) {
    return '';
  }
  date = getDate(date);
  var dateObj = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
    millisecond: date.getMilliseconds() };

  var tokenRegExp = /yyyy|yy|MM|M|dd|d|hh|h|mm|m|ss|s|SSS|SS|S/;
  var flag = true;
  var result = format;
  while (flag) {
    flag = false;
    result = result.replace(tokenRegExp, function (matched) {
      flag = true;
      return parser[matched](dateObj);
    });
  }
  return result;
}

function friendlyDate(time, _ref)



{var _ref$locale = _ref.locale,locale = _ref$locale === void 0 ? 'zh' : _ref$locale,_ref$threshold = _ref.threshold,threshold = _ref$threshold === void 0 ? [60000, 3600000] : _ref$threshold,_ref$format = _ref.format,format = _ref$format === void 0 ? 'yyyy/MM/dd hh:mm:ss' : _ref$format;
  if (time === '-') {
    return time;
  }
  if (!time && time !== 0) {
    return '';
  }
  var localeText = {
    zh: {
      year: '年',
      month: '月',
      day: '天',
      hour: '小时',
      minute: '分钟',
      second: '秒',
      ago: '前',
      later: '后',
      justNow: '刚刚',
      soon: '马上',
      template: '{num}{unit}{suffix}' },

    en: {
      year: 'year',
      month: 'month',
      day: 'day',
      hour: 'hour',
      minute: 'minute',
      second: 'second',
      ago: 'ago',
      later: 'later',
      justNow: 'just now',
      soon: 'soon',
      template: '{num} {unit} {suffix}' } };


  var text = localeText[locale] || localeText.zh;
  var date = getDate(time);
  var ms = date.getTime() - Date.now();
  var absMs = Math.abs(ms);
  if (absMs < threshold[0]) {
    return ms < 0 ? text.justNow : text.soon;
  }
  if (absMs >= threshold[1]) {
    return formatDate(date, format);
  }
  var num;
  var unit;
  var suffix = text.later;
  if (ms < 0) {
    suffix = text.ago;
    ms = -ms;
  }
  var seconds = Math.floor(ms / 1000);
  var minutes = Math.floor(seconds / 60);
  var hours = Math.floor(minutes / 60);
  var days = Math.floor(hours / 24);
  var months = Math.floor(days / 30);
  var years = Math.floor(months / 12);
  switch (true) {
    case years > 0:
      num = years;
      unit = text.year;
      break;
    case months > 0:
      num = months;
      unit = text.month;
      break;
    case days > 0:
      num = days;
      unit = text.day;
      break;
    case hours > 0:
      num = hours;
      unit = text.hour;
      break;
    case minutes > 0:
      num = minutes;
      unit = text.minute;
      break;
    default:
      num = seconds;
      unit = text.second;
      break;}


  if (locale === 'en') {
    if (num === 1) {
      num = 'a';
    } else {
      unit += 's';
    }
  }

  return text.template.replace(/{\s*num\s*}/g, num + '').replace(/{\s*unit\s*}/g, unit).replace(/{\s*suffix\s*}/g,
  suffix);
}

/***/ }),

/***/ 4:
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {Object.defineProperty(exports, "__esModule", { value: true });exports.compileI18nJsonStr = compileI18nJsonStr;exports.hasI18nJson = hasI18nJson;exports.initVueI18n = initVueI18n;exports.isI18nStr = isI18nStr;exports.normalizeLocale = normalizeLocale;exports.parseI18nJson = parseI18nJson;exports.resolveLocale = resolveLocale;exports.isString = exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var isArray = Array.isArray;
var isObject = function isObject(val) {return val !== null && typeof val === 'object';};
var defaultDelimiters = ['{', '}'];var
BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {_classCallCheck(this, BaseFormatter);
    this._caches = Object.create(null);
  }_createClass(BaseFormatter, [{ key: "interpolate", value: function interpolate(
    message, values) {var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    } }]);return BaseFormatter;}();exports.Formatter = BaseFormatter;

var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {var _ref2 = _slicedToArray(_ref, 2),startDelimiter = _ref2[0],endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ?
      'list' :
      isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ?
      'named' :
      'unknown';
      tokens.push({ value: sub, type: type });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
        text += char;
      }
  }
  text && tokens.push({ type: 'text', value: text });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = isArray(values) ?
  'list' :
  isObject(values) ?
  'named' :
  'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else
        {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;}

    index++;
  }
  return compiled;
}

var LOCALE_ZH_HANS = 'zh-Hans';exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {return hasOwnProperty.call(val, key);};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}
function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}var
I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {var locale = _ref3.locale,fallbackLocale = _ref3.fallbackLocale,messages = _ref3.messages,watcher = _ref3.watcher,formater = _ref3.formater;_classCallCheck(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }_createClass(I18n, [{ key: "setLocale", value: function setLocale(
    locale) {var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    } }, { key: "getLocale", value: function getLocale()
    {
      return this.locale;
    } }, { key: "watchLocale", value: function watchLocale(
    fn) {var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    } }, { key: "add", value: function add(
    locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else
        {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else
      {
        this.messages[locale] = message;
      }
    } }, { key: "f", value: function f(
    message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    } }, { key: "t", value: function t(
    key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else
      {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    } }]);return I18n;}();exports.I18n = I18n;


function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else
  {
    appVm.$watch(function () {return appVm.$locale;}, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {var _ref4 =
    [
    messages,
    locale];locale = _ref4[0];messages = _ref4[1];

  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale =
    typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale ||
    LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher });

  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else
    {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    } };

}

var isString = function isString(val) {return typeof val === 'string';};exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else
    {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else
    {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {var locale = _ref5.locale,locales = _ref5.locales,delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name] });

    }
  });
  localeValues.unshift({ locale: locale, values: locales[locale] });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  }
  catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else
  {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else
  if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}

function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {return locales.indexOf(locale) > -1;});
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 5:
/*!*****************************************!*\
  !*** E:/github/e-vegetables/pages.json ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 6:
/*!*********************************************!*\
  !*** E:/github/e-vegetables/store/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 3));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 7));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_vue.default.use(_vuex.default);

var store = new _vuex.default.Store({
  state: {
    //判断是否登录
    hasLogin: false,
    //用户信息
    userInfo: {},

    //商品数据
    goodsList: [],

    //购物车数据
    cartList: [] },

  mutations: {
    login: function login(state, provider) {

      state.hasLogin = true;
      state.userInfo = provider;
      uni.setStorage({ //缓存用户登陆状态
        key: 'userInfo',
        data: provider });

      console.log(state.userInfo);
    },
    logout: function logout(state) {
      state.hasLogin = false;
      state.userInfo = {};
      uni.removeStorage({
        key: 'userInfo' });

    } },

  actions: {} });var _default =




store;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 7:
/*!**************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vuex3/dist/vuex.common.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * vuex v3.6.2
 * (c) 2021 Evan You
 * @license MIT
 */


function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
function find (list, f) {
  return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
function deepCopy (obj, cache) {
  if ( cache === void 0 ) cache = [];

  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  var hit = find(cache, function (c) { return c.original === obj; });
  if (hit) {
    return hit.copy
  }

  var copy = Array.isArray(obj) ? [] : {};
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy: copy
  });

  Object.keys(obj).forEach(function (key) {
    copy[key] = deepCopy(obj[key], cache);
  });

  return copy
}

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  var child = parent.getChild(key);

  if (!child) {
    if ((true)) {
      console.warn(
        "[vuex] trying to unregister module '" + key + "', which is " +
        "not registered"
      );
    }
    return
  }

  if (!child.runtime) {
    return
  }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  if (parent) {
    return parent.hasChild(key)
  }

  return false
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype[[104,111,116,85,112,100,97,116,101].map(item =>String.fromCharCode(item)).join('')] = function (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept another params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

// Credits: borrowed code from fcomb/redux-logger

function createLogger (ref) {
  if ( ref === void 0 ) ref = {};
  var collapsed = ref.collapsed; if ( collapsed === void 0 ) collapsed = true;
  var filter = ref.filter; if ( filter === void 0 ) filter = function (mutation, stateBefore, stateAfter) { return true; };
  var transformer = ref.transformer; if ( transformer === void 0 ) transformer = function (state) { return state; };
  var mutationTransformer = ref.mutationTransformer; if ( mutationTransformer === void 0 ) mutationTransformer = function (mut) { return mut; };
  var actionFilter = ref.actionFilter; if ( actionFilter === void 0 ) actionFilter = function (action, state) { return true; };
  var actionTransformer = ref.actionTransformer; if ( actionTransformer === void 0 ) actionTransformer = function (act) { return act; };
  var logMutations = ref.logMutations; if ( logMutations === void 0 ) logMutations = true;
  var logActions = ref.logActions; if ( logActions === void 0 ) logActions = true;
  var logger = ref.logger; if ( logger === void 0 ) logger = console;

  return function (store) {
    var prevState = deepCopy(store.state);

    if (typeof logger === 'undefined') {
      return
    }

    if (logMutations) {
      store.subscribe(function (mutation, state) {
        var nextState = deepCopy(state);

        if (filter(mutation, prevState, nextState)) {
          var formattedTime = getFormattedTime();
          var formattedMutation = mutationTransformer(mutation);
          var message = "mutation " + (mutation.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c prev state', 'color: #9E9E9E; font-weight: bold', transformer(prevState));
          logger.log('%c mutation', 'color: #03A9F4; font-weight: bold', formattedMutation);
          logger.log('%c next state', 'color: #4CAF50; font-weight: bold', transformer(nextState));
          endMessage(logger);
        }

        prevState = nextState;
      });
    }

    if (logActions) {
      store.subscribeAction(function (action, state) {
        if (actionFilter(action, state)) {
          var formattedTime = getFormattedTime();
          var formattedAction = actionTransformer(action);
          var message = "action " + (action.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c action', 'color: #03A9F4; font-weight: bold', formattedAction);
          endMessage(logger);
        }
      });
    }
  }
}

function startMessage (logger, message, collapsed) {
  var startMessage = collapsed
    ? logger.groupCollapsed
    : logger.group;

  // render
  try {
    startMessage.call(logger, message);
  } catch (e) {
    logger.log(message);
  }
}

function endMessage (logger) {
  try {
    logger.groupEnd();
  } catch (e) {
    logger.log('—— log end ——');
  }
}

function getFormattedTime () {
  var time = new Date();
  return (" @ " + (pad(time.getHours(), 2)) + ":" + (pad(time.getMinutes(), 2)) + ":" + (pad(time.getSeconds(), 2)) + "." + (pad(time.getMilliseconds(), 3)))
}

function repeat (str, times) {
  return (new Array(times + 1)).join(str)
}

function pad (num, maxLength) {
  return repeat('0', maxLength - num.toString().length) + num
}

var index_cjs = {
  Store: Store,
  install: install,
  version: '3.6.2',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers,
  createLogger: createLogger
};

module.exports = index_cjs;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map