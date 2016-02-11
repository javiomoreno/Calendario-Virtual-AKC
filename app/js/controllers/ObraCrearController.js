calendModController.controller('ObraCrearController', [
                                                '$scope', 
                                                '$location', 
                                                'calImagService',
    function ($scope, $location, calImagService) {

        $scope.obra = {};
        $scope.obra.mes = {};
        $scope.obra.anho = {},
        $scope.obra.tema = "";
        $scope.obra.autor = "";
        $scope.obra.mensaje = "";
        $scope.obra.archivo = null;

        $scope.vecMeses = [];
        $scope.vecAnhos = [];

        calImagService.getAllMeses().then(function(data) {
            for (var i = 0; i < data.length; i++) {
              $scope.vecMeses[i] = {
                id: i,
                opcion: data[i].tbclave+" - "+data[i].tbvalor,
                value: data[i].tbclave,
                value: data[i].tbnumero
              }
            };
        });

        calImagService.getAllAnhos().then(function(data) {
            for (var i = 0; i < data.length; i++) {
              $scope.vecAnhos[i] = {
                id: i,
                opcion: data[i].tbvalor,
                value: data[i].tbnumero
              }
            };
        });

        $scope.guardarObra = function(){
        	if($scope.isValidarDatosObra()){
            var imagenCodif = $scope.buildImagenCodif();
            calImagService.guardarImagenCodificada(imagenCodif).then(
              function(result){
                var obra = $scope.buildObra(result.id);
                calImagService.guardarImagen(obra).then(
                  function(resultObra){
                    console.log("guardo");
                    $location.path('/admin/obra/vista/'+resultObra.id);
                  },
                  function(error){
                    console.log("Obra: ",error.statusText);
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
          calEntity.imcotipo = 2103;
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
