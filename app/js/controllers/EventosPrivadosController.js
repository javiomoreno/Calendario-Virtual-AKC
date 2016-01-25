calendModController.controller('EventosPrivadosController', [
                                                            '$http', 
                                                            '$scope', 
                                                            '$filter', 
                                                            '$routeParams', 
                                                            'localStorageService', 
                                                            '$uibModal', 
                                                            '$location', 
                                                            '$route', 
                                                            '$timeout', 
                                                            '$rootScope',
    function ($http, $scope, $filter, $routeParams, localStorageService, $uibModal, $location, $route, $timeout, $rootScope) {

          var todosInStore = localStorageService.get('eventos');

          $scope.eventos = todosInStore || [];

          $scope.$watch('eventos', function(){
              localStorageService.add('eventos', $scope.eventos);
          }, true);


          $scope.anhos = [];
          var contador = 0;
          var banderaAnho = "false";
          for (var i = 0; i < $scope.eventos.length; i++) {
              banderaAnho = "false";
              for (var j = 0; j < $scope.anhos.length; j++) {
                  if($scope.anhos[j] == new Date($scope.eventos[i].fechaInicio).getFullYear()){
                      banderaAnho = "true";
                      break;
                  }
              }
              if(banderaAnho == "false" && $scope.eventos[i].estado != 3){
                  $scope.anhos[contador] = new Date($scope.eventos[i].fechaInicio).getFullYear();
                  contador ++;
              }
          }

          $scope.vector = [];
          $scope.meses = ["Enero", "Febrero","Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
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
              for (var j = 0; j < $scope.eventos.length; j++) {
                  if($scope.anhos[i] == new Date($scope.eventos[j].fechaInicio).getFullYear() && $scope.eventos[j].tipoEvento == 2 && $scope.eventos[j].estado != 3){
                      if(new Date($scope.eventos[j].fechaInicio).getMonth() == 0){ cantEnero ++;}
                      if(new Date($scope.eventos[j].fechaInicio).getMonth() == 1){ cantFebrero ++;}
                      if(new Date($scope.eventos[j].fechaInicio).getMonth() == 2){ cantMarzo ++;}
                      if(new Date($scope.eventos[j].fechaInicio).getMonth() == 3){ cantAbril ++;}
                      if(new Date($scope.eventos[j].fechaInicio).getMonth() == 4){ cantMayo ++;}
                      if(new Date($scope.eventos[j].fechaInicio).getMonth() == 5){ cantJunio ++;}
                      if(new Date($scope.eventos[j].fechaInicio).getMonth() == 6){ cantJulio ++;}
                      if(new Date($scope.eventos[j].fechaInicio).getMonth() == 7){ cantAgosto ++;}
                      if(new Date($scope.eventos[j].fechaInicio).getMonth() == 8){ cantSeptiembre ++;}
                      if(new Date($scope.eventos[j].fechaInicio).getMonth() == 9){ cantOctubre ++;}
                      if(new Date($scope.eventos[j].fechaInicio).getMonth() == 10){ cantNoviembre ++;}
                      if(new Date($scope.eventos[j].fechaInicio).getMonth() == 11){ cantDiciembre ++;}
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

              var numero = 0;
              if(cantEnero + cantFebrero + cantMarzo + cantAbril + cantMayo + cantJunio + cantJulio + cantAgosto + cantSeptiembre + cantOctubre + cantNoviembre + cantDiciembre == 0){
                numero = 0;
              }
              else{
                numero = 1;
              }
              $scope.vector[i] = {
                  'anho': $scope.anhos[i],
                  'numero': numero,
                  'meses': otra
              };
          }

          $scope.vectorRepeticion = [
                  {id: '1', name: 'Diario'},
                  {id: '2', name: 'Semanal'},
                  {id: '3', name: 'Mensual'},
                  {id: '4', name: 'Anual'}
              ];

          $scope.vectorImportancia = [
              {id: '1', name: 'Baja'},
              {id: '2', name: 'Media'},
              {id: '3', name: 'Alta'},
          ];

          $scope.vectorTipoEvento = [
              {id: '1', name: 'Publico'},
              {id: '2', name: 'Privado'}
          ];

          $scope.vectorPublicar = [
              {id: '1', name: 'Publicar'},
              {id: '2', name: 'No Publicar'}
          ];

          var campos = $routeParams.camposEventoPrivado;

          if(campos){
              var vector = [];
              var contador = 0;
              vector = campos.split('-');
              $scope.anho = vector[0];
              $scope.mes = vector[1];
              var meses = ["Enero", "Febrero","Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

              $scope.todos = [];

              for(var i = 0; i <$scope.eventos.length; i ++) {
                  if (new Date($scope.eventos[i].fechaInicio).getFullYear() == $scope.anho && meses[(new Date($scope.eventos[i].fechaInicio).getMonth()).valueOf()] == $scope.mes && $scope.eventos[i].tipoEvento == 2 && $scope.eventos[i].estado != 3) {
                      $scope.todos[contador] = $scope.eventos[i];
                      contador ++;
                  }
              }

              $scope.gridOptions = {
                  enableColumnMenus: false,
                  enableFiltering: true,
                  enableRowSelection: true,
                  rowTemplate: rowTemplate(),
                  columnDefs: [
                      {field: 'id', visible: false},
                      {field: 'nombre', displayName: 'Nombre'},
                      {field: 'fechaInicio', displayName: 'Fecha Inicio'},
                      {field: 'fechaFin', displayName: 'Fecha Fin'},
                      {field: 'repeticion', displayName: 'Periodicidad'},
                      {field: 'tipoEvento', displayName: 'Tipo de Evento'},
                      {field: 'importancia', displayName: 'Importancia'},
                      {field: 'publicar', displayName: 'Publicar'}
                  ]
              };

              var datos = [];
              for(var i = 0; i < $scope.todos.length; i ++){
                  datos[i] = {
                      'id': $scope.todos[i].id,
                      'nombre': $scope.todos[i].nombre,
                      'fechaInicio': new Date($scope.todos[i].fechaInicio).getDate()+"/"+((new Date($scope.todos[i].fechaInicio).getMonth().valueOf())+1)+"/"+new Date($scope.todos[i].fechaInicio).getFullYear(),
                      'fechaFin': new Date($scope.todos[i].fechaFin).getDate()+"/"+((new Date($scope.todos[i].fechaFin).getMonth().valueOf())+1)+"/"+new Date($scope.todos[i].fechaFin).getFullYear(),
                      'repeticion': $scope.vectorRepeticion[($scope.todos[i].repeticion.valueOf())-1].name,
                      'tipoEvento': $scope.vectorTipoEvento[($scope.todos[i].tipoEvento.valueOf())-1].name,
                      'importancia': $scope.vectorImportancia[($scope.todos[i].importancia.valueOf())-1].name,
                      'publicar': $scope.vectorPublicar[($scope.todos[i].publicar.valueOf())-1].name
                  }
              }

              $scope.gridOptions.data = datos;
          }
          else{
              var id = $routeParams.idEventoPrivado;
              $scope.datos = [];
              for (var i = 0; i < $scope.eventos.length; i++) {
                  if($scope.eventos[i].id == id)
                  {
                      $scope.datos[0] = $scope.eventos[i];
                      break;
                  }
              };

              $scope.todos = $scope.datos[0];
              $scope.evento = $scope.datos[0];
          }

          $scope.Editar = function(id){
              $location.path('/admin/evento/editar/'+id);
          }

          $scope.editarEvento = function(id){
              $location.path('/admin/eventoPrivado/vista/'+id);
          }

          function rowTemplate() {
              return '<div ng-dblclick="grid.appScope.rowDblClick(row)" >' +
                  '  <div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }"  ui-grid-cell></div>' +
                  '</div>';
          }

          $scope.rowDblClick = function(row) {
              $location.url('/admin/eventoPrivado/vista/'+row.entity.id);
          };

          var idVer = $routeParams.idEventoPrivado;
          if(idVer){
            var datos = {};
              $scope.eventoDatos = {};

              for(var i = 0; i <$scope.eventos.length; i ++){
                  if($scope.eventos[i].id == idVer){
                      datos = $scope.eventos[i];
                      break;
                  }
              }
              $scope.eventoDatos = {
                  'id': datos.id,
                  'nombre': datos.nombre,
                  'fechaInicio': new Date(datos.fechaInicio).getDate()+"/"+((new Date(datos.fechaInicio).getMonth().valueOf())+1)+"/"+new Date(datos.fechaInicio).getFullYear(),
                  'fechaFin': new Date(datos.fechaFin).getDate()+"/"+((new Date(datos.fechaFin).getMonth().valueOf())+1)+"/"+new Date(datos.fechaFin).getFullYear(),
                  'repeticion': $scope.vectorRepeticion[(datos.repeticion.valueOf())-1].name,
                  'tipoEvento': $scope.vectorTipoEvento[(datos.tipoEvento.valueOf())-1].name,
                  'importancia': $scope.vectorImportancia[(datos.importancia.valueOf())-1].name,
                  'publicar': $scope.vectorPublicar[(datos.publicar.valueOf())-1].name
              }
              if(datos.publicar == 1){
                $scope.checkboxModel = {
                   value : true
                 };
              }
              else{
                $scope.checkboxModel = {
                   value : false
                 };
              }
          }

          $scope.cambiar = function(idCambiar) {
              openCambiar('sm', idCambiar);
          }

          function openCambiar(size, idCambiar) {
              $scope.idCambiar = idCambiar;
              var modalInstance = $uibModal.open({
                  templateUrl: 'views/administrador/eventos-privados/cambiar-tipo.html',
                  controller: 'CambiarTipoModalController',
                  size: size,
                  resolve: {
                      idCambiar : function(){
                          return $scope.idCambiar;
                      }
                  }
              });
          }
}]);