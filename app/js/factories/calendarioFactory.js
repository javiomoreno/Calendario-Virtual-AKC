calendModFactory.factory('allTipoImagen', function allTipoImagen($resource, baseURL) {
	//return $resource(baseURL + 'aextablas/tipoimag', {});
	return $resource('calendario.json', {});
});

calendModFactory.factory('allTipoEvento', function allTipoEvento($resource, baseURL) {
	//return $resource(baseURL + 'aextablas/tipoeven', {});
	return $resource('tipoeven.json', {});
});

calendModFactory.factory('allRepeticion', function allRepeticion($resource, baseURL) {
//	return $resource(baseURL + 'aextablas/repeticion', {});
	return $resource('repeticion.json', {});
});

calendModFactory.factory('allImportancia', function allImportancia($resource, baseURL) {
	//return $resource(baseURL + 'aextablas/importancia', {});
	return $resource('importancia.json', {});
});

calendModFactory.factory('allMeses', function allMeses($resource, baseURL) {
	//return $resource(baseURL + 'aextablas/mes', {});
	return $resource('mes.json', {});
});

calendModFactory.factory('allAnhos', function allAnhos($resource, baseURL) {
	//return $resource(baseURL + 'aextablas/ano', {});
	return $resource('ano.json', {});
});

