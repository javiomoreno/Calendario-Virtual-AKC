(function () {

  angular.module('calendario.directives', [])
    .directive('menuAdmin', function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/menu-admin.html'
      };
    })

    .directive('submenuAdmin', function () {
      return {
        restrict: 'E',
        templateUrl: 'partes/administrador/submenu-admin.html'
      };
    });

 })();