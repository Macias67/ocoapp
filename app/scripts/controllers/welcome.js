'use strict';

/**
 * @ngdoc function
 * @name ocoApp.controller:WelcomeCtrl
 * @description
 * # WelcomeCtrl
 * Controller of the ocoApp
 */
angular.module('ocoApp')
	.controller('WelcomeCtrl', [
		'$scope', '$rootScope', function ($scope, $rootScope) {
			
			var vm    = this;
			vm.ciudad = 'Ocotlán';
			
			$scope.$on('$viewContentLoaded', function () {
				Custom.init();
			});
		}
	]);
