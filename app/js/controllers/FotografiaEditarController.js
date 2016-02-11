calendModController.controller('FotografiaEditarController', [
                                                '$scope', 
                                                '$routeParams',
                                                '$location', 
                                                'calImagService',
    function ($scope, $routeParams, $location, calImagService) {

      $scope.imagenId = $routeParams.idFotografia;
      $scope.bandera = false;
      $scope.fotografia = {};
      $scope.fotografia.mes = {};
      $scope.fotografia.anho = {},
      $scope.fotografia.tema = "";
      $scope.fotografia.mensaje = "";
      $scope.fotografia.archivo = null;

      $scope.vecMeses = [];
      $scope.vecAnhos = [];

      calImagService.getAllMeses().then(function(data) {
          for (var i = 0; i < data.length; i++) {
            $scope.vecMeses[i] = {
              id: i,
              opcion: data[i].tbclave+" - "+data[i].tbvalor,
              value: data[i].tbclave
            }
          };
      });

      calImagService.getAllAnhos().then(function(data) {
          for (var i = 0; i < data.length; i++) {
            $scope.vecAnhos[i] = {
              id: i,
              opcion: data[i].tbvalor
            }
          };
      });

      calImagService.getImagenId($scope.imagenId).then(
        function(dataImagen){
          $scope.fotografia = {
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

      $scope.editarFotografia = function(){
        if($scope.isValidarDatosFotografia()){
          $scope.bandera = false;        
          var imagenCodif = $scope.buildImagenCodif();
          calImagService.updImagenCodifi(imagenCodif).then(
            function(result){      
              var fotografia = $scope.buildFotografia();
              calImagService.updImagenes(fotografia).then(
                function(resultFotografia){
                  $scope.bandera = true;
                  console.log("guardo");
                  $location.path('/admin/fotografia/vista/'+resultFotografia.ID);
                }
              );
            }
          );
        }
      }

      $scope.buildImagenCodif = function(){
        var calEntity = {};
        calEntity.imcocons = $scope.fotografia.idCodif;        
        calEntity.imcotipo = $scope.fotografia.tipoCodif;
        calEntity.imcoexte = $scope.fotografia.extCodif;
        calEntity.imagcodi = $scope.fotografia.archivo;     
        return calEntity;
      }

      $scope.buildFotografia = function(){
        var calEntity = {};
        calEntity.imagcons = $scope.fotografia.id;        
        calEntity.imagimco = $scope.fotografia.idCodif;        
        calEntity.imagano = $scope.fotografia.anho;
        calEntity.imagmes = $scope.fotografia.mes;
        calEntity.imagauto = $scope.fotografia.autor;
        calEntity.imagmens = $scope.fotografia.mensaje;
        calEntity.imagtema = $scope.fotografia.tema;   
        calEntity.imaguscr = null;   
        calEntity.imagfecr = $scope.fotografia.fechaCre;   
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
          $scope.fotografia.autor == null ||
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
