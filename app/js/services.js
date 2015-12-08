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

    }])

    .service('upload', function ($http, $q){

      this.uploadFile = function(file, nombre){
        var deferred = $q.defer();
        var formData = new FormData();

        formData.append("nombre", nombre);
        formData.append("file", file);

        return $http.post("server.php", formData, {
          headers: {
            "Content-type": undefined
          },
          transformRequest: angular.identity
        })
        .success(function(res){
          deferred.resolve(res);
        })
        .error(function(msg, code){
          deferred.reject(msg);
        })
        return deferred.promise; 
      }
    });

})();
