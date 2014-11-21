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
      controller:  "View1Ctrl",
      resolve: {
        members: function() {
          return [
            {id: 1, name: '空条承太郎', stand: 'スタープラチナ', age: 17},
            {id: 2, name: 'ジョセフ・ジョースター', stand: 'ハーミットパープル', age:69},
            {id: 3, name: 'モハメド・アヴドゥル', stand: 'マジシャンズレッド', age: 28},
            {id: 4, name: '花京院典明', stand: 'ハイエロファントグリーン', age: 17},
            {id: 5, name: 'ジャン=ピエール・ポルナレフ', stand: 'シルバーチャリオッツ', age:22},
            {id: 6, name: 'イギー', stand: 'ザ・フール', age: 5}
          ];
        }
      }
    })
    .state('view1.detail', {
      url: "/:id",
      templateUrl: "view1/view1.detail.html",
      controller:  "View1DetailCtrl"
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

