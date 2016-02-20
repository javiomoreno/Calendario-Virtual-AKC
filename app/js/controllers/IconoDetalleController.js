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
      $scope.anular = {};

      
      calImagService.getImagenId($scope.imagenId).then(
        function(dataImagen){
          $scope.icono = {
            id: dataImagen.IMAGCONS,
            mensaje: dataImagen.IMAGMENS,
            archivo: dataImagen.IMAGCODI
          }
          $scope.anular = {
            imagcons: dataImagen.IMAGCONS,
            imagimco: dataImagen.IMAGIMCO,
            imagano: dataImagen.IMAGANO,
            imagmes: dataImagen.IMAGMES,
            imagauto: dataImagen.IMAGAUTO,
            imagmens: dataImagen.IMAGMENS,
            imagtema: dataImagen.IMAGTEMA,
            imagesta: dataImagen.IMAGESTA,
            imaguscr: dataImagen.IMAGUSCR,
            imagfecr: new Date(dataImagen.IMAGFECR)
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
        $scope.idEliminar = $scope.anular;

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
