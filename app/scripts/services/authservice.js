'use strict';

/**
 * @ngdoc service
 * @name ocoApp.AuthService
 * @description
 * # AuthService
 * Factory in the ocoApp.
 */
angular.module('ocoApp')
	.factory('AuthService', [
		'$auth', '$firebaseAuth', '$q', 'User', function ($auth, $firebaseAuth, $q, User) {
			
			var authService = {};
			
			var firebaseAuth = $firebaseAuth(firebase.auth());
			var refUsuarios  = firebase.database().ref('usuarios');
			
			authService.createUserWithEmailAndPassword = function (signUpData) {
				var deferred = $q.defer();
				firebaseAuth.$createUserWithEmailAndPassword(signUpData.email, signUpData.password).then(function (user) {
					user.sendEmailVerification();
					user.updateProfile({
						displayName: signUpData.nombre + ' ' + signUpData.apellido,
						photoURL   : 'https://firebasestorage.googleapis.com/v0/b/oco-app.appspot.com/o/avatar.png?alt=media&token=7ba4a7ad-eb42-4f8c-b825-aa7e32332247'
					}).then(function () {
						refUsuarios.child(user.uid).set({
							admin     : false,
							providerId: user.providerId
						}).then(function () {
							deferred.resolve(user);
						}).catch(function (error) {
							deferred.reject(error);
						});
					}).catch(function (error) {
						deferred.reject(error);
					});
				}).catch(function (error) {
					deferred.reject(error);
				});
				
				return deferred.promise;
			};
			
			authService.createUserWithFacebook = function () {
				var deferred = $q.defer();
				
				firebaseAuth.$signInWithPopup('facebook').then(function (response) {
					
					response.user.sendEmailVerification();
					
					refUsuarios.child(response.user.uid).set({
						admin     : false,
						providerId: response.credential.provider
					}).then(function () {
						deferred.resolve(response.user);
					}).catch(function (error) {
						deferred.reject(error);
					});
					
				}).catch(function (error) {
					deferred.reject(error);
				});
				
				return deferred.promise;
			};
			
			authService.login = function (credenciales) {
				
				var deferred = $q.defer();
				
				return firebaseAuth.$signInWithEmailAndPassword(credenciales.email, credenciales.pass).then(function (user) {
					return refUsuarios.child(user.uid).once('value').then(function (snapshot) {
						if (snapshot.val().admin) {
							user.getToken().then(function (token) {
								$auth.setToken(token);
							});
							deferred.resolve(user);
						}
						else {
							firebaseAuth.$signOut();
							deferred.reject({code: 'auth/not-admin', message: 'El usuario no es administrador de negocios.'});
						}
						return deferred.promise;
					});
				});
			};
			
			authService.loginFacebook = function () {
				return firebaseAuth.$signInWithPopup('facebook').then(function (response) {
					response.user.getToken().then(function (token) {
						$auth.setToken(token);
					});
					return response;
				});
			};
			
			authService.logout = function () {
				return $auth.logout().then(function () {
					firebaseAuth.$signOut();
				});
			};
			
			authService.isAuthenticated = function () {
				if ($auth.getPayload() == undefined) {
					return false;
				}
				// Según si hay token
				return $auth.isAuthenticated();
			};
			
			authService.getExpiracionSesion = function () {
				if ($auth.getPayload() == undefined) {
					return null;
				}
				return $auth.getPayload().exp;
			};
			
			authService.getUser = function () {
				var user = firebaseAuth.$getAuth();
				return refUsuarios.child(user.uid).once('value').then(function (snapshot) {
					User.setUser(user, snapshot.val());
					return $q.when(User.getUser());
				});
			};
			
			authService.waitForSignIn = function () {
				return firebaseAuth.$waitForSignIn();
			};
			
			authService.requireSignIn = function () {
				var defer = $q.defer();
				return firebaseAuth.$requireSignIn().then(function (user) {
					return refUsuarios.child(user.uid).once('value').then(function (snapshot) {
						if (snapshot.val().admin) {
							User.setUser(user, snapshot.val());
							defer.resolve(User.getUser());
						}
						else {
							$auth.logout();
							firebaseAuth.$signOut();
							defer.reject('AUTH_REQUIRED');
						}
						
						return defer.promise;
					});
				});
			};
			
			authService.getToken = function () {
				if ((firebaseAuth.$getAuth() === null) || !$auth.isAuthenticated()) {
					return null;
				}
				return $auth.getToken();
			};
			
			authService.firebaseAuth = function () {
				return firebaseAuth;
			};
			
			// Public API here
			return authService;
		}
	]);