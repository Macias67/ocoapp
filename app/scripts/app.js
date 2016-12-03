'use strict';

/**
 * @ngdoc overview
 * @name ocoApp
 * @description
 * # ocoApp
 *
 * Main module of the application.
 */
var ocoApp = angular.module('ocoApp', [
	'ngAnimate',
	'ui.router',
	'ui.bootstrap',
	'firebase',
	'satellizer',
	'blockUI'
]);

ocoApp.run([
	'$rootScope', '$state',
	function ($rootScope, $state) {
		$rootScope.$state = $state; // state to be accessed from view
		$rootScope.$pageOnLoad = true;
	}
]);
