calendModController.controller('EventoEditarController', [
                                                      '$scope',
                                                      '$rootScope',
                                                      '$routeParams',
                                                      '$log',
                                                      'localStorageService',
                                                      'calEvenService',
                                                      '$location',
                                                      'calImagService',
    function ($scope, $rootScope, $routeParams, $log, localStorageService, calEvenService, $location, calImagService) {

      $scope.eventoId = $routeParams.idEvento;

      $scope.banAlertas = false;
      $scope.banIconos = false;
      $scope.evento = {};
      $scope.evento.nombre = "";
      $scope.evento.tipoEvento = {};
      $scope.evento.importancia = {};
      $scope.evento.repeticion = {};
      $scope.evento.fechaInicio = '';
      $scope.evento.fechaFin = '';
      $scope.evento.horaInicio = new Date().setHours(0,00,00);
      $scope.evento.horaFin = new Date().setHours(0,00,00);
      $scope.evento.iconoEvento = {};
      $scope.alertasCorreo = [];
      $scope.alertasAplicacion = [];
      $scope.invitadosBD = [];

      $scope.vecTipoEvento = [];
      $scope.vecRepeticion= [];
      $scope.vecImportancia= [];

      $rootScope.vecInvitados = [];
      $scope.vectorAlertas = [];


      calEvenService.getAllInvitados().then(
        function (dataInvitados) {
          for (var i = 0; i < dataInvitados.length; i++) {
            $rootScope.vecInvitados.push(dataInvitados[i]);
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
          $scope.banAlertas = true;
        },
        function(error){
            console.log(error.statusText);
        }
      );


      calEvenService.getAllTipoEvento().then(
        function (data) {
          for (var i = 0; i < data.length; i++) {
            $scope.vecTipoEvento[i] = {
              select: i,
              opcion: data[i].tbclave+" - "+data[i].tbvalor,
              value: data[i].tbnumero
            }
          }
        },
        function(error){
            console.log(error.statusText);
        }
      );

      calEvenService.getAllRepeticion().then(
        function (data) {
          for (var i = 0; i < data.length; i++) {
            $scope.vecRepeticion[i] = {
              select: i,
              opcion: data[i].tbclave+" - "+data[i].tbvalor,
              value: data[i].tbnumero
            }
          };
      });

      calEvenService.getAllImportancia().then(
        function (data) {
          for (var i = 0; i < data.length; i++) {
            $scope.vecImportancia[i] = {
              select: i,
              opcion: data[i].tbclave+" - "+data[i].tbvalor,
              value: data[i].tbnumero
            }
          };
        }
      );

      calEvenService.getEventoId($scope.eventoId).then(
        function(dataEvento){
          $scope.evento = {
            id: dataEvento[0].CAL_EVENTOS.evencons,
            nombre: dataEvento[0].CAL_EVENTOS.evendesc,
            fechaInicio: dataEvento[0].CAL_EVENTOS.evenfein,
            horaInicio: dataEvento[0].CAL_EVENTOS.evenfein,
            fechaFin: dataEvento[0].CAL_EVENTOS.evenfefi,
            horaFin: dataEvento[0].CAL_EVENTOS.evenfefi,
            importancia: dataEvento[0].CAL_EVENTOS.evenimpo,
            iconoEvento: dataEvento[0].CAL_EVENTOS.evenicon,
            repeticion: dataEvento[0].CAL_EVENTOS.evenperi,
            tipoEvento: dataEvento[0].CAL_EVENTOS.eventipo,
            evenuscr: dataEvento[0].CAL_EVENTOS.evenuscr,
            evenfecr: dataEvento[0].CAL_EVENTOS.evenfecr,
            evenesta: dataEvento[0].CAL_EVENTOS.evenesta,
            evenvibu: dataEvento[0].CAL_EVENTOS.evenvibu,
            evenffin: dataEvento[0].CAL_EVENTOS.evenffin,
          }

          if (dataEvento[0].CAL_EVENINVI !== undefined) {
              $scope.evento.invitados = [];
              for (var i = 0; i < dataEvento[0].CAL_EVENINVI.length; i++) {
                if (dataEvento[0].CAL_EVENINVI[i].evinesta !== 5) {
                  $scope.evento.invitados.push({
                    id: dataEvento[0].CAL_EVENINVI[i].evinusua,
                    nombre: dataEvento[0].CAL_EVENINVI[i].evinnomb
                  });
                  $scope.invitadosBD.push(dataEvento[0].CAL_EVENINVI[i]);
                }
              }
          }

          if (dataEvento[0].CAL_EVENNOTI !== undefined) {
            $scope.evento.alerta = {};
            $scope.evento.alerta.correo = [];
            $scope.evento.alerta.aplicacion = [];
            for (var i = 0; i < dataEvento[0].CAL_EVENNOTI.length; i++) {
              if (dataEvento[0].CAL_EVENNOTI[i].evnotipo === 2801 && dataEvento[0].CAL_EVENNOTI[i].evnoesta !== 5) {
                  $scope.evento.alerta.aplicacion.push(dataEvento[0].CAL_EVENNOTI[i].evnoaler);
                  $scope.alertasAplicacion.push(dataEvento[0].CAL_EVENNOTI[i]);
              }
              if (dataEvento[0].CAL_EVENNOTI[i].evnotipo === 2802 && dataEvento[0].CAL_EVENNOTI[i].evnoesta !== 5) {
                  $scope.evento.alerta.correo.push(dataEvento[0].CAL_EVENNOTI[i].evnoaler);
                  $scope.alertasCorreo.push(dataEvento[0].CAL_EVENNOTI[i]);
              }
            }
          }
        }
      );

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

      $scope.vectorIconos = [];

      calImagService.getListaIconos().then(
        function(dataImagen){
          var cont = 0;
          for (var i = 0; i < dataImagen.length; i++) {
            $scope.vectorIconos[i] = {
              id: dataImagen[i].IMAGCONS,
              icono: dataImagen[i]
            };
          }
          $scope.banIconos = true;
        }
      );

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

      $scope.editarEvento = function(){
        if($scope.isValidarDatosEvento()){
          var evento = $scope.buildEvento();
          calEvenService.updEvento(evento).then(
            function(resultEvento){
              var banderaApli = false;
              var banderaCorr = false;
              var banderaInvi = false;
              if ($scope.alertasAplicacion.length > 0) {
                for (var j = 0; j < $scope.alertasAplicacion.length; j++) {
                  var banderaEliminarApli = false;
                  for (var i = 0; i < $scope.evento.alerta.aplicacion.length; i++) {
                    if ($scope.alertasAplicacion[j].evnoaler === $scope.evento.alerta.aplicacion[i]) {
                      banderaEliminarApli = true;
                      break;
                    }
                  }
                  if (!banderaEliminarApli) {
                    var notificacion = $scope.buildNotificacionAnular($scope.alertasAplicacion[j]);
                    calEvenService.updNotificacion(notificacion).then(
                      function(resultNotificacionAplicacion){
                        $location.path('/admin/evento/vista/'+resultEvento.ID);
                      },
                      function(error){
                        console.log("Notificacion aplicacion: ",error.statusText);
                      }
                    );
                  }
                }
                for (var i = 0; i < $scope.evento.alerta.aplicacion.length; i++) {
                  var banderaAgregarApli = false;
                  for (var j = 0; j < $scope.alertasAplicacion.length; j++) {
                    if ($scope.evento.alerta.aplicacion[i] === $scope.alertasAplicacion[j].evnoaler) {
                      banderaAgregarApli = true;
                      break;
                    }
                  }
                  if (!banderaAgregarApli) {
                    var notificacion = $scope.buildNotificacion(resultEvento.ID, $scope.evento.alerta.aplicacion[i], 2801);
                    calEvenService.guardarNotificacion(notificacion).then(
                      function(resultNotificacion){
                        $location.path('/admin/evento/vista/'+resultEvento.ID);
                      },
                      function(error){
                        console.log("Notificacion aplicacion: ",error.statusText);
                      }
                    );
                  }
                }
              }
              else{
                banderaApli = true;
              }
              if ($scope.alertasCorreo.length > 0) {
                for (var j = 0; j < $scope.alertasCorreo.length; j++) {
                  var banderaEliminarCorr = false;
                  for (var i = 0; i < $scope.evento.alerta.correo.length; i++) {
                    if ($scope.alertasCorreo[j].evnoaler === $scope.evento.alerta.correo[i]) {
                      banderaEliminarCorr = true;
                      break;
                    }
                  }
                  if (!banderaEliminarCorr) {
                    var notificacion = $scope.buildNotificacionAnular($scope.alertasCorreo[j]);
                    calEvenService.updNotificacion(notificacion).then(
                      function(resultNotificacionAplicacion){
                        $location.path('/admin/evento/vista/'+resultEvento.ID);
                      },
                      function(error){
                        console.log("Notificacion aplicacion: ",error.statusText);
                      }
                    );
                  }
                }
                for (var i = 0; i < $scope.evento.alerta.correo.length; i++) {
                  var banderaAgregarCorr = false;
                  for (var j = 0; j < $scope.alertasCorreo.length; j++) {
                    if ($scope.evento.alerta.correo[i] === $scope.alertasCorreo[j].evnoaler) {
                      banderaAgregarCorr= true;
                      break;
                    }
                  }
                  if (!banderaAgregarCorr) {
                    var notificacion = $scope.buildNotificacion(resultEvento.ID, $scope.evento.alerta.correo[i], 2802);
                    calEvenService.guardarNotificacion(notificacion).then(
                      function(resultNotificacion){
                        $location.path('/admin/evento/vista/'+resultEvento.ID);
                      },
                      function(error){
                        console.log("Notificacion aplicacion: ",error.statusText);
                      }
                    );
                  }
                }
              }
              else{
                banderaCorr = true;
              }
              if ($scope.invitadosBD.length > 0) {
                for (var j = 0; j < $scope.invitadosBD.length; j++) {
                  var banderaEliminarInvi = false;
                  for (var i = 0; i < $scope.evento.invitados.length; i++) {
                    if ($scope.invitadosBD[j].evinusua === $scope.evento.invitados[i].id) {
                      banderaEliminarInvi = true;
                      break;
                    }
                  }
                  if (!banderaEliminarInvi) {
                    var invitado = $scope.buildInvitadoAnular($scope.invitadosBD[j]);
                    calEvenService.updInvitado(invitado).then(
                      function(resultInvitado){
                        $location.path('/admin/evento/vista/'+resultEvento.ID);
                      },
                      function(error){
                        console.log("Invitado: ",error.statusText);
                      }
                    );
                  }
                }
                for (var i = 0; i < $scope.evento.invitados.length; i++) {
                  var banderaAgregarInvi = false;
                  for (var j = 0; j < $scope.invitadosBD.length; j++) {
                    if ($scope.evento.invitados[i].id === $scope.invitadosBD[j].evinusua) {
                      banderaAgregarInvi = true;
                      break;
                    }
                  }
                  if (!banderaAgregarInvi) {
                    var invitado = $scope.buildInvitado(resultEvento.ID, $scope.evento.invitados[i]);
                    calEvenService.guardarInvitado(invitado).then(
                      function(resultInvitado){
                        $location.path('/admin/evento/vista/'+resultEvento.ID);
                      },
                      function(error){
                        console.log("Invitado: ",error.statusText);
                      }
                    );
                  }
                }
              }
              else{
                banderaInvi = true;
              }
              if (banderaApli && banderaInvi && banderaCorr) {
                $location.path('/admin/evento/vista/'+resultEvento.ID);
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

      $scope.buildNotificacionAnular = function(notificacion){
        var calEntity = {};
        calEntity.evnocons = notificacion.evnocons;
        calEntity.evnoeven = notificacion.evnoeven;
        calEntity.evnofech = notificacion.evnofech;
        calEntity.evnotipo = notificacion.evnotipo;
        calEntity.evnoaler = notificacion.evnoaler;
        calEntity.evnoesta = 5;
        calEntity.evnodesc = notificacion.evnodesc;
        calEntity.evnouscr = notificacion.evnouscr;
        calEntity.evnofecr = notificacion.evnofecr;
        return calEntity;
      }

      $scope.buildNotificacion = function(idEvento, notificacion, tipo){
        var calEntity = {};
        calEntity.evnocons = -1;
        calEntity.evnoeven = idEvento;
        calEntity.evnofech = new Date();
        calEntity.evnotipo = tipo;
        calEntity.evnoaler = notificacion;
        calEntity.evnoesta = 2;
        calEntity.evnodesc = null;
        calEntity.evnouscr = 1;
        calEntity.evnofecr = null;
        return calEntity;
      }

      $scope.buildInvitadoAnular = function(invitado){
        var calEntity = {};
        calEntity.evincons = invitado.evincons;
        calEntity.evineven = invitado.evineven;
        calEntity.evinusua = invitado.evinusua;
        calEntity.evinnomb = invitado.evinnomb;
        calEntity.evinesta = 5;
        return calEntity;
      }

      $scope.buildInvitado = function(idEvento, invitado){
        var calEntity = {};
        calEntity.evincons = -1;
        calEntity.evineven = idEvento;
        calEntity.evinusua = invitado.id;
        calEntity.evinnomb = invitado.nombre;
        calEntity.evinesta = 2;
        return calEntity;
      }

      $scope.buildEvento = function(){
        var fechaI = new Date($scope.evento.fechaInicio).setHours(new Date($scope.evento.horaInicio).getHours());
        fechaI = new Date(fechaI).setMinutes(new Date($scope.evento.horaInicio).getMinutes());
        $scope.evento.fechaInicio = fechaI;
        var fechaF = new Date($scope.evento.fechaInicio).setHours(new Date($scope.evento.horaFin).getHours());
        fechaF = new Date(fechaF).setMinutes(new Date($scope.evento.horaFin).getMinutes());
        var calEntity = {};
        calEntity.evencons = $scope.evento.id;
        calEntity.evendesc = $scope.evento.nombre;
        calEntity.evenfein = new Date(fechaI);
        calEntity.evenfefi = new Date(fechaF);
        calEntity.evenimpo = $scope.evento.importancia;
        calEntity.evenperi = $scope.evento.repeticion;
        calEntity.evenicon = $scope.evento.iconoEvento;
        calEntity.evenuscr = $scope.evento.evenuscr;
        calEntity.evenfecr = $scope.evento.evenfecr;
        calEntity.evenesta = $scope.evento.evenesta;
        calEntity.evenvibu = $scope.evento.evenvibu;
        calEntity.evenffin = $scope.evento.evenffin;
        calEntity.eventipo = $scope.evento.tipoEvento;
        return calEntity;
      }

      $scope.isValidarDatosEvento = function(){
        $scope.evento.fechaFin = $scope.evento.fechaInicio;
        if( angular.isUndefined($scope.evento.nombre) ||
          angular.isUndefined($scope.evento.tipoEvento) ||
          angular.isUndefined($scope.evento.fechaInicio) ||
          angular.isUndefined($scope.evento.horaInicio) ||
          angular.isUndefined($scope.evento.fechaFin) ||
          angular.isUndefined($scope.evento.horaFin) ||
          angular.isUndefined($scope.evento.importancia) ||
          angular.isUndefined($scope.evento.repeticion) ||
          $scope.evento.nombre == null ||
          $scope.evento.tipoEvento == null ||
          $scope.evento.fechaInicio == null ||
          $scope.evento.horaInicio == null ||
          $scope.evento.fechaFin == null ||
          $scope.evento.horaFin == null ||
          $scope.evento.importancia == null ||
          $scope.evento.repeticion == null ||
          $scope.evento.nombre == '' ||
          $scope.evento.tipoEvento == '' ||
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
