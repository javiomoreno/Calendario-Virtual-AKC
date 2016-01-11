(function () {

    angular.module('calendario.controllers', ['ui.bootstrap', 'ui.grid', 'ui.grid.selection', 'ui.calendar'])

      .controller('ImagenUsuarioController', function ($scope, $routeParams, calendarioService) {
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

          
      })
      .controller('CalendarioController', function ($scope, $compile, $rootScope, $routeParams, calendarioService, localStorageService, $uibModal, uiCalendarConfig){

        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        var contador = 0;

        $rootScope.mes = {};
        $rootScope.anho = {};
        $rootScope.foto = {};

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
          if($scope.imagenes[i].tipo == 2){
            $rootScope.vectorIconos[cont] = $scope.imagenes[i];
            cont ++;
          }
        }

        $rootScope.contador = cont;

        for (var i = 0; i < $scope.eventos.length; i++) {
          if($scope.eventos[i].publicar == 1){
            var idEvento = $scope.eventos[i].id;
            if ($scope.eventos[i].iconoEvento == 3){
              $scope.events[contador] = {
                id: $scope.eventos[i].id,
                className: 'icono _0',
                color: vectorColores[$scope.eventos[i].importancia-1],
                title: $scope.eventos[i].nombre,
                start: new Date($scope.eventos[i].fechaInicio), // A javascript date object for when the event starts
                end: new Date($scope.eventos[i].fechaFin)
              };
              contador++;
            }
            else if ($scope.eventos[i].iconoEvento == 4){
              $scope.events[contador] = {
                id: $scope.eventos[i].id,
                className: 'icono _1',
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
              for (var j = 1; j < 11; j++) {
                if ($scope.eventos[i].iconoEvento == 3){
                  $scope.events[contador] = {
                    id: $scope.eventos[i].id,
                    className: 'icono _0',
                    color: vectorColores[$scope.eventos[i].importancia-1],
                    title: $scope.eventos[i].nombre,
                    start: new Date($scope.eventos[i].fechaInicio).setFullYear(new Date($scope.eventos[i].fechaInicio).getFullYear()+j), // A javascript date object for when the event starts
                    end: new Date($scope.eventos[i].fechaFin).setFullYear(new Date($scope.eventos[i].fechaFin).getFullYear()+j)
                  };
                  contador++;
                }
                else if ($scope.eventos[i].iconoEvento == 4){
                  $scope.events[contador] = {
                    id: $scope.eventos[i].id,
                    className: 'icono _1',
                    color: vectorColores[$scope.eventos[i].importancia-1],
                    title: $scope.eventos[i].nombre,
                    start: new Date($scope.eventos[i].fechaInicio).setFullYear(new Date($scope.eventos[i].fechaInicio).getFullYear()+j), // A javascript date object for when the event starts
                    end: new Date($scope.eventos[i].fechaFin).setFullYear(new Date($scope.eventos[i].fechaFin).getFullYear()+j)
                  };
                  contador++;
                }
                else{
                  $scope.events[contador] = {
                    id: $scope.eventos[i].id,
                    color: vectorColores[$scope.eventos[i].importancia-1],
                    title: $scope.eventos[i].nombre,
                    start: new Date($scope.eventos[i].fechaInicio).setFullYear(new Date($scope.eventos[i].fechaInicio).getFullYear()+j), // A javascript date object for when the event starts
                    end: new Date($scope.eventos[i].fechaFin).setFullYear(new Date($scope.eventos[i].fechaFin).getFullYear()+j)
                  };
                  contador++;
                }
              };              
            }
            else if($scope.eventos[i].repeticion == 3){
              for (var j = 1; j < 121; j++) {
                if ($scope.eventos[i].iconoEvento == 3){
                  $scope.events[contador] = {
                    id: $scope.eventos[i].id,
                    className: 'icono _0',
                    color: vectorColores[$scope.eventos[i].importancia-1],
                    title: $scope.eventos[i].nombre,
                    start: new Date($scope.eventos[i].fechaInicio).setMonth(new Date($scope.eventos[i].fechaInicio).getMonth()+j), // A javascript date object for when the event starts
                  end: new Date($scope.eventos[i].fechaFin).setMonth(new Date($scope.eventos[i].fechaFin).getMonth()+j)
                  };
                  contador++;
                }
                else if ($scope.eventos[i].iconoEvento == 4){
                  $scope.events[contador] = {
                    id: $scope.eventos[i].id,
                    className: 'icono _1',
                    color: vectorColores[$scope.eventos[i].importancia-1],
                    title: $scope.eventos[i].nombre,
                    start: new Date($scope.eventos[i].fechaInicio).setMonth(new Date($scope.eventos[i].fechaInicio).getMonth()+j), // A javascript date object for when the event starts
                  end: new Date($scope.eventos[i].fechaFin).setMonth(new Date($scope.eventos[i].fechaFin).getMonth()+j)
                  };
                  contador++;
                }
                else{
                  $scope.events[contador] = {
                    id: $scope.eventos[i].id,
                    color: vectorColores[$scope.eventos[i].importancia-1],
                    title: $scope.eventos[i].nombre,
                    start: new Date($scope.eventos[i].fechaInicio).setMonth(new Date($scope.eventos[i].fechaInicio).getMonth()+j), // A javascript date object for when the event starts
                  end: new Date($scope.eventos[i].fechaFin).setMonth(new Date($scope.eventos[i].fechaFin).getMonth()+j)
                  };
                  contador++;
                }
              };              
            }
            else if($scope.eventos[i].repeticion == 2){
              for (var j = 1; j < 521; j++) {
                if ($scope.eventos[i].iconoEvento == 3){
                  $scope.events[contador] = {
                    id: $scope.eventos[i].id,
                    className: 'icono _0',
                    color: vectorColores[$scope.eventos[i].importancia-1],
                    title: $scope.eventos[i].nombre,
                    start: new Date($scope.eventos[i].fechaInicio).setDate(new Date($scope.eventos[i].fechaInicio).getDate()+(j*7)), // A javascript date object for when the event starts
                    end: new Date($scope.eventos[i].fechaFin).setDate(new Date($scope.eventos[i].fechaFin).getDate()+(j*7))
                  };
                  contador++;
                }
                else if ($scope.eventos[i].iconoEvento == 4){
                  $scope.events[contador] = {
                    id: $scope.eventos[i].id,
                    className: 'icono _1',
                    color: vectorColores[$scope.eventos[i].importancia-1],
                    title: $scope.eventos[i].nombre,
                    start: new Date($scope.eventos[i].fechaInicio).setDate(new Date($scope.eventos[i].fechaInicio).getDate()+(j*7)), // A javascript date object for when the event starts
                    end: new Date($scope.eventos[i].fechaFin).setDate(new Date($scope.eventos[i].fechaFin).getDate()+(j*7))
                  };
                  contador++;
                }
                else{
                  $scope.events[contador] = {
                    id: $scope.eventos[i].id,
                    color: vectorColores[$scope.eventos[i].importancia-1],
                    title: $scope.eventos[i].nombre,
                    start: new Date($scope.eventos[i].fechaInicio).setDate(new Date($scope.eventos[i].fechaInicio).getDate()+(j*7)), // A javascript date object for when the event starts
                    end: new Date($scope.eventos[i].fechaFin).setDate(new Date($scope.eventos[i].fechaFin).getDate()+(j*7))
                  };
                  contador++;
                }
              };              
            }
          }
        }

        $scope.eventRender = function( event, element, view ) { 
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
              var conta = 0;
              var mes = $scope.uiConfig.calendar.monthNames[$rootScope.mes];

              for (var i = 0; i < $rootScope.vectorImagenes.length; i++) {
                if($rootScope.vectorImagenes[i].mes == mes && $rootScope.vectorImagenes[i].anho == $rootScope.anho){
                  imagenes[conta] = $rootScope.vectorImagenes[i].archivo;
                  conta ++
                }
              };

              $rootScope.vectorIconosMes = [];
              var contador = 0;
              var bandera = false;
              var vector = [];

              for (var i = 0; i < $scope.events.length; i++) {
                if(new Date($scope.events[i].start).getMonth() == $rootScope.mes && new Date($scope.events[i].start).getFullYear() == $rootScope.anho && $scope.events[i].className){
                  vector = []
                  vector = $scope.events[i].className.split(" ");
                  for (var j = 0; j < $rootScope.vectorIconosMes.length; j++) {
                    bandera = false;
                    if($rootScope.vectorIconosMes[j].clase == $scope.events[i].className){
                      bandera = true;
                      break;
                    }
                  };
                  if(bandera == false){
                    var posicion = vector[1].replace('_','');
                    $rootScope.vectorIconosMes[contador] = {
                      clase: $scope.events[i].className,
                      nombre: $rootScope.vectorIconos[posicion].mensaje
                    };
                    contador ++;
                  }
                }                
              };
              $rootScope.foto = imagenes[Math.floor((Math.random()*conta))];
            }
          }
        };

        $scope.uiConfig.calendar.dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        $scope.uiConfig.calendar.dayNamesShort = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
        $scope.uiConfig.calendar.monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        $scope.uiConfig.calendar.monthNamesShort = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
        $scope.eventSources = [$scope.events];

        $scope.abrirImagenIzquierda = function(){
            console.log("abrir imagen");
          }

      })
      .controller('AdministradorController', function ($location, $timeout, $scope, servicioBackend, allTipoImagen, calendarioService) {

        /*allTipoImagen.query().$promise.then(function(data){
          $scope.datosServicio = data;
        })
        calendarioService.all().then(function (data) {
            $scope.datosServicio = data;
        });*/

        $scope.opciones = [];

        servicioBackend.allTipoImagen()
          .then(function(data) {
            $timeout(function() {
              for (var i = 0; i < data.length; i++) {
                $scope.opciones[i] = {
                  select: i,
                  opcion: data[i].tbvalor
                }
              };
            }, 3000);
        });

        $scope.cargarValores = function(){
          $scope.opciones = $scope.opciones;
        }

        $scope.Enviar = function(data){
          console.log(data);
        }

        $scope.crearImagen = function(){
          $location.path('/admin/imagenes/nueva');
        };

        $scope.crearEvento = function(){
          $location.url('/admin/eventos/nuevo');
        };

      })
      .controller('IconosController', function ($http, $scope, $filter, $routeParams, localStorageService, $uibModal, $location, $route, $rootScope, upload) {

        var todosInStore = localStorageService.get('imagenes');

        $scope.imagenes = todosInStore || [];

        $scope.$watch('imagenes', function(){
          localStorageService.add('imagenes', $scope.imagenes);
        }, true);

        $scope.vector = [];
          var cont = 0;
        for (var i = 0; i < $scope.imagenes.length; i++) {
          if($scope.imagenes[i].tipo == 2){
            $scope.vector[cont] = $scope.imagenes[i];
            cont ++;
          }
        }

        $scope.contador = cont;

        var id = $routeParams.idIcono;
        if(id){
          $scope.datos = [];
          for (var i = 0; i < $scope.imagenes.length; i++) {
            if($scope.imagenes[i].id == id)
            {
              $scope.datos[0] = $scope.imagenes[i];
              break;
            }
          };

          $scope.icono = $scope.datos[0];
        }

        $scope.Atras = function(){
          $location.path('/admin');
        }

        $scope.Editar = function(id){
            $location.path('/admin/icono/editar/'+id);
        };

        $scope.editarIcono = function(id){
            $location.path('/admin/icono/vista/'+id);
        };

        $scope.openModal = function (size, idEliminar)
          {
              $scope.idEliminar = idEliminar;
              var modalInstance = $uibModal.open({
                  templateUrl: 'views/administrador/imagenes/iconos/eliminar.html',
                  controller: 'ModalControllerIconos',
                  size: size,
                  resolve: {
                      idEliminar : function(){
                          return $scope.idEliminar;
                      }
                  }
              });
          }
          
      })
      .controller('ImagenesController', function ($http, $scope, $timeout, $filter, $routeParams, servicioBackend, localStorageService, $uibModal, $location, $route, $rootScope) {

        $scope.opciones = [];

        servicioBackend.allTipoImagen()
          .then(function(data) {
            $timeout(function() {
              for (var i = 0; i < data.length; i++) {
                $scope.opciones[i] = {
                  select: i,
                  opcion: data[i].tbvalor
                }
              };
            }, 2000);
        });

        var todosInStore = localStorageService.get('imagenes');

        $scope.imagenes = todosInStore || [];

        $scope.$watch('imagenes', function(){
          localStorageService.add('imagenes', $scope.imagenes);
        }, true);

        $scope.anhos = [];
          var contador = 0;
        var banderaAnho = "false";
        for (var i = 0; i < $scope.imagenes.length; i++) {
          banderaAnho = "false";
          for (var j = 0; j < $scope.anhos.length; j++) {
            if($scope.anhos[j] === $scope.imagenes[i].anho){
              banderaAnho = "true";
              break;
            }
          }
          if(banderaAnho === "false" && $scope.imagenes[i].tipo == '1'){
            $scope.anhos[contador] = $scope.imagenes[i].anho;
              contador++;
          }
        }

          $scope.vector = [];
          var cantEnero;
          var cantFebrero;
          var cantMarzo;
          var cantAbril;
          var cantMayo;
          var cantJunio;
          var cantJulio;
          var cantAgosto;
          var cantSeptiembre;
          var cantOctubre;
          var cantNoviembre;
          var cantDiciembre;
          for(var i = 0; i < $scope.anhos.length; i++){
              cantEnero = 0;
              cantFebrero = 0;
              cantMarzo = 0;
              cantAbril = 0;
              cantMayo = 0;
              cantJunio = 0;
              cantJulio = 0;
              cantAgosto = 0;
              cantSeptiembre = 0;
              cantOctubre = 0;
              cantNoviembre = 0;
              cantDiciembre = 0;
              for (var j = 0; j < $scope.imagenes.length; j++) {
                  if($scope.anhos[i] == $scope.imagenes[j].anho){
                      if($scope.imagenes[j].mes == "Enero"){ cantEnero ++;}
                      if($scope.imagenes[j].mes == "Febrero"){ cantFebrero ++;}
                      if($scope.imagenes[j].mes == "Marzo"){ cantMarzo ++;}
                      if($scope.imagenes[j].mes == "Abril"){ cantAbril ++;}
                      if($scope.imagenes[j].mes == "Mayo"){ cantMayo ++;}
                      if($scope.imagenes[j].mes == "Junio"){ cantJunio ++;}
                      if($scope.imagenes[j].mes == "Julio"){ cantJulio ++;}
                      if($scope.imagenes[j].mes == "Agosto"){ cantAgosto ++;}
                      if($scope.imagenes[j].mes == "Septiembre"){ cantSeptiembre ++;}
                      if($scope.imagenes[j].mes == "Octubre"){ cantOctubre ++;}
                      if($scope.imagenes[j].mes == "Noviembre"){ cantNoviembre ++;}
                      if($scope.imagenes[j].mes == "Diciembre"){ cantDiciembre ++;}
                  }
              }

              var otra = [
                  {
                    mes: 'Enero',
                    cant: cantEnero
                  },
                  {
                    mes: 'Febrero',
                    cant: cantFebrero
                  },
                  {
                    mes: 'Marzo',
                    cant: cantMarzo
                  },
                  {
                    mes: 'Abril',
                    cant: cantAbril
                  },
                  {
                    mes: 'Mayo',
                    cant: cantMayo
                  },
                  {
                    mes: 'Junio',
                    cant: cantJunio,
                  },
                  {
                    mes: 'Julio',
                    cant: cantJulio
                  },
                  {
                    mes: 'Agosto',
                    cant: cantAgosto
                  },
                  {
                    mes: 'Septiembre',
                    cant: cantSeptiembre
                  },
                  {
                    mes: 'Octubre',
                    cant: cantOctubre
                  },
                  {
                    mes: 'Noviembre',
                    cant: cantNoviembre,
                  },
                  {
                    mes: 'Diciembre',
                    cant: cantDiciembre
                  }                  
              ];
              $scope.vector[i] = {
                  'anho': $scope.anhos[i],
                  'meses': otra
              };
          }

        $scope.guardarImagen = function(nueva){
            var max = 0;
            for(var i = 0; i< $scope.imagenes.length; i ++){
                if($scope.imagenes[i].id > max){
                    max = $scope.imagenes[i].id;
                }
            }
          $scope.todo = nueva;
          $scope.imagenes.push({
            id: (max+1),
            tipo: '1',
            mes: $scope.todo.mes,
            anho: $scope.todo.anho,
            tema: $scope.todo.tema,
            mensaje: $scope.todo.mensaje,
            archivo: $scope.todo.archivo
          });

          $scope.todo = "";
          $location.url('/admin');
          //$route.reload();
        };

        $scope.guardarIcono = function(nueva){
            var max = 0;
            for(var i = 0; i< $scope.imagenes.length; i ++){
                if($scope.imagenes[i].id > max){
                    max = $scope.imagenes[i].id;
                }
            }
          $scope.todo = nueva;
          $scope.imagenes.push({
            id: (max+1),
            tipo: '2',
            mes: null,
            anho: null,
            tema: null,
            mensaje: $scope.todo.fuente,
            archivo: $scope.todo.archivo
          });

          $scope.todo = "";
          $location.url('/admin');
          //$route.reload();
        };

        $scope.editarImagen = function(id){
          $location.path('/admin/imagen/vista/'+id);
        };

        $scope.Editar = function(id){
            $location.path('/admin/imagen/editar/'+id);
        }

        var campos = $routeParams.camposImagen;

        if(campos){
            var vector = [];
            var contador = 0;
            vector = campos.split('-');
            $scope.anho = vector[0];
            $scope.mes = vector[1];

            $scope.todos = [];

            for(var i = 0; i <$scope.imagenes.length; i ++) {
                if ($scope.imagenes[i].anho == $scope.anho && $scope.imagenes[i].mes == $scope.mes) {
                    $scope.todos[contador] = $scope.imagenes[i];
                    contador ++;
                }
            }
        }
        else{
          var id = $routeParams.idImagen;
          $scope.datos = [];
          for (var i = 0; i < $scope.imagenes.length; i++) {
            if($scope.imagenes[i].id == id)
            {
              $scope.datos[0] = $scope.imagenes[i];
              break;
            }
          };

          $scope.imagen = $scope.datos[0];
        }

        $scope.animationsEnabled = true;

        $scope.openModal = function (size, idEliminar) {
          $scope.idEliminar = idEliminar;

          var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/administrador/imagenes/eliminar.html',
            controller: 'ModalControllerImagenes',
            size: size,
            resolve: {
                idEliminar : function(){
                    return $scope.idEliminar;
                }
            }
          });
        };

      })
      .controller('ModalControllerImagenes', function ($scope, $uibModalInstance, idEliminar, localStorageService, $location, $route){

          var todosInStore = localStorageService.get('imagenes');

          $scope.imagenes = todosInStore || [];

          $scope.$watch('imagenes', function(){
              localStorageService.add('imagenes', $scope.imagenes);
          }, true);

          $scope.Eliminar = function () {
              for(var i = 0; i < $scope.imagenes.length; i ++){
                  if($scope.imagenes[i].id == idEliminar){
                      $scope.imagenes.splice(i, 1);
                      break;
                  }
              }
              $location.path('/admin');
              $uibModalInstance.close();
          };

          $scope.Cancelar = function () {
              $uibModalInstance.dismiss('no');
          };

      })
      .controller('ModalControllerIconos', function ($scope, $uibModalInstance, idEliminar, localStorageService, $location, $route){

          var todosInStore = localStorageService.get('imagenes');

          $scope.imagenes = todosInStore || [];

          $scope.$watch('imagenes', function(){
              localStorageService.add('imagenes', $scope.imagenes);
          }, true);

          $scope.Eliminar = function () {
              for(var i = 0; i < $scope.imagenes.length; i ++){
                  if($scope.imagenes[i].id == idEliminar){
                      $scope.imagenes.splice(i, 1);
                      break;
                  }
              }
              $location.path('/admin');
              $uibModalInstance.close();
          };

          $scope.Cancelar = function () {
              $uibModalInstance.dismiss('no');
          };

      })
      .controller('ModalControllerEventos', function ($scope, $uibModalInstance, idEliminar, localStorageService, $location, $route){

          var todosInStore = localStorageService.get('eventos');

          $scope.eventos = todosInStore || [];

          $scope.$watch('eventos', function(){
              localStorageService.add('eventos', $scope.eventos);
          }, true);

          $scope.Eliminar = function () {
              for(var i = 0; i < $scope.eventos.length; i ++){
                  if($scope.eventos[i].id == idEliminar){
                      $scope.eventos.splice(i, 1);
                      break;
                  }
              }
              $location.url('/admin');
              $uibModalInstance.close();
          };

          $scope.Cancelar = function () {
              $uibModalInstance.dismiss('no');
          };

      })
      .controller('EventosController', function ($http, $scope, $filter, $routeParams, allTipoEvento, servicioBackend, localStorageService, $uibModal, $location, $route, $timeout, $rootScope) {

        servicioBackend.allTipoEvento()
          .then(function (data) {
            $scope.datos = data;
            console.log($scope.datos)
        });
        
        /*
        $scope.opciones = [];

        for (var i = 0; i < $scope.datos.length; i++) {
          $scope.opciones[i] = {
            id: i,
            opcion: $scope.datos[i].tbvalor
          }
        }*/

        

        /*allTipoEvento.query(function(data) {
          $rootScope.opciones = data;
          console.log($rootScope.opciones)
        });*/

          var todosInStore = localStorageService.get('eventos');

          $scope.eventos = todosInStore || [];

          $scope.$watch('eventos', function(){
              localStorageService.add('eventos', $scope.eventos);
          }, true);




          $scope.anhos = [];
          var contador = 0;
          var banderaAnho = "false";
          for (var i = 0; i < $scope.eventos.length; i++) {
              banderaAnho = "false";
              for (var j = 0; j < $scope.anhos.length; j++) {
                  if($scope.anhos[j] == new Date($scope.eventos[i].fechaInicio).getFullYear()){
                      banderaAnho = "true";
                      break;
                  }
              }
              if(banderaAnho == "false"){
                  $scope.anhos[contador] = new Date($scope.eventos[i].fechaInicio).getFullYear();
                  contador ++;
              }
          }

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

          $scope.contador = cont;

          $scope.vector = [];
          var cantEnero;
          var cantFebrero;
          var cantMarzo;
          var cantAbril;
          var cantMayo;
          var cantJunio;
          var cantJulio;
          var cantAgosto;
          var cantSeptiembre;
          var cantOctubre;
          var cantNoviembre;
          var cantDiciembre;
          for(var i = 0; i < $scope.anhos.length; i++){
              cantEnero = 0;
              cantFebrero = 0;
              cantMarzo = 0;
              cantAbril = 0;
              cantMayo = 0;
              cantJunio = 0;
              cantJulio = 0;
              cantAgosto = 0;
              cantSeptiembre = 0;
              cantOctubre = 0;
              cantNoviembre = 0;
              cantDiciembre = 0;
              for (var j = 0; j < $scope.eventos.length; j++) {
                  if($scope.anhos[i] == new Date($scope.eventos[j].fechaInicio).getFullYear()){
                      if(new Date($scope.eventos[j].fechaInicio).getMonth() == 0){ cantEnero ++;}
                      if(new Date($scope.eventos[j].fechaInicio).getMonth() == 1){ cantFebrero ++;}
                      if(new Date($scope.eventos[j].fechaInicio).getMonth() == 2){ cantMarzo ++;}
                      if(new Date($scope.eventos[j].fechaInicio).getMonth() == 3){ cantAbril ++;}
                      if(new Date($scope.eventos[j].fechaInicio).getMonth() == 4){ cantMayo ++;}
                      if(new Date($scope.eventos[j].fechaInicio).getMonth() == 5){ cantJunio ++;}
                      if(new Date($scope.eventos[j].fechaInicio).getMonth() == 6){ cantJulio ++;}
                      if(new Date($scope.eventos[j].fechaInicio).getMonth() == 7){ cantAgosto ++;}
                      if(new Date($scope.eventos[j].fechaInicio).getMonth() == 8){ cantSeptiembre ++;}
                      if(new Date($scope.eventos[j].fechaInicio).getMonth() == 9){ cantOctubre ++;}
                      if(new Date($scope.eventos[j].fechaInicio).getMonth() == 10){ cantNoviembre ++;}
                      if(new Date($scope.eventos[j].fechaInicio).getMonth() == 11){ cantDiciembre ++;}
                  }
              }

              var otra = [
                  {
                    mes: 'Enero',
                    cant: cantEnero
                  },
                  {
                    mes: 'Febrero',
                    cant: cantFebrero
                  },
                  {
                    mes: 'Marzo',
                    cant: cantMarzo
                  },
                  {
                    mes: 'Abril',
                    cant: cantAbril
                  },
                  {
                    mes: 'Mayo',
                    cant: cantMayo
                  },
                  {
                    mes: 'Junio',
                    cant: cantJunio,
                  },
                  {
                    mes: 'Julio',
                    cant: cantJulio
                  },
                  {
                    mes: 'Agosto',
                    cant: cantAgosto
                  },
                  {
                    mes: 'Septiembre',
                    cant: cantSeptiembre
                  },
                  {
                    mes: 'Octubre',
                    cant: cantOctubre
                  },
                  {
                    mes: 'Noviembre',
                    cant: cantNoviembre,
                  },
                  {
                    mes: 'Diciembre',
                    cant: cantDiciembre
                  }                  
              ];
              $scope.vector[i] = {
                  'anho': $scope.anhos[i],
                  'meses': otra
              };
          }

          $scope.vectorRepeticion = [
                  {id: '1', name: 'Diario'},
                  {id: '2', name: 'Semanal'},
                  {id: '3', name: 'Mensual'},
                  {id: '4', name: 'Anual'}
              ];

          $scope.vectorImportancia = [
              {id: '1', name: 'Baja'},
              {id: '2', name: 'Media'},
              {id: '3', name: 'Alta'},
          ];

          $scope.vectorTipoEvento = [
              {id: '1', name: 'Publico'},
              {id: '2', name: 'Privado'}
          ];

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
              var fechaF = new Date($scope.todo.fechaFin).setHours(new Date($scope.todo.horaFin).getHours());
              fechaF = new Date(fechaF).setMinutes(new Date($scope.todo.horaFin).getMinutes());
              $scope.todo.fechaFin = fechaF;
              var publicar = '2';
              if($scope.todo.tipoEvento == 1){
                publicar = '1';
              }
            
              $scope.eventos.push({
                  id: (max+1),
                  nombre: $scope.todo.nombre,
                  fechaInicio: new Date($scope.todo.fechaInicio),
                  fechaFin: new Date($scope.todo.fechaFin),
                  tipoEvento: $scope.todo.tipoEvento,
                  repeticion: $scope.todo.repeticion,
                  importancia: $scope.todo.importancia,
                  publicar: publicar,
                  iconoEvento: $scope.todo.icono
              });

              /*Publicar Evento en Google Calendar*/
              /*
                  URL postUrl = new URL("http://www.google.com/calendar/feeds/javiomoreno@gmail.com/private/full");
                  EventEntry myEntry = new EventEntry();

                  myEntry.setTitle(new PlainTextConstruct("TITULO DEL EVENTO"));
                  myEntry.setContent(new PlainTextConstruct("DESCRIPCION DEL EVENTO"));

                  Person author = new Person("Javier Moreno", null, "javiomoreno@gmail.com");
                  myEntry.getAuthors().add(author);

                  DateTime startTime = DateTime.parseDateTime(new Date($scope.todo.fechaInicio),);
                  DateTime endTime = DateTime.parseDateTime(new Date($scope.todo.fechaFin),);
                  When eventTimes = new When();
                  eventTimes.setStartTime(startTime);
                  eventTimes.setEndTime(endTime);
                  myEntry.addTime(eventTimes);
                  myEntry.

                  myEntry.addLocation(new Where("","","Sant Feliu de Codines, Carrer Fonteta"));

                  CalendarService myService = new CalendarService("gdata-WordGoogleCalendarTest");
                  myService.setUserCredentials("javiomoreno", "Elchuta19");

                  // Send the request and receive the response:
                  EventEntry insertedEntry = myService.insert(postUrl, myEntry);
                  //Fin Agregar Evento*/

              $scope.todo = "";
              $location.url('/admin');
          };

          var campos = $routeParams.camposEvento;

          if(campos){
              var vector = [];
              var contador = 0;
              vector = campos.split('-');
              $scope.anho = vector[0];
              $scope.mes = vector[1];
              var meses = ["Enero", "Febrero","Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

              $scope.todos = [];

              for(var i = 0; i <$scope.eventos.length; i ++) {
                  if (new Date($scope.eventos[i].fechaInicio).getFullYear() == $scope.anho && meses[(new Date($scope.eventos[i].fechaInicio).getMonth()).valueOf()] == $scope.mes) {
                      $scope.todos[contador] = $scope.eventos[i];
                      contador ++;
                  }
              }

              $scope.gridOptions = {
                  enableColumnMenus: false,
                  enableFiltering: true,
                  enableRowSelection: true,
                  rowTemplate: rowTemplate(),
                  columnDefs: [
                      {field: 'id', visible: false},
                      {field: 'nombre', displayName: 'Nombre'},
                      {field: 'fechaInicio', displayName: 'Fecha Inicio'},
                      {field: 'fechaFin', displayName: 'Fecha Fin'},
                      {field: 'repeticion', displayName: 'Periodicidad'},
                      {field: 'tipoEvento', displayName: 'Tipo de Evento'},
                      {field: 'importancia', displayName: 'Importancia'}
                  ]
              };

              var datos = [];
              for(var i = 0; i < $scope.todos.length; i ++){
                  datos[i] = {
                      'id': $scope.todos[i].id,
                      'nombre': $scope.todos[i].nombre,
                      'fechaInicio': new Date($scope.todos[i].fechaInicio).getDate()+"/"+((new Date($scope.todos[i].fechaInicio).getMonth().valueOf())+1)+"/"+new Date($scope.todos[i].fechaInicio).getFullYear(),
                      'fechaFin': new Date($scope.todos[i].fechaFin).getDate()+"/"+((new Date($scope.todos[i].fechaFin).getMonth().valueOf())+1)+"/"+new Date($scope.todos[i].fechaFin).getFullYear(),
                      'repeticion': $scope.vectorRepeticion[($scope.todos[i].repeticion.valueOf())-1].name,
                      'tipoEvento': $scope.vectorTipoEvento[($scope.todos[i].tipoEvento.valueOf())-1].name,
                      'importancia': $scope.vectorImportancia[($scope.todos[i].importancia.valueOf())-1].name
                  }
              }

              $scope.gridOptions.data = datos;
          }
          else{
              var id = $routeParams.idEvento;
              $scope.datos = [];
              for (var i = 0; i < $scope.eventos.length; i++) {
                  if($scope.eventos[i].id == id)
                  {
                      $scope.datos[0] = $scope.eventos[i];
                      break;Evento
                  }
              };

              $scope.todos = $scope.datos[0];
              $scope.evento = $scope.datos[0];
          }


          $scope.Atras = function(){
              $location.path('/admin/eventos');
          }

          $scope.Editar = function(id){
              $location.path('/admin/evento/editar/'+id);
          }

          $scope.editarEvento = function(id){
              $location.path('/admin/evento/vista/'+id);
          }

          function rowTemplate() {
              return '<div ng-dblclick="grid.appScope.rowDblClick(row)" >' +
                  '  <div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }"  ui-grid-cell></div>' +
                  '</div>';
          }

          $scope.rowDblClick = function(row) {
              $location.url('/admin/evento/vista/'+row.entity.id);
          };

          var idVer = $routeParams.idEvento;
          if(idVer){
            var datos = {};
              $scope.eventoDatos = {};

              for(var i = 0; i <$scope.eventos.length; i ++){
                  if($scope.eventos[i].id == idVer){
                      datos = $scope.eventos[i];
                      break;
                  }
              }

              for (var i = 0; i < $scope.vectorIconos.length; i++) {
                if($scope.vectorIconos[i].id == datos.iconoEvento){
                  var icono = $scope.vectorIconos[i].icono.archivo;
                }
              };
              $scope.eventoDatos = {
                  'id': datos.id,
                  'nombre': datos.nombre,
                  'fechaInicio': new Date(datos.fechaInicio).getDate()+"/"+((new Date(datos.fechaInicio).getMonth().valueOf())+1)+"/"+new Date(datos.fechaInicio).getFullYear(),
                  'fechaFin': new Date(datos.fechaFin).getDate()+"/"+((new Date(datos.fechaFin).getMonth().valueOf())+1)+"/"+new Date(datos.fechaFin).getFullYear(),
                  'repeticion': $scope.vectorRepeticion[(datos.repeticion.valueOf())-1].name,
                  'tipoEvento': $scope.vectorTipoEvento[(datos.tipoEvento.valueOf())-1].name,
                  'importancia': $scope.vectorImportancia[(datos.importancia.valueOf())-1].name,
                  'iconoEvento': icono
              }
          }

          $scope.openModal = function (size, idEliminar)
          {
              $scope.idEliminar = idEliminar;
              var modalInstance = $uibModal.open({
                  templateUrl: 'views/administrador/eventos/eliminar.html',
                  controller: 'ModalControllerEventos',
                  size: size,
                  resolve: {
                      idEliminar : function(){
                          return $scope.idEliminar;
                      }
                  }
              });
          }

      })
      .controller('EventosPrivadosController', function ($http, $scope, $filter, $routeParams, localStorageService, $uibModal, $location, $route, $timeout, $rootScope) {

          var todosInStore = localStorageService.get('eventos');

          $scope.eventos = todosInStore || [];

          $scope.$watch('eventos', function(){
              localStorageService.add('eventos', $scope.eventos);
          }, true);


          $scope.anhos = [];
          var contador = 0;
          var banderaAnho = "false";
          for (var i = 0; i < $scope.eventos.length; i++) {
              banderaAnho = "false";
              for (var j = 0; j < $scope.anhos.length; j++) {
                  if($scope.anhos[j] == new Date($scope.eventos[i].fechaInicio).getFullYear()){
                      banderaAnho = "true";
                      break;
                  }
              }
              if(banderaAnho == "false"){
                  $scope.anhos[contador] = new Date($scope.eventos[i].fechaInicio).getFullYear();
                  contador ++;
              }
          }

          $scope.vector = [];
          $scope.meses = ["Enero", "Febrero","Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
          var cantEnero;
          var cantFebrero;
          var cantMarzo;
          var cantAbril;
          var cantMayo;
          var cantJunio;
          var cantJulio;
          var cantAgosto;
          var cantSeptiembre;
          var cantOctubre;
          var cantNoviembre;
          var cantDiciembre;
          for(var i = 0; i < $scope.anhos.length; i++){
              cantEnero = 0;
              cantFebrero = 0;
              cantMarzo = 0;
              cantAbril = 0;
              cantMayo = 0;
              cantJunio = 0;
              cantJulio = 0;
              cantAgosto = 0;
              cantSeptiembre = 0;
              cantOctubre = 0;
              cantNoviembre = 0;
              cantDiciembre = 0;
              for (var j = 0; j < $scope.eventos.length; j++) {
                  if($scope.anhos[i] == new Date($scope.eventos[j].fechaInicio).getFullYear() && $scope.eventos[j].tipoEvento == 2){
                      if(new Date($scope.eventos[j].fechaInicio).getMonth() == 0){ cantEnero ++;}
                      if(new Date($scope.eventos[j].fechaInicio).getMonth() == 1){ cantFebrero ++;}
                      if(new Date($scope.eventos[j].fechaInicio).getMonth() == 2){ cantMarzo ++;}
                      if(new Date($scope.eventos[j].fechaInicio).getMonth() == 3){ cantAbril ++;}
                      if(new Date($scope.eventos[j].fechaInicio).getMonth() == 4){ cantMayo ++;}
                      if(new Date($scope.eventos[j].fechaInicio).getMonth() == 5){ cantJunio ++;}
                      if(new Date($scope.eventos[j].fechaInicio).getMonth() == 6){ cantJulio ++;}
                      if(new Date($scope.eventos[j].fechaInicio).getMonth() == 7){ cantAgosto ++;}
                      if(new Date($scope.eventos[j].fechaInicio).getMonth() == 8){ cantSeptiembre ++;}
                      if(new Date($scope.eventos[j].fechaInicio).getMonth() == 9){ cantOctubre ++;}
                      if(new Date($scope.eventos[j].fechaInicio).getMonth() == 10){ cantNoviembre ++;}
                      if(new Date($scope.eventos[j].fechaInicio).getMonth() == 11){ cantDiciembre ++;}
                  }
              }

              var otra = [
                  {
                    mes: 'Enero',
                    cant: cantEnero
                  },
                  {
                    mes: 'Febrero',
                    cant: cantFebrero
                  },
                  {
                    mes: 'Marzo',
                    cant: cantMarzo
                  },
                  {
                    mes: 'Abril',
                    cant: cantAbril
                  },
                  {
                    mes: 'Mayo',
                    cant: cantMayo
                  },
                  {
                    mes: 'Junio',
                    cant: cantJunio,
                  },
                  {
                    mes: 'Julio',
                    cant: cantJulio
                  },
                  {
                    mes: 'Agosto',
                    cant: cantAgosto
                  },
                  {
                    mes: 'Septiembre',
                    cant: cantSeptiembre
                  },
                  {
                    mes: 'Octubre',
                    cant: cantOctubre
                  },
                  {
                    mes: 'Noviembre',
                    cant: cantNoviembre,
                  },
                  {
                    mes: 'Diciembre',
                    cant: cantDiciembre
                  }                  
              ];

              var numero = 0;
              if(cantEnero + cantFebrero + cantMarzo + cantAbril + cantMayo + cantJunio + cantJulio + cantAgosto + cantSeptiembre + cantOctubre + cantNoviembre + cantDiciembre == 0){
                numero = 0;
              }
              else{
                numero = 1;
              }
              $scope.vector[i] = {
                  'anho': $scope.anhos[i],
                  'numero': numero,
                  'meses': otra
              };
          }

          $scope.vectorRepeticion = [
                  {id: '1', name: 'Diario'},
                  {id: '2', name: 'Semanal'},
                  {id: '3', name: 'Mensual'},
                  {id: '4', name: 'Anual'}
              ];

          $scope.vectorImportancia = [
              {id: '1', name: 'Baja'},
              {id: '2', name: 'Media'},
              {id: '3', name: 'Alta'},
          ];

          $scope.vectorTipoEvento = [
              {id: '1', name: 'Publico'},
              {id: '2', name: 'Privado'}
          ];

          $scope.vectorPublicar = [
              {id: '1', name: 'Publicar'},
              {id: '2', name: 'No Publicar'}
          ];

          var campos = $routeParams.camposEventoPrivado;

          if(campos){
              var vector = [];
              var contador = 0;
              vector = campos.split('-');
              $scope.anho = vector[0];
              $scope.mes = vector[1];
              var meses = ["Enero", "Febrero","Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

              $scope.todos = [];

              for(var i = 0; i <$scope.eventos.length; i ++) {
                  if (new Date($scope.eventos[i].fechaInicio).getFullYear() == $scope.anho && meses[(new Date($scope.eventos[i].fechaInicio).getMonth()).valueOf()] == $scope.mes && $scope.eventos[i].tipoEvento == 2) {
                      $scope.todos[contador] = $scope.eventos[i];
                      contador ++;
                  }
              }

              $scope.gridOptions = {
                  enableColumnMenus: false,
                  enableFiltering: true,
                  enableRowSelection: true,
                  rowTemplate: rowTemplate(),
                  columnDefs: [
                      {field: 'id', visible: false},
                      {field: 'nombre', displayName: 'Nombre'},
                      {field: 'fechaInicio', displayName: 'Fecha Inicio'},
                      {field: 'fechaFin', displayName: 'Fecha Fin'},
                      {field: 'repeticion', displayName: 'Periodicidad'},
                      {field: 'tipoEvento', displayName: 'Tipo de Evento'},
                      {field: 'importancia', displayName: 'Importancia'},
                      {field: 'publicar', displayName: 'Publicar'}
                  ]
              };

              var datos = [];
              for(var i = 0; i < $scope.todos.length; i ++){
                  datos[i] = {
                      'id': $scope.todos[i].id,
                      'nombre': $scope.todos[i].nombre,
                      'fechaInicio': new Date($scope.todos[i].fechaInicio).getDate()+"/"+((new Date($scope.todos[i].fechaInicio).getMonth().valueOf())+1)+"/"+new Date($scope.todos[i].fechaInicio).getFullYear(),
                      'fechaFin': new Date($scope.todos[i].fechaFin).getDate()+"/"+((new Date($scope.todos[i].fechaFin).getMonth().valueOf())+1)+"/"+new Date($scope.todos[i].fechaFin).getFullYear(),
                      'repeticion': $scope.vectorRepeticion[($scope.todos[i].repeticion.valueOf())-1].name,
                      'tipoEvento': $scope.vectorTipoEvento[($scope.todos[i].tipoEvento.valueOf())-1].name,
                      'importancia': $scope.vectorImportancia[($scope.todos[i].importancia.valueOf())-1].name,
                      'publicar': $scope.vectorPublicar[($scope.todos[i].publicar.valueOf())-1].name
                  }
              }

              $scope.gridOptions.data = datos;
          }
          else{
              var id = $routeParams.idEventoPrivado;
              $scope.datos = [];
              for (var i = 0; i < $scope.eventos.length; i++) {
                  if($scope.eventos[i].id == id)
                  {
                      $scope.datos[0] = $scope.eventos[i];
                      break;
                  }
              };

              $scope.todos = $scope.datos[0];
              $scope.evento = $scope.datos[0];
          }

          $scope.Editar = function(id){
              $location.path('/admin/evento/editar/'+id);
          }

          $scope.editarEvento = function(id){
              $location.path('/admin/eventoPrivado/vista/'+id);
          }

          function rowTemplate() {
              return '<div ng-dblclick="grid.appScope.rowDblClick(row)" >' +
                  '  <div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }"  ui-grid-cell></div>' +
                  '</div>';
          }

          $scope.rowDblClick = function(row) {
              $location.url('/admin/eventoPrivado/vista/'+row.entity.id);
          };

          var idVer = $routeParams.idEventoPrivado;
          if(idVer){
            var datos = {};
              $scope.eventoDatos = {};

              for(var i = 0; i <$scope.eventos.length; i ++){
                  if($scope.eventos[i].id == idVer){
                      datos = $scope.eventos[i];
                      break;
                  }
              }
              $scope.eventoDatos = {
                  'id': datos.id,
                  'nombre': datos.nombre,
                  'fechaInicio': new Date(datos.fechaInicio).getDate()+"/"+((new Date(datos.fechaInicio).getMonth().valueOf())+1)+"/"+new Date(datos.fechaInicio).getFullYear(),
                  'fechaFin': new Date(datos.fechaFin).getDate()+"/"+((new Date(datos.fechaFin).getMonth().valueOf())+1)+"/"+new Date(datos.fechaFin).getFullYear(),
                  'repeticion': $scope.vectorRepeticion[(datos.repeticion.valueOf())-1].name,
                  'tipoEvento': $scope.vectorTipoEvento[(datos.tipoEvento.valueOf())-1].name,
                  'importancia': $scope.vectorImportancia[(datos.importancia.valueOf())-1].name,
                  'publicar': $scope.vectorPublicar[(datos.publicar.valueOf())-1].name
              }
              if(datos.publicar == 1){
                $scope.checkboxModel = {
                   value : true
                 };
              }
              else{
                $scope.checkboxModel = {
                   value : false
                 };
              }
          }

          $scope.cambiar = function(idCambiar) {
              openCambiar('sm', idCambiar);
          }

          function openCambiar(size, idCambiar) {
              $scope.idCambiar = idCambiar;
              var modalInstance = $uibModal.open({
                  templateUrl: 'views/administrador/eventos-privados/cambiar-tipo.html',
                  controller: 'CambiarTipoModalController',
                  size: size,
                  resolve: {
                      idCambiar : function(){
                          return $scope.idCambiar;
                      }
                  }
              });
          }

      })
      .controller('CambiarTipoModalController', function ($scope, $uibModalInstance, idCambiar, localStorageService, $location, $route){
          var todosInStore = localStorageService.get('eventos');

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
                      break;
                  }
              }
              $location.url('/admin');
              $uibModalInstance.close();
          };

          $scope.Cancelar = function () {
              $uibModalInstance.dismiss('no');
          };

      })
      .controller('NuevoEventoController', function ($scope, $log) {
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

      });
})();