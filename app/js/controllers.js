(function () {

    angular.module('calendario.controllers', ['ui.bootstrap', 'ui.grid', 'ui.grid.selection', 'bootstrap.fileField', 'mwl.calendar', 'ngTouch', 'ngAnimate'])
      .controller('LoginController', function($scope){

      })


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
      .controller('CalendarioController', function ($scope, $routeParams, calendarioService, moment, localStorageService, $uibModal) {

          var vm = this;

          vm.calendarView = 'month';
          vm.calendarDay = new Date();

          moment.locale('en', {
            week : {
              dow : 1 // Monday is the first day of the week
            }
          });

          vm.isCellOpen = false;

          var todosInStore = localStorageService.get('eventos');

          $scope.eventos = todosInStore || [];

          $scope.$watch('eventos', function(){
              localStorageService.add('eventos', $scope.eventos);
          }, true);


          var ev = [];
          for (var i = 0; i < $scope.eventos.length; i++) {
            ev[i] = {
              title: $scope.eventos[i].nombre,
              type: 'important',
              startsAt: new Date($scope.eventos[i].fechaInicio), // A javascript date object for when the event starts
              endsAt: new Date($scope.eventos[i].fechaFin),
              recursOn: 'year'
            };
          }

          vm.events = ev;

          function showModal(action, event) {
            $uibModal.open({
              templateUrl: 'modalContent.html',
              controller: function() {
                var vm = this;
                vm.action = action;
                vm.event = event;
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

          vm.eventClicked = function(event) {
            showModal('Clicked', event);
          };

          vm.dayClicked = function(day, dayClickedFirstRun, $event){
            console.log(day);
            var eventos = [
              {
                nombre: "Evento",
                hora: '15:30'
              },
              {
                nombre: 'Nuevo Evento',
                hora:'12:00'
              }
            ];
            var fecha = new Date(day).getDate();
            fecha = fecha +" de "+ new Date(day).getMonth();
            fecha = fecha+" de "+new Date(day).getFullYear();
            showModalOpen(fecha, eventos);
          };
/*
          vm.events = [
              {
                  title: 'My event title', // The title of the event
                  type: 'info', // The type of the event (determines its color). Can be important, warning, info, inverse, success or special
                  startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
                  endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
                  editable: false, // If edit-event-html is set and this field is explicitly set to false then dont make it editable.
                  deletable: false, // If delete-event-html is set and this field is explicitly set to false then dont make it deleteable
                  draggable: true, //Allow an event to be dragged and dropped
                  resizable: true, //Allow an event to be resizable
                  incrementsBadgeTotal: true, //If set to false then will not count towards the badge total amount on the month and year view
                  recursOn: 'year', // If set the event will recur on the given period. Valid values are year or month
                  cssClass: 'a-css-class-name' //A CSS class (or more, just separate with spaces) that will be added to the event when it is displayed on each view. Useful for marking an event as selected / active etc
              }, {
                  title: 'An event',
                  type: 'warning',
                  startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
                  endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
                  draggable: true,
                  resizable: true
              }, {
                  title: '<i class="glyphicon glyphicon-asterisk"></i> <span class="text-primary">Another event</span>, with a <i>html</i> title',
                  type: 'info',
                  startsAt: moment().subtract(1, 'day').toDate(),
                  endsAt: moment().add(5, 'days').toDate(),
                  draggable: true,
                  resizable: true
              }, {
                  title: 'This is a really long event title that occurs on every year',
                  type: 'important',
                  startsAt: moment().startOf('day').add(7, 'hours').toDate(),
                  endsAt: moment().startOf('day').add(19, 'hours').toDate(),
                  recursOn: 'year',
                  draggable: true,
                  resizable: true
              }, {
                  title: 'Este es mi Evento',
                  type: 'important',
                  startsAt: new Date(2015,10,30,1), // A javascript date object for when the event starts
                  endsAt: new Date(2015,10,30,5),
                  recursOn: 'year',
                  draggable: true,
                  resizable: true
              }
          ];*/

      })
      .controller('AdministradorController', function ($location, $scope) {

        $scope.data = [];
        $scope.holas = ["hola","chao","quetal","alo","bien"];
        $scope.holase = ["hola","chao","quetal","alo","bien"];
        $scope.level = 0;

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
      .controller('ImagenesController', function ($http, $scope, $filter, $routeParams, localStorageService, $uibModal, $location, $route, $rootScope, upload) {

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
          if(banderaAnho === "false"){
            $scope.anhos[contador] = $scope.imagenes[i].anho;
              contador++;
          }
        }

          $scope.vector = [];
          $scope.meses = ["Enero","Febrero","Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
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

              var otra = {
                  'Enero': cantEnero,
                  'Febrero': cantFebrero,
                  'Marzo': cantMarzo,
                  'Abril': cantAbril,
                  'Mayo': cantMayo,
                  'Junio': cantJunio,
                  'Julio': cantJulio,
                  'Agosto': cantAgosto,
                  'Septiembre': cantSeptiembre,
                  'Octubre': cantOctubre,
                  'Noviembre': cantNoviembre,
                  'Diciembre': cantDiciembre
              };
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
          console.log($scope.todo);
          var archivo = $scope.archivo;
          console.log(archivo);
          $scope.imagenes.push({
            id: (max+1),
            nombre: $scope.todo.nombre,
            mes: $scope.todo.mes,
            anho: $scope.todo.anho,
            tema: $scope.todo.tema,
            mensaje: $scope.todo.mensaje
          });

          upload.uploadFile(archivo, $scope.todo.nombre).then(function(res){
            console.log(res)
          })

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

        var campos = $routeParams.campos;

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
          var id = $routeParams.id;
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
      .controller('EventosController', function ($http, $scope, $filter, $routeParams, localStorageService, $uibModal, $location, $route, $timeout, $rootScope) {

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

              var otra = {
                  'Enero': cantEnero,
                  'Febrero': cantFebrero,
                  'Marzo': cantMarzo,
                  'Abril': cantAbril,
                  'Mayo': cantMayo,
                  'Junio': cantJunio,
                  'Julio': cantJulio,
                  'Agosto': cantAgosto,
                  'Septiembre': cantSeptiembre,
                  'Octubre': cantOctubre,
                  'Noviembre': cantNoviembre,
                  'Diciembre': cantDiciembre
              };
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
            
               $scope.eventos.push({
                  id: (max+1),
                  nombre: $scope.todo.nombre,
                  fechaInicio: new Date($scope.todo.fechaInicio),
                  fechaFin: new Date($scope.todo.fechaFin),
                  tipoEvento: $scope.todo.tipoEvento,
                  repeticion: $scope.todo.repeticion,
                  importancia: $scope.todo.importancia,
                  iconoEvento: $scope.todo.iconoEvento
              });

              $scope.todo = "";
              $location.url('/admin');
          };

          var campos = $routeParams.campos;

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
              var id = $routeParams.id;
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

          var idVer = $routeParams.id;
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
                  'importancia': $scope.vectorImportancia[(datos.importancia.valueOf())-1].name
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