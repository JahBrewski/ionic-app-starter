(function() {
  'use strict';

  angular
    .module('app')
    .controller('ContactsController', ContactsController);

  ContactsController.$inject = ['$state', 'NavigationService'];

  function ContactsController($state, NavigationService) {
    var vm = this;
    vm.goTo = goTo;

    function goTo(path) {
      NavigationService.setLocation(path);
    }


  }

})();
