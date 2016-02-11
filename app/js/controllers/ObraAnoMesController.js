calendModController.controller('ObraAnoMesController', [
                                                '$scope',
                                                '$routeParams', 
                                                'calImagService',
    function ($scope, $routeParams, calImagService) {

      var campos = $routeParams.camposObra;
      var vector = [];
      vector = campos.split('-');
      $scope.anho = vector[0];
      $scope.mes = vector[1];
      $scope.vectorObras = [];
      $scope.bandera = false;

      calImagService.getAllMeses().then(
        function(data) {
          for (var i = 0; i < data.length; i++) {
            if (data[i].tbvalor == $scope.mes) {
              calImagService.getImagenesAnoMesTipo($scope.anho, data[i].tbclave, 2103).then(
                function(dataObras){
                  for (var i = 0; i < dataObras.length; i++) {
                    $scope.vectorObras.push({
                      id: dataObras[i].IMAGCONS,
                      tema: dataObras[i].IMAGTEMA,
                      autor: dataObras[i].IMAGAUTO
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
