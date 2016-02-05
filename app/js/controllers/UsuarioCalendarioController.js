calendModController.controller('UsuarioCalendarioController', [
                                                      '$scope', 
                                                      '$compile', 
                                                      '$rootScope', 
                                                      '$routeParams', 
                                                      'calendarioService', 
                                                      'localStorageService', 
                                                      '$uibModal', 
                                                      '$uibTooltip',
                                                      'uiCalendarConfig',
                                                      'serveData',
                                                      '$timeout',
  function ($scope, $compile, $rootScope, $routeParams, calendarioService, localStorageService, $uibModal, $uibTooltip, uiCalendarConfig, serveData, $timeout){

    $scope.vista = {};
    $scope.vista.nuevo = false;
    $scope.vista.calendario = true;

    if (serveData.data.vista === "nuevo") {
        $scope.vista.nuevo = true;
        $scope.vista.calendario = false;
    };

    $scope.renderCalendar = function() {
       $timeout(function(){
            uiCalendarConfig.calendars.Calendario.fullCalendar('render');
        }, 0);
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

    $scope.checkImportancia = false;
    $scope.checkPeriodicidad = false;
    $scope.checkDescripcion = false;
    
    
    $scope.cambiarImportancia = function(){
      if($scope.checkImportancia == true){
        $scope.checkPeriodicidad = false;
        $scope.checkDescripcion = false;
      }
    }

    $scope.cambiarPeriodicidad= function(){
      if($scope.checkPeriodicidad == true){
        $scope.checkDescripcion = false;
        $scope.checkImportancia = false;
      }
    }

    $scope.cambiarDescripcion = function(){
      if($scope.checkDescripcion == true){
        $scope.checkPeriodicidad = false;
        $scope.checkImportancia = false;
      }
    }

    var vectorColores = ['#118484', '#268A25', '#8C0404']

    var todosInStore = localStorageService.get('eventos');
    $scope.eventos = todosInStore || [];

    $scope.$watch('eventos', function(){
        localStorageService.add('eventos', $scope.eventos);
    }, true);


    var todosInStore = localStorageService.get('imagenes');

    $scope.imagenes = todosInStore || [];

    $scope.$watch('imagenes', function(){
      localStorageService.add('imagenes', $scope.imagenes);
    }, true);

    $rootScope.vectorImagenes = [];
    $rootScope.vectorObras = [];
    $rootScope.vectorIconos = [];
    $rootScope.vectorIconosMes = [];
      var cont = 0;
    for (var i = 0; i < $scope.imagenes.length; i++) {
      if($scope.imagenes[i].tipo == 1){
        $rootScope.vectorImagenes[cont] = $scope.imagenes[i];
        cont ++;
      }
    }
    cont = 0;
    for (var i = 0; i < $scope.imagenes.length; i++) {
      if($scope.imagenes[i].tipo == 3){
        $rootScope.vectorObras[cont] = $scope.imagenes[i];
        cont ++;
      }
    }
    cont = 0;
    for (var i = 0; i < $scope.imagenes.length; i++) {
      if($scope.imagenes[i].tipo == 2){
        $rootScope.vectorIconos[cont] = $scope.imagenes[i];
        cont ++;
      }
    }

    $scope.buscar = function (){
      var cont = 0;
      var eventosFiltrados = [];
      uiCalendarConfig.calendars.Calendario.fullCalendar('removeEventSource', $scope.events);
      uiCalendarConfig.calendars.Calendario.fullCalendar('refetchEvents');
      if ($scope.checkImportancia) {
          angular.forEach($scope.todosEventos, function(value, key){
            if(value.importancia == $scope.busqueda.importancia.value){
              eventosFiltrados.push(value);
            }
          });
      }
      else if ($scope.checkPeriodicidad) {
        angular.forEach($scope.todosEventos, function(value, key){
          if(value.repeticion == $scope.busqueda.periodicidad.value){
            eventosFiltrados.push(value);
          }
        });
      }
      else if ($scope.checkDescripcion) {
        angular.forEach($scope.todosEventos, function(value, key){
          if(value.title.toUpperCase().search($scope.busqueda.descripcion.toUpperCase()) != -1){
            eventosFiltrados.push(value);
          }
        });
      }
      else{
        angular.forEach($scope.todosEventos, function(value, key){
            eventosFiltrados.push(value);
        });
      }
      uiCalendarConfig.calendars["Calendario"].fullCalendar('addEventSource', eventosFiltrados);
      uiCalendarConfig.calendars.Calendario.fullCalendar('refetchEvents');

      $scope.events = eventosFiltrados;
    }
    var bandera = true;

    for (var i = 0; i < $scope.eventos.length; i++) {
      if($scope.eventos[i].idUsuario === 1 && $scope.eventos[i].estado != 3){
        var idEvento = $scope.eventos[i].id;
        if ($scope.eventos[i].iconoEvento != null){
          $scope.events[contador] = {
            id: $scope.eventos[i].id,
            repeticion: $scope.eventos[i].repeticion,
            importancia: $scope.eventos[i].importancia,
            idIcono: $rootScope.vectorIconos[$scope.eventos[i].iconoEvento].id,
            icono: $rootScope.vectorIconos[$scope.eventos[i].iconoEvento].archivo,
            className: 'icono imagenIcono',
            color: vectorColores[$scope.eventos[i].importancia-1],
            title: $scope.eventos[i].nombre,
            start: new Date($scope.eventos[i].fechaInicio), // A javascript date object for when the event starts
            end: new Date($scope.eventos[i].fechaFin)
          };
          contador++;
        }
        else{
          $scope.events[contador] = {
            id: $scope.eventos[i].id,
            repeticion: $scope.eventos[i].repeticion,
            importancia: $scope.eventos[i].importancia,
            color: vectorColores[$scope.eventos[i].importancia-1],
            title: $scope.eventos[i].nombre,
            start: new Date($scope.eventos[i].fechaInicio), // A javascript date object for when the event starts
            end: new Date($scope.eventos[i].fechaFin)
          };
          contador++;
        }
        if($scope.eventos[i].repeticion == 4){
          bandera = true;
          for (var j = 1; j < 11 && bandera; j++) {
            bandera = true;
            var inicio = new Date(new Date($scope.eventos[i].fechaInicio).getFullYear() + j, new Date($scope.eventos[i].fechaInicio).getMonth(), new Date($scope.eventos[i].fechaInicio).getDate(), new Date($scope.eventos[i].fechaInicio).getHours(), new Date($scope.eventos[i].fechaInicio).getMinutes());
            var fin = new Date(new Date($scope.eventos[i].fechaFin).getFullYear() + j, new Date($scope.eventos[i].fechaFin).getMonth(), new Date($scope.eventos[i].fechaFin).getDate(), new Date($scope.eventos[i].fechaFin).getHours(), new Date($scope.eventos[i].fechaFin).getMinutes());
            if ($scope.eventos[i].estado == 2){
              if(new Date(inicio) <= new Date($scope.eventos[i].fechaFinalizacion)) {
                bandera = true;
              }
              else{
                bandera = false;
              }
            }
            if(bandera){
              if ($scope.eventos[i].iconoEvento != null){
                $scope.events[contador] = {
                  id: $scope.eventos[i].id,
                  repeticion: $scope.eventos[i].repeticion,
                  importancia: $scope.eventos[i].importancia,
                  idIcono: $rootScope.vectorIconos[$scope.eventos[i].iconoEvento].id,
                  icono: $rootScope.vectorIconos[$scope.eventos[i].iconoEvento].archivo,
                  className: 'icono imagenIcono',
                  color: vectorColores[$scope.eventos[i].importancia-1],
                  title: $scope.eventos[i].nombre,
                  start: inicio,
                  end: fin
                };
                contador++;
              }
              else{
                $scope.events[contador] = {
                  id: $scope.eventos[i].id,
                  repeticion: $scope.eventos[i].repeticion,
                  importancia: $scope.eventos[i].importancia,
                  color: vectorColores[$scope.eventos[i].importancia-1],
                  title: $scope.eventos[i].nombre,
                  start: inicio,
                  end: fin
                };
                contador++;
              }
            };
          };              
        }
        else if($scope.eventos[i].repeticion == 3){
          bandera = true;
          for (var j = 1; j < 121 && bandera; j++) {
            bandera = true;
            var inicio = new Date(new Date($scope.eventos[i].fechaInicio).getFullYear(), new Date($scope.eventos[i].fechaInicio).getMonth() + j, new Date($scope.eventos[i].fechaInicio).getDate(), new Date($scope.eventos[i].fechaInicio).getHours(), new Date($scope.eventos[i].fechaInicio).getMinutes());
            var fin = new Date(new Date($scope.eventos[i].fechaFin).getFullYear(), new Date($scope.eventos[i].fechaFin).getMonth() + j, new Date($scope.eventos[i].fechaFin).getDate(), new Date($scope.eventos[i].fechaFin).getHours(), new Date($scope.eventos[i].fechaFin).getMinutes());
            if ($scope.eventos[i].estado == 2){
              if(new Date(inicio) <= new Date($scope.eventos[i].fechaFinalizacion)) {
                bandera = true;
              }
              else{
                bandera = false;
              }
            }
            if (bandera){
              if ($scope.eventos[i].iconoEvento != null){
                  $scope.events[contador] = {
                  id: $scope.eventos[i].id,
                  repeticion: $scope.eventos[i].repeticion,
                  importancia: $scope.eventos[i].importancia,
                  idIcono: $rootScope.vectorIconos[$scope.eventos[i].iconoEvento].id,
                  icono: $rootScope.vectorIconos[$scope.eventos[i].iconoEvento].archivo,
                  className: 'icono imagenIcono',
                  color: vectorColores[$scope.eventos[i].importancia-1],
                  title: $scope.eventos[i].nombre,
                  start: inicio,
                  end: fin
                };
                contador++;
              }
              else{
                $scope.events[contador] = {
                  id: $scope.eventos[i].id,
                  repeticion: $scope.eventos[i].repeticion,
                  importancia: $scope.eventos[i].importancia,
                  color: vectorColores[$scope.eventos[i].importancia-1],
                  title: $scope.eventos[i].nombre,
                  start: inicio,
                  end: fin
                };
                contador++;
              }
            }
          };              
        }
        else if($scope.eventos[i].repeticion == 2){
          for (var j = 1; j < 521 && bandera; j++) {
            bandera = true;
            var inicio = new Date(new Date($scope.eventos[i].fechaInicio).getFullYear(), new Date($scope.eventos[i].fechaInicio).getMonth(), new Date($scope.eventos[i].fechaInicio).getDate() + (j*7), new Date($scope.eventos[i].fechaInicio).getHours(), new Date($scope.eventos[i].fechaInicio).getMinutes());
            var fin = new Date(new Date($scope.eventos[i].fechaFin).getFullYear(), new Date($scope.eventos[i].fechaFin).getMonth(), new Date($scope.eventos[i].fechaFin).getDate() + (j*7), new Date($scope.eventos[i].fechaFin).getHours(), new Date($scope.eventos[i].fechaFin).getMinutes());
            if ($scope.eventos[i].estado == 2){
              if(new Date(inicio) <= new Date($scope.eventos[i].fechaFinalizacion)) {
                bandera = true;
              }
              else{
                bandera = false;
              }
            }
            if (bandera){
              if ($scope.eventos[i].iconoEvento != null){
                  $scope.events[contador] = {
                  id: $scope.eventos[i].id,
                  repeticion: $scope.eventos[i].repeticion,
                  importancia: $scope.eventos[i].importancia,
                  idIcono: $rootScope.vectorIconos[$scope.eventos[i].iconoEvento].id,
                  icono: $rootScope.vectorIconos[$scope.eventos[i].iconoEvento].archivo,
                  className: 'icono imagenIcono',
                  color: vectorColores[$scope.eventos[i].importancia-1],
                  title: $scope.eventos[i].nombre,
                  start: inicio,
                  end: fin
                };
                contador++;
              }
              else{
                $scope.events[contador] = {
                  id: $scope.eventos[i].id,
                  repeticion: $scope.eventos[i].repeticion,
                  importancia: $scope.eventos[i].importancia,
                  color: vectorColores[$scope.eventos[i].importancia-1],
                  title: $scope.eventos[i].nombre,
                  start: inicio,
                  end: fin
                };
                contador++;
              }
            }
          };              
        }
      }
    }

    $scope.eventRender = function( event, element, view ) { 
      if(event.icono != undefined){
        element.css('background-image', "url('"+event.icono+"')");
      }
        element.attr({'uib-tooltip': (event.title +' '+formatoAMPM(new Date(event.start))),
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
                hora: formatoAMPM(new Date($scope.events[i].start)),
              };
              cont ++;
          }
        };

        showModalOpen(fechaToda, fecha, eventosLista);
    };

    $scope.eventClick = function( date, jsEvent, view){
        var evento = {};
        evento = {
          nombre: date.title,
          detalle: $scope.uiConfig.calendar.dayNamesShort[new Date(date.start).getDay()]+", "+ new Date(date.start).getDate()+" de "+$scope.uiConfig.calendar.monthNames[new Date(date.start).getMonth()]+". Hora: "+formatoAMPM(new Date(date.start))
        };
        for (var i = 0; i < $scope.eventos.length; i++) {
          if($scope.eventos[i].id == date.id){
              
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
        viewRender: function(view, element) {
          var dias = Math.floor((new Date(view.end).getTime() - new Date(view.start).getTime()) / (1000 * 60 * 60 * 24));
          if(dias == 42){ 
            var fecha = new Date(view.start).setDate(new Date(view.start).getDate() + 15);
            $rootScope.mes = new Date(fecha).getMonth();
            $rootScope.anho = new Date(fecha).getFullYear();
          }
          else{
            var fecha = new Date(view.start).setDate(new Date(view.start).getDate() + 1);
            $rootScope.mes = new Date(fecha).getMonth();
            $rootScope.anho = new Date(fecha).getFullYear();
          }
          var imagenes = [];
          var obras = [];
          var conta = 0;
          var mes = $scope.uiConfig.calendar.monthNames[$rootScope.mes].toUpperCase();

          for (var i = 0; i < $rootScope.vectorImagenes.length; i++) {
            if($rootScope.vectorImagenes[i].mes == mes && $rootScope.vectorImagenes[i].anho == $rootScope.anho){
              imagenes[conta] = $rootScope.vectorImagenes[i];
              conta ++
            }
          };
          conta = 0;
          for (var i = 0; i < $rootScope.vectorObras.length; i++) {
            if($rootScope.vectorObras[i].mes == mes && $rootScope.vectorObras[i].anho == $rootScope.anho){
              obras[conta] = $rootScope.vectorObras[i];
              conta ++
            }
          };

          $rootScope.vectorIconosMes = [];
          var contador = 0;
          var bandera = false;
          var vector = [];

          for (var i = 0; i < $scope.events.length; i++) {
            if(new Date($scope.events[i].start).getMonth() == $rootScope.mes && new Date($scope.events[i].start).getFullYear() == $rootScope.anho && $scope.events[i].icono){
              for (var j = 0; j < $rootScope.vectorIconosMes.length; j++) {
                bandera = false;
                if($rootScope.vectorIconosMes[j].idIcono == $scope.events[i].idIcono){
                  bandera = true;
                  break;
                }
              };
              if(bandera == false){
                for (var h = 0; h < $rootScope.vectorIconos.length; h++) {
                  if($rootScope.vectorIconos[h].id == $scope.events[i].idIcono){
                    var numero = h;
                    break;
                  }
                };
                $rootScope.vectorIconosMes[contador] = {
                  idIcono: $scope.events[i].idIcono,
                  iconoImagen: $rootScope.vectorIconos[numero].archivo,
                  nombre: $rootScope.vectorIconos[numero].mensaje
                };
                contador ++;
              }
            }                
          };
          $rootScope.foto = imagenes[Math.floor((Math.random()*conta))];
          $rootScope.obra = obras[Math.floor((Math.random()*conta))];

        }
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

    $scope.abrirImagenIzquierda = function(foto){
        showModalOpenFotoIzquierda(foto, 'md');
    }

    function showModalOpenFotoIzquierda(foto, size){
        $uibModal.open({
            templateUrl: 'partes/calendario/modalImagenIzquierda.html',
            size: size,
            controller: function() {
              var vm = this;
              vm.archivo = foto.archivo;
              vm.mensaje = foto.mensaje;
              vm.tema = foto.tema;
            },
            controllerAs: 'vm'
          });
    }

    $scope.abrirIObra = function(foto){
        showModalOpenObra(foto, 'lg');
    }

    function showModalOpenObra(foto, size){
        $uibModal.open({

            templateUrl: 'partes/calendario/modalObra.html',
            size: size,
            controller: function() {
              var vm = this;
              vm.archivo = foto.archivo;
              vm.tema = foto.tema;
              vm.autor = foto.autor;
              vm.mensaje = foto.mensaje;
            },
            controllerAs: 'vm'
          });
    }

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