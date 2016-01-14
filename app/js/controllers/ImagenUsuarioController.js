calendModController.controller('ImagenUsuarioController', ['$scope', '$routeParams', 'calendarioService',
  function ($scope, $routeParams, calendarioService) {
         var mes = $routeParams.mes;
          $scope.mes = mes;
          $scope.datos = {};
          if(mes){
            calendarioService.byMes(mes).then(function (data) {
                $scope.datos = data;
            });

            $scope.getRandomImagen = function(){
                return Math.floor((Math.random()*3)+1);
            };
          }
}]);