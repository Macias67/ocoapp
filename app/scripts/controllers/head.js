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
		'$uibModal',
		function ($scope, $uibModal) {
			
			var vm = this;
			
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
		'$uibModalInstance',
		'$uibModal',
		function ($uibModalInstance, $uibModal) {
			var vm = this;
			
			vm.credenciales = {};
			
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
		'$uibModalInstance',
		'AuthService',
		'blockUI',
		function ($uibModalInstance, AuthService, blockUI) {
			var vm = this;
			
			vm.infoUser = {};
			
			vm.creaCuentaEmail = function () {
				
				blockUI.start('Creando cuenta...');
				
				AuthService.createUserWithEmailAndPassword(vm.infoUser).then(function (user) {
					console.info(user);
					
					//blockUI.stop();
					$uibModalInstance.dismiss('cancel');
					
				}).catch(function (error) {
					console.info(error);
				});
				
			};
			
			vm.creaCuentaFacebook = function () {
				AuthService.createUserWithFacebook().then(function (user) {
					console.info(user);
				}).catch(function (error) {
					console.info(error);
				});
			};
			
			vm.close = function () {
				$uibModalInstance.dismiss('cancel');
			};
		}
	]);
