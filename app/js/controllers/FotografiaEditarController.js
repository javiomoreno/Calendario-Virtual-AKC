calendModController.controller('FotografiaEditarController', [
                                                '$scope', 
                                                '$routeParams',
                                                '$location', 
                                                'calImagService',
    function ($scope, $routeParams, $location, calImagService) {

      $scope.imagenId = $routeParams.idFotografia;
      $scope.bandera = false;
      $scope.banderaFotografia = false;
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
              opcion: data[i].tbclave+" - "+data[i].tbvalor,
              value: parseInt(data[i].tbclave)
            }
          };
      });

      calImagService.getAllAnhos().then(function(data) {
          for (var i = 0; i < data.length; i++) {
            $scope.vecAnhos[i] = {
              opcion: parseInt(data[i].tbvalor)
            }
          };
      });

      calImagService.getImagenId($scope.imagenId).then(
        function(dataImagen){
          $scope.bandera = true;
          $scope.fotografia = {
            id: dataImagen.imagcons,
            mes: dataImagen.imagmes,
            anho: dataImagen.imagano,
            estado: dataImagen.imagesta,
            tema: dataImagen.imagtema,
            autor: dataImagen.imagauto,
            mensaje: dataImagen.imagmens,
            fechaCre: new Date(dataImagen.imagfecr),
            usuarioCre: dataImagen.imaguscr
          }
          calImagService.getImagenCodificadaId(dataImagen.imagimco).then(
            function(dataImagenCodificada){
              $scope.banderaFotografia = true;
              $scope.fotografia.idCodif = dataImagen.imagimco;
              $scope.fotografia.tipoCodif = dataImagenCodificada.imcotipo;
              $scope.fotografia.extCodif = dataImagenCodificada.imcoexte;
              $scope.fotografia.archivo = dataImagenCodificada.imagcodi;
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
                  $location.path('/admin/fotografia/vista/'+resultFotografia.ID);
                },
                function(error){
                  console.log("Fotografia.", error.statusText);
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
        calEntity.imagesta = $scope.fotografia.estado; 
        calEntity.imaguscr = $scope.fotografia.usuarioCre;
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
