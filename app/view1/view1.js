'use strict';

angular.module('myApp.view1', ['ngRoute', 'ui.bootstrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', function($scope) {
  $scope.members = [
    {id: 1, name: '空条承太郎'},
    {id: 2, name: 'ジョセフ・ジョースター'},
    {id: 3, name: 'モハメド・アヴドゥル'},
    {id: 4, name: '花京院典明'},
    {id: 5, name: 'ジャン=ピエール・ポルナレフ'},
    {id: 6, name: 'イギー'}
  ];

  // make refs to used by checkbox-table directive
  $scope.items = $scope.members;
  $scope.checkboxes = { 'top': false, items: {} };
}])

.controller('CheckboxTableCtrl', ['$scope', function($scope) {
  // watch for check all checkbox
  $scope.$watch('checkboxes.top', function(newValue, oldValue) {
    angular.forEach($scope.items, function(item) {
      if (angular.isDefined(item.id)) {
        $scope.checkboxes.items[item.id] = newValue;
      }
    });
  });

  // watch for data checkboxes
  $scope.$watch('checkboxes.items', function(newValues, oldValues) {
    if (!$scope.items) {
      return;
    }
    var checked = 0, unchecked = 0,
        total = $scope.items.length;
    angular.forEach($scope.items, function(item) {
      checked   +=  ($scope.checkboxes.items[item.id]) || 0;
      unchecked += (!$scope.checkboxes.items[item.id]) || 0;
    });
    if ((unchecked === 0) || (checked === 0)) {
      $scope.checkboxes.top = (checked == total);
    }
    // grayed checkbox
    angular.element(document.getElementById("select_all")).prop("indeterminate", (checked !== 0 && unchecked !== 0));
  }, true);
}])

.directive('checkboxTable', function() {
  return {
    restrict: 'A',
    replace: false,
    controller: 'CheckboxTableCtrl',
    scope: true,
    compile: function() {
      return {
        pre: function(scope, element, attrs, controller) {
        },
        post: function(scope, element, attrs, controller) {
        }
      };
    }
  };
});
