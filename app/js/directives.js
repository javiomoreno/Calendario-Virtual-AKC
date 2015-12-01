(function () {

  angular.module('calendario.directives', [])
    .directive('menuAdmin', function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/menu-admin.html'
      };
    })

    .directive('submenuAdmin', function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/submenu-admin.html'
      };
    })

    .directive('nuevoEvento', function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/eventos/nuevo-evento.html'
      };
    })

    .directive('listaEventos', function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/eventos/lista-eventos.html'
      };
    })

    .directive('eventosMes', function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/eventos/eventos-mes.html'
      };
    })

    .directive('detalleEvento', function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/eventos/detalle-evento.html'
      };
    })

    .directive('editarEvento', function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/eventos/editar-evento.html'
      };
    })

    .directive('listaImagenes', function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/imagenes/lista-imagenes.html'
      };
    })

    .directive('imagenesMes', function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/imagenes/imagenes-mes.html'
      };
    })

    .directive('detalleImagen', function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/imagenes/detalle-imagen.html'
      };
    })

    .directive('editarImagen', function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/imagenes/editar-imagen.html'
      };
    })

    .directive('nuevaImagen', function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/imagenes/nueva-imagen.html'
      };
    });
 })();