calendModController.controller('ObrasController', [
                                                '$http', 
                                                '$scope', 
                                                '$timeout', 
                                                '$filter', 
                                                '$routeParams', 
                                                'servicioBackend', 
                                                'localStorageService', 
                                                '$uibModal', 
                                                '$location', 
                                                '$route', 
                                                '$rootScope',
    function ($http, $scope, $timeout, $filter, $routeParams, servicioBackend, localStorageService, $uibModal, $location, $route, $rootScope) {

        $scope.opciones = [];

        servicioBackend.allTipoImagen()
          .then(function(data) {
            $timeout(function() {
              for (var i = 0; i < data.length; i++) {
                $scope.opciones[i] = {
                  id: i,
                  opcion: data[i].tbvalor
                }
              };
            }, 2000);
        });

        $scope.vecMeses = [];

        servicioBackend.allMeses()
          .then(function(data) {
            $timeout(function() {
              for (var i = 0; i < data.length; i++) {
                $scope.vecMeses[i] = {
                  id: i,
                  opcion: data[i].tbvalor
                }
              };
            }, 2000);
        });

        $scope.vecAnhos = [];

        servicioBackend.allAnhos()
          .then(function(data) {
            $timeout(function() {
              for (var i = 0; i < data.length; i++) {
                $scope.vecAnhos[i] = {
                  id: i,
                  opcion: data[i].tbvalor
                }
              };
            }, 2000);
        });

        var todosInStore = localStorageService.get('imagenes');

        $scope.imagenes = todosInStore || [];

        $scope.$watch('imagenes', function(){
          localStorageService.add('imagenes', $scope.imagenes);
        }, true);

        $scope.anhos = [];
          var contador = 0;
        var banderaAnho = "false";
        for (var i = 0; i < $scope.imagenes.length; i++) {
          banderaAnho = "false";
          for (var j = 0; j < $scope.anhos.length; j++) {
            if($scope.anhos[j] === $scope.imagenes[i].anho){
              banderaAnho = "true";
              break;
            }
          }
          if(banderaAnho === "false" && $scope.imagenes[i].tipo == '3'){
            $scope.anhos[contador] = $scope.imagenes[i].anho;
              contador++;
          }
        }

          $scope.vector = [];
          var cantEnero;
          var cantFebrero;
          var cantMarzo;
          var cantAbril;
          var cantMayo;
          var cantJunio;
          var cantJulio;
          var cantAgosto;
          var cantSeptiembre;
          var cantOctubre;
          var cantNoviembre;
          var cantDiciembre;
          for(var i = 0; i < $scope.anhos.length; i++){
              cantEnero = 0;
              cantFebrero = 0;
              cantMarzo = 0;
              cantAbril = 0;
              cantMayo = 0;
              cantJunio = 0;
              cantJulio = 0;
              cantAgosto = 0;
              cantSeptiembre = 0;
              cantOctubre = 0;
              cantNoviembre = 0;
              cantDiciembre = 0;
              for (var j = 0; j < $scope.imagenes.length; j++) {
                  if($scope.anhos[i] == $scope.imagenes[j].anho && $scope.imagenes[j].tipo == 3){
                      if($scope.imagenes[j].mes == "ENERO"){ cantEnero ++;}
                      if($scope.imagenes[j].mes == "FEBRERO"){ cantFebrero ++;}
                      if($scope.imagenes[j].mes == "MARZO"){ cantMarzo ++;}
                      if($scope.imagenes[j].mes == "ABRIL"){ cantAbril ++;}
                      if($scope.imagenes[j].mes == "MAYO"){ cantMayo ++;}
                      if($scope.imagenes[j].mes == "JUNIO"){ cantJunio ++;}
                      if($scope.imagenes[j].mes == "JULIO"){ cantJulio ++;}
                      if($scope.imagenes[j].mes == "AGOSTO"){ cantAgosto ++;}
                      if($scope.imagenes[j].mes == "SEPTIEMBRE"){ cantSeptiembre ++;}
                      if($scope.imagenes[j].mes == "OCTUBRE"){ cantOctubre ++;}
                      if($scope.imagenes[j].mes == "NOVIEMBRE"){ cantNoviembre ++;}
                      if($scope.imagenes[j].mes == "DICIEMBRE"){ cantDiciembre ++;}
                  }
              }

              var otra = [
                  {
                    mes: 'Enero',
                    cant: cantEnero
                  },
                  {
                    mes: 'Febrero',
                    cant: cantFebrero
                  },
                  {
                    mes: 'Marzo',
                    cant: cantMarzo
                  },
                  {
                    mes: 'Abril',
                    cant: cantAbril
                  },
                  {
                    mes: 'Mayo',
                    cant: cantMayo
                  },
                  {
                    mes: 'Junio',
                    cant: cantJunio,
                  },
                  {
                    mes: 'Julio',
                    cant: cantJulio
                  },
                  {
                    mes: 'Agosto',
                    cant: cantAgosto
                  },
                  {
                    mes: 'Septiembre',
                    cant: cantSeptiembre
                  },
                  {
                    mes: 'Octubre',
                    cant: cantOctubre
                  },
                  {
                    mes: 'Noviembre',
                    cant: cantNoviembre,
                  },
                  {
                    mes: 'Diciembre',
                    cant: cantDiciembre
                  }                  
              ];
              $scope.vector[i] = {
                  'anho': $scope.anhos[i],
                  'meses': otra
              };
          }

        $scope.guardarObra = function(nueva){
            var max = 0;
            for(var i = 0; i< $scope.imagenes.length; i ++){
                if($scope.imagenes[i].id > max){
                    max = $scope.imagenes[i].id;
                }
            }
          $scope.todo = nueva;
          $scope.imagenes.push({
            id: (max+1),
            tipo: '3',
            mes: $scope.todo.mes.opcion,
            anho: $scope.todo.anho.opcion,
            tema: $scope.todo.tema,
            autor: $scope.todo.autor,
            mensaje: $scope.todo.mensaje,
            archivo: $scope.todo.archivo
          });

          $rootScope.vista = "obra";
          $scope.todo = "";
          $location.url('/admin');
          //$route.reload();
        };

        $scope.editarObra = function(id){
          console.log("aqui llego: ",id)
          $location.path('/admin/obra/vista/'+id);
        };

        $scope.Editar = function(id){
            $location.path('/admin/obra/editar/'+id);
        }

        var campos = $routeParams.camposObra;

        if(campos){
            var vector = [];
            var contador = 0;
            vector = campos.split('-');
            $scope.anho = vector[0];
            $scope.mes = vector[1];

            $scope.todos = [];

            for(var i = 0; i <$scope.imagenes.length; i ++) {
                if ($scope.imagenes[i].anho == $scope.anho && $scope.imagenes[i].mes == $scope.mes.toUpperCase() && $scope.imagenes[i].tipo == 3) {
                    $scope.todos[contador] = $scope.imagenes[i];
                    contador ++;
                }
            }
        }
        else{
          var id = $routeParams.idObra;
          $scope.datos = [];
          for (var i = 0; i < $scope.imagenes.length; i++) {
            if($scope.imagenes[i].id == id)
            {
              $scope.datos[0] = $scope.imagenes[i];
              break;
            }
          };

          $scope.obra = $scope.datos[0];
        }

        $scope.animationsEnabled = true;

        $scope.openModal = function (size, idEliminar) {
          $scope.idEliminar = idEliminar;

          var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/administrador/imagenes/obras/eliminar.html',
            controller: 'ModalControllerObras',
            size: size,
            resolve: {
                idEliminar : function(){
                    return $scope.idEliminar;
                }
            }
          });
        };
}]);
