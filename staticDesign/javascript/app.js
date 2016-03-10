var cornetto = angular.module('cornetto',['ngRoute','ngAnimate','ngMaterial']);

cornetto.config(function($routeProvider,$mdThemingProvider) {

  $mdThemingProvider.definePalette('darkBlue',{
    '900': '070A0D',
    '800': '0E151B',
    '700': '151F28',
    '600': '1D2935',
    '500': '22313F',
    '400': '2B3E50',
    '300': '32485D',
    '200': '39526A',
    '100': '405D77',
    '50': '476785',
    'A700': '32485D',
    'A400': '39526A',
    'A200': '405D77',
    'A100': '476785',
    'contrastDefaultColor': 'light'
  });

  $mdThemingProvider.theme('default')
    .primaryPalette('darkBlue');

  $routeProvider
    .when('/login',{
      templateUrl: 'login.html',
      controller: 'login'
    });
});

cornetto.controller('home',function($scope) {
  $scope.pageCtrl = 'page-home';
});

cornetto.controller('login',function($scope,$rootScope) {
  $rootScope.pageCtrl = 'login';
});
