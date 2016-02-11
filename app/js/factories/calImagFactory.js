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

/*Consultar Imagenes por Año, Mes y Tipo*/
calendModFactory.factory('getImagenesAnoMesTipo', function getImagenesAnoMesTipo($resource, baseURL) {
	return $resource(baseURL + 'cal/imagenAdmin/:anho/:mes/:tipo', {anho:'@anho', mes:'@mes', tipo:'@tipo'});
});

/*Consultar Lista de Imagenes por Tipo*/
calendModFactory.factory('getImagenesTipo', function getImagenesTipo($resource, baseURL) {
	return $resource(baseURL + 'cal/imagenClas/:tipo', {tipo:'@tipo'});
});

/*Consultar Lista de Iconos*/
calendModFactory.factory('getIconos', function getIconos($resource, baseURL) {
	return $resource(baseURL + 'cal/iconos', {});
});

/*Editar Detalles de las Imagenes*/
calendModFactory.factory('updImagenes', function updImagenes($resource, baseURL) {
	return $resource(baseURL + 'cal/imagenupd', null, {'update' : {method : 'PUT'}});
});

/*Editar Imagen Codificada*/
calendModFactory.factory('updImagenCodifi', function updImagenCodifi($resource, baseURL) {
	return $resource(baseURL + 'cal/imagcodiupd', null, {'update' : {method : 'PUT'}});
});

/*Consultar todos los meses*/
calendModFactory.factory('allMeses', function allMeses($resource, baseURL) {
	return $resource(baseURL + 'aextablas/mes', {});
});

/*Consultar todos los años*/
calendModFactory.factory('allAnhos', function allAnhos($resource, baseURL) {
	return $resource(baseURL + 'aextablas/ano', {});
});

/*Consultar lista de Imagenes por Mes,Año y Tipo para el calendario*/
calendModFactory.factory('getImagenesTipo', function getImagenesTipo($resource, baseURL) {
	return $resource(baseURL + 'cal/imagentipo/:anho/:mes/:tipo', {anho:'@anho', mes:'@mes', tipo:'@tipo'});
});






