calendModController.controller('ModalControllerEventos', [
                                                        '$scope', 
                                                        '$uibModalInstance', 
                                                        'idEliminar', 
                                                        'localStorageService', 
                                                        '$location', 
                                                        '$route',
    function ($scope, $uibModalInstance, idEliminar, localStorageService, $location, $route){

          var todosInStore = localStorageService.get('eventos');

          $scope.eventos = todosInStore || [];

          $scope.$watch('eventos', function(){
              localStorageService.add('eventos', $scope.eventos);
          }, true);

          $scope.Eliminar = function () {
              for(var i = 0; i < $scope.eventos.length; i ++){
                  if($scope.eventos[i].id == idEliminar){
                      $scope.eventos[i].estado = "03";
                      break;
                  }
              }
              $location.url('/admin');
              $uibModalInstance.close();
          };

          $scope.Cancelar = function () {
              $uibModalInstance.dismiss('no');
          };
}]);