calendModController.controller('ObraListaController', [
                                                '$scope',
                                                '$routeParams', 
                                                'calImagService',
                                                'calendarioService',
    function ($scope, $routeParams, calImagService, calendarioService) {

      $scope.bandera = false;
      $scope.vecMeses = [];
      $scope.vector = [];

      calendarioService.getAllAnhos().then(
        function(dataAnho) {
          calendarioService.getAllMeses().then(
            function(dataMes) {
                for (var i = 0; i < dataMes.length; i++) {
                  $scope.vecMeses[i] = {
                    opcion: dataMes[i].tbclave,
                    value: dataMes[i].tbvalor
                  }
                };
                //for (var i = 0; i < dataAnho.length; i++) {
                  var otra = [];
                  //for (var j = 0; j < $scope.vecMeses.length; j++) {
                    calImagService.getImagenesTipo(dataAnho[11].tbvalor, $scope.vecMeses[0].opcion, 3).then(
                      function(dataImagenes){
                        if(dataImagenes.cantidad > 0){
                          otra.push({
                            mes: $scope.vecMeses[0].value,
                            cant: dataImagenes.cantidad
                          });
                          $scope.vector.push({
                            anho: dataAnho[11].tbvalor,
                            meses: otra
                          })
                          $scope.bandera = true;
                        }
                      },
                      function(error){
                        console.log(error.statusText);
                      }
                    );
                  //};
                //};
            },
            function(error){
              console.log(error.statusText);
            }
          );
        },
        function(error){
          console.log(error.statusText);
        }
      );      
}]);
