calendModController.controller('IconoEditarController', [
                                                '$scope',
                                                '$routeParams', 
                                                '$uibModal', 
                                                '$location', 
                                                'calImagService',
                                                'calendarioService',
    function ($scope, $routeParams,  $uibModal, $location, calImagService, calendarioService) {

      $scope.imagenId = $routeParams.idIcono;
      $scope.bandera = false;
      $scope.icono = {};

      
      calImagService.getImagenId($scope.imagenId).then(
        function(dataImagen){
          $scope.icono = {
            id: dataImagen.id,
            mensaje: dataImagen.mensaje,
            archivo: dataImagen.imagen
          }
          $scope.bandera = true;
        },
        function(error){
            console.log(error.statusText);
        }
      );
      $scope.buildImagenCodif = function(){
          var calEntity = {};
          calEntity.imcocons = -1;        
          calEntity.imcotipo = 2;
          calEntity.imcoexte = $scope.icono.archivo.split(';')[0].substr(5);
          calEntity.imagcodi = $scope.icono.archivo;     
          return calEntity;
        }

        $scope.buildIcono = function(imagimco){
          var calEntity = {};
          calEntity.imagcons = -1;    
          calEntity.imagimco = imagimco;     
          calEntity.imagano = null;
          calEntity.imagmes = null;
          calEntity.imagauto = null;
          calEntity.imagmens = $scope.icono.mensaje;
          calEntity.imagtema = null;     
          calEntity.imaguscr = null;     
          calEntity.imagfecr = null;      
          return calEntity;
        }

        $scope.isValidarDatosIcono = function(){
          if( angular.isUndefined($scope.icono.mensaje) ||
            angular.isUndefined($scope.icono.archivo) ||
            $scope.icono.mensaje == null ||
            $scope.icono.archivo == null ||
              $scope.icono.mensaje == ''
          ){
            return false;
          }
          else{
            return true;
          }
        }
}]);
