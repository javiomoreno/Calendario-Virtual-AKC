calendModController.controller('UsuarioCalendarioController', [
                                                      '$scope', 
                                                      '$compile', 
                                                      '$rootScope', 
                                                      '$routeParams', 
                                                      'localStorageService', 
                                                      '$uibModal', 
                                                      '$uibTooltip',
                                                      'uiCalendarConfig',
                                                      'serveData',
                                                      '$timeout',
                                                      'calEvenService',
  function ($scope, $compile, $rootScope, $routeParams, localStorageService, $uibModal, $uibTooltip, uiCalendarConfig, serveData, $timeout, calEvenService){

    $scope.banderaToda = false;
    $scope.vista = {};
    $scope.vista.nuevo = false;
    $scope.vista.calendario = true;

    if (serveData.data.vista === "nuevo") {
        $scope.vista.nuevo = true;
        $scope.vista.calendario = false;
        $scope.renderCalendar = function() {
           $timeout(function(){
                uiCalendarConfig.calendars.Calendario.fullCalendar('render');
            }, 0);
        };
    };


    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    var contador = 0;

    $scope.busqueda = [];
    $scope.busqueda.importancia = {}
    $scope.busqueda.periodicidad = {}
    $scope.busqueda.descripcion = ""
    $rootScope.mes = {};
    $rootScope.anho = {};
    $rootScope.foto = {};
    $rootScope.obra = {};
    $scope.eventos = [];
    $scope.events = [];
    $scope.todosEventos = [];
    $scope.alertasDia = 0;
    $scope.alertasSemana = 0;
    $scope.alertasMes = 0;
    $scope.alertasTotal = 0;

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

    var vectorColores = [];
    vectorColores[2401] = '#118484';
    vectorColores[2402] = '#268A25';
    vectorColores[2403] = '#8C0404';

    calEvenService.getAllEventosTipo(2202, y).then(
      function(dataEventos){
        for (var i = 0; i < dataEventos.length; i++) {
          if(dataEventos[i].evenesta !== 5 && dataEventos[i].evenuscr === 2){
            $scope.eventos.push(dataEventos[i]);
          }
        }
        $scope.banderaToda = true;
        var bandera = true;
        for (var i = 0; i < $scope.eventos.length; i++) {
            var idEvento = $scope.eventos[i].evencons;
            if ($scope.eventos[i].evenicon != null){
              $scope.events[contador] = {
                id: $scope.eventos[i].evencons,
                repeticion: $scope.eventos[i].evenperi,
                importancia: $scope.eventos[i].evenimpo,
                idIcono: $rootScope.vectorIconos[$scope.eventos[i].evenicon].id,
                icono: $rootScope.vectorIconos[$scope.eventos[i].evenicon].archivo,
                className: 'icono imagenIcono',
                color: vectorColores[$scope.eventos[i].evenimpo],
                title: $scope.eventos[i].evendesc,
                start: new Date($scope.eventos[i].evenfein), // A javascript date object for when the event starts
                end: new Date($scope.eventos[i].evenfefi)
              };
              contador++;
            }
            else{
              $scope.events[contador] = {
                id: $scope.eventos[i].evencons,
                repeticion: $scope.eventos[i].evenperi,
                importancia: $scope.eventos[i].evenimpo,
                color: vectorColores[$scope.eventos[i].evenimpo],
                title: $scope.eventos[i].evendesc,
                start: new Date($scope.eventos[i].evenfein), // A javascript date object for when the event starts
                end: new Date($scope.eventos[i].evenfefi)
              };
              contador++;
            }
            if($scope.eventos[i].evenperi == 2304){
              bandera = true;
              for (var j = 1; j < 11 && bandera; j++) {
                bandera = true;
                var inicio = new Date(new Date($scope.eventos[i].evenfein).getFullYear() + j, new Date($scope.eventos[i].evenfein).getMonth(), new Date($scope.eventos[i].evenfein).getDate(), new Date($scope.eventos[i].evenfein).getHours(), new Date($scope.eventos[i].evenfein).getMinutes());
                var fin = new Date(new Date($scope.eventos[i].evenfefi).getFullYear() + j, new Date($scope.eventos[i].evenfefi).getMonth(), new Date($scope.eventos[i].evenfefi).getDate(), new Date($scope.eventos[i].evenfefi).getHours(), new Date($scope.eventos[i].evenfefi).getMinutes());
                if ($scope.eventos[i].evenesta == 3){
                  if(new Date(inicio) <= new Date($scope.eventos[i].evenffin)) {
                    bandera = true;
                  }
                  else{
                    bandera = false;
                  }
                }
                if(bandera){
                  if ($scope.eventos[i].evenicon != null){
                    $scope.events[contador] = {
                      id: $scope.eventos[i].evencons,
                      repeticion: $scope.eventos[i].evenperi,
                      importancia: $scope.eventos[i].evenimpo,
                      idIcono: $rootScope.vectorIconos[$scope.eventos[i].evenicon].id,
                      icono: $rootScope.vectorIconos[$scope.eventos[i].evenicon].archivo,
                      className: 'icono imagenIcono',
                      color: vectorColores[$scope.eventos[i].evenimpo],
                      title: $scope.eventos[i].evendesc,
                      start: inicio,
                      end: fin
                    };
                    contador++;
                  }
                  else{
                    $scope.events[contador] = {
                      id: $scope.eventos[i].evencons,
                      repeticion: $scope.eventos[i].evenperi,
                      importancia: $scope.eventos[i].evenimpo,
                      color: vectorColores[$scope.eventos[i].evenimpo],
                      title: $scope.eventos[i].evendesc,
                      start: inicio,
                      end: fin
                    };
                    contador++;
                  }
                };
              };              
            }
            else if($scope.eventos[i].evenperi == 2303){
              bandera = true;
              for (var j = 1; j < 121 && bandera; j++) {
                bandera = true;
                var inicio = new Date(new Date($scope.eventos[i].evenfein).getFullYear(), new Date($scope.eventos[i].evenfein).getMonth() + j, new Date($scope.eventos[i].evenfein).getDate(), new Date($scope.eventos[i].evenfein).getHours(), new Date($scope.eventos[i].evenfein).getMinutes());
                var fin = new Date(new Date($scope.eventos[i].evenfefi).getFullYear(), new Date($scope.eventos[i].evenfefi).getMonth() + j, new Date($scope.eventos[i].evenfefi).getDate(), new Date($scope.eventos[i].evenfefi).getHours(), new Date($scope.eventos[i].evenfefi).getMinutes());
                if ($scope.eventos[i].evenesta == 3){
                  if(new Date(inicio) <= new Date($scope.eventos[i].evenffin)) {
                    bandera = true;
                  }
                  else{
                    bandera = false;
                  }
                }
                if (bandera){
                  if ($scope.eventos[i].evenicon != null){
                      $scope.events[contador] = {
                      id: $scope.eventos[i].evencons,
                      repeticion: $scope.eventos[i].evenperi,
                      importancia: $scope.eventos[i].evenimpo,
                      idIcono: $rootScope.vectorIconos[$scope.eventos[i].evenicon].id,
                      icono: $rootScope.vectorIconos[$scope.eventos[i].evenicon].archivo,
                      className: 'icono imagenIcono',
                      color: vectorColores[$scope.eventos[i].evenimpo],
                      title: $scope.eventos[i].evendesc,
                      start: inicio,
                      end: fin
                    };
                    contador++;
                  }
                  else{
                    $scope.events[contador] = {
                      id: $scope.eventos[i].evencons,
                      repeticion: $scope.eventos[i].evenperi,
                      importancia: $scope.eventos[i].evenimpo,
                      color: vectorColores[$scope.eventos[i].evenimpo],
                      title: $scope.eventos[i].evendesc,
                      start: inicio,
                      end: fin
                    };
                    contador++;
                  }
                }
              };              
            }
            else if($scope.eventos[i].evenperi == 2302){
              for (var j = 1; j < 521 && bandera; j++) {
                bandera = true;
                var inicio = new Date(new Date($scope.eventos[i].evenfein).getFullYear(), new Date($scope.eventos[i].evenfein).getMonth(), new Date($scope.eventos[i].evenfein).getDate() + (j*7), new Date($scope.eventos[i].evenfein).getHours(), new Date($scope.eventos[i].evenfein).getMinutes());
                var fin = new Date(new Date($scope.eventos[i].evenfefi).getFullYear(), new Date($scope.eventos[i].evenfefi).getMonth(), new Date($scope.eventos[i].evenfefi).getDate() + (j*7), new Date($scope.eventos[i].evenfefi).getHours(), new Date($scope.eventos[i].evenfefi).getMinutes());
                if ($scope.eventos[i].evenesta == 3){
                  if(new Date(inicio) <= new Date($scope.eventos[i].evenffin)) {
                    bandera = true;
                  }
                  else{
                    bandera = false;
                  }
                }
                if (bandera){
                  if ($scope.eventos[i].evenicon != null){
                      $scope.events[contador] = {
                      id: $scope.eventos[i].evencons,
                      repeimportanciaticion: $scope.eventos[i].evenperi,
                      importancia: $scope.eventos[i].evenimpo,
                      idIcono: $rootScope.vectorIconos[$scope.eventos[i].evenicon].id,
                      icono: $rootScope.vectorIconos[$scope.eventos[i].evenicon].archivo,
                      className: 'icono imagenIcono',
                      color: vectorColores[$scope.eventos[i].evenimpo],
                      title: $scope.eventos[i].evendesc,
                      start: inicio,
                      end: fin
                    };
                    contador++;
                  }
                  else{
                    $scope.events[contador] = {
                      id: $scope.eventos[i].evencons,
                      repeticion: $scope.eventos[i].evenperi,
                      importancia: $scope.eventos[i].evenimpo,
                      color: vectorColores[$scope.eventos[i].evenimpo],
                      title: $scope.eventos[i].evendesc,
                      start: inicio,
                      end: fin
                    };
                    contador++;
                  }
                }
              };              
            }
        }

        $scope.eventRender = function( event, element, view ) { 
          if(event.icono != undefined){
            element.css('background-image', "url('"+event.icono+"')");
          }
            element.attr({'uib-tooltip': (event.title +' \n\nHora Inicio: '+formatoAMPM(new Date(event.start))+', Hora Fin: '+formatoAMPM(new Date(event.end))),
                         'tooltip-append-to-body': true});
            $compile(element)($scope);
        };

        $scope.diaClick = function(event, element, view ){
      
            var eventosLista = [];
            var cont = 0;
            var fechaToda = new Date(event._d).setTime( new Date(event._d).getTime()+1*24*60*60*1000);
            var fecha = $scope.uiConfig.calendar.dayNames[new Date(fechaToda).getDay()];
            var bandera = false;
            fecha = fecha +" "+ new Date(fechaToda).getDate();
            fecha = fecha +" de "+ $scope.uiConfig.calendar.monthNames[new Date(fechaToda).getMonth()];
            fecha = fecha+" de "+new Date(fechaToda).getFullYear();

            for (var i = 0; i < $scope.events.length; i++) {
              var bandera = false;
              for (var j = 0; j < $scope.eventos.length; j++) {
                if($scope.eventos[j].id = $scope.events[i].id){
                  bandera = true;
                  break;
                }
              };
              if(new Date($scope.events[i].start).getDate() == new Date(fechaToda).getDate() && new Date($scope.events[i].start).getMonth() == new Date(fechaToda).getMonth() && new Date($scope.events[i].start).getFullYear() == new Date(fechaToda).getFullYear() && bandera == true){
                  eventosLista[cont] = {
                    nombre: $scope.events[i].title,
                    horaInicio: formatoAMPM(new Date($scope.events[i].start)),
                    horaFin: formatoAMPM(new Date($scope.events[i].end))
                  };
                  cont ++;
              }
            };

            showModalOpen(fechaToda, fecha, eventosLista);
        };

        $scope.eventClick = function( date, jsEvent, view){
            var evento = {};
            var inicio = formatoAMPM(new Date(date.start));
            var fin = formatoAMPM(new Date(date.end));
            evento = {
              nombre: date.title,
              detalle: $scope.uiConfig.calendar.dayNamesShort[new Date(date.start).getDay()]+", "+ new Date(date.start).getDate()+" de "+$scope.uiConfig.calendar.monthNames[new Date(date.start).getMonth()]+". Hora Inicio: "+inicio+", Hora Fin: "+fin
            };
            for (var i = 0; i < $scope.eventos.length; i++) {
              if($scope.eventos[i].evencons == date.id){
                  break;
              }
            }

            showModalOpenEvento(evento, "sm");
        };

        function showModalOpenEvento(evento, size){
          $uibModal.open({
              templateUrl: 'partes/calendario/modalEvento.html',
              size: size,
              controller: function() {
                var vm = this;
                vm.nombre = evento.nombre;
                vm.detalle = evento.detalle;
              },
              controllerAs: 'vm'
            });
        }

        function showModalOpen(date, dia, eventos){
          $uibModal.open({
            templateUrl: 'partes/usuario/modalEventosDiasUsuario.html',
            controller: ['$scope', '$uibModalInstance', 'serveData', '$location', '$route', function ($scope, $uibModalInstance, serveData, $location, $route) {
              var vm = this;
              vm.dia = dia;
              vm.eventos = eventos;

              $scope.guardarEvento = function(evento){
                serveData.data.fechaInicio = date;
                serveData.data.nombre = evento.nombre;
                serveData.data.vista = "nuevo";
                $uibModalInstance.close();
                $route.reload();
              }
            }],
            controllerAs: 'vm'
          });
        }

        $scope.uiConfig = {
          calendar:{
            monthYearFormat: 'MMMM |YYYY',
            height: 500,
            editable: true,
            header:{
              left: 'prev, next',
              center: 'title',
              right: 'month agendaWeek agendaDay'
            },
            dayClick: $scope.diaClick,
            eventClick: $scope.eventClick,
            eventRender: $scope.eventRender,
            buttonText: {
              month: 'Mes',
              week: 'Semana',
              day: 'Día'
            },
            buttonIcons: {
              prev: 'boton-izquierdo',
              next: 'boton-derecho'
            }, 
          }
        };

        $scope.uiConfig.calendar.dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        $scope.uiConfig.calendar.dayNamesShort = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
        $scope.uiConfig.calendar.monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        $scope.uiConfig.calendar.monthNamesShort = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
        $scope.eventSources = [$scope.events];

        for (var i = 0; i < $scope.events.length; i++) {
          var resta = Math.floor((new Date($scope.events[i].start) - new Date())/ (1000 * 60 * 60 * 24));
            if (resta == -1 || resta == 0) {
              if(new Date($scope.events[i].start).getDate() == new Date().getDate()){
                $scope.alertasDia ++;
              }
            }
            if (resta >= 1 && resta <= 7) {
              $scope.alertasSemana ++;
            }
            if (resta >= 7 && resta <= 28) {
              $scope.alertasMes ++;
            }
        };

        $scope.alertasTotal = $scope.alertasDia + $scope.alertasSemana + $scope.alertasMes;
        if ($scope.alertasDia != 0) {
          $rootScope.color = "pink";
        }
        else if($scope.alertasSemana != 0){
          $rootScope.color = "primary";      
        }
        else if ($scope.alertasMes !=0) {
          $rootScope.color = "success";  
        }

        $scope.todosEventos = $scope.events.slice();
      },
      function(error){
        console.log(error.statusText);
      }
    );

    function formatoAMPM(date) {
      var horas = date.getHours();
      var minutos = date.getMinutes();
      var ampm = horas >= 12 ? 'pm' : 'am';
      horas = horas % 12;
      horas = horas ? horas : 12; // the hour '0' should be '12'
      minutos = minutos < 10 ? '0'+minutos : minutos;
      var hora = horas + ':' + minutos + ' ' + ampm;
      return hora;
    }
}]);