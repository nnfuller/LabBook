'use strict';

/* Controllers */

var labbookControllers = angular.module('labbookControllers', []);

labbookControllers.controller('MainCtrl', ['$scope', '$rootScope',
  function($scope, $rootScope) {
    
    chrome.app.window.current().maximize();
    
    var styles = {

      //slide from right
      front: '.view-animate.ng-enter {left:100%;}  .view-animate.ng-leave.ng-leave-active {left:-100%;}',

      //slide from left
      back: '.view-animate.ng-enter {left:-100%;}  .view-animate.ng-leave.ng-leave-active {left:100%;}'

    }


    $scope.setDir = function(direction) {

      //choose front/back sliding direction
      $rootScope.style = styles[direction];

    }

    $scope.close = function() {
      window.close();
    }

  }]);

labbookControllers.controller('WelcomeCtrl', ['$scope',
  function($scope) {
    
  }]);

labbookControllers.controller('SignInCtrl', ['$scope',
  function($scope) {
    
  }]);

labbookControllers.controller('SetUpCtrl', ['$scope',
  function($scope) {
    
  }]);

labbookControllers.controller('DataCtrl', ['$scope',
  function($scope) {
    //$scope.data = [];
    //$scope.points = [];
    //$scope.$watch('data', function(v) {
    //  $scope.points.push(v[0][v[0].length-1]);
    //}, true);
    var port = chrome.runtime.connect({name: "serial"});
    chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
      $scope.$apply(function () {
        $scope.lastValue = parseInt(msg.split('T')[0].slice(1));
      });
    });
    $scope.menushow = false;
    $scope.sensorType="volt";
    $scope.tCalib="32.0";
    $scope.vUnit = "V";
    $scope.tUnit = "C";
    $scope.dUnit = "m";
    $scope.fUnit = "N";
    $scope.pUnit = "Pa";
    $scope.gUnit = "sec";

    $scope.showMenu = function() {
      $scope.menushow = true;
    }
    $scope.hideMenu = function() {
      $scope.menushow = false;
    }

    $scope.$watch('sensorType', function() {
      $scope.vShow = false;
      $scope.tShow = false;
      $scope.dShow = false;
      $scope.fShow = false;
      $scope.pShow = false;
      $scope.gShow = false;
      if($scope.sensorType =="volt"){
      $scope.vShow = true;
      }
      if($scope.sensorType =="temp"){
      $scope.tShow = true;
      }
      if($scope.sensorType =="dist"){
      $scope.dShow = true;
      }
      if($scope.sensorType =="force"){
      $scope.fShow = true;
      }
      if($scope.sensorType =="press"){
      $scope.pShow = true;
      }
      if($scope.sensorType =="gate"){
      $scope.gShow = true;
      }
    }, true);
  }]);