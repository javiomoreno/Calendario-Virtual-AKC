calModDirective.directive('autoCompleteUsuarios', function ($http) {
      return {
        restrict: 'A',
        scope: {
            url: '@'
        },
        link: function(scope, elem, atrrs){
        	elem.autocomplete({
        		sourse: function(request, response){
        			$http({method:'jsonp', url:scope.url, params:{q:request.term}}).success(function(data){
        				response(data);
        			})
        		},
        		minLength: 3
        	})
        }
      };
    });
