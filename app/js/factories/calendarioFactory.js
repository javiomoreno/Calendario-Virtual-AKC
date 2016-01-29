
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

/*Consultar Imagen por Id*/
calendModFactory.factory('getImagenId', function getImagenId($resource, baseURL) {
	return $resource(baseURL + 'cal/imagenId/:imagenId', {imagenId:'@imagenId'});
});

/*Editar Imagen*/
//calendModFactory.factory('editarImagen', function editarImagen($resource, baseURL) {
//	return $resource(baseURL + 'aexusuario/updateMod', null, {'update' : {method : 'PUT'}});
//});

/*Consultar Imagenes por Año, Mes y Tipo*/
calendModFactory.factory('getImagenesAnoMesTipo', function getImagenesAnoMesTipo($resource, baseURL) {
	return $resource(baseURL + 'cal/imagenAdmin/:anho/:mes/:tipo', {anho:'@anho', mes:'@mes', tipo:'@tipo'});
});

/*Consultar Lista de Imagenes por Tipo*/
calendModFactory.factory('getImagenesTipo', function getImagenesTipo($resource, baseURL) {
	return $resource(baseURL + 'cal/imagentipo/:anho/:mes/:tipo', {anho:'@anho', mes:'@mes', tipo:'@tipo'});
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

