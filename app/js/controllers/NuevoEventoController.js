calendModController.controller('NuevoEventoController', [
                                                      '$scope',
                                                      '$rootScope',
                                                      '$log', 
                                                      'localStorageService',
    function ($scope, $rootScope, $log, localStorageService) {

      $scope.evento = {};
      $scope.evento.nombre = "";
      $scope.evento.tipoEvento = {};
      $scope.evento.alerta = {};
      $scope.evento.alerta.aplicaion = {};
      $scope.evento.alerta.correo = {};
      $scope.evento.iconoEvento = {};

      $rootScope.searchItems = [
        "hola",
        "chao",
        "aqui",
        "todo",
        "sirve",
        "hola chao"
      ];

      $rootScope.searchItems.sort();
      $rootScope.suggestions = [];
      $rootScope.selectedIndex = -1;

      $rootScope.search = function(){
        $rootScope.suggestions = [];
        var myMaxSuggestionLength = 0;
        for (var i = 0; i < $rootScope.searchItems.length; i++) {
          var searchItemsSmallLetters = angular.lowercase($rootScope.searchItems[i]);
          var searchTextSmallLetters = angular.lowercase($scope.searchText);
          if (searchItemsSmallLetters.indexOf(searchTextSmallLetters) !== -1) {
            $rootScope.suggestions.push(searchItemsSmallLetters);
            myMaxSuggestionLength += 1;
            if (myMaxSuggestionLength == 5) {
              break;
            }
          }
        }
      }

      $rootScope.$watch('selectedIndex', function(val){
        if (val !== -1) {
          $scope.searchText = $rootScope.suggestions[$rootScope.selectedIndex];
        }
      })

      $rootScope.checkKeyDown = function(event){
        if (event.keyCode == 40) {
          event.preventDefault();
          if ($rootScope.selectedIndex +1 !== $rootScope.suggestions.length) {
            $rootScope.selectedIndex ++;
          }
        }
        else if(event.keyCode == 38){
          event.preventDefault();
          if ($rootScope.selectedIndex -1 !== -1) {
            $rootScope.selectedIndex --;
          }
        }
        else if(event.keyCode == 13){
          event.preventDefault();
          $rootScope.suggestions = [];
        }
      }

      $rootScope.checkKeyUp = function(event){
        if(event.keyCode !== 0 || event.keyCode !== 46){
          if ($scope.searchText == "") {
            $rootScope.suggestions = [];
          }
        }
      }

      $rootScope.AssingValueAndHide = function(index){
        $scope.searchText = $rootScope.suggestions[index];
        $rootScope.suggestions = [];
      }

      $scope.vectorAlertas = [
                              {
                                id: 1,
                                value: '1 Semana'
                              },
                              { id: 2,
                                value: '1 Día'
                              },
                              {
                                id: 3,
                                value: '1 Hora'
                              },
                              {
                                id: 4,
                                value: '1 Minuto'
                              }];

      var todosInStore = localStorageService.get('imagenes');

      $scope.iconos = todosInStore || [];

      $scope.$watch('imagenes', function(){
        localStorageService.add('imagenes', $scope.iconos);
      }, true);

      $scope.vectorIconos = [];
      var cont = 0;
      for (var i = 0; i < $scope.iconos.length; i++) {
        if($scope.iconos[i].tipo == 2){
          $scope.vectorIconos[cont] = {
           id: cont,
           icono: $scope.iconos[i]
          }
          cont ++;
        }
      }

      $scope.today = function() {
          $scope.dt = new Date();
      };
      $scope.today();

      $scope.clear = function () {
          $scope.dt = null;
      };

      // Disable weekend selection
      $scope.disabled = function(date, mode) {
          return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
      };

      $scope.toggleMin = function() {
          $scope.minDate = $scope.minDate ? null : new Date();
      };
      $scope.toggleMin();
      $scope.maxDate = new Date(2020, 5, 22);

      $scope.open = function($event) {
          $scope.status.opened = true;
      };

      $scope.open2 = function($event) {
          $scope.status2.opened = true;
      };

      $scope.setDate = function(year, month, day) {
          $scope.dt = new Date(year, month, day);
      };

      $scope.dateOptions = {
          formatYear: 'yy',
          startingDay: 1
      };

      $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
      $scope.format = $scope.formats[0];

      $scope.status = {
          opened: false
      };

      $scope.status2 = {
          opened: false
      };

      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      var afterTomorrow = new Date();
      afterTomorrow.setDate(tomorrow.getDate() + 2);
      $scope.events =
          [
              {
                  date: tomorrow,
                  status: 'full'
              },
              {
                  date: afterTomorrow,
                  status: 'partially'
              }
          ];

      $scope.getDayClass = function(date, mode) {
          if (mode === 'day') {
              var dayToCheck = new Date(date).setHours(0,0,0,0);

              for (var i=0;i<$scope.events.length;i++){
                  var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                  if (dayToCheck === currentDay) {
                      return $scope.events[i].status;
                  }
              }
          }

          return '';
      };

      $scope.mytime = new Date();

      $scope.hstep = 1;
      $scope.mstep = 1;
      $scope.ismeridian = true;
}]);