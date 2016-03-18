calendModController.controller('AdministradorController', [
                                                        '$location',
                                                        '$timeout',
                                                        '$scope',
                                                        '$rootScope',
                                                        'calImagService',
                                                        'serveData',
    function ($location, $timeout, $scope, $rootScope, calImagService, serveData) {

        if ($rootScope.a === undefined) {
          $rootScope.a = {};
          $rootScope.a.pestanaImagenes = false;
          $rootScope.a.pestanaEventos = false;
          $rootScope.a.pestanaEventosPrivados = false;
        }
        else {
          $rootScope.a.pestanaImagenes = false;
          $rootScope.a.pestanaEventos = false;
          $rootScope.a.pestanaEventosPrivados = false;
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
