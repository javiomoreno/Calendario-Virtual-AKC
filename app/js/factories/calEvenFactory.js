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

/*Guardar Evento*/
calendModFactory.factory('guardarEvento', function guardarEvento($resource, baseURL) {
	return $resource(baseURL + 'cal/evento', null, {'save' : {method : 'POST', isArray:false}});
});

/*Guardar Notificacion*/
calendModFactory.factory('guardarNotificacion', function guardarNotificacion($resource, baseURL) {
	return $resource(baseURL + 'cal/notificacion', null, {'save' : {method : 'POST', isArray:false}});
});

/*Guardar Invitado*/
calendModFactory.factory('guardarInvitado', function guardarInvitado($resource, baseURL) {
	return $resource(baseURL + 'cal/invitado', null, {'save' : {method : 'POST', isArray:false}});
});

/*Consultar Evento por Id*/
calendModFactory.factory('getEventoId', function getEventoId($resource, baseURL) {
	return $resource(baseURL + 'cal/eventos/:eventoId', {eventoId:'@eventoId'});
});

/*Editar detalles Evento*/
calendModFactory.factory('updEvento', function updEvento($resource, baseURL) {
	return $resource(baseURL + 'cal/eventoupd', null, {'update' : {method : 'PUT'}});
});

/*Consultar Eventos por mes y año*/
calendModFactory.factory('getEventosMesAno', function getEventosMesAno($resource, baseURL) {
	return $resource(baseURL + 'cal/eventosanomes/:anho/:mes', {anho:'@anho', mes:'@mes'});
});

/*Editar notificaciones del Evento*/
calendModFactory.factory('updNotificacion', function updNotificacion($resource, baseURL) {
	return $resource(baseURL + 'cal/notificacionupd ', null, {'update' : {method : 'PUT'}});
});

/*Editar invitados del Evento*/
calendModFactory.factory('updInvitado', function updInvitado($resource, baseURL) {
	return $resource(baseURL + 'cal/invitadoupd', null, {'update' : {method : 'PUT'}});
});

/*Consultar lista de Eventos por tipo*/
calendModFactory.factory('allEventosAdminTipo', function allEventosAdminTipo($resource, baseURL) {
	return $resource(baseURL + 'cal/totalEventos/:tipo', {tipo:'@tipo'});
});





