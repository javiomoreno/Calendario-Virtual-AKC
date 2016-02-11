calendModController.controller('FotografiaAnoMesController', [
                                                '$scope',
                                                '$routeParams', 
                                                'calImagService',
    function ($scope, $routeParams, calImagService) {

      var campos = $routeParams.camposFotografia;
      var vector = [];
      vector = campos.split('-');
      $scope.anho = vector[0];
      $scope.mes = vector[1];
      $scope.vectorFotografias = [];
      $scope.bandera = false;

      calImagService.getAllMeses().then(
        function(data) {
          for (var i = 0; i < data.length; i++) {
            if (data[i].tbvalor == $scope.mes) {
              calImagService.getImagenesAnoMesTipo($scope.anho, data[i].tbclave, 2101).then(
                function(dataFotografias){
                  for (var i = 0; i < dataFotografias.length; i++) {
                    $scope.vectorFotografias.push({
                      id: dataFotografias[i].IMAGCONS,
                      tema: dataFotografias[i].IMAGTEMA,
                      mensaje: dataFotografias[i].IMAGMENS
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
