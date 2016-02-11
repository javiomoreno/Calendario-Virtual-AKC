calendModService.service('calEvenService', [
                                              '$q', 
                                              'allTipoImagen', 
                                              'allTipoEvento',
                                              'allRepeticion',
                                              'allImportancia',
                                              'allInvitados',
                                              'allEventosTipo',
  function ($q, allTipoImagen, allTipoEvento, allRepeticion, allImportancia, allMeses, allAnhos, allInvitados, allEventosTipo) {
      
    this.getAllTipoEvento = function() {
      var response = $q.defer();
      allTipoEvento.query({}, function(result) {
        response.resolve(result);
      }, function(error) {
        response.reject(error);
      });
      return response.promise;
    };

    this.getAllRepeticion = function() {
      var response = $q.defer();
      allRepeticion.query({}, function(result) {
        response.resolve(result);
      }, function(error) {
        response.reject(error);
      });
      return response.promise;
    };

    this.getAllImportancia = function() {
      var response = $q.defer();
      allImportancia.query({}, function(result) {
        response.resolve(result);
      }, function(error) {
        response.reject(error);
      });
      return response.promise;
    };

    this.getAllInvitados = function() {
      var response = $q.defer();
      allInvitados.query({}, function(result) {
        response.resolve(result);
      }, function(error) {
        response.reject(error);
      });
      return response.promise;
    };

    this.getAllEventosTipo = function(tipo, anho) {
      var response = $q.defer();
      allEventosTipo.query({tipo:tipo, anho:anho}, function(result) {
        response.resolve(result);
      }, function(error) {
        response.reject(error);
      });
      return response.promise;
    };
}]);