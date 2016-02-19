calendModController.controller('EventoPrivadoAnoMesController', [
                                                '$scope',
                                                '$routeParams', 
                                                '$location', 
                                                'calEvenService',
                                                'calImagService',
    function ($scope, $routeParams, $location, calEvenService, calImagService) {

      $scope.bandera = false;
      var campos = $routeParams.camposEventoPrivado;
      var vector = [];
      var contador = 0;
      vector = campos.split('-');
      $scope.anho = vector[0];
      $scope.mes = vector[1];
      $scope.vectorImportancia = [];
      $scope.vectorRepeticion = [];
      $scope.vectorTipoEvento = [];


      calImagService.getAllMeses().then(
        function(data) {
          for (var i = 0; i < data.length; i++) {
            if (data[i].tbvalor == $scope.mes) {
              calEvenService.getEventosMesAno($scope.anho, data[i].tbclave).then(
                function(dataEventos){

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

                  calEvenService.getAllTipoEvento().then(
                      function (dataTipoEvento) {
                        for (var i = 0; i < dataTipoEvento.length; i++) {
                          $scope.vectorTipoEvento.push(dataTipoEvento[i]);
                        };

                        calEvenService.getAllRepeticion().then(
                          function (dataRepeticion) {
                            for (var i = 0; i < dataRepeticion.length; i++) {
                              $scope.vectorRepeticion.push(dataRepeticion[i]);
                            }

                            calEvenService.getAllImportancia().then(
                              function (dataImportancia) {
                                for (var i = 0; i < dataImportancia.length; i++) {
                                  $scope.vectorImportancia.push(dataImportancia[i]);
                                }

                                var datos = [];

                                for(var i = 0; i < dataEventos.length; i ++){
                                  if (dataEventos[i].eventipo === 2202) {
                                    var importancia, tipoEvento, repeticion, estado;
                                    for (var j = 0; j < $scope.vectorTipoEvento.length; j++) {
                                      if (dataEventos[i].eventipo === $scope.vectorTipoEvento[j].tbnumero) {
                                        tipoEvento = $scope.vectorTipoEvento[j].tbvalor;
                                        break;
                                      }
                                    }
                                    for (var j = 0; j < $scope.vectorRepeticion.length; j++) {
                                      if (dataEventos[i].evenperi === $scope.vectorRepeticion[j].tbnumero) {
                                        repeticion = $scope.vectorRepeticion[j].tbvalor;
                                        break;
                                      }
                                    }
                                    for (var j = 0; j < $scope.vectorImportancia.length; j++) {
                                      if (dataEventos[i].evenimpo === $scope.vectorImportancia[j].tbnumero) {
                                        importancia = $scope.vectorImportancia[j].tbvalor;
                                        break;
                                      }
                                    }
                                    if (dataEventos[i].evenesta === 2) { estado = "ACTIVO" };
                                    if (dataEventos[i].evenesta === 3) { estado = "INACTIVO" };
                                    if (dataEventos[i].evenesta === 5) { estado = "ANULADO" };
                                    datos[i] = {
                                        'id': dataEventos[i].evencons,
                                        'nombre': dataEventos[i].evendesc,
                                        'fechaInicio': new Date(dataEventos[i].evenfein).getDate()+"/"+((new Date(dataEventos[i].evenfein).getMonth().valueOf())+1)+"/"+new Date(dataEventos[i].evenfein).getFullYear(),
                                        'fechaFin': new Date(dataEventos[i].evenfefi).getDate()+"/"+((new Date(dataEventos[i].evenfefi).getMonth().valueOf())+1)+"/"+new Date(dataEventos[i].evenfefi).getFullYear(),
                                        'repeticion': repeticion,
                                        'tipoEvento': tipoEvento,
                                        'importancia': importancia,
                                        'estado': estado
                                    }
                                  }
                                }

                                $scope.gridOptions.data = datos;
                                $scope.bandera = true;
                              }
                            );
                          }
                        );
                      }
                  );

                  function rowTemplate() {
                      return '<div ng-dblclick="grid.appScope.rowDblClick(row)" >' +
                          '  <div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }"  ui-grid-cell></div>' +
                          '</div>';
                  }

                  $scope.rowDblClick = function(row) {
                      $location.url('/admin/eventoPrivado/vista/'+row.entity.id);
                  };
                }
              );
            }
          }
        }
      );
}]);