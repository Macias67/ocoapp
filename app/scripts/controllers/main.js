'use strict';

/**
 * @ngdoc function
 * @name ocoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ocoApp
 */
ocoApp.controller('MainCtrl', [
	'$rootScope', 'AUTHEVENTS', '$state', 'AuthService',
	function ($rootScope, AUTHEVENTS, $state, AuthService) {
		
		$rootScope.$on(AUTHEVENTS.loginSuccess, function (e, data) {
			e.preventDefault();
			$state.transitionTo($state.current, null, {
				reload: true, inherit: false, notify: true
			}).then(function () {
				$rootScope.$isAuthenticated = AuthService.isAuthenticated();
			});
		});
		
		$rootScope.$on(AUTHEVENTS.loginFailed, function (e, error) {
			e.preventDefault();
			console.log(error);
			var msj = '';
			switch (error.code) {
				case 'auth/account-exists-with-different-credential':
					break;
				case 'auth/invalid-credential':
					break;
				case 'auth/operation-not-allowed':
					break;
				case 'auth/user-disabled':
					break;
				case 'auth/user-not-found':
					break;
				case 'auth/wrong-password':
					break;
				case 'auth/not-admin':
					break;
			}
			
			console.error(error.code);
			
			//Notification.error(null, error.message);
		});
		
		$rootScope.$on(AUTHEVENTS.logoutSuccess, function (e) {
			e.preventDefault();
			$state.transitionTo('welcome', null, {
				reload: true, inherit: false, notify: true
			}).then(function () {
				$rootScope.$isAuthenticated = AuthService.isAuthenticated();
			});
		});
		
	}
]);