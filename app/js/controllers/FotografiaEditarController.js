calendModController.controller('FotografiaEditarController', [
                                                '$scope', 
                                                '$routeParams',
                                                'calendarioService', 
                                                '$location', 
                                                'calImagService',
    function ($scope, $routeParams, calendarioService, $location, calImagService) {

      $scope.imagenId = $routeParams.idFotografia;
      $scope.bandera = false;
      $scope.fotografia = {};

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

      calImagService.getImagenId($scope.imagenId).then(
        function(dataImagen){
          $scope.fotografia = {
            id: dataImagen.id,
            mes: dataImagen.mes,
            anho: dataImagen.ano,
            tema: dataImagen.tema,
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
        calEntity.imcotipo = 3;
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
        calEntity.imagauto = $scope.fotografia.autor;
        calEntity.imagmens = $scope.fotografia.mensaje;
        calEntity.imagtema = $scope.fotografia.tema;   
        calEntity.imaguscr = null;   
        calEntity.imagfecr = null;   
        return calEntity;
      }

      $scope.isValidarDatosFotografia = function(){
        if( angular.isUndefined($scope.fotografia.anho) ||
        	angular.isUndefined($scope.fotografia.mes) ||
        	angular.isUndefined($scope.fotografia.autor) ||
        	angular.isUndefined($scope.fotografia.mensaje) ||
        	angular.isUndefined($scope.fotografia.tema) ||
          angular.isUndefined($scope.fotografia.archivo) ||
          $scope.fotografia.anho == null ||
          $scope.fotografia.mes == null ||
          $scope.fotografia.autor == null ||
          $scope.fotografia.mensaje == null ||
          $scope.fotografia.tema == null ||
          $scope.fotografia.archivo == null ||
            $scope.fotografia.anho == '' ||
            $scope.fotografia.mes == '' ||
            $scope.fotografia.autor == '' ||
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
