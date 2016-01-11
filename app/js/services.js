(function () {

  angular.module('calendario.services', [])

  .factory('allTipoImagen', function ($resource) {
    return $resource('http://pruebas.akc.co:8089/appexp/servlet/aextablas/tipoimag');
  })

  .factory('allTipoEvento', function ($resource) {
    return $resource('http://pruebas.akc.co:8089/appexp/servlet/aextablas/tipoeven');
  })

    .factory('calendarioService', ['$http', '$q', '$window', '$timeout', function ($http, $q, $window, $timeout) {
      function all() {
        var deferred = $q.defer();

        $http.get('http://pruebas.akc.co:8089/appexp/servlet/aextablas/tipoimag')
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      }

      function byMes(mes) {
        var deferred = $q.defer();

        all().then(function (data) {
          var results = data.filter(function (datos) {
            return datos.mes === mes;
          });

          if (results.length > 0) {
            deferred.resolve(results[0]);
          } else {
            deferred.reject();
          }

        });

        return deferred.promise;
      }
      
      return {
        all: all,
        byMes: byMes
      };

    }])

    .factory('servicioBackend', ['$http', '$q', '$window', function ($http, $q, $window) {

      function allTipoImagen() {
        var deferred = $q.defer();

        $http.get('http://pruebas.akc.co:8089/appexp/servlet/aextablas/tipoimag')
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      }

      function allTipoEvento() {
        var deferred = $q.defer();

        $http.get('http://pruebas.akc.co:8089/appexp/servlet/aextablas/tipoeven')
          .success(function (data) {
            deferred.resolve(data);
          });

        return deferred.promise;
      }
      
      
      return {
        allTipoImagen: allTipoImagen,
        allTipoEvento: allTipoEvento
      };


    }])

})();
