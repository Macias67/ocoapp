'use strict';

/**
 * @ngdoc service
 * @name ocoApp.AUTHEVENTS
 * @description
 * # AUTHEVENTS
 * Constant in the ocoApp.
 */
angular.module('ocoApp')
	.constant('AUTHEVENTS', {
		loginSuccess    : 'auth-login-success',
		loginFailed     : 'auth-login-failed',
		logoutSuccess   : 'auth-logout-success',
		sessionTimeout  : 'auth-session-timeout',
		notAuthenticated: 'auth-not-authenticated',
		notAuthorized   : 'auth-not-authorized'
	});

