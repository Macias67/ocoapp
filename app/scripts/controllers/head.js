'use strict';

/**
 * @ngdoc function
 * @name ocoApp.controller:HeadCtrl
 * @description
 * # HeadCtrl
 * Controller of the ocoApp
 */
angular.module('ocoApp')
	.controller('HeadCtrl', [
		'$scope', '$uibModal', function ($scope, $uibModal) {
			
			var vm = this;
			
			vm.credenciales = {};
			
			vm.signInModal = function () {
				$uibModal.open({
					animation  : true,
					keyboard   : true,
					templateUrl: 'views/modal/signin.html',
					size       : 'dialog width-400px',
					controller : 'ModalCreaCuentaCtrl as modalCreaCuentaCtrl'
				});
			};
			
			vm.registroModal = function () {
				$uibModal.open({
					animation  : true,
					keyboard   : true,
					templateUrl: 'views/modal/registro.html',
					size       : 'dialog width-400px',
					controller : 'ModalSignInCtrl as modalSignInCtrl'
				});
			};
			
			$scope.$on('$viewContentLoaded', function () {
			});
		}
	])
	.controller('ModalSignInCtrl', [
		'$uibModalInstance',
		'$uibModal',
		function ($uibModalInstance, $uibModal) {
			var vm = this;
			
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
				console.log('ola mundo');
			});
		}
	]).controller('ModalResetPass', [
	'$uibModalInstance', function ($uibModalInstance) {
		var vm = this;
		
		vm.close = function () {
			$uibModalInstance.dismiss('cancel');
		};
	}
]).controller('ModalCreaCuentaCtrl', [
	'$uibModalInstance', function ($uibModalInstance) {
		var vm = this;
		
		vm.close = function () {
			$uibModalInstance.dismiss('cancel');
		};
	}
]);
