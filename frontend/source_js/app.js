var app = angular.module('project', ['ngRoute', 'projectControllers', 'projectServices']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/collections', {
    templateUrl: 'partials/collections.html',
    controller: 'FirstController'
  }).
  otherwise({
    redirectTo: '/collections'
  });
} , ]);
