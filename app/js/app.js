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

app.config(function(calendarConfigProvider) {

  calendarConfigProvider.setDateFormatter('moment'); // use either moment or angular to format dates on the calendar. Default angular. Setting this will override any date formats you have already set.

  calendarConfigProvider.setDateFormats({
    hour: 'HH:mm' // this will configure times on the day view to display in 24 hour format rather than the default of 12 hour
  });

  calendarConfigProvider.setTitleFormats({
    day: 'ddd D MMM' //this will configure the day view title to be shorter
  });

  calendarConfigProvider.setI18nStrings({
    eventsLabel: 'Events', //This will set the events label on the day view
    timeLabel: 'Time' //This will set the time label on the time view
  });

  calendarConfigProvider.setDisplayAllMonthEvents(true); //This will display all events on a month view even if they're not in the current month. Default false.

  calendarConfigProvider.setDisplayEventEndTimes(true); //This will display event end times on the month and year views. Default false.

});

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

