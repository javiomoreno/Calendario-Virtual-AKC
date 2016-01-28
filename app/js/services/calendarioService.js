calendModService.service('calendarioService', [
                                              '$q', 
                                              'allTipoImagen', 
                                              'allTipoEvento',
                                              'allRepeticion',
                                              'allImportancia',
                                              'allMeses',
                                              'allAnhos', 
                                              'allInvitados',
  function ($q, allTipoImagen, allTipoEvento, allRepeticion, allImportancia, allMeses, allAnhos, allInvitados) {
      this.getAllTipoImagen = function() {
        var response = $q.defer();
        allTipoImagen.query({}, function(result) {
          response.resolve(result);
        }, function(error) {
          response.reject(error);
        });
        return response.promise;
      }

      this.getAllTipoEvento = function() {
        var response = $q.defer();
        allTipoEvento.query({}, function(result) {
          response.resolve(result);
        }, function(error) {
          response.reject(error);
        });
        return response.promise;
      }

      this.getAllRepeticion = function() {
        var response = $q.defer();
        allRepeticion.query({}, function(result) {
          response.resolve(result);
        }, function(error) {
          response.reject(error);
        });
        return response.promise;
      }

      this.getAllImportancia = function() {
        var response = $q.defer();
        allImportancia.query({}, function(result) {
          response.resolve(result);
        }, function(error) {
          response.reject(error);
        });
        return response.promise;
      }

      this.getAllMeses = function() {
        var response = $q.defer();
        allMeses.query({}, function(result) {
          response.resolve(result);
        }, function(error) {
          response.reject(error);
        });
        return response.promise;
      }

      this.getAllAnhos = function() {
        var response = $q.defer();
        allAnhos.query({}, function(result) {
          response.resolve(result);
        }, function(error) {
          response.reject(error);
        });
        return response.promise;
      }

      this.getAllInvitados = function() {
        var response = $q.defer();
        allInvitados.query({}, function(result) {
          response.resolve(result);
        }, function(error) {
          response.reject(error);
        });
        return response.promise;
      }
}]);