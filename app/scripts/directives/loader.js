'use strict';

/**
 * @ngdoc directive
 * @name ocoApp.directive:Loader
 * @description
 * # Loader
 */
angular.module('ocoApp')
	.directive('loader', [
		'$rootScope', '$state', '$timeout',
		function ($rootScope, $state, $timeout) {
			return {
				link: function postLink(scope, element, attrs) {
					
					$rootScope.$on('$stateChangeStart', function () {
						$rootScope.$pageOnLoad = true;
					});
					
					$rootScope.$on('$stateChangeSuccess', function (event) {
					
					});
					
					// handle errors
					$rootScope.$on('$stateNotFound', function () {
						$timeout(function () {
							$rootScope.$pageOnLoad = false;
						}, 300);
					});
					
					// handle errors
					$rootScope.$on('$stateChangeError', function () {
						$timeout(function () {
							$rootScope.$pageOnLoad = false;
						}, 300);
					});
				}
			};
		}
	]);
