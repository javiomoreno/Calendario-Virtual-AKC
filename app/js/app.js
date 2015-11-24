'use strict';

  var app = angular.module('calendario', [
    'ngRoute',
    'calendario.controllers',
    'calendario.directives',
    'calendario.services',
    'LocalStorageModule'
  ]);

app.config(['localStorageServiceProvider', function(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('ls');
}]);

  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
      })
      .when('/mes/:mes', {
        templateUrl: 'views/usuario/calendario.html',
        controller: 'CalendarioController'
      })
      .when('/admin', {
        templateUrl: 'views/administrador/inicio.html',
        controller: 'AdministradorController'
      })
      .when('/admin/imagen/:campos', {
        templateUrl: 'views/administrador/imagenes/listaImagenes.html',
        controller: 'ImagenesController'
      })
      .when('/admin/imagen/vista/:id', {
        templateUrl: 'views/administrador/imagenes/verImagen.html',
        controller: 'ImagenesController'
      })
      .when('/admin/imagen/editar/:id', {
        templateUrl: 'views/administrador/imagenes/editarImagen.html',
        controller: 'ImagenesController'
      })
      .when('/admin/imagenes', {
        templateUrl: 'views/administrador/imagenes/gestionarImagenes.html',
        controller: 'ImagenesController'
      })
      .when('/admin/eventos', {
        templateUrl: 'views/administrador/eventos/gestionarEventos.html',
        controller: 'EventosController'
      })
      .when('/admin/evento/:campos', {
        templateUrl: 'views/administrador/eventos/listarEventos.html',
        controller: 'EventosController'
      })
      .when('/admin/evento/vista/:id', {
        templateUrl: 'views/administrador/eventos/verEvento.html',
        controller: 'EventosController'
      })
      .when('/admin/evento/editar/:id', {
        templateUrl: 'views/administrador/eventos/editarEvento.html',
        controller: 'EventosController'
      })
      .otherwise({
        redirectTo: '/'
      });

  }]);

