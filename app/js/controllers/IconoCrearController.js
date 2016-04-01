calendModController.controller('IconoCrearController', [
                                                  '$scope',
                                                  'calImagService',
                                                  '$location',
                                                  'serveData',
  function ($scope, calImagService, $location, serveData) {


        $scope.icono = {};
        $scope.icono.mensaje = "";
        $scope.icono.archivo = null;
        $scope.alerts = [];

        $scope.guardarIcono = function(){
          if($scope.isValidarDatosIcono()){
            $scope.bandera = false;
            var imagenCodif = $scope.buildImagenCodif();
            calImagService.guardarImagenCodificada(imagenCodif).then(
              function(result){
                var icono = $scope.buildIcono(result.id);
                calImagService.guardarImagen(icono).then(
                  function(resultIcono){
                    $scope.bandera = true;
                    serveData.data.vista = 02;
                    $location.path('/admin');
                  },
                  function(error){
                    console.log("Icono: ",error.statusText);
                  }
                );
              },
              function(error){
                console.log("Imagen: ",error.statusText);
              }
            );
          }

        }

        $scope.buildImagenCodif = function(){
          var calEntity = {};
          calEntity.imcocons = -1;
          calEntity.imcotipo = 2102;
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
          calEntity.imagesta = 2;
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
            $scope.alerts.push({msg: 'Debe llenar todos Los campos como obligatorios *'});
            return false;
          }
          else{
            return true;
          }
        }

        $scope.closeAlert = function(index) {
          $scope.alerts.splice(index, 1);
        };
}]);
