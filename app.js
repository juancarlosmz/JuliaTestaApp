var app = angular.module('JuliaTestaApp', [
  'ngRoute',
  'empleadoControllers',
  'ui.bootstrap'
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
      when('/Syncup', {
        templateUrl: 'partials/Syncup.html',
        controller: 'ControllerSyncupProduct',
        method: 'GET',
      }).
      when('/collections', {
        templateUrl: 'partials/Products.html',
        controller: 'AllProducts',
        method: 'GET',
      }).
      when('/products/:collection_id', {
        templateUrl: 'partials/SeeCollections.html',
        controller: 'ControllerCollectionProduct',
        method: 'GET',
      }).
      otherwise({
        redirectTo: '/',
        method: 'GET',
      });
      
  }]);

  

