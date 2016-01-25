calendModController.controller('CambiarTipoModalController', [
                                                            '$scope', 
                                                            '$uibModalInstance', 
                                                            'idCambiar', 
                                                            'localStorageService', 
                                                            '$location', 
                                                            '$route',
    function ($scope, $uibModalInstance, idCambiar, localStorageService, $location, $route){
          var todosInStore = localStorageService.get('eventos');
          var anho, mes;
          var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

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
                      anho = new Date($scope.eventos[i].fechaInicio).getFullYear();
                      mes = meses[new Date($scope.eventos[i].fechaInicio).getMonth().valueOf()];
                      break;
                  }
              }
              $location.url('/admin/eventoPrivado/'+anho+"-"+mes);
              $uibModalInstance.close();
          };

          $scope.Cancelar = function () {
              $uibModalInstance.dismiss('no');
          };
}]);