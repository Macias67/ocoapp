'use strict';

/**
 * @ngdoc function
 * @name ocoApp.controller:EditprofileCtrl
 * @description
 * # EditprofileCtrl
 * Controller of the ocoApp
 */
angular.module('ocoApp')
	.controller('EditProfileCtrl', [
		'$scope', '$rootScope', '$timeout', function ($scope, $rootScope, $timeout) {
			var vm = this;
			
			$scope.$on('$viewContentLoaded', function () {
				Custom.init();
				
				$timeout(function () {
					$rootScope.$pageOnLoad = false;
				}, 1000);
			});
		}
	]);
