calendModController.controller('CalendarioController', [
                                                      '$scope', 
                                                      '$compile', 
                                                      '$rootScope', 
                                                      '$routeParams', 
                                                      'calendarioService', 
                                                      'localStorageService', 
                                                      '$uibModal', 
                                                      'uiCalendarConfig',

  function ($scope, $compile, $rootScope, $routeParams, calendarioService, localStorageService, $uibModal, uiCalendarConfig){

        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        var contador = 0;

        $rootScope.mes = {};
        $rootScope.anho = {};
        $rootScope.foto = {};
        $rootScope.obra = {};

        var vectorColores = ['#118484', '#268A25', '#8C0404']

        $scope.eventSources = [];
        $scope.events = [];

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

        $rootScope.contador = cont;

        console.log($scope.eventos)

        var bandera = true;

        for (var i = 0; i < $scope.eventos.length; i++) {
          if($scope.eventos[i].publicar == 1 && $scope.eventos[i].estado != 3){
            var idEvento = $scope.eventos[i].id;
            if ($scope.eventos[i].iconoEvento != undefined){
              $scope.events[contador] = {
                id: $scope.eventos[i].id,
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
                  if(new Date(inicio) < new Date($scope.eventos[i].fechaFinalizacion)) {
                    bandera = true;
                  }
                  else{
                    bandera = false;
                  }
                }
                if(bandera){
                  if ($scope.eventos[i].iconoEvento != undefined){
                    $scope.events[contador] = {
                      id: $scope.eventos[i].id,
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
                  if(new Date(inicio) < new Date($scope.eventos[i].fechaFinalizacion)) {
                    bandera = true;
                  }
                  else{
                    bandera = false;
                  }
                }
                if (bandera){
                  if ($scope.eventos[i].iconoEvento != undefined){
                      $scope.events[contador] = {
                      id: $scope.eventos[i].id,
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
                  if(new Date(inicio) < new Date($scope.eventos[i].fechaFinalizacion)) {
                    bandera = true;
                  }
                  else{
                    bandera = false;
                  }
                }
                if (bandera){
                  if ($scope.eventos[i].iconoEvento != undefined){
                      $scope.events[contador] = {
                      id: $scope.eventos[i].id,
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
            element.attr({'tooltip': (event.title +' '+new Date(event.start).getHours() +':'+(new Date(event.start).getMinutes()<10?'0':'') + new Date(event.start).getMinutes() ),
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
                    hora: new Date($scope.events[i].start).getHours()+":"+new Date($scope.events[i].start).getMinutes(),
                  };
                  cont ++;
              }
            };

            showModalOpen(fecha, eventosLista);
        };

        $scope.eventClick = function( date, jsEvent, view){
            var evento = {};
            evento = {
              nombre: date.title,
              detalle: $scope.uiConfig.calendar.dayNamesShort[new Date(date.start).getDay()]+", "+ new Date(date.start).getDate()+" de "+$scope.uiConfig.calendar.monthNames[new Date(date.start).getMonth()]+". Hora: "+new Date(date.start).getHours()+":"+(new Date(date.start).getMinutes()<10?'0':'') + new Date(date.start).getMinutes()
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
              templateUrl: 'views/calendario/evento.html',
              size: size,
              controller: function() {
                var vm = this;
                vm.nombre = evento.nombre;
                vm.detalle = evento.detalle;
              },
              controllerAs: 'vm'
            });
        }

        function showModalOpen(dia, eventos){
            $uibModal.open({
              templateUrl: 'views/calendario/eventos-dia.html',
              controller: function() {
                var vm = this;
                vm.dia = dia;
                vm.eventos = eventos;
              },
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
              console.log($rootScope.vectorIconosMes)
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

        $scope.abrirImagenIzquierda = function(foto){
            showModalOpenFotoIzquierda(foto, 'md');
        }

        function showModalOpenFotoIzquierda(foto, size){
            $uibModal.open({
                templateUrl: 'partes/calendario/imagen-izquierda.html',
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
                templateUrl: 'partes/calendario/obra.html',
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
}]);