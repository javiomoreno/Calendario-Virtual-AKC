calendModController.controller('ObraAnoMesController', [
                                                '$scope',
                                                '$routeParams', 
                                                'calImagService',
                                                'calendarioService',
    function ($scope, $routeParams, calImagService, calendarioService) {

      var campos = $routeParams.camposObra;
      var vector = [];
      vector = campos.split('-');
      $scope.anho = vector[0];
      $scope.mes = vector[1];
      $scope.vectorObras = [];
      $scope.bandera = false;

      calendarioService.getAllMeses().then(
        function(data) {
          for (var i = 0; i < data.length; i++) {
            if (data[i].tbvalor == $scope.mes) {
              calImagService.getImagenesAnoMesTipo($scope.anho, data[i].tbclave, 3).then(
                function(dataObras){
                  for (var i = 0; i < dataObras.length; i++) {
                    $scope.vectorObras.push({
                      id: dataObras.id,
                      tema: dataObras.tema,
                      autor: dataObras.autor
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
