(function () {

  angular.module('calendario.services', [])

    .factory('calendarioService', ['$http', '$q', '$window', function ($http, $q, $window) {
      function all() {
        var deferred = $q.defer();

        $http.get('calendario.json')
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

    }]);

})();
