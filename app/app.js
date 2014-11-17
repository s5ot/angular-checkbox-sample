'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  //'ngRoute',
  'ui.router',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]).
config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/view1");
  //
  // Now set up the states
  $stateProvider
    .state('view1', {
      url: "/view1",
      templateUrl: "view1/view1.html",
      controller:  "View1Ctrl"
    })
    .state('state1.list', {
      url: "/list",
      templateUrl: "partials/state1.list.html",
      controller:  "View1Ctrl"
    })
    .state('view2', {
      url: "/view2",
      templateUrl: "view2/view2.html",
      controller:  "View2Ctrl"
    })
    .state('state2.list', {
      url: "/list",
      templateUrl: "partials/state2.list.html",
    });
});
/*
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
*/

