calendModController.controller('EventosController', [
                                                    '$http', 
                                                    '$scope', 
                                                    '$filter', 
                                                    '$routeParams',  
                                                    'calendarioService',
                                                    'localStorageService', 
                                                    '$uibModal', 
                                                    '$location', 
                                                    '$route', 
                                                    '$timeout', 
                                                    '$rootScope',
    function ($http, $scope, $filter, $routeParams, calendarioService, localStorageService, $uibModal, $location, $route, $timeout, $rootScope) {

        $scope.vecTipoEvento = [];
        $scope.vecRepeticion= [];
        $scope.vecImportancia= [];

        calendarioService.getAllTipoEvento().then(function (data) {
          for (var i = 0; i < data.length; i++) {
            $scope.vecTipoEvento[i] = {
              select: i,
              opcion: data[i].tbclave+" - "+data[i].tbvalor,
              value: data[i].tbclave
            }
          };
        });

        calendarioService.getAllRepeticion().then(function (data) {
          for (var i = 0; i < data.length; i++) {
            $scope.vecRepeticion[i] = {
              select: i,
              opcion: data[i].tbclave+" - "+data[i].tbvalor,
              value: data[i].tbclave
            }
          };
        });

        calendarioService.getAllImportancia().then(function (data) {
          for (var i = 0; i < data.length; i++) {
            $scope.vecImportancia[i] = {
              select: i,
              opcion: data[i].tbclave+" - "+data[i].tbvalor,
              value: data[i].tbclave
            }
          };
        });
        
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
              if(banderaAnho == "false"){
                  $scope.anhos[contador] = new Date($scope.eventos[i].fechaInicio).getFullYear();
                  contador ++;
              }
          }

          var todosInStore = localStorageService.get('imagenes');

          $scope.iconos = todosInStore || [];

          $scope.$watch('imagenes', function(){
            localStorageService.add('imagenes', $scope.iconos);
          }, true);

          $scope.vectorIconos = [];
            var cont = 0;
          for (var i = 0; i < $scope.iconos.length; i++) {
            if($scope.iconos[i].tipo == 2){
              $scope.vectorIconos[cont] = {
               id: cont,
               icono: $scope.iconos[i]
              }
              cont ++;
            }
          }

          $scope.contador = cont;

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
              for (var j = 0; j < $scope.eventos.length; j++) {
                  if($scope.anhos[i] == new Date($scope.eventos[j].fechaInicio).getFullYear()){
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
              $scope.vector[i] = {
                  'anho': $scope.anhos[i],
                  'meses': otra
              };
          }

          $scope.vectorRepeticion = ['Diario', 'Semanal', 'Mensual', 'Anual'];

          $scope.vectorImportancia = ['Baja', 'Media','Alta'];

          $scope.vectorTipoEvento = ['Publico','Privado'];

          $scope.vectorEstado = ['Activo','Finalizado', 'Anulado'];

          $scope.guardarEvento = function(nuevo){
              var max = 0;
              for(var i = 0; i< $scope.eventos.length; i ++){
                  if($scope.eventos[i].id > max){
                      max = $scope.eventos[i].id;
                  }
              }
              $scope.todo = nuevo;
              var fechaI = new Date($scope.todo.fechaInicio).setHours(new Date($scope.todo.horaInicio).getHours());
              fechaI = new Date(fechaI).setMinutes(new Date($scope.todo.horaInicio).getMinutes());
              $scope.todo.fechaInicio = fechaI;
              var fechaF = new Date($scope.todo.fechaInicio).setHours(new Date($scope.todo.horaFin).getHours());
              fechaF = new Date(fechaF).setMinutes(new Date($scope.todo.horaFin).getMinutes());
              var publicar = '2';
              if($scope.todo.tipoEvento == '01'){
                publicar = '1';
              }
            
              $scope.eventos.push({
                  id: (max+1),
                  nombre: $scope.todo.nombre,
                  fechaInicio: new Date($scope.todo.fechaInicio),
                  fechaFin: new Date(fechaF),
                  tipoEvento: $scope.todo.tipoEvento,
                  repeticion: $scope.todo.repeticion,
                  importancia: $scope.todo.importancia,
                  publicar: publicar,
                  estado: '1',
                  iconoEvento: $scope.todo.iconoEvento
              });

              $rootScope.vista = "evento";
              $scope.todo = "";
              $location.url('/admin');
          };

          var campos = $routeParams.camposEvento;

          if(campos){
              var vector = [];
              var contador = 0;
              vector = campos.split('-');
              $scope.anho = vector[0];
              $scope.mes = vector[1];
              var meses = ["Enero", "Febrero","Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

              $scope.todos = [];

              for(var i = 0; i <$scope.eventos.length; i ++) {
                  if (new Date($scope.eventos[i].fechaInicio).getFullYear() == $scope.anho && meses[(new Date($scope.eventos[i].fechaInicio).getMonth()).valueOf()] == $scope.mes) {
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
                      {field: 'estado', displayName: 'Estado'}
                  ]
              };

              var datos = [];

              for(var i = 0; i < $scope.todos.length; i ++){
                console.log($scope.todos[i])
                  datos[i] = {
                      'id': $scope.todos[i].id,
                      'nombre': $scope.todos[i].nombre,
                      'fechaInicio': new Date($scope.todos[i].fechaInicio).getDate()+"/"+((new Date($scope.todos[i].fechaInicio).getMonth().valueOf())+1)+"/"+new Date($scope.todos[i].fechaInicio).getFullYear(),
                      'fechaFin': new Date($scope.todos[i].fechaFin).getDate()+"/"+((new Date($scope.todos[i].fechaFin).getMonth().valueOf())+1)+"/"+new Date($scope.todos[i].fechaFin).getFullYear(),
                      'repeticion': $scope.vectorRepeticion[($scope.todos[i].repeticion.valueOf())-1],
                      'tipoEvento': $scope.vectorTipoEvento[($scope.todos[i].tipoEvento.valueOf())-1],
                      'importancia': $scope.vectorImportancia[($scope.todos[i].importancia.valueOf())-1],
                      'estado': $scope.vectorEstado[($scope.todos[i].estado.valueOf()) - 1]
                  }
              }

              $scope.gridOptions.data = datos;
          }
          else{
              var id = $routeParams.idEvento;
              $scope.datos = [];
              for (var i = 0; i < $scope.eventos.length; i++) {
                  if($scope.eventos[i].id == id)
                  {
                      $scope.datos[0] = $scope.eventos[i];
                      break;Evento
                  }
              };

              $scope.todos = $scope.datos[0];
              $scope.evento = $scope.datos[0];
          }


          $scope.Atras = function(){
              $rootScope.vista = "evento";
              $location.path('/admin/eventos');
          }

          $scope.Editar = function(id){
              $location.path('/admin/evento/editar/'+id);
          }

          $scope.editarEvento = function(id){
              $location.path('/admin/evento/vista/'+id);
          }

          function rowTemplate() {
              return '<div ng-dblclick="grid.appScope.rowDblClick(row)" >' +
                  '  <div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }"  ui-grid-cell></div>' +
                  '</div>';
          }

          $scope.rowDblClick = function(row) {
              $location.url('/admin/evento/vista/'+row.entity.id);
          };

          var idVer = $routeParams.idEvento;
          if(idVer){
            var datos = {};
              $scope.eventoDatos = {};

              for(var i = 0; i <$scope.eventos.length; i ++){
                  if($scope.eventos[i].id == idVer){
                      datos = $scope.eventos[i];
                      break;
                  }
              }

              for (var i = 0; i < $scope.vectorIconos.length; i++) {
                if($scope.vectorIconos[i].id == datos.iconoEvento){
                  var icono = $scope.vectorIconos[i].icono.archivo;
                }
              };
              $scope.eventoDatos = {
                  'id': datos.id,
                  'nombre': datos.nombre,
                  'fechaInicio': new Date(datos.fechaInicio).getDate()+"/"+((new Date(datos.fechaInicio).getMonth().valueOf())+1)+"/"+new Date(datos.fechaInicio).getFullYear(),
                  'fechaFin': new Date(datos.fechaFin).getDate()+"/"+((new Date(datos.fechaFin).getMonth().valueOf())+1)+"/"+new Date(datos.fechaFin).getFullYear(),
                  'repeticion': $scope.vectorRepeticion[(datos.repeticion.valueOf())-1],
                  'tipoEvento': $scope.vectorTipoEvento[(datos.tipoEvento.valueOf())-1],
                  'importancia': $scope.vectorImportancia[(datos.importancia.valueOf())-1],
                  'iconoEvento': icono,
                  'estado': datos.estado
              }
              if($scope.eventoDatos.estado == 2){
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

          $scope.openModal = function (size, idEliminar)
          {
              $scope.idEliminar = idEliminar;
              var modalInstance = $uibModal.open({
                  templateUrl: 'views/administrador/eventos/eliminar.html',
                  controller: 'ModalControllerEventos',
                  size: size,
                  resolve: {
                      idEliminar : function(){
                          return $scope.idEliminar;
                      }
                  }
              });
          }

          $scope.cambiarEstado = function(idCambiar) {
              openCambiar('sm', idCambiar);
          }

          function openCambiar(size, idCambiar) {
              $scope.idCambiar = idCambiar;
              var modalInstance = $uibModal.open({
                  templateUrl: 'partes/administrador/eventos/cambiar-estado.html',
                  controller: 'CambiarEstadoModalController',
                  size: size,
                  resolve: {
                      idCambiar : function(){
                          return $scope.idCambiar;
                      }
                  }
              });
          }
}]);