///////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////// APLICACIONES EXPUESTAS ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
var appExpuestas = angular.module('AppExp', 
                                [
                                  'ngRoute',
                                  'LocalStorageModule',
                                  'ngResource',
                                  //DEPENDENCIA BOOTSTRAP
                                  'ui.bootstrap', 
                                  //DEPENDENCIAS UI-GRID
                                  'ui.grid', 
                                  'ui.grid.selection', 
                                  'ui.calendar',
                                  // MODULES CHECKLIST
                                  'checklist-model',
                                  // MODULES CALENDARIO VIRTUAL                                  
                                  'calendModules'
                                ]);

appExpuestas.config(['localStorageServiceProvider', function(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('ls');
}]);

appExpuestas.constant('baseURL', 'http://pruebas.akc.co:8089/appexp/servlet/');

