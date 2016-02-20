calendModController.controller('AdministradorController', [
                                                        '$location', 
                                                        '$timeout', 
                                                        '$scope', 
                                                        'calImagService', 
                                                        'serveData',
    function ($location, $timeout, $scope, calImagService, serveData) {

        $scope.vista = serveData.data.vista;

        $scope.opciones = [];

        calImagService.getAllTipoImagen().then(function(data) {
          for (var i = 0; i < data.length; i++) {
            $scope.opciones[i] = {
              opcion: data[i].tbclave+" - "+data[i].tbvalor,
              value: data[i].tbclave
            }
          };
        });

        $scope.cargarValores = function(){
          $scope.opciones = $scope.opciones;
        }

        $scope.Enviar = function(data){
          console.log(data);
        }

        $scope.crearImagen = function(){
          $location.path('/admin/fotografias/nueva');
        };

        $scope.crearObra = function(){
          $location.url('/admin/obras/nueva');
        };

        $scope.crearIcono = function(){
          $location.url('/admin/iconos/nuevo');
        };

        $scope.crearEvento = function(){
          $location.url('/admin/eventos/nuevo');
        };

}]);