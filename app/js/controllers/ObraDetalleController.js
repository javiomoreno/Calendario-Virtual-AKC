calendModController.controller('ObraDetalleController', [
                                                '$scope',
                                                '$routeParams', 
                                                '$uibModal', 
                                                '$location', 
                                                'calImagService',
    function ($scope, $routeParams,  $uibModal, $location, calImagService) {

      $scope.imagenId = $routeParams.idObra;
      $scope.bandera = false;
      $scope.obra = {};

      calImagService.getAllMeses().then(
        function(dataMeses) {
          calImagService.getImagenId($scope.imagenId).then(
            function(dataImagen){
              for (var i = 0; i < dataMeses.length; i++) {
                if(dataMeses[i].tbnumero == dataImagen.IMAGMES){
                  $scope.obra = {
                    id: dataImagen.IMAGCONS,
                    mes: dataMeses[i].tbvalor,
                    anho: dataImagen.IMAGANO,
                    tema: dataImagen.IMAGTEMA,
                    autor: dataImagen.IMAGAUTO,
                    mensaje: dataImagen.IMAGMENS,
                    archivo: dataImagen.IMAGCODI
                  }
                  $scope.bandera = true;
                  break;
                }
              };
            },
            function(error){
                console.log("Obra: ",error.statusText);
            }
          );
        },
        function(error){
            console.log("Meses: ",error.statusText);
        }
      );

      $scope.Editar = function(){
          $location.path('/admin/obra/editar/'+$scope.imagenId);
      }

      $scope.animationsEnabled = true;

      $scope.openModal = function (size, idEliminar) {
        $scope.idEliminar = idEliminar;

        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'views/administrador/imagenes/obras/eliminar.html',
          controller: 'ModalControllerObras',
          size: size,
          resolve: {
              idEliminar : function(){
                  return $scope.idEliminar;
              }
          }
        });
      };
}]);
