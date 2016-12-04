'use strict';

/**
 * @ngdoc function
 * @name ocoApp.controller:PlaceCtrl
 * @description
 * # PlaceCtrl
 * Controller of the ocoApp
 */
angular.module('ocoApp')
	.controller('PlaceCtrl', [
		'$scope', '$rootScope', '$timeout', function ($scope, $rootScope, $timeout) {
			var vm    = this;
			
			$scope.$on('$viewContentLoaded', function () {
				Custom.init();
				
				var _latitude = 40.7344458;
				var _longitude = -73.86704922;
				var element = "map-detail";
				
				simpleMap(_latitude,_longitude, element);
				rating(".visitor-rating");
				
				$timeout(function () {
					$rootScope.$pageOnLoad = false;
				}, 1000);
			});
		}
	]);