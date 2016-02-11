calendModController.controller('FotografiaListaController', [
                                                '$scope',
                                                '$routeParams', 
                                                'calImagService',
    function ($scope, $routeParams, calImagService) {

      $scope.bandera = false;
      $scope.vecMeses = [];
      $scope.vector = [];

      calImagService.getImagenesTipo(2101).then(
        function(dataImagenes){
          calImagService.getAllMeses().then(function(dataMeses) {
            for (var i = 0; i < dataMeses.length; i++) {
              $scope.vecMeses.push(dataMeses[i].tbvalor);
            };
            for (var i = 0; i < dataImagenes.length; i++) {
              $scope.vector.push(dataImagenes[i]);
            };
            $scope.bandera = true;
          });
        }
      );
}]);
