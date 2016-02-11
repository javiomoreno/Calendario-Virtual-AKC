//FACTORIAS PARA EVENTOS//
/*Consultar los Invitados al Evento*/
calendModFactory.factory('allInvitados', function allInvitados($resource, baseURL) {
	return $resource(baseURL + 'aexusuario/invitados', {});
});

/*Consultar los tipos de Alertas*/
calendModFactory.factory('allAlertas', function allAlertas($resource, baseURL) {
	return $resource(baseURL + 'aextablas/alertas', {});
});

/*Consultar los tipos de Eventos*/
calendModFactory.factory('allTipoEvento', function allTipoEvento($resource, baseURL) {
	return $resource(baseURL + 'aextablas/tipoeven', {});
});

/*Consultar los tipos de Repeticion de un evento*/
calendModFactory.factory('allRepeticion', function allRepeticion($resource, baseURL) {
	return $resource(baseURL + 'aextablas/repeticion', {});
});

/*Consultar los tipos de Importancia*/
calendModFactory.factory('allImportancia', function allImportancia($resource, baseURL) {
	return $resource(baseURL + 'aextablas/importancia', {});
});

/*Consultar los eventos por tipo y año*/
calendModFactory.factory('allEventosTipo', function allEventosTipo($resource, baseURL) {
	return $resource(baseURL + 'cal/eventos/:tipo/:anho', {tipo:'@tipo', anho:'@anho'});
});



