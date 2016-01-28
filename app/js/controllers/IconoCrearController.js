calendModController.controller('IconoCrearController', [
                                                  '$scope', 
                                                  'calImagService', 
                                                  '$location',
  function ($scope, calImagService, $location) {


        $scope.icono = {};
        $scope.icono.mensaje = "";
        $scope.icono.archivo = null;

        $scope.guardarIcono = function(){   
          if($scope.isValidarDatosIcono()){
            var imagenCodif = $scope.buildImagenCodif();
            calImagService.guardarImagenCodificada(imagenCodif).then(
              function(result){
                var icono = $scope.buildIcono(result);
                calImagService.guardarImagen(icono).then(
                  function(result){
                    console.log("guardo");
                    $location.path('/admin/icono/vista/'+result);
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
          else{
            console.log("debe llenar todos los campos")
          }
          
        }

        $scope.buildImagenCodif = function(){
          var calEntity = {};
          calEntity.imcocons = -1;        
          calEntity.imcotipo = 2;
          calEntity.imcoexte = $scope.icono.archivo.split(';')[0].substr(5);
          calEntity.imcocodi = $scope.icono.archivo;     
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

        $scope.Atras = function(){
          $location.path('/admin');
          $rootScope.vista = "icono";
        }
}]);