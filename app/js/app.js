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

/*app.config(function(calendarConfigProvider) {

  calendarConfigProvider.setDateFormatter('moment'); // use either moment or angular to format dates on the calendar. Default angular. Setting this will override any date formats you have already set.

  calendarConfigProvider.setDateFormats({
    hour: 'HH:mm' // this will configure times on the day view to display in 24 hour format rather than the default of 12 hour
  });

  calendarConfigProvider.setTitleFormats({
    day: 'ddd D MMM', //this will configure the day view title to be shorter
    month: 'MMMM |YYYY'
  });

  calendarConfigProvider.setI18nStrings({
    eventsLabel: 'Events', //This will set the events label on the day view
    timeLabel: 'Time', //This will set the time label on the time view
    weekNumber: 'Semana {week}'
  });
});*/

  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
      })
      .when('/calendario', {
        templateUrl: 'views/usuario/calendario.html',
        controller: 'CalendarioController'
      })
      .when('/admin', {
        templateUrl: 'views/administrador/inicio.html',
        controller: 'AdministradorController'
      })
      /*.when('/admin/imagen/:campos', {
        templateUrl: 'views/administrador/imagenes/listaImagenes.html',
        controller: 'ImagenesController'
      })*/
      /*.when('/admin/imagen/vista/:id', {
        templateUrl: 'views/administrador/imagenes/verImagen.html',
        controller: 'ImagenesController'
      })*/
      .when('/admin/imagen/vista/:idImagen', {
        templateUrl: 'views/administrador/imagenes/detalleImagen.html',
        controller: 'ImagenesController'
      })
      .when('/admin/imagen/:camposImagen', {
        templateUrl: 'views/administrador/imagenes/vistaImagenesMes.html',
        controller: 'ImagenesController'
      })
      /*.when('/admin/imagen/editar/:id', {
        templateUrl: 'views/administrador/imagenes/editarImagen.html',
        controller: 'ImagenesController'
      })*/
      .when('/admin/imagen/editar/:idImagen', {
        templateUrl: 'views/administrador/imagenes/editarImagen.html',
        controller: 'ImagenesController'
      })
      .when('/admin/imagenes/nueva', {
        templateUrl: 'views/administrador/imagenes/crearImagen.html',
        controller: 'ImagenesController'
      })
      .when('/admin/eventos', {
        templateUrl: 'views/administrador/eventos/gestionarEventos.html',
        controller: 'EventosController'
      })
      .when('/admin/evento/:camposEvento', {
        templateUrl: 'views/administrador/eventos/vistaEventosMes.html',
        controller: 'EventosController'
      })
      .when('/admin/evento/vista/:idEvento', {
        templateUrl: 'views/administrador/eventos/detalleEvento.html',
        controller: 'EventosController'
      })
      .when('/admin/evento/editar/:idEvento', {
        templateUrl: 'views/administrador/eventos/editarEvento.html',
        controller: 'EventosController'
      })
      .when('/admin/eventos/nuevo', {
        templateUrl: 'views/administrador/eventos/crearEvento.html',
        controller: 'EventosController'
      })
      .when('/admin/eventoPrivado/:camposEventoPrivado', {
        templateUrl: 'views/administrador/eventos-privados/vistaEventosMes.html',
        controller: 'EventosPrivadosController'
      })
      .when('/admin/eventoPrivado/vista/:idEventoPrivado', {
        templateUrl: 'views/administrador/eventos-privados/detalleEvento.html',
        controller: 'EventosPrivadosController'
      })
      .otherwise({
        redirectTo: '/'
      });

  }]);

