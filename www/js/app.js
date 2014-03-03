(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.brunch = true;
})();

window.require.register("application", function(exports, require, module) {
  var Application;

  Application = {
    _errorLevels: {
      DEBUG: 10,
      INFO: 20,
      WARN: 30,
      ERROR: 40,
      CRITICAL: 50
    },
    headers: function() {
      return {
        'X-Xsrftoken': $.cookie('_xsrf'),
        'X-Errorlevel': this._errorLevels[this.errorLevel]
      };
    },
    initialize: function() {
      this.bindEvents();
    },
    bindEvents: function() {
      document.addEventListener("deviceready", this.onDeviceReady, false);
    },
    onDeviceReady: function() {
      app.receivedEvent("deviceready");
    },
    receivedEvent: function(id) {
      var listeningElement, parentElement, receivedElement;
      parentElement = document.getElementById(id);
      listeningElement = parentElement.querySelector(".listening");
      receivedElement = parentElement.querySelector(".received");
      listeningElement.setAttribute("style", "display:none;");
      receivedElement.setAttribute("style", "display:block;");
      console.log("Received Event: " + id);
    }
  };
  
});
window.require.register("initialize", function(exports, require, module) {
  var Application;

  Application = require('application');

  $(document).on('ready', function() {
    window.app = Application;
    return window.app.initialize({
      errorLevel: 'DEBUG'
    });
  });
  
});
