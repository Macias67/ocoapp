'use strict';

/**
 * @ngdoc function
 * @name ocoApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the ocoApp
 */
angular.module('ocoApp')
	.controller('MapCtrl', [
		'$scope', '$rootScope', '$timeout', function ($scope, $rootScope, $timeout) {
			var vm = this;
			
			$scope.$on('$viewContentLoaded', function () {
				Custom.init();
				var _latitude           = 40.7344458;
				var _longitude          = -73.86704922;
				var element             = "map-homepage";
				var markerTarget        = "modal"; // use "sidebar", "infobox" or "modal" - defines the action after click on marker
				var sidebarResultTarget = "modal"; // use "sidebar", "modal" or "new_page" - defines the action after click on marker
				heroMap(_latitude, _longitude, element, markerTarget, sidebarResultTarget);
				
				$timeout(function () {
					$rootScope.$pageOnLoad = false;
				}, 2000);
			});
		}
	]);