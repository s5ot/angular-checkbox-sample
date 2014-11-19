'use strict';

angular.module('myApp.view1', ['ui.bootstrap'])

/*
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])
*/

.controller('View1Ctrl', ['$scope', function($scope) {
  $scope.checkAll = function() {
    angular.forEach($scope.members, function(member) {
      member.checked = true;
    });
  };

  $scope.members = [
    {id: 1, name: '空条承太郎', stand: 'スタープラチナ', age: 17},
    {id: 2, name: 'ジョセフ・ジョースター', stand: 'ハーミットパープル', age:69},
    {id: 3, name: 'モハメド・アヴドゥル', stand: 'マジシャンズレッド', age: 28},
    {id: 4, name: '花京院典明', stand: 'ハイエロファントグリーン', age: 17},
    {id: 5, name: 'ジャン=ピエール・ポルナレフ', stand: 'シルバーチャリオッツ', age:22},
    {id: 6, name: 'イギー', stand: 'ザ・フール', age: 5}
  ];

  $scope.members.map(function(m) {m.checked = false;});

  $scope.activateMember = function(idx) {
    $scope.activeMemberIdx = idx;
  };

  $scope.isActive = function(idx) {
    return $scope.activeMemberIdx == idx;
  };
}])

.controller('CheckboxTableCtrl', ['$scope', function($scope) {
  this.checkboxItems = [];
  this.checkboxItemElems = [];
  this.checkboxHead = null;
  this.checkboxHeadElem = null;

  this.addCheckboxHead = function(checkbox) {
    this.checkboxHead = checkbox;
  };

  this.addCheckboxHeadElem = function(checkboxElem) {
    this.checkboxHeadElem = checkboxElem;
  };

  this.addCheckboxItem = function(checkbox) {
    this.checkboxItems.push(checkbox);
  };

  this.addCheckboxItemElem = function(checkboxElem) {
    this.checkboxItemElems.push(checkboxElem);
  };

  this.reviewItem = function() {
    var headValue = this.checkboxHeadElem.checked;
    console.log(headValue);
    angular.forEach(this.checkboxItems, function(item) {
      item.$setViewValue(headValue);
      item.$render();
    });
  };

  this.reviewHead = function() {
    var checked = [];
    angular.forEach(this.checkboxItemElems, function(item) {
      if (item.checked) {
        checked.push(item);
      }
    });
    console.log(this.checkboxItems.length === checked.length);
    this.checkboxHead.$setViewValue(this.checkboxItems.length === checked.length);
    this.checkboxHead.$render();
  };
}])

.directive('checkboxTable', function() {
  return {
    restrict: 'A',
    replace: false,
    controller: 'CheckboxTableCtrl',
    link: function(scope, elem, attrs, ctrl) {
    }
  };
})

.directive('checkboxHead', function() {
  return {
    restrict: 'A',
    require: ['ngModel', '^checkboxTable'],
    link: function(scope, elem, attrs, ctrls) {
      ctrls[1].addCheckboxHead(ctrls[0]);
      ctrls[1].addCheckboxHeadElem(elem[0]);
      elem.on('click', function() {
        ctrls[1].reviewItem();
      });
    }
  };
})

.directive('checkboxItem', function() {
  return {
    restrict: 'A',
    require: ['ngModel', '^checkboxTable'],
    link: function(scope, elem, attrs, ctrls) {
      ctrls[1].addCheckboxItem(ctrls[0]);
      ctrls[1].addCheckboxItemElem(elem[0]);
      elem.on('click', function() {
        ctrls[1].reviewHead();
      });
      /*
      scope.$watch(function () {
        return ctrls[0].$modelValue;
      }, function(newValue) {
        ctrls[1].reviewHead();
      });
      */
    }
  };
});
