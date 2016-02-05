calendModController.controller('FotografiaDetalleController', [
                                                '$scope',
                                                '$routeParams', 
                                                '$uibModal', 
                                                '$location', 
                                                'calImagService',
                                                'calendarioService',
    function ($scope, $routeParams,  $uibModal, $location, calImagService, calendarioService) {

      $scope.imagenId = $routeParams.idFotografia;
      $scope.bandera = false;
      $scope.fotografia = {};

      calendarioService.getAllMeses().then(
        function(dataMeses) {
          calImagService.getImagenId($scope.imagenId).then(
            function(dataImagen){
              for (var i = 0; i < dataMeses.length; i++) {
                if(dataMeses[i].tbclave == dataImagen.mes){
                  $scope.fotografia = {
                    id: dataImagen.id,
                    mes: dataMeses[i].tbvalor,
                    anho: dataImagen.ano,
                    tema: dataImagen.tema,
                    mensaje: dataImagen.mensaje,
                    archivo: dataImagen.imagen
                  }
                  $scope.bandera = true;
                  break;
                }
              };
            },
            function(error){
                console.log("Imagen: ",error.statusText);
            }
          );
        },
        function(error){
            console.log("Meses: ",error.statusText);
        }
      );

      $scope.Editar = function(){
          $location.path('/admin/fotografi/editar/'+$scope.imagenId);
      }

      $scope.animationsEnabled = true;

      $scope.openModal = function (size) {
        $scope.idEliminar = $scope.imagenId;

        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'views/administrador/imagenes/fotografias/eliminar.html',
          controller: 'ModalControllerFotografias',
          size: size,
          resolve: {
              idEliminar : function(){
                  return $scope.idEliminar;
              }
          }
        });
      };
}]);
