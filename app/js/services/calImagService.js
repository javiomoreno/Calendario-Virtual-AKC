calendModService.service('calImagService', [
                                              '$q', 
                                              'guardarImagen', 
                                              'guardarImagenCodi',
                                              'getImagenId',
                                              'getImagenesAnoMesTipo',
                                              'getImagenesTipo',
                                              'getIconos',
                                              'updImagenes',
                                              'updImagenCodifi',
                                              'allMeses',
                                              'allAnhos', 
                                              'allTipoImagen',
                                              'getImagenesTipo',
  function ($q, guardarImagen, guardarImagenCodi, getImagenId, getImagenesAnoMesTipo, getImagenesTipo, getIconos, updImagenes, updImagenCodifi, allMeses, allAnhos, allTipoImagen, getImagenesTipo) {
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

	this.getImagenesTipo = function(tipo) {
		var response = $q.defer();
		getImagenesTipo.query({tipo:tipo}, function(result) {
			response.resolve(result);
		}, function(error) {
			response.reject(error);
		});
		return response.promise;
	};

	this.getListaIconos = function() {
		var response = $q.defer();
		getIconos.query({}, function(result) {
			response.resolve(result);
		}, function(error) {
			response.reject(error);
		});
		return response.promise;
	};

	this.updImagenes = function(imagen) {
		var response = $q.defer();
		updImagenes.update(imagen, function(result) {
			response.resolve(result);
		}, function(error) {
			response.reject(error);
		});
		return response.promise;
	};

	this.updImagenCodifi = function(imagenCodif) {
		var response = $q.defer();
		updImagenCodifi.update(imagenCodif, function(result) {
			response.resolve(result);
		}, function(error) {
			response.reject(error);
		});
		return response.promise;
	};

	this.getAllMeses = function() {
        var response = $q.defer();
        allMeses.query({}, function(result) {
          response.resolve(result);
        }, function(error) {
          response.reject(error);
        });
        return response.promise;
  	};

  	this.getAllAnhos = function() {
        var response = $q.defer();
        allAnhos.query({}, function(result) {
          response.resolve(result);
        }, function(error) {
          response.reject(error);
        });
        return response.promise;
 	};

 	this.getAllTipoImagen = function() {
        var response = $q.defer();
        allTipoImagen.query({}, function(result) {
          response.resolve(result);
        }, function(error) {
          response.reject(error);
        });
        return response.promise;
  	};

  	this.getImagenesTipo = function(anho, mes, tipo) {
        var response = $q.defer();
        getImagenesTipo.query({anho:anho, mes:mes, tipo:tipo}, function(result) {
          response.resolve(result);
        }, function(error) {
          response.reject(error);
        });
        return response.promise;
  	};

  	
}]);