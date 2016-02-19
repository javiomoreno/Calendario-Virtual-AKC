calendModController.controller('CambiarTipoModalController', [
                                                              '$scope', 
                                                              '$uibModalInstance', 
                                                              'idCambiar', 
                                                              '$location', 
                                                              '$route',
                                                              'calEvenService',
    function ($scope, $uibModalInstance, idCambiar, $location, $route, calEvenService){

      $scope.evento = {};

      calEvenService.getEventoId(idCambiar).then(
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

            $scope.Cambiar = function () {
                if($scope.evento.evenvibu === 2){
                  $scope.evento.evenvibu = 1;
                }
                else{
                  $scope.evento.evenvibu = 2;
                }
                calEvenService.updEvento($scope.evento).then(
                  function(result){ 
                    $route.reload();
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