calendModController.controller('ObraEditarController', [
                                                '$scope', 
                                                '$routeParams',
                                                'calendarioService', 
                                                '$location', 
                                                'calImagService',
    function ($scope, $routeParams, calendarioService, $location, calImagService) {

      $scope.imagenId = $routeParams.idObra;

      $scope.obra = {};

      $scope.vecMeses = [];
      $scope.vecAnhos = [];

      calendarioService.getAllMeses().then(function(data) {
          for (var i = 0; i < data.length; i++) {
            $scope.vecMeses[i] = {
              id: i,
              opcion: data[i].tbclave+" - "+data[i].tbvalor,
              value: data[i].tbclave
            }
          };
      });

      calendarioService.getAllAnhos().then(function(data) {
          for (var i = 0; i < data.length; i++) {
            $scope.vecAnhos[i] = {
              id: i,
              opcion: data[i].tbvalor
            }
          };
      });

      calImagService.getImagenId($scope.imagenId).then(
        function(dataImagen){
          $scope.obra = {
            id: dataImagen.id,
            mes: dataImagen.mes,
            anho: dataImagen.ano,
            tema: dataImagen.tema,
            autor: dataImagen.autor,
            mensaje: dataImagen.mensaje,
            archivo: dataImagen.imagen
          }
        },
        function(error){
            console.log(error.statusText);
        }
      );

      $scope.buildImagenCodif = function(){
        var calEntity = {};
        calEntity.imcocons = -1;        
        calEntity.imcotipo = 3;
        calEntity.imcoexte = $scope.obra.archivo.split(';')[0].substr(5);
        calEntity.imagcodi = $scope.obra.archivo;     
        return calEntity;
      }

      $scope.buildObra = function(imagimco){
        var calEntity = {};
        calEntity.imagcons = -1;        
        calEntity.imagimco = imagimco;        
        calEntity.imagano = $scope.obra.anho;
        calEntity.imagmes = $scope.obra.mes;
        calEntity.imagauto = $scope.obra.autor;
        calEntity.imagmens = $scope.obra.mensaje;
        calEntity.imagtema = $scope.obra.tema;   
        calEntity.imaguscr = null;   
        calEntity.imagfecr = null;   
        return calEntity;
      }

      $scope.isValidarDatosObra = function(){
        if( angular.isUndefined($scope.obra.anho) ||
        	angular.isUndefined($scope.obra.mes) ||
        	angular.isUndefined($scope.obra.autor) ||
        	angular.isUndefined($scope.obra.mensaje) ||
        	angular.isUndefined($scope.obra.tema) ||
          angular.isUndefined($scope.obra.archivo) ||
          $scope.obra.anho == null ||
          $scope.obra.mes == null ||
          $scope.obra.autor == null ||
          $scope.obra.mensaje == null ||
          $scope.obra.tema == null ||
          $scope.obra.archivo == null ||
            $scope.obra.anho == '' ||
            $scope.obra.mes == '' ||
            $scope.obra.autor == '' ||
            $scope.obra.mensaje == '' ||
            $scope.obra.tema == ''
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
