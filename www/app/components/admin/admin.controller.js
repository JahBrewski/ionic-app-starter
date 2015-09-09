(function() {
  'use strict';

  angular
    .module('app')
    .controller('AdminController', AdminController);

  AdminController.$inject = ['$state', '$ionicViewSwitcher', 'NavigationService'];

  function AdminController($state, $ionicViewSwitcher, NavigationService) {
    var vm = this;
    vm.goTo = goTo;

    function goTo(path) {
      NavigationService.setLocation(path);
    }

  }

})();
