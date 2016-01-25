var calendModules = angular.module('calendModules', [
										'calendModController', 
										'calendModService', 
										'calendModFactory',
										'calModDirective'
										]);
var calendModController = angular.module('calendModController', []);
var calendModService = angular.module('calendModService', []);
var calendModFactory = angular.module('calendModFactory', []);
var calModDirective = angular.module('calModDirective', [])