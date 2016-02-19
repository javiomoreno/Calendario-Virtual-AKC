calendModController.controller('EventoPrivadoDetalleController', [
                                                '$scope',
                                                '$routeParams', 
                                                '$uibModal', 
                                                '$location', 
                                                'calImagService',
                                                'calEvenService',
    function ($scope, $routeParams,  $uibModal, $location, calImagService, calEvenService) {

      	$scope.eventoId = $routeParams.idEventoPrivado;
		$scope.bandera = false;
		$scope.evento = {};
		$scope.checkboxModel = {};
		$scope.vecInvitados = [];
		$scope.vecNotiCorreo = [];
		$scope.vecNotiAplicacion = [];

		calEvenService.getEventoId($scope.eventoId).then(
			function(dataEvento){
				$scope.bandera = true;
			  	$scope.evento = {
				    id: dataEvento[0].CAL_EVENTOS.evencons,
				    nombre: dataEvento[0].CAL_EVENTOS.evendesc,
				    fechaInicio: new Date(dataEvento[0].CAL_EVENTOS.evenfein).getDate()+"/"+((new Date(dataEvento[0].CAL_EVENTOS.evenfein).getMonth().valueOf())+1)+"/"+new Date(dataEvento[0].CAL_EVENTOS.evenfein).getFullYear(),
                  	fechaFin: new Date(dataEvento[0].CAL_EVENTOS.evenfefi).getDate()+"/"+((new Date(dataEvento[0].CAL_EVENTOS.evenfefi).getMonth().valueOf())+1)+"/"+new Date(dataEvento[0].CAL_EVENTOS.evenfefi).getFullYear()
			  	}	
			  	if (dataEvento[0].CAL_EVENINVI !== undefined) {
				  	for (var i = 0; i < dataEvento[0].CAL_EVENINVI.length; i++) {
				  		$scope.vecInvitados.push(dataEvento[0].CAL_EVENINVI[i]);
				  	}
				}			  	
			  	if(dataEvento[0].CAL_EVENTOS.evenvibu == 1){
					$scope.checkboxModel = {
					   value : true
				 	};
				}
				else{
					$scope.checkboxModel = {
					   value : false
				 	};
				}

				if (dataEvento[0].CAL_EVENNOTI !== undefined) {
					calEvenService.getAllAlertas().then(
						function (dataAlertas) {
							for (var i = 0; i < dataEvento[0].CAL_EVENNOTI.length; i++) {
						  		if (dataEvento[0].CAL_EVENNOTI[i].evnotipo === 2901 && dataEvento[0].CAL_EVENNOTI[i].evnoesta !== 5) {
						  			for (var j = 0; j < dataAlertas.length; j++) {
						  				if (dataEvento[0].CAL_EVENNOTI[i].evnoaler === dataAlertas[j].tbnumero) {
						  					$scope.vecNotiAplicacion.push(dataAlertas[j].tbvalor);
						  				}
								  	};
						  		}
						  		if (dataEvento[0].CAL_EVENNOTI[i].evnotipo === 2902 && dataEvento[0].CAL_EVENNOTI[i].evnoesta !== 5) {
						  			for (var j = 0; j < dataAlertas.length; j++) {
						  				if (dataEvento[0].CAL_EVENNOTI[i].evnoaler === dataAlertas[j].tbnumero) {
						  					$scope.vecNotiCorreo.push(dataAlertas[j].tbvalor);
						  				}
								  	};
						  		}
					  		}
						  	
						  	
						},
						function(error){
						    console.log(error.statusText);
						}
					);
				}		

				if (dataEvento[0].CAL_EVENTOS.evenicon !== null) {
				  	calImagService.getImagenId(dataEvento[0].CAL_EVENTOS.evenicon).then(
				        function(dataImagen){
							$scope.evento.iconoEvento = dataImagen.IMAGCODI;
				        },
				        function(error){
				            console.log(error.statusText);
				        }
			      	);
			    }
		      	calEvenService.getAllTipoEvento().then(
		      		function (dataTipoEvento) {
						for (var i = 0; i < dataTipoEvento.length; i++) {
							if (dataTipoEvento[i].tbnumero === dataEvento[0].CAL_EVENTOS.eventipo) {
								$scope.evento.tipoEvento = dataTipoEvento[i].tbvalor;
							}
						};
					}
			   	);
				calEvenService.getAllRepeticion().then(
					function (dataRepeticion) {
						for (var i = 0; i < dataRepeticion.length; i++) {
							if (dataRepeticion[i].tbnumero === dataEvento[0].CAL_EVENTOS.evenperi) {
								$scope.evento.repeticion = dataRepeticion[i].tbvalor;
							}
						}
					}
				);

				calEvenService.getAllImportancia().then(
					function (dataImportancia) {
						for (var i = 0; i < dataImportancia.length; i++) {
							if (dataImportancia[i].tbnumero === dataEvento[0].CAL_EVENTOS.evenimpo) {
								$scope.evento.importancia = dataImportancia[i].tbvalor;
							}
						};
					}
				);
			},
			function(error){
			    console.log(error.statusText);
			}
		);

		$scope.Cambiar = function() {
          	openCambiar('sm', $scope.eventoId);
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
}]);
