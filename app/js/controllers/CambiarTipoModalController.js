calendModController.controller('CambiarTipoModalController', [
                                                            '$scope', 
                                                            '$uibModalInstance', 
                                                            'idCambiar', 
                                                            'localStorageService', 
                                                            '$location', 
                                                            '$route',
    function ($scope, $uibModalInstance, idCambiar, localStorageService, $location, $route){
          var todosInStore = localStorageService.get('eventos');

          $scope.eventos = todosInStore || [];

          $scope.$watch('eventos', function(){
              localStorageService.add('eventos', $scope.eventos);
          }, true);

          $scope.Cambiar = function () {
              for(var i = 0; i < $scope.eventos.length; i ++){
                  if($scope.eventos[i].id == idCambiar){
                      if($scope.eventos[i].publicar == 1){
                        $scope.eventos[i].publicar = 2;
                      }
                      else{
                        $scope.eventos[i].publicar = 1;
                      }
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