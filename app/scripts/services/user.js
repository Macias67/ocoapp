'use strict';

/**
 * @ngdoc service
 * @name ocoApp.User
 * @description
 * # User
 * Service in the ocoApp.
 */
angular.module('ocoApp')
	.service('User', function () {
		this._user = {};
		
		this.setUser = function (user, snapshot) {
			this._user.displayName   = user.displayName;
			this._user.email         = user.email;
			this._user.emailVerified = user.emailVerified;
			this._user.isAnonymous   = user.isAnonymous;
			this._user.photoURL      = user.photoURL;
			this._user.providerData  = user.providerData;
			this._user.providerId    = user.providerId;
			this._user.refreshToken  = user.refreshToken;
			this._user.uid           = user.uid;
		};
		
		this.getUser = function () {
			return this._user;
		};
	});
