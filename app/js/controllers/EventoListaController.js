calendModController.controller('EventoListaController', [
                                                '$scope',
                                                '$routeParams', 
                                                'calImagService',
                                                'calEvenService',
    function ($scope, $routeParams, calImagService, calEvenService) {

      $scope.bandera = false;
      $scope.vecMeses = [];
      $scope.vector = [];

      calEvenService.getAllEventosAdminTipo(2201).then(
        function(dataEventos){
          calImagService.getAllMeses().then(
            function(dataMeses) {
              for (var i = 0; i < dataMeses.length; i++) {
                $scope.vecMeses.push(dataMeses[i].tbvalor);
              };
              for (var i = 0; i < dataEventos.length; i++) {
                $scope.vector.push(dataEventos[i]);
              };
              $scope.bandera = true;
            }
          );
        }
      );
}]);
