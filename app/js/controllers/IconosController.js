calendModController.controller('IconosController', [
                                                  '$http', 
                                                  '$scope', 
                                                  '$filter', 
                                                  '$routeParams', 
                                                  'localStorageService', 
                                                  '$uibModal', 
                                                  '$location', 
                                                  '$route', 
                                                  '$rootScope',
  function ($http, $scope, $filter, $routeParams, localStorageService, $uibModal, $location, $route, $rootScope) {


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

        $scope.contador = cont;

        var id = $routeParams.idIcono;
        if(id){
          $scope.datos = [];
          for (var i = 0; i < $scope.imagenes.length; i++) {
            if($scope.imagenes[i].id == id)
            {
              $scope.datos[0] = $scope.imagenes[i];
              break;
            }
          };

          $scope.icono = $scope.datos[0];
        }

        $scope.Atras = function(){
          $location.path('/admin');
        }

        $scope.Editar = function(id){
            $location.path('/admin/icono/editar/'+id);
        };

        $scope.editarIcono = function(id){
            $location.path('/admin/icono/vista/'+id);
        };

        $scope.openModal = function (size, idEliminar)
          {
              $scope.idEliminar = idEliminar;
              var modalInstance = $uibModal.open({
                  templateUrl: 'views/administrador/imagenes/iconos/eliminar.html',
                  controller: 'ModalControllerIconos',
                  size: size,
                  resolve: {
                      idEliminar : function(){
                          return $scope.idEliminar;
                      }
                  }
              });
          }
}]);