calendModFactory.factory('allTipoImagen', function allTipoImagen($resource, baseURL) {
	return $resource(baseURL + 'aextablas/tipoimag', {});
});

calendModFactory.factory('allTipoEvento', function allTipoEvento($resource, baseURL) {
	return $resource(baseURL + 'aextablas/tipoeven', {});
});

calendModFactory.factory('allRepeticion', function allRepeticion($resource, baseURL) {
	return $resource(baseURL + 'aextablas/repeticion', {});
});

calendModFactory.factory('allImportancia', function allImportancia($resource, baseURL) {
	return $resource(baseURL + 'aextablas/importancia', {});
});

calendModFactory.factory('allMeses', function allMeses($resource, baseURL) {
	return $resource(baseURL + 'aextablas/mes', {});
});

calendModFactory.factory('allAnhos', function allAnhos($resource, baseURL) {
	return $resource(baseURL + 'aextablas/ano', {});
});