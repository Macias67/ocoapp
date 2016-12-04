'use strict';

/**
 * @ngdoc function
 * @name ocoApp.controller:HeadCtrl
 * @description
 * # HeadCtrl
 * Controller of the ocoApp
 */
angular.module('ocoApp')
/**
 * Head Controler
 */
	.controller('HeadCtrl', [
		'$scope',
		'$rootScope',
		'$uibModal',
		'$state',
		'AuthService',
		'AUTHEVENTS',
		function ($scope, $rootScope, $uibModal, $state, AuthService, AUTHEVENTS) {
			
			var vm = this;
			
			vm.menuUsuario = {
				miPerfil: function () {
					
				},
				salir   : function () {
					AuthService.logout().then(function () {
						$rootScope.$emit(AUTHEVENTS.logoutSuccess);
					});
				}
			};
			
			vm.signInModal = function () {
				$uibModal.open({
					animation  : true,
					keyboard   : true,
					templateUrl: 'views/modal/signin.html',
					size       : 'dialog width-400px',
					controller : 'ModalSignInCtrl as modalSignInCtrl'
				});
			};
			
			vm.registroModal = function () {
				$uibModal.open({
					animation  : true,
					keyboard   : true,
					templateUrl: 'views/modal/registro.html',
					size       : 'dialog width-400px',
					controller : 'ModalCreaCuentaCtrl as modalCreaCuentaCtrl'
				});
			};
			
			$scope.$on('$viewContentLoaded', function () {
			});
		}
	])
	/**
	 * Modal Inicio de Sesión
	 */
	.controller('ModalSignInCtrl', [
		'$rootScope',
		'$uibModalInstance',
		'$uibModal',
		'AuthService',
		'AUTHEVENTS',
		'blockUI',
		function ($rootScope, $uibModalInstance, $uibModal, AuthService, AUTHEVENTS, blockUI) {
			var vm = this;
			
			vm.credenciales = {};
			
			vm.signIn = function () {
				
				blockUI.start('Entrando...');
				
				AuthService.login(vm.credenciales)
					.then(function (user) {
						blockUI.stop();
						$uibModalInstance.dismiss('cancel');
						$rootScope.$emit(AUTHEVENTS.loginSuccess, user);
					})
					.catch(function (error) {
						blockUI.stop();
						$rootScope.$emit(AUTHEVENTS.loginFailed, error);
					});
			};
			
			vm.signInFacebook = function () {
				AuthService.loginFacebook().then(function (user) {
					$uibModalInstance.dismiss('cancel');
					$rootScope.$emit(AUTHEVENTS.loginSuccess, user);
				}).catch(function (error) {
					$rootScope.$emit(AUTHEVENTS.loginFailed, error);
				});
			};
			
			vm.resetPassModal = function () {
				$uibModal.open({
					animation  : true,
					keyboard   : true,
					templateUrl: 'views/modal/resetpassword.html',
					size       : 'dialog width-400px',
					controller : 'ModalResetPass as modalResetPass'
				});
			};
			
			vm.close = function () {
				$uibModalInstance.dismiss('cancel');
			};
			
			$uibModalInstance.rendered.then(function () {
			});
		}
	])
	/**
	 * Modal Reset Password
	 */
	.controller('ModalResetPass', [
		'$uibModalInstance',
		function ($uibModalInstance) {
			var vm = this;
			
			vm.close = function () {
				$uibModalInstance.dismiss('cancel');
			};
		}
	])
	/**
	 * Modal Crea Cuenta
	 */
	.controller('ModalCreaCuentaCtrl', [
		'$rootScope',
		'$uibModalInstance',
		'AuthService',
		'blockUI',
		'AUTHEVENTS',
		function ($rootScope, $uibModalInstance, AuthService, blockUI, AUTHEVENTS) {
			var vm = this;
			
			vm.infoUser = {};
			
			vm.creaCuentaEmail = function () {
				blockUI.start('Creando cuenta...');
				AuthService.createUserWithEmailAndPassword(vm.infoUser).then(function (user) {
					$rootScope.$emit(AUTHEVENTS.loginSuccess, user);
					blockUI.stop();
					$uibModalInstance.dismiss('cancel');
				}).catch(function (error) {
					blockUI.stop();
					console.error(error);
				});
			};
			
			vm.creaCuentaFacebook = function () {
				blockUI.start('Creando cuenta...');
				AuthService.createUserWithFacebook().then(function (user) {
					$rootScope.$emit(AUTHEVENTS.loginSuccess, user);
					blockUI.stop();
					$uibModalInstance.dismiss('cancel');
				}).catch(function (error) {
					blockUI.stop();
					console.error(error);
				});
			};
			
			vm.close = function () {
				$uibModalInstance.dismiss('cancel');
			};
		}
	]);
