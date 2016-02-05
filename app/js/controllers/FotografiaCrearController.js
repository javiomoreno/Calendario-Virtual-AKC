calendModController.controller('FotografiaCrearController', [
                                                '$scope', 
                                                'calendarioService', 
                                                '$location', 
                                                'calImagService',
    function ($scope, calendarioService, $location, calImagService) {

        $scope.bandera = true;
        $scope.fotografia = {};
        $scope.fotografia.mes = {};
        $scope.fotografia.anho = {},
        $scope.fotografia.tema = "";
        $scope.fotografia.mensaje = "";
        $scope.fotografia.archivo = null;

        $scope.vecMeses = [];
        $scope.vecAnhos = [];

        calendarioService.getAllMeses().then(function(data) {
            for (var i = 0; i < data.length; i++) {
              $scope.vecMeses[i] = {
                opcion: data[i].tbclave+" - "+data[i].tbvalor,
                value: data[i].tbclave
              }
            };
        });

        calendarioService.getAllAnhos().then(function(data) {
            for (var i = 0; i < data.length; i++) {
              $scope.vecAnhos[i] = {
                opcion: data[i].tbvalor
              }
            };
        });

        $scope.guardarFotografia = function(){
          $scope.bandera = false;          
        	if($scope.isValidarDatosFotografia()){
            var imagenCodif = $scope.buildImagenCodif();
            calImagService.guardarImagenCodificada(imagenCodif).then(
              function(result){
                var fotografia = $scope.buildFotografia(result.id);
                calImagService.guardarImagen(fotografia).then(
                  function(resultFotografia){
                    $scope.bandera = true;
                    console.log("guardo");
                    $location.path('/admin/fotografia/vista/'+resultFotografia.id);
                  },
                  function(error){
                    console.log("Fotografia: ",error.statusText);
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
        };

        $scope.buildImagenCodif = function(){
          var calEntity = {};
          calEntity.imcocons = -1;        
          calEntity.imcotipo = 1;
          calEntity.imcoexte = $scope.fotografia.archivo.split(';')[0].substr(5);
          calEntity.imagcodi = $scope.fotografia.archivo;     
          return calEntity;
        }

        $scope.buildFotografia = function(imagimco){
          var calEntity = {};
          calEntity.imagcons = -1;        
          calEntity.imagimco = imagimco;        
          calEntity.imagano = $scope.fotografia.anho;
          calEntity.imagmes = $scope.fotografia.mes;
          calEntity.imagauto = null;
          calEntity.imagmens = $scope.fotografia.mensaje;
          calEntity.imagtema = $scope.fotografia.tema;   
          calEntity.imaguscr = null;   
          calEntity.imagfecr = null;   
          return calEntity;
        }

        $scope.isValidarDatosFotografia = function(){
          if( angular.isUndefined($scope.fotografia.anho) ||
          	angular.isUndefined($scope.fotografia.mes) ||
          	angular.isUndefined($scope.fotografia.mensaje) ||
          	angular.isUndefined($scope.fotografia.tema) ||
            angular.isUndefined($scope.fotografia.archivo) ||
            $scope.fotografia.anho == null ||
            $scope.fotografia.mes == null ||
            $scope.fotografia.mensaje == null ||
            $scope.fotografia.tema == null ||
            $scope.fotografia.archivo == null ||
              $scope.fotografia.anho == '' ||
              $scope.fotografia.mes == '' ||
              $scope.fotografia.mensaje == '' ||
              $scope.fotografia.tema == ''
          ){
            return false;
          }
          else{
            return true;
          }
        }

        $scope.Atras = function(){
          $location.path('/admin');
          $rootScope.vista = "fotografia";
        }
}]);
