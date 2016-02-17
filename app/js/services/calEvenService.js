calendModService.service('calEvenService', [
                                              '$q', 
                                              'allTipoImagen', 
                                              'allTipoEvento',
                                              'allRepeticion',
                                              'allImportancia',
                                              'allInvitados',
                                              'allEventosTipo',
                                              'allAlertas',
                                              'guardarEvento',
                                              'guardarNotificacion',
                                              'guardarInvitado',
                                              'getEventoId',
                                              'updEvento',
                                              'getEventosMesAno',
  function ($q, allTipoImagen, allTipoEvento, allRepeticion, allImportancia, allInvitados, allEventosTipo, allAlertas, guardarEvento, guardarNotificacion, guardarInvitado, getEventoId, updEvento, getEventosMesAno) {
      
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

    this.getAllAlertas = function() {
      var response = $q.defer();
      allAlertas.query({}, function(result) {
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

    this.guardarEvento = function(evento){
      var response = $q.defer();
      guardarEvento.save(evento, function(result){
        response.resolve(result);
      }, function(error){
        response.reject(error);
      });       
      return response.promise;
    };

    this.guardarNotificacion = function(notificacion){
      var response = $q.defer();
      guardarNotificacion.save(notificacion, function(result){
        response.resolve(result);
      }, function(error){
        response.reject(error);
      });       
      return response.promise;
    };

    this.guardarInvitado = function(invitado){
      var response = $q.defer();
      guardarInvitado.save(invitado, function(result){
        response.resolve(result);
      }, function(error){
        response.reject(error);
      });       
      return response.promise;
    };

    this.getEventoId = function(eventoId) {
      var response = $q.defer();
      getEventoId.query({eventoId:eventoId}, function(result) {
        response.resolve(result);
      }, function(error) {
        response.reject(error);
      });
      return response.promise;
    };

    this.updEvento = function(evento) {
      var response = $q.defer();
      updEvento.update(evento, function(result) {
        response.resolve(result);
      }, function(error) {
        response.reject(error);
      });
      return response.promise;
    };

    this.getEventosMesAno = function(anho, mes) {
      var response = $q.defer();
      getEventosMesAno.query({anho:anho, mes:mes}, function(result) {
        response.resolve(result);
      }, function(error) {
        response.reject(error);
      });
      return response.promise;
    };

}]);