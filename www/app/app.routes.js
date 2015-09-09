(function() {
  'use strict';

  angular
    .module('app')
    .config(Routes);

  Routes.$inject = ['$stateProvider', '$urlRouterProvider'];

  function Routes($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'app/components/registration/login.html',
      data: {
        authenticate: false
      }
    })
    .state('tab', {
      abstract: true,
      url: '/tab',
      template: '<ui-view/>'
    })
    .state('tab.user-contacts', {
      url: '/user-contacts',
      templateUrl: 'app/components/user/contacts.html'
    })
    .state('tab.admin-clients', {
      url: '/admin-clients',
      templateUrl: 'app/components/admin/clients.html'
    })
    .state('tab.employee-contacts', {
      url: '/employee-contacts',
      templateUrl: 'app/components/employee/contacts.html'
    });

    $urlRouterProvider.otherwise('login');

  }

})();
