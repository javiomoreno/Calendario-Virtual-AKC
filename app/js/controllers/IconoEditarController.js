calendModController.controller('IconoEditarController', [
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
            idCodif: dataImagen.IMAGIMCO,
            tipoCodif: dataImagen.IMCOTIPO,
            extCodif: dataImagen.IMCOEXTE,
            mes: dataImagen.IMAGMES,
            anho: dataImagen.IMAGANO,
            tema: dataImagen.IMAGTEMA,
            autor: dataImagen.IMAGAUTO,
            mensaje: dataImagen.IMAGMENS,
            archivo: dataImagen.IMAGCODI,
            estado: dataImagen.IMAGESTA,
            fechaCre: new Date(dataImagen.IMAGFECR),
            usuarioCre: new Date(dataImagen.IMAGUSCR)
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
          calEntity.imagano = $scope.icono.anho;
          calEntity.imagmes = $scope.icono.mes;
          calEntity.imagauto = $scope.icono.autor;
          calEntity.imagmens = $scope.icono.mensaje;
          calEntity.imagtema = $scope.icono.tema;     
          calEntity.imagesta = $scope.icono.estado;     
          calEntity.imaguscr = $scope.icono.usuarioCre;
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
