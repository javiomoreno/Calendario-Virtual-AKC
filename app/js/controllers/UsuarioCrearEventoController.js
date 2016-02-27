calendModController.controller('UsuarioCrearEventoController', [
                                                      '$scope',
                                                      '$rootScope',
                                                      '$log', 
                                                      'localStorageService',
                                                      '$location',
                                                      'serveData',
                                                      '$route',
                                                      'calEvenService',
    function ($scope, $rootScope, $log, localStorageService, $location, serveData, $route, calEvenService) {
      
      $scope.evento = {};
      $scope.evento.nombre = {};
      $scope.evento.fechaInicio = {};
      $scope.evento.horaInicio = new Date().setHours(0,0,0);
      $scope.evento.horaFin = $scope.evento.horaInicio;
      $scope.evento.repeticion = '';
      $scope.evento.importancia = '';
      $scope.evento.alerta = {};
      $scope.evento.alerta.aplicacion = {};
      $scope.evento.invitados = [];

      $scope.vectorAlertas = [];
      $rootScope.vecInvitados = []

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

      calEvenService.getAllRepeticion().then(function (data) {
        for (var i = 0; i < data.length; i++) {
          $scope.vecRepeticion[i] = {
            select: i,
            opcion: data[i].tbclave+" - "+data[i].tbvalor,
            value: data[i].tbnumero
          }
        };
      });

      calEvenService.getAllImportancia().then(function (data) {
        for (var i = 0; i < data.length; i++) {
          $scope.vecImportancia[i] = {
            select: i,
            opcion: data[i].tbclave+" - "+data[i].tbvalor,
            value: data[i].tbnumero
          }
        };
      });

      calEvenService.getAllAlertas().then(
        function (dataAlertas) {
          for (var i = 0; i < dataAlertas.length; i++) {
            $scope.vectorAlertas.push({
              id: dataAlertas[i].tbnumero,
              value: dataAlertas[i].tbvalor
            });
          };
        },
        function(error){
            console.log(error.statusText);
        }
      );

      calEvenService.getAllInvitados().then(
        function (dataInvitados) {
          for (var i = 0; i < dataInvitados.length; i++) {
            $rootScope.vecInvitados.push(dataInvitados[i]);
          };
          $scope.banInvitados = true;
      });

      $rootScope.suggestions = [];
      $rootScope.selectedIndex = -1;

      $rootScope.search = function(){
        $rootScope.suggestions = [];
        var myMaxSuggestionLength = 0;
        for (var i = 0; i < $rootScope.vecInvitados.length; i++) {
          var searchItemsSmallLetters = angular.lowercase($rootScope.vecInvitados[i].NOMBRE);
          var searchTextSmallLetters = angular.lowercase($scope.buscarTexto);
          if (searchItemsSmallLetters.indexOf(searchTextSmallLetters) !== -1) {
            $rootScope.suggestions.push({
              id: $rootScope.vecInvitados[i].USUACONS,
              nombre: $rootScope.vecInvitados[i].NOMBRE+" <"+$rootScope.vecInvitados[i].USUAMAIL+">"
            });
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
          var banderaAdentro = false;
          if ($rootScope.selectedIndex !== -1) {
            $scope.buscarTexto = "";
            if($scope.evento.invitados.length === 0){
              $scope.evento.invitados.push({
                id: $rootScope.suggestions[$rootScope.selectedIndex].id,
                nombre: $rootScope.suggestions[$rootScope.selectedIndex].nombre.split("<")[0]
              });
            }
            else{
              for (var i = 0; i < $scope.evento.invitados.length; i++) {
                if ($scope.evento.invitados[i] === $rootScope.suggestions[$rootScope.selectedIndex].nombre.split("<")[0]) {
                  banderaAdentro = true;
                  break;
                }
              }
              if (!banderaAdentro) {
                $scope.evento.invitados.push({
                  id: $rootScope.suggestions[$rootScope.selectedIndex].id,
                  nombre: $rootScope.suggestions[$rootScope.selectedIndex].nombre.split("<")[0]
                });
              }
            }
            $rootScope.suggestions = [];
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
        var banderaAdentro = false;
        if($scope.evento.invitados.length === 0){
          $scope.evento.invitados.push({
            id: $rootScope.suggestions[index].id,
            nombre: $rootScope.suggestions[index].nombre.split("<")[0]
          });
        }
        else{
          for (var i = 0; i < $scope.evento.invitados.length; i++) {
            if ($scope.evento.invitados[i] === $rootScope.suggestions[index].nombre.split("<")[0]) {
              banderaAdentro = true;
              break;
            }
          }
          if (!banderaAdentro) {
            $scope.evento.invitados.push({
              id: $rootScope.suggestions[index].id,
              nombre: $rootScope.suggestions[index].nombre.split("<")[0]
            });
          }
        }
        $rootScope.suggestions = [];
      }

      $rootScope.EliminarInvitado = function(index){
        $scope.evento.invitados.splice(index, 1);
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

      $scope.guardarEvento = function(){
        if($scope.isValidarDatosEvento()){
          $scope.bandera = false;          
          var evento = $scope.buildEvento();
          calEvenService.guardarEvento(evento).then(
            function(resultEvento){
              var banderaApli = false;
              var banderaInvi = false;
              if ($scope.evento.alerta.aplicacion.length > 0) {
                for (var i = 0; i < $scope.evento.alerta.aplicacion.length; i++) {
                  var notificacion = $scope.buildNotificacionAplicacion(resultEvento.ID, i);
                  calEvenService.guardarNotificacion(notificacion).then(
                    function(resultNotificacionAplicacion){
                      if (i === $scope.evento.alerta.aplicacion.length) {
                        banderaApli = true;
                      }
                      if (banderaApli && banderaInvi) {
                        serveData.data.vista = "calendario";
                        $route.reload();
                      }
                    },
                    function(error){
                      console.log("Notificacion aplicacion: ",error.statusText);
                    });
                }
              }
              else{
                banderaApli = true;
              }
              if ($scope.evento.invitados.length > 0) {
                for (var h = 0; h < $scope.evento.invitados.length; h++) {
                  var invitado = $scope.buildInvitado(resultEvento.ID, h);
                  calEvenService.guardarInvitado(invitado).then(
                    function(resultInvitado){
                      if (h === $scope.evento.invitados.length) {
                        banderaInvi = true;
                      }
                      if (banderaApli && banderaInvi) {
                        serveData.data.vista = "calendario";
                        $route.reload();
                      }
                    },
                    function(error){
                      console.log("Invitado: ",error.statusText);
                    });
                }
              }
              else{
                banderaInvi = true;
              }
              if (banderaApli && banderaInvi) {
                serveData.data.vista = "calendario";
                $route.reload();
              }

            },
            function(error){
              console.log("Evento: ",error.statusText);
            }
          ); 
        }  
        else{
          console.log("debe llenar todos los campos")
        }
      };

      function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      }

      $scope.buildNotificacionAplicacion = function(idEvento, posicion){
        var calEntity = {};
        calEntity.evnocons = -1;        
        calEntity.evnoeven = idEvento;
        calEntity.evnofech = new Date($scope.evento.fechaInicio);
        calEntity.evnotipo = 2801;
        calEntity.evnoaler = $scope.evento.alerta.aplicacion[posicion];
        calEntity.evnoesta = 2;
        calEntity.evnodesc = null;
        calEntity.evnouscr = 2;
        calEntity.evnofecr = null;
        return calEntity;
      }

      $scope.buildInvitado = function(idEvento, posicion){
        var calEntity = {};
        calEntity.evincons = -1;        
        calEntity.evineven = idEvento;
        calEntity.evinusua = $scope.evento.invitados[posicion].id;
        calEntity.evinnomb = $scope.evento.invitados[posicion].nombre;
        return calEntity;
      }

      $scope.buildEvento = function(){
        if (!isNumber($scope.evento.iconoEvento)) {
          $scope.evento.iconoEvento = null;
        };
        var fechaI = new Date($scope.evento.fechaInicio).setHours(new Date($scope.evento.horaInicio).getHours());
        fechaI = new Date(fechaI).setMinutes(new Date($scope.evento.horaInicio).getMinutes());
        $scope.evento.fechaInicio = fechaI;
        var fechaF = new Date($scope.evento.fechaInicio).setHours(new Date($scope.evento.horaFin).getHours());
        fechaF = new Date(fechaF).setMinutes(new Date($scope.evento.horaFin).getMinutes());

        var calEntity = {};
        calEntity.evencons = -1;        
        calEntity.evendesc = $scope.evento.nombre;        
        calEntity.evenfein = new Date(fechaI);
        calEntity.evenfefi = new Date(fechaF);
        calEntity.evenimpo = $scope.evento.importancia;
        calEntity.evenperi = $scope.evento.repeticion;
        calEntity.evenicon = null;   
        calEntity.evenuscr = 2;   
        calEntity.evenesta = 2;   
        calEntity.evenvibu = 2;   
        calEntity.evenffin = null;   
        calEntity.eventipo = 2202;   
        return calEntity;
      }

      $scope.isValidarDatosEvento = function(){
        $scope.evento.fechaFin = $scope.evento.fechaInicio;
        if( angular.isUndefined($scope.evento.nombre) ||
          angular.isUndefined($scope.evento.fechaInicio) ||
          angular.isUndefined($scope.evento.horaInicio) ||
          angular.isUndefined($scope.evento.fechaFin) ||
          angular.isUndefined($scope.evento.horaFin) ||
          angular.isUndefined($scope.evento.importancia) ||
          angular.isUndefined($scope.evento.repeticion) ||
          $scope.evento.nombre == null ||
          $scope.evento.fechaInicio == null ||
          $scope.evento.horaInicio == null ||
          $scope.evento.fechaFin == null ||
          $scope.evento.horaFin == null ||
          $scope.evento.importancia == null ||
          $scope.evento.repeticion == null ||
          $scope.evento.nombre == '' ||
          $scope.evento.fechaInicio == '' ||
          $scope.evento.horaInicio == '' ||
          $scope.evento.fechaFin == '' ||
          $scope.evento.horaFin == '' ||
          $scope.evento.importancia == '' ||
          $scope.evento.repeticion == ''
        ){
          return false;
        }
        else{
          return true;
        }
      }
}]);