calendModController.controller('IconosCrearController', [
                                                  '$scope', 
                                                  'localStorageService', 
                                                  '$location', 
                                                  '$rootScope',
  function ($scope, localStorageService, $location, $rootScope) {


        $scope.icono = {};
        $scope.icono.mensaje = "";
        $scope.icono.archivo = null;

        var todosInStore = localStorageService.get('imagenes');

        $scope.imagenes = todosInStore || [];

        $scope.$watch('imagenes', function(){
          localStorageService.add('imagenes', $scope.imagenes);
        }, true);

        $scope.vector = [];
          var cont = 0;
        for (var i = 0; i < $scope.imagenes.length; i++) {
          if($scope.imagenes[i].tipo == 2){
            $scope.vector[cont] = $scope.imagenes[i];
            cont ++;
          }
        }

        $scope.guardarIcono = function(nueva){
            var max = 0;
            for(var i = 0; i< $scope.imagenes.length; i ++){
                if($scope.imagenes[i].id > max){
                    max = $scope.imagenes[i].id;
                }
            }
          $scope.todo = nueva;
          $scope.imagenes.push({
            id: (max+1),
            tipo: '2',
            mes: null,
            anho: null,
            tema: null,
            autor: null,
            mensaje: $scope.todo.mensaje,
            archivo: $scope.todo.archivo
          });

          $scope.todo = "";
          $location.path('/admin/icono/vista/'+(max+1));
        };

        $scope.Atras = function(){
          $location.path('/admin');
          $rootScope.vista = "icono";
        }
}]);