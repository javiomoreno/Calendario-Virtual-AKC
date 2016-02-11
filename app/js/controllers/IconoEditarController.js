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
            id: dataImagen.IMAGCONS,
            idCodif: dataImagen.IMAGIMCO,
            tipoCodif: dataImagen.IMCOTIPO,
            extCodif: dataImagen.IMCOEXTE,
            mes: dataImagen.IMAGMES,
            anho: dataImagen.IMAGANO,
            tema: dataImagen.IMAGTEMA,
            autor: dataImagen.IMAGAUTO,
            mensaje: dataImagen.IMAGMENS,
            archivo: dataImagen.IMAGCODI,
            fechaCre: new Date(dataImagen.IMAGFECR)
          }
          $scope.bandera = true;
        },
        function(error){
            console.log(error.statusText);
        }
      );

      $scope.editarIcono = function(){
        if($scope.isValidarDatosIcono()){
          $scope.bandera = false;
          var imagenCodif = $scope.buildImagenCodif();
          calImagService.updImagenCodifi(imagenCodif).then(
            function(result){    
              var icono = $scope.buildIcono(result.ID);
              calImagService.updImagenes(icono).then(
                function(resultIcono){
                  $scope.bandera = true;
                  console.log("guardo");
                  $location.path('/admin/icono/vista/'+resultIcono.ID);
                }
              );
            }
          );
        }
      }

      $scope.buildImagenCodif = function(){
          var calEntity = {};
          calEntity.imcocons = $scope.icono.idCodif;        
          calEntity.imcotipo = $scope.icono.tipoCodif;
          calEntity.imcoexte = $scope.icono.extCodif;
          calEntity.imagcodi = $scope.icono.archivo;     
          return calEntity;
        }

        $scope.buildIcono = function(){
          var calEntity = {};
          calEntity.imagcons = $scope.icono.id;        
          calEntity.imagimco = $scope.icono.idCodif;  
          calEntity.imagano = null;
          calEntity.imagmes = null;
          calEntity.imagauto = null;
          calEntity.imagmens = $scope.icono.mensaje;
          calEntity.imagtema = null;     
          calEntity.imaguscr = null;     
          calEntity.imagfecr = $scope.icono.fechaCre;       
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
