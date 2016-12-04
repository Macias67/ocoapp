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
		'$scope', '$rootScope', '$timeout', '$state', 'currentUser', function ($scope, $rootScope, $timeout, $state, currentUser) {
			
			var vm    = this;
			vm.ciudad = 'Ocotlán';
			
			vm.results = function () {
				$state.go('listing');
			};
			
			
			
			$scope.$on('$viewContentLoaded', function () {
				Custom.init();
				
				$timeout(function () {
					$rootScope.$pageOnLoad = false;
				}, 1000);
			});
		}
	]);
