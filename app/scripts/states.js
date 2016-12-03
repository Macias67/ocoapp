angular.module('ocoApp').config([
	'$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
		
		// Redirect any unmatched url
		$urlRouterProvider.otherwise(function ($injector) {
			var $state = $injector.get('$state');
			$state.go('welcome');
		});
		
		$stateProvider
			.state('welcome', {
				url        : '/',
				templateUrl: 'views/welcome.html',
				data       : {
					pageTitle: 'Bienvenido'
				},
				controller : 'WelcomeCtrl as welcomeCtrl',
			})
			.state('place', {
				url        : '/place',
				templateUrl: 'views/place.html',
				data       : {
					pageTitle: 'Place'
				},
				controller : 'PlaceCtrl as placeCtrl',
			})
	}
]);