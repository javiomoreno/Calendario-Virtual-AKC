calendModController.controller('IconoDetalleController', [
                                                '$scope',
                                                '$routeParams', 
                                                '$uibModal', 
                                                '$location', 
                                                'calImagService',
    function ($scope, $routeParams,  $uibModal, $location, calImagService) {

      $scope.imagenId = $routeParams.idIcono;
      $scope.bandera = false;
      $scope.banderaIcono = false;
      $scope.icono = {};
      $scope.anular = {};

      
      calImagService.getImagenId($scope.imagenId).then(
        function(dataImagen){
          $scope.bandera = true;
          $scope.icono = {
            id: dataImagen.imagcons,
            mensaje: dataImagen.imagmens
          }
          calImagService.getImagenCodificadaId(dataImagen.imagimco).then(
            function(dataImagenCodificada){
              $scope.banderaIcono = true;
              $scope.icono.archivo = {};
              $scope.icono.archivo = dataImagenCodificada.imagcodi;
            },
            function(error){
              console.log("Imagen Codificada: ",error.statusText);
            }
          );
          $scope.anular = {
            imagcons: dataImagen.imagcons,
            imagimco: dataImagen.imagimco,
            imagano: dataImagen.imagano,
            imagmes: dataImagen.imagmes,
            imagauto: dataImagen.imagauto,
            imagmens: dataImagen.imagmens,
            imagtema: dataImagen.imagtema,
            imagesta: dataImagen.imagesta,
            imaguscr: dataImagen.imaguscr,
            imagfecr: new Date(dataImagen.imagfecr)
          }
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
