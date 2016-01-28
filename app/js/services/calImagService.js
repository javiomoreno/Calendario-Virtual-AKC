calendModService.service('calImagService', [
                                              '$q', 
                                              'guardarImagen', 
                                              'guardarImagenCodi',
  function ($q, guardarImagen, guardarImagenCodi) {
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
}]);