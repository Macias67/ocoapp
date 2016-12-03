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
		'$scope', '$rootScope', '$timeout', function ($scope, $rootScope, $timeout) {
			
			var vm    = this;
			vm.ciudad = 'Ocotlán';
			
			$timeout(function () {
				$rootScope.$pageOnLoad = false;
			}, 2000);
			
			$scope.$on('$viewContentLoaded', function () {
				Custom.init();
			});
		}
	]);
