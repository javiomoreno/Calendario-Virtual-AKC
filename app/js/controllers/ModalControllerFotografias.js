calendModController.controller('ModalControllerFotografias', [
                                                          '$scope', 
                                                          '$uibModalInstance', 
                                                          'idEliminar', 
                                                          '$location', 
                                                          '$route',
                                                          'calImagService',
                                                          'serveData',
    function ($scope, $uibModalInstance, idEliminar, $location, $route, calImagService, serveData){

      $scope. mes = {};
      $scope. anho = {};

      calImagService.getAllMeses().then(
        function(data) {
          for (var i = 0; i < data.length; i++) {
            if (data[i].tbclave == idEliminar.imagmes) {
              $scope.mes = data[i].tbvalor;
              break;
            }
          }
        }
      );

      $scope.anho = idEliminar.imagano;

      $scope.Eliminar = function () {
          if(idEliminar.imagesta === 2){
            idEliminar.imagesta = 5;
          }
          else{
            idEliminar.imagesta = 2;
          }
          calImagService.updImagenes(idEliminar).then(
            function(result){ 
              serveData.data.vista = 01;
              $location.url('/admin');
              $uibModalInstance.close();
            },
            function(error){
                console.log(error.statusText);
            }
          );
      };

      $scope.Cancelar = function () {
          $uibModalInstance.dismiss('no');
      };
}]);