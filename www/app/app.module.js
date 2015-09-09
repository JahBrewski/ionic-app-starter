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

