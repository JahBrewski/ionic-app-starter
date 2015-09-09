(function() {
  'use strict';

  angular
    .module('app')
    .controller('EmployeeController', EmployeeController);

  EmployeeController.$inject = [];

  function EmployeeController() {
    var vm = this;
    vm.swipeLeft = swipeLeft;

    function swipeLeft() {
      $state.go("admin.clients");
    }
  }

})();
