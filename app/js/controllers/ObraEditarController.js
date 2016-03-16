calendModController.controller('ObraEditarController', [
                                                '$scope',
                                                '$routeParams',
                                                '$location',
                                                'calImagService',
    function ($scope, $routeParams, $location, calImagService) {

      $scope.imagenId = $routeParams.idObra;
      $scope.banderaObra = false;
      $scope.bandera = false;
      $scope.obra = {};
      $scope.obra.mes = {};
      $scope.obra.anho = {},
      $scope.obra.tema = "";
      $scope.obra.autor = "";
      $scope.obra.mensaje = "";
      $scope.obra.archivo = null;

      $scope.vecMeses = [];
      $scope.vecAnhos = [];
      $scope.alerts = [];

      calImagService.getAllMeses().then(
        function(data) {
          for (var i = 0; i < data.length; i++) {
            $scope.vecMeses[i] = {
              opcion: data[i].tbclave+" - "+data[i].tbvalor,
              value: parseInt(data[i].tbclave)
            }
          };
      });

      calImagService.getAllAnhos().then(
        function(data) {
          for (var i = 0; i < data.length; i++) {
            $scope.vecAnhos[i] = {
              opcion: parseInt(data[i].tbvalor)
            }
          };
      });

      calImagService.getImagenId($scope.imagenId).then(
        function(dataImagen){
          $scope.bandera = true;
          $scope.obra = {
            id: dataImagen.imagcons,
            mes: dataImagen.imagmes,
            anho: dataImagen.imagano,
            estado: dataImagen.imagesta,
            tema: dataImagen.imagtema,
            autor: dataImagen.imagauto,
            mensaje: dataImagen.imagmens,
            archivo: dataImagen.IMAGCODI,
            fechaCre: new Date(dataImagen.imagfecr),
            usuarioCre: dataImagen.imaguscr
          }
          calImagService.getImagenCodificadaId(dataImagen.imagimco).then(
            function(dataImagenCodificada){
              $scope.banderaObra = true;
              $scope.obra.idCodif = dataImagen.imagimco;
              $scope.obra.tipoCodif = dataImagenCodificada.imcotipo;
              $scope.obra.extCodif = dataImagenCodificada.imcoexte;
              $scope.obra.archivo = dataImagenCodificada.imagcodi;
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

      $scope.editarObra = function(){
        if($scope.isValidarDatosObra()){
          $scope.bandera = false;
          var imagenCodif = $scope.buildImagenCodif();
          calImagService.updImagenCodifi(imagenCodif).then(
            function(result){
              var obra = $scope.buildObra();
              calImagService.updImagenes(obra).then(
                function(resultObra){
                  $scope.bandera = true;
                  $location.path('/admin/obra/vista/'+resultObra.ID);
                },
                function(error){
                  console.log("Obra.", error.statusText);
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
        calEntity.imcocons = $scope.obra.idCodif;
        calEntity.imcotipo = $scope.obra.tipoCodif;
        calEntity.imcoexte = $scope.obra.extCodif;
        calEntity.imagcodi = $scope.obra.archivo;
        return calEntity;
      }

      $scope.buildObra = function(){
        var calEntity = {};
        calEntity.imagcons = $scope.obra.id;
        calEntity.imagimco = $scope.obra.idCodif;
        calEntity.imagano = $scope.obra.anho;
        calEntity.imagmes = $scope.obra.mes;
        calEntity.imagauto = $scope.obra.autor;
        calEntity.imagmens = $scope.obra.mensaje;
        calEntity.imagtema = $scope.obra.tema;
        calEntity.imagesta = $scope.obra.estado;
        calEntity.imaguscr = $scope.obra.usuarioCre;
        calEntity.imagfecr = $scope.obra.fechaCre;
        return calEntity;
      }

      $scope.isValidarDatosObra = function(){
        if( angular.isUndefined($scope.obra.anho) ||
        	angular.isUndefined($scope.obra.mes) ||
          angular.isUndefined($scope.obra.autor) ||
        	angular.isUndefined($scope.obra.tema) ||
          angular.isUndefined($scope.obra.archivo) ||
          $scope.obra.anho == null ||
          $scope.obra.mes == null ||
          $scope.obra.autor == null ||
          $scope.obra.tema == null ||
          $scope.obra.archivo == null ||
          $scope.obra.anho == '' ||
          $scope.obra.mes == '' ||
          $scope.obra.autor == '' ||
          $scope.obra.tema == ''
        ){
          $scope.alerts.push({msg: 'Debe llenar todos Los campos como obligatorios *'});
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

      $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
      };
}]);
