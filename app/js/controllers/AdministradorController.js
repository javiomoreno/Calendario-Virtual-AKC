calendModController.controller('AdministradorController', [
                                                        '$location', 
                                                        '$timeout', 
                                                        '$scope', 
                                                        'calendarioService', 
    function ($location, $timeout, $scope, calendarioService) {

        $scope.opciones = [];

        calendarioService.getAllTipoImagen().then(function(data) {
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
          $location.path('/admin/fotografia/nueva');
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