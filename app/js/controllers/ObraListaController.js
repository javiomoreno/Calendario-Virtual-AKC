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
                for (var i = 0; i < data.length; i++) {
                  $scope.vecMeses[i] = {
                    opcion: dataMes[i].tbclave,
                    value: dataMes[i].tbvalor
                  }
                };
                for (var i = 0; i < dataAnho.length; i++) {
                  var otra = [];
                  for (var j = 0; j < dataMes.length; j++) {
                    calImagService.getImagenesTipo(dataAnho[i].tbvalor, dataMes[j].opcion, 3).then(
                      function(dataImagenes){
                        if(dataImagenes.length > 0){
                          otra.push({
                            mes: dataMes.value,
                            cant: dataImagenes.cantidad
                          });
                        }
                      },
                      function(error){
                        console.log(error.statusText);
                      }
                    );
                  };
                  
                };
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
