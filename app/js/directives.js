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

    .directive('elegirTipolista', function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/imagenes/elegir-tipolista.html'
      };
    })

    .directive('listaImagenes', function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/imagenes/lista-imagenes.html'
      };
    })

    .directive('listaIconos', function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/imagenes/iconos/lista-iconos.html'
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

    .directive('detalleIcono', function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/imagenes/iconos/detalle-icono.html'
      };
    })

    .directive('editarIcono', function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/imagenes/iconos/editar-icono.html'
      };
    })


    .directive('editarImagen', function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/imagenes/editar-imagen.html'
      };
    })

    .directive('elegirTipo', function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/imagenes/elegir-tipo.html'
      };
    })

    .directive('nuevaImagen', function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/imagenes/nueva-imagen.html'
      };
    })

    .directive('nuevoIcono', function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/imagenes/iconos/nuevo-icono.html'
      };
    })

    .directive('nuevaObra', function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/imagenes/nueva-obra.html'
      };
    })

    .directive('listaEventosPrivados', function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/eventos-privados/lista-eventos-privados.html'
      };
    })

    .directive('eventosPrivadosMes', function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/eventos-privados/eventos-privados-mes.html'
      };
    })

    .directive('detalleEventoPrivado', function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/eventos-privados/detalle-evento-privado.html'
      };
    })

    .directive("uploaderModel", function ($parse) {
      return {
        restrict: 'A',
        link: function (scope, element, attributes) {
          element.on("change", function (e) {
            $parse(attributes.uploaderModel).assign(scope, element[0].files[0]);
          });
        }
      }
    })

    .directive("fileread", [function () {
      return {
        scope: {
          fileread: "="
        },
        link: function (scope, element, attributes) {
          element.bind("change", function (changeEvent) {
            var reader = new FileReader();
            reader.onload = function (loadEvent) {
              scope.$apply(function () {
                scope.fileread = loadEvent.target.result;
              });
            }
            reader.readAsDataURL(changeEvent.target.files[0]);
          });
        }
      }
    }]);
 })();