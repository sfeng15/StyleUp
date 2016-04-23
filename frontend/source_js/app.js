var app = angular.module('project', ['ngRoute', 'projectControllers', 'projectServices']);

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
  when('/profile', {
    templateUrl: 'partials/profile.html',
    controller: 'profileController'
  }).
  otherwise({
    redirectTo: '/home'
  });
} ]);
