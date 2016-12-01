'use strict';

/**
 * @ngdoc function
 * @name ocoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ocoApp
 */
ocoApp.controller('MainCtrl', [
	'$scope', '$rootScope', function ($scope, $rootScope) {
		
		$scope.$on('$viewContentLoaded', function () {
			Custom.init();
		});
	}
]);
