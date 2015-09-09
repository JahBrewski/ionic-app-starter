(function() {
  'use strict';

  angular
    .module('app')
    .factory('AuthenticationService', AuthenticationService);

  AuthenticationService.$inject = ['SessionService', '$http', 'API'];

  function AuthenticationService(SessionService, $http, API) {
    var service = {};
    service.login = login;
    service.cacheSession = cacheSession;

    return service;

    function login(credentials) {
      SessionService.reset();
      return $http({
        method: 'POST',
        url: API.url + '/sessions',
        data: {
          session: {
            email: credentials.email,
            password: credentials.password
          }
        }
      }).success(function(data) {
        cacheSession(data);
      });
    }

    function cacheSession(data) {
      SessionService.set('authenticated', true);
      SessionService.set('user', angular.toJson(data));
      console.log('Session cached.');
      SessionService.set('auth_token', data.auth_token);
    }
  }
})();
