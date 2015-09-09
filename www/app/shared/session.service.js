(function() {
  'use strict';

  angular
    .module('app')
    .factory('SessionService', SessionService);

  function SessionService() {
    var service = {};
    service.get = get;
    service.set = set;
    service.unset = unset;
    service.reset = reset;
    return service;

    function get(key) {
      return localStorage.getItem(key);
    }

    function set(key, value) {
      return localStorage.setItem(key, value);
    }

    function unset(key) {
      return localStorage.removeItem(key);
    }

    function reset() {
      return localStorage.clear();
    }
  }

})();
