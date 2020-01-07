var app = angular.module('JuliaTestaApp', [
  'ngRoute',
  'empleadoControllers'
]);

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider,$locationProvider) {
    
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: true
    });
    $locationProvider.hashPrefix('');
    
    $routeProvider.
      when('/', {
        templateUrl: 'partials/login.html',
        controller: 'ControllerLogin',
        method: 'GET',
      }).
      when('/products', {
        templateUrl: 'partials/Products.html',
        controller: 'AllProducts',
        method: 'GET',
      }).
      when('/seecollection/:collection_id', {
        templateUrl: 'partials/SeeCollections.html',
        controller: 'ControllerCollectionProduct',
        method: 'GET',
      }).
      otherwise({
        redirectTo: '/',
        method: 'GET',
      });
      
  }]);

  

