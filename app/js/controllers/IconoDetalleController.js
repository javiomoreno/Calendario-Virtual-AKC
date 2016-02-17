calendModController.controller('IconoDetalleController', [
                                                '$scope',
                                                '$routeParams', 
                                                '$uibModal', 
                                                '$location', 
                                                'calImagService',
    function ($scope, $routeParams,  $uibModal, $location, calImagService) {

      $scope.imagenId = $routeParams.idIcono;
      $scope.bandera = false;
      $scope.icono = {};

      
      calImagService.getImagenId($scope.imagenId).then(
        function(dataImagen){
          $scope.icono = {
            id: dataImagen.IMAGCONS,
            mensaje: dataImagen.IMAGMENS,
            archivo: dataImagen.IMAGCODI
          }
          $scope.bandera = true;
        },
        function(error){
            console.log(error.statusText);
        }
      );

      $scope.Editar = function(){
          $location.path('/admin/icono/editar/'+$scope.imagenId);
      }

      $scope.animationsEnabled = true;

      $scope.openModal = function (size) {
        $scope.idEliminar = $scope.imagenId;

        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'views/administrador/imagenes/iconos/eliminar.html',
          controller: 'ModalControllerIconos',
          size: size,
          resolve: {
              idEliminar : function(){
                  return $scope.idEliminar;
              }
          }
        });
      };
}]);
