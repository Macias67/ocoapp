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
	'blockUI',
  'ngMap'
]);

ocoApp.config([
	'$authProvider', function ($authProvider) {
		$authProvider.tokenName   = 'token';
		$authProvider.tokenPrefix = 'fb';
	}
]);

ocoApp.run([
	'$rootScope', '$state', 'AuthService',
	function ($rootScope, $state, AuthService) {
		$rootScope.$state           = $state; // state to be accessed from view
		$rootScope.$pageOnLoad      = true;
		$rootScope.$isAuthenticated = AuthService.isAuthenticated();
		
		AuthService.firebaseAuth().$onAuthStateChanged(function (user) {
			if (user) {
				AuthService.getUser().then(function (usuario) {
					$rootScope.$usuario = usuario;
				});
			}
			else {
				$rootScope.$usuario = user;
			}
		});
	}
]);
