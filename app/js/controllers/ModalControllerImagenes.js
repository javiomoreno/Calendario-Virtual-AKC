calendModController.controller('ModalControllerImagenes', [
                                                          '$scope', 
                                                          '$uibModalInstance', 
                                                          'idEliminar', 
                                                          'localStorageService', 
                                                          '$location', 
                                                          '$route',
    function ($scope, $uibModalInstance, idEliminar, localStorageService, $location, $route){

          var todosInStore = localStorageService.get('imagenes');

          $scope.imagenes = todosInStore || [];

          $scope.$watch('imagenes', function(){
              localStorageService.add('imagenes', $scope.imagenes);
          }, true);

          $scope.Eliminar = function () {
              for(var i = 0; i < $scope.imagenes.length; i ++){
                  if($scope.imagenes[i].id == idEliminar){
                      $scope.imagenes.splice(i, 1);
                      break;
                  }
              }
              $location.path('/admin');
              $uibModalInstance.close();
          };

          $scope.Cancelar = function () {
              $uibModalInstance.dismiss('no');
          };
}]);