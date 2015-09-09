(function() {
  'use strict';

  angular
    .module('app')
    .factory('NavigationService', NavigationService);

  function NavigationService() {
    var service = {}
    service.setLocation = setLocation;
    return service;
  }

  function setLocation(path) {
    location.href = "#" + path;
  }


})();
