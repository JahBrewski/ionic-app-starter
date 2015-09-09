(function() {
  'use strict';

  angular
    .module('app')
    .controller('RegistrationController', RegistrationController);

  RegistrationController.$inject = ['Config','AuthenticationService', '$state'];

  function RegistrationController(Config, AuthenticationService, $state) {
    var vm = this;
    vm.loginUser = loginUser;

    var testCredentials = {
      email: "joelbrewer01@gmail.com",
      password: "secretsauce"
    }

    vm.credentials = {
      email: "",
      password: ""
    }

    if (Config.environment === 'test') {
      vm.credentials = testCredentials;
    }

    function loginUser() {
      AuthenticationService.login(vm.credentials)
        .then(function (response) {
          if (response.status == 200) {
            $state.go('tab.user-contacts');
          } else {
            alert("error logging in");
          }
        });
    }
  }

})();
