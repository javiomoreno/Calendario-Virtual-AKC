calModDirective.directive('menuAdmin', function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/menu-admin.html'
      };
    });

calModDirective.directive('submenuAdmin', 
  function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/submenu-admin.html'
      };
    });

calModDirective.directive('nuevoEvento', 
  function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/eventos/nuevo-evento.html'
      };
    });

calModDirective.directive('listaEventos', 
  function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/eventos/lista-eventos.html'
      };
    });

calModDirective.directive('eventosMes', 
  function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/eventos/eventos-mes.html'
      };
    });

calModDirective.directive('detalleEvento', 
  function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/eventos/detalle-evento.html'
      };
    });

calModDirective.directive('editarEvento', 
  function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/eventos/editar-evento.html'
      };
    });

calModDirective.directive('elegirTipolista', 
  function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/imagenes/elegir-tipolista.html'
      };
    });

calModDirective.directive('listaFotografias', 
  function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/imagenes/fotografias/lista-fotografias.html'
      };
    });

calModDirective.directive('listaObras', 
  function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/imagenes/obras/lista-obras.html'
      };
    });

calModDirective.directive('obrasMes', 
  function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/imagenes/obras/obras-mes.html'
      };
    });

calModDirective.directive('detalleObra', 
  function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/imagenes/obras/detalle-obra.html'
      };
    });


calModDirective.directive('listaIconos', 
  function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/imagenes/iconos/lista-iconos.html'
      };
    });

calModDirective.directive('fotografiasMes', 
  function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/imagenes/fotografias/fotografias-mes.html'
      };
    });

calModDirective.directive('detalleFotografia', 
  function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/imagenes/fotografias/detalle-fotografia.html'
      };
    });

calModDirective.directive('detalleIcono', 
  function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/imagenes/iconos/detalle-icono.html'
      };
    });

calModDirective.directive('editarIcono', 
  function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/imagenes/iconos/editar-icono.html'
      };
    });


calModDirective.directive('editarFotografia', 
  function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/imagenes/fotografias/editar-fotografia.html'
      };
    });

calModDirective.directive('editarObra', 
  function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/imagenes/obras/editar-obra.html'
      };
    });

calModDirective.directive('elegirTipo', 
  function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/imagenes/elegir-tipo.html'
      };
    });

calModDirective.directive('nuevaFotografia', 
  function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/imagenes/fotografias/nueva-fotografia.html'
      };
    });

calModDirective.directive('nuevoIcono', 
  function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/imagenes/iconos/nuevo-icono.html'
      };
    });

calModDirective.directive('nuevaObra', 
  function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/imagenes/obras/nueva-obra.html'
      };
    });

calModDirective.directive('listaEventosPrivados', 
  function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/eventos-privados/lista-eventos-privados.html'
      };
    });

calModDirective.directive('eventosPrivadosMes', 
  function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/eventos-privados/eventos-privados-mes.html'
      };
    });

calModDirective.directive('detalleEventoPrivado', 
  function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/eventos-privados/detalle-evento-privado.html'
      };
    });

calModDirective.directive("fileread", 
  function () {
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
    });