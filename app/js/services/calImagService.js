calendModService.service('calImagService', [
                                              '$q', 
                                              'guardarImagen', 
                                              'guardarImagenCodi',
                                              'getImagenId',
                                              'getImagenesAnoMesTipo',
                                              'getImagenesTipo',
  function ($q, guardarImagen, guardarImagenCodi, getImagenId, getImagenesAnoMesTipo, getImagenesTipo) {
  	this.guardarImagenCodificada = function(imagenCodif){
		var response = $q.defer();
		guardarImagenCodi.save(imagenCodif, function(result){
			console.log(result);
			response.resolve(result);
		}, function(error){
			response.reject(error);
		});				
		return response.promise;
	};

	this.guardarImagen = function(imagen){
		var response = $q.defer();
		guardarImagen.save(imagen, function(result){
			console.log(result);
			response.resolve(result);
		}, function(error){
			response.reject(error);
		});				
		return response.promise;
	};

	this.getImagenId = function(imagenId) {
		var response = $q.defer();
		getImagenId.get({imagenId:imagenId}, function(result) {
			response.resolve(result);
		}, function(error) {
			response.reject(error);
		});
		return response.promise;
	};

	this.getImagenesAnoMesTipo = function(anho, mes, tipo) {
		var response = $q.defer();
		getImagenesAnoMesTipo.query({anho:anho, mes:mes, tipo:tipo}, function(result) {
			response.resolve(result);
		}, function(error) {
			response.reject(error);
		});
		return response.promise;
	};

	this.getImagenesTipo = function(anho, mes, tipo) {
		var response = $q.defer();
		getImagenesTipo.get({anho:anho, mes:mes, tipo:tipo}, function(result) {
			response.resolve(result);
		}, function(error) {
			response.reject(error);
		});
		return response.promise;
	};
}]);