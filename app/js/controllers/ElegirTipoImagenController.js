calendModController.controller('ElegirTipoImagenController', [
                                                        '$location',
                                                        '$timeout',
                                                        '$scope',
                                                        '$rootScope',
                                                        'calImagService',
                                                        'serveData',
    function ($location, $timeout, $scope, $rootScope, calImagService, serveData) {

      $scope.vista = serveData.data.vista;
      $scope.opciones = [];

      if ($rootScope.a.pestanaImagenes === true) {
        calImagService.getAllTipoImagen().then(function(data) {
          for (var i = 0; i < data.length; i++) {
            $scope.opciones[i] = {
              opcion: data[i].tbclave+" - "+data[i].tbvalor,
              value: parseInt(data[i].tbclave)
            }
          };
        });
      }

}]);
