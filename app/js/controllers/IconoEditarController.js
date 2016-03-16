calendModController.controller('IconoEditarController', [
                                                '$scope',
                                                '$routeParams',
                                                '$uibModal',
                                                '$location',
                                                'calImagService',
    function ($scope, $routeParams,  $uibModal, $location, calImagService) {

      $scope.imagenId = $routeParams.idIcono;
      $scope.banderaIcono = false;
      $scope.bandera = false;
      $scope.icono = {};
      $scope.anular = {};


      calImagService.getImagenId($scope.imagenId).then(
        function(dataImagen){
          $scope.bandera = true;
          $scope.icono = {
            id: dataImagen.imagcons,
            mes: dataImagen.imagmes,
            anho: dataImagen.imagano,
            tema: dataImagen.imagtema,
            autor: dataImagen.imagauto,
            mensaje: dataImagen.imagmens,
            imagesta: dataImagen.imagesta,
            fechaCre: new Date(dataImagen.imagfecr),
            usuarioCre: dataImagen.imaguscr
          }
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
          calImagService.getImagenCodificadaId(dataImagen.imagimco).then(
            function(dataImagenCodificada){
              $scope.banderaIcono = true;
              $scope.icono.idCodif = dataImagen.imagimco;
              $scope.icono.tipoCodif = dataImagenCodificada.imcotipo;
              $scope.icono.extCodif = dataImagenCodificada.imcoexte;
              $scope.icono.archivo = dataImagenCodificada.imagcodi;
            },
            function(error){
              console.log("Imagen Codificada: ",error.statusText);
            }
          );
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
                },
                function(error){
                  console.log("Icono.", error.statusText);
                }
              );
            },
            function(error){
              console.log("imagenCodif.", error.statusText);
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
          calEntity.imagesta = $scope.icono.imagesta;
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
