calendModController.controller('IconoListaController', [
                                                  '$scope', 
                                                  'calImagService', 
  function ($scope, calImagService) {

    $scope.bandera = false;
    $scope.vectorIconos = [];

    calImagService.getListaIconos().then(
      function(dataImagen){
        for (var i = 0; i < dataImagen.length; i++) {
          $scope.vectorIconos.push({
            id: dataImagen[i].IMAGCONS,
            mensaje: dataImagen[i].IMAGMENS,
            archivo: dataImagen[i].IMAGCODI
          });
        }
        $scope.bandera = true;
      },
      function(error){
          console.log(error.statusText);
      }
    );
}]);