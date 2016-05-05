var app = angular.module('project', ['ngRoute', 'projectControllers', 'projectServices', 'apiServices', 'ngFileUpload', 'angular-img-cropper', 'xeditable']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/collections', {
    templateUrl: 'partials/collections.html',
    controller: 'FirstController'
  }).
  when('/home', {
    templateUrl: 'partials/home.html',
    controller: 'FirstController'
  }).
  when('/users/:username', {
    templateUrl: 'partials/userProfile.html',
    controller: 'profileController'
  }).
  when('/login', {
    templateUrl: 'partials/Login.html',
    controller: 'loginController'
  }).
  otherwise({
    redirectTo: '/login'
  });
} ]);
