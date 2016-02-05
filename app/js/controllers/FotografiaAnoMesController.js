calendModController.controller('FotografiaAnoMesController', [
                                                '$scope',
                                                '$routeParams', 
                                                'calImagService',
                                                'calendarioService',
    function ($scope, $routeParams, calImagService, calendarioService) {

      var campos = $routeParams.camposFotografia;
      var vector = [];
      vector = campos.split('-');
      $scope.anho = vector[0];
      $scope.mes = vector[1];
      $scope.vectorFotografias = [];
      $scope.bandera = false;

      calendarioService.getAllMeses().then(
        function(data) {
          for (var i = 0; i < data.length; i++) {
            if (data[i].tbvalor == $scope.mes) {
              calImagService.getImagenesAnoMesTipo($scope.anho, data[i].tbclave, 1).then(
                function(dataFotografias){
                  for (var i = 0; i < dataFotografias.length; i++) {
                    $scope.vectorFotografias.push({
                      id: dataFotografias[i].id,
                      tema: dataFotografias[i].Tema,
                      autor: dataFotografias[i].Autor
                      });
                  };
                  $scope.bandera = true;
                },
                function(error){
                  console.log(error.statusText);
                }
              );
              break;
            };
          };
        },
        function(error){
          console.log(error.statusText);
        }
      );  
}]);
