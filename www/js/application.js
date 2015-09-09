(function() {
  'use strict';

  angular
    .module('app', ['ionic'])
    .run(ReachApp);

  ReachApp.$inject = ['$ionicPlatform'];

  function ReachApp($ionicPlatform) {

    activate();

    function activate() {
      $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar 
        // above the keyboard for form inputs)
          if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          }
        if(window.StatusBar) {
          StatusBar.styleDefault();
        }
      });
    }
  }

})();


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

(function() {
  'use strict';

  angular
    .module('app')
    .constant('API', {
      url: 'http://localhost:3000'
    })
    .constant('Config', {
      environment: 'test'
    });

})();

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
