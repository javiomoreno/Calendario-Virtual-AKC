
//FACTORIAS PARA IMAGENES//
/*Consultar tipos de Imagenes*/
calendModFactory.factory('allTipoImagen', function allTipoImagen($resource, baseURL) {
	return $resource(baseURL + 'aextablas/tipoimag', {});
	//return $resource('calendario.json', {});
});

/*Guardar Imagen*/
calendModFactory.factory('guardarImagen', function guardarImagen($resource, baseURL) {
	return $resource(baseURL + 'cal/imagen', null, {'save' : {method : 'POST', isArray:false}});
});

/*Guardar Imagen Codificada*/
calendModFactory.factory('guardarImagenCodi', function guardarImagenCodi($resource, baseURL) {
	return $resource(baseURL + 'cal/imagencodi', null, {'save' : {method : 'POST', isArray:false}});
});


calendModFactory.factory('allTipoEvento', function allTipoEvento($resource, baseURL) {
	return $resource(baseURL + 'aextablas/tipoeven', {});
	//return $resource('tipoeven.json', {});
});

calendModFactory.factory('allRepeticion', function allRepeticion($resource, baseURL) {
	return $resource(baseURL + 'aextablas/repeticion', {});
	//return $resource('repeticion.json', {});
});

calendModFactory.factory('allImportancia', function allImportancia($resource, baseURL) {
	return $resource(baseURL + 'aextablas/importancia', {});
	//return $resource('importancia.json', {});
});

calendModFactory.factory('allMeses', function allMeses($resource, baseURL) {
	return $resource(baseURL + 'aextablas/mes', {});
	//return $resource('mes.json', {});
});

calendModFactory.factory('allAnhos', function allAnhos($resource, baseURL) {
	return $resource(baseURL + 'aextablas/ano', {});
	//return $resource('ano.json', {});
});

calendModFactory.factory('allInvitados', function allInvitados($resource, baseURL) {
	return $resource('invitados.json', {});
});

