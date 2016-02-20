calendModController.controller('FotografiaDetalleController', [
                                                '$scope',
                                                '$routeParams', 
                                                '$uibModal', 
                                                '$location', 
                                                'calImagService',
    function ($scope, $routeParams,  $uibModal, $location, calImagService) {

      $scope.imagenId = $routeParams.idFotografia;
      $scope.bandera = false;
      $scope.fotografia = {};
      $scope.anular = {};
      $scope.fotografia.archivo = null;

      calImagService.getAllMeses().then(
        function(dataMeses) {
          calImagService.getImagenId($scope.imagenId).then(
            function(dataImagen){
              for (var i = 0; i < dataMeses.length; i++) {
                if(dataMeses[i].tbclave == dataImagen.IMAGMES){
                  $scope.fotografia = {
                    id: dataImagen.IMAGCONS,
                    mes: dataMeses[i].tbvalor,
                    anho: dataImagen.IMAGANO,
                    tema: dataImagen.IMAGTEMA,
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
          $location.path('/admin/fotografia/editar/'+$scope.imagenId);
      }

      $scope.animationsEnabled = true;

      $scope.openModal = function (size) {
        $scope.idEliminar = $scope.anular;

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
