calendModController.controller('ModalControllerEventos', [
                                                            '$scope', 
                                                            '$uibModalInstance', 
                                                            'idEliminar',  
                                                            '$location', 
                                                            '$route',
                                                            'calEvenService',
                                                            'calImagService',
    function ($scope, $uibModalInstance, idEliminar, $location, $route, calEvenService, calImagService){
      $scope.evento = {};
      $scope. mes = {};
      $scope. anho = {};

      calEvenService.getEventoId(idEliminar).then(
        function(dataEvento){
            $scope.evento = {
              evencons: dataEvento[0].CAL_EVENTOS.evencons,
              evendesc: dataEvento[0].CAL_EVENTOS.evendesc,
              evenfein: dataEvento[0].CAL_EVENTOS.evenfein,
              evenfefi: dataEvento[0].CAL_EVENTOS.evenfefi,
              evenimpo: dataEvento[0].CAL_EVENTOS.evenimpo,
              evenperi: dataEvento[0].CAL_EVENTOS.evenperi,
              evenicon: dataEvento[0].CAL_EVENTOS.evenicon,
              evenuscr: dataEvento[0].CAL_EVENTOS.evenuscr,
              evenfecr: dataEvento[0].CAL_EVENTOS.evenfecr,
              evenesta: dataEvento[0].CAL_EVENTOS.evenesta,
              evenvibu: dataEvento[0].CAL_EVENTOS.evenvibu,
              evenffin: dataEvento[0].CAL_EVENTOS.evenffin,
              eventipo: dataEvento[0].CAL_EVENTOS.eventipo,
            }

            calImagService.getAllMeses().then(
              function(data) {
                for (var i = 0; i < data.length; i++) {
                  if (data[i].tbclave == new Date($scope.evento.evenfein).getMonth()+1) {
                    $scope.mes = data[i].tbvalor;
                    break;
                  }
                }
              }
            );

            $scope.Eliminar = function () {
                if($scope.evento.evenesta === 2){
                  $scope.evento.evenesta = 5;
                }
                else{
                  $scope.evento.evenesta = 2;
                }
                calEvenService.updEvento($scope.evento).then(
                  function(result){ 
                    $scope.anho = new Date($scope.evento.evenfein).getFullYear();
                    $location.url('/admin/evento/'+$scope.anho+"-"+$scope.mes);
                    $uibModalInstance.close();
                  },
                  function(error){
                      console.log(error.statusText);
                  }
                );
            };

            $scope.Cancelar = function () {
                $uibModalInstance.dismiss('no');
            };
            
        },
        function(error){
            console.log(error.statusText);
        }
      );
}]);