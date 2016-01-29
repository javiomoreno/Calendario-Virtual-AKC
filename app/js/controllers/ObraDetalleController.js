calendModController.controller('ObraDetalleController', [
                                                '$scope',
                                                '$routeParams', 
                                                '$uibModal', 
                                                '$location', 
                                                'calImagService',
                                                'calendarioService',
    function ($scope, $routeParams,  $uibModal, $location, calImagService, calendarioService) {

      $scope.imagenId = $routeParams.idObra;
      $scope.bandera = false;
      $scope.obra = {};

      calendarioService.getAllMeses().then(
        function(dataMeses) {
          calImagService.getImagenId($scope.imagenId).then(
            function(dataImagen){
              for (var i = 0; i < dataMeses.length; i++) {
                if(dataMeses[i].tbclave == dataImagen.mes){
                  $scope.obra = {
                    id: dataImagen.id,
                    mes: dataMeses[i].tbvalor,
                    anho: dataImagen.ano,
                    tema: dataImagen.tema,
                    autor: dataImagen.autor,
                    mensaje: dataImagen.mensaje,
                    archivo: dataImagen.imagen
                  }
                  $scope.bandera = true;
                  break;
                }
              };
            },
            function(error){
                console.log(error.statusText);
            }
          );
        },
        function(error){
            console.log(error.statusText);
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
