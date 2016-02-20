calendModController.controller('ModalControllerIconos', [
                                                        '$scope', 
                                                        '$uibModalInstance', 
                                                        'idEliminar', 
                                                        '$location',
                                                        'calImagService', 
                                                        'serveData',
    function ($scope, $uibModalInstance, idEliminar, $location, calImagService, serveData){

      $scope.Eliminar = function () {
          if(idEliminar.imagesta === 2){
            idEliminar.imagesta = 5;
          }
          else{
            idEliminar.imagesta = 2;
          }
          calImagService.updImagenes(idEliminar).then(
            function(result){ 
              serveData.data.vista = 02;
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