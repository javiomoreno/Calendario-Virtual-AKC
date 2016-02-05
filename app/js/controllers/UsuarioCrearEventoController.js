calendModController.controller('UsuarioCrearEventoController', [
                                                      '$scope',
                                                      '$rootScope',
                                                      '$log', 
                                                      'localStorageService',
                                                      'calendarioService',
                                                      '$location',
                                                      'serveData',
                                                      '$route',
    function ($scope, $rootScope, $log, localStorageService, calendarioService, $location, serveData, $route) {
      
      $scope.evento = {};
      $scope.evento.nombre = {};
      $scope.evento.fechaInicio = {};
      $scope.evento.horaInicio = new Date().setHours(0,0,0);
      $scope.evento.horaFin = $scope.evento.horaInicio;
      $scope.evento.repeticion = '';
      $scope.evento.importancia = '';
      $scope.evento.alerta = {};
      $scope.evento.alerta.aplicaion = {};
      $scope.evento.invitados = [];

      if (serveData.data.vista === "nuevo") {
        $scope.evento.nombre = serveData.data.nombre;
        $scope.evento.fechaInicio = serveData.data.fechaInicio;
      }
      else{
        $scope.evento.nombre = "";
        $scope.evento.fechaInicio = "";
      }

      $scope.vecRepeticion= [];
      $scope.vecImportancia= [];

      $rootScope.vecInvitados = [
                      "Juan Crisostomo Falcon", 
                      "Juan Vicente Gomez",
                      "Isaias Medina Angarita", 
                      "Romulo Gallegos", 
                      "Hugo Rafael Chavez Frias",
                      "Leopoldo Lopez",
                      "Javier Moreno",
                      "Maria Zambrano"
                    ];

      calendarioService.getAllRepeticion().then(function (data) {
        for (var i = 0; i < data.length; i++) {
          $scope.vecRepeticion[i] = {
            select: i,
            opcion: data[i].tbclave+" - "+data[i].tbvalor,
            value: data[i].tbclave
          }
        };
      });

      calendarioService.getAllImportancia().then(function (data) {
        for (var i = 0; i < data.length; i++) {
          $scope.vecImportancia[i] = {
            select: i,
            opcion: data[i].tbclave+" - "+data[i].tbvalor,
            value: data[i].tbclave
          }
        };
      });

      /*calendarioService.getAllInvitados().then(function (data) {
        for (var i = 0; i < data.length; i++) {
          $scope.vecInvitados[i] = {
            id: data[i].id,
            nombre: data[i].nombre
          }
        };
      });*/

      $rootScope.vecInvitados.sort();
      $rootScope.suggestions = [];
      $rootScope.selectedIndex = -1;

      $rootScope.search = function(){
        $rootScope.suggestions = [];
        var myMaxSuggestionLength = 0;
        for (var i = 0; i < $rootScope.vecInvitados.length; i++) {
          var searchItemsSmallLetters = angular.lowercase($rootScope.vecInvitados[i]);
          var searchTextSmallLetters = angular.lowercase($scope.buscarTexto);
          if (searchItemsSmallLetters.indexOf(searchTextSmallLetters) !== -1) {
            $rootScope.suggestions.push($rootScope.vecInvitados[i]);
            myMaxSuggestionLength += 1;
            if (myMaxSuggestionLength == 5) {
              break;
            }
          }
        }
      }

      $rootScope.$watch('selectedIndex', function(val){
        if (val !== -1) {
          $scope.buscarTexto = $rootScope.suggestions[$rootScope.selectedIndex];
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
          if ($rootScope.selectedIndex !== -1) {
            $scope.buscarTexto = "";
            $scope.evento.invitados.push($rootScope.suggestions[$rootScope.selectedIndex]);
            $rootScope.suggestions = [];
            console.log($scope.evento.invitados);
          }
        }
      }

      $rootScope.checkKeyUp = function(event){
        if(event.keyCode !== 8 || event.keyCode !== 46){
          if ($scope.buscarTexto == "") {
            $rootScope.suggestions = [];
          }
        }
      }

      $rootScope.AssingValueAndHide = function(index){
        $scope.buscarTexto = "";
        $scope.evento.invitados.push($rootScope.suggestions[index]);
        $rootScope.suggestions = [];
        console.log($scope.evento.invitados);
      }

      $rootScope.EliminarInvitado = function(index){
        $scope.evento.invitados.splice(index, 1);
      }

      $scope.vectorAlertas = [{
                                id: 1,
                                value: '1 Semana Antes'
                              },
                              { id: 2,
                                value: '1 Día Antes'
                              },
                              {
                                id: 3,
                                value: '1 Hora Antes'
                              },
                              {
                                id: 4,
                                value: '1 Minuto Antes'
                              }];

      var todosInStore = localStorageService.get('imagenes');

      $scope.iconos = todosInStore || [];

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

      var todosInStore = localStorageService.get('eventos');

          $scope.eventos = todosInStore || [];

          $scope.$watch('eventos', function(){
              localStorageService.add('eventos', $scope.eventos);
          }, true);

      $scope.guardarEvento = function(nuevo){
          var max = 0;
          for(var i = 0; i< $scope.eventos.length; i ++){
              if($scope.eventos[i].id > max){
                  max = $scope.eventos[i].id;
              }
          }

          $scope.todo = nuevo;
          var fechaI = new Date($scope.todo.fechaInicio).setHours(new Date($scope.todo.horaInicio).getHours());
          fechaI = new Date(fechaI).setMinutes(new Date($scope.todo.horaInicio).getMinutes());
          $scope.todo.fechaInicio = fechaI;
          var fechaF = new Date($scope.todo.fechaInicio).setHours(new Date($scope.todo.horaFin).getHours());
          fechaF = new Date(fechaF).setMinutes(new Date($scope.todo.horaFin).getMinutes());

        
          $scope.eventos.push({
              id: (max+1),
              idUsuario: 1,
              nombre: $scope.todo.nombre,
              fechaInicio: new Date($scope.todo.fechaInicio),
              fechaFin: new Date(fechaF),
              tipoEvento: 2,
              repeticion: $scope.todo.repeticion,
              importancia: $scope.todo.importancia,
              publicar: 2,
              estado: '1',
              iconoEvento: null
          });

          $rootScope.vista = "evento";
          serveData.data.vista = "calendario";
          $scope.todo = "";
          $location.url('/usuario/calendario');
          //$route.reload();
      };
}]);