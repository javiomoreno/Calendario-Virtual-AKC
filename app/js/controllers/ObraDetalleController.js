calendModController.controller('ObraDetalleController', [
                                                '$scope',
                                                '$routeParams', 
                                                '$uibModal', 
                                                '$location', 
                                                'calImagService',
    function ($scope, $routeParams,  $uibModal, $location, calImagService) {

      $scope.imagenId = $routeParams.idObra;
      $scope.bandera = false;
      $scope.banderaObra = false;
      $scope.obra = {};
      $scope.anular = {};

      calImagService.getAllMeses().then(
        function(dataMeses) {
          calImagService.getImagenId($scope.imagenId).then(
            function(dataImagen){
              $scope.bandera = true;
              for (var i = 0; i < dataMeses.length; i++) {
                if(dataMeses[i].tbclave == dataImagen.imagmes){
                  $scope.obra = {
                    id: dataImagen.imagcons,
                    mes: dataMeses[i].tbvalor,
                    anho: dataImagen.imagano,
                    tema: dataImagen.imagtema,
                    autor: dataImagen.imagauto,
                    mensaje: dataImagen.imagmens
                  }
                  break;
                }
              }
              calImagService.getImagenCodificadaId(dataImagen.imagimco).then(
                function(dataImagenCodificada){
                  $scope.banderaObra = true;
                  $scope.obra.archivo = {};
                  $scope.obra.archivo = dataImagenCodificada.imagcodi;
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

      $scope.openModal = function (size) {
        $scope.idEliminar = $scope.anular;

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
