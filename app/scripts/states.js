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
				resolve    : {
					currentUser: [
						'AuthService', function (AuthService) {
							return AuthService.getUser();
						}
					]
				}
			})
			.state('map', {
				url        : '/map',
				templateUrl: 'views/map.html',
				data       : {
					pageTitle: 'Map'
				},
				controller : 'MapCtrl as mapCtrl',
				resolve    : {
					currentUser: [
						'AuthService', function (AuthService) {
							return AuthService.getUser();
						}
					]
				}
			})
			.state('place', {
				url        : '/place',
				templateUrl: 'views/place.html',
				data       : {
					pageTitle: 'Place'
				},
				controller : 'PlaceCtrl as placeCtrl',
				resolve    : {
					currentUser: [
						'AuthService', function (AuthService) {
							return AuthService.getUser();
						}
					]
				}
			})
			.state('listing', {
				url        : '/listing',
				templateUrl: 'views/listing.html',
				data       : {
					pageTitle: 'Listing'
				},
				controller : 'ListingCtrl as listingCtrl',
				resolve    : {
					currentUser: [
						'AuthService', function (AuthService) {
							return AuthService.getUser();
						}
					]
				}
			})
			.state('edit-profile', {
				url        : '/edit/profile',
				templateUrl: 'views/edit-profile.html',
				data       : {
					pageTitle: 'Edit Profile'
				},
				controller : 'EditProfileCtrl as editProfileCtrl',
				resolve    : {
					currentUser: [
						'AuthService', function (AuthService) {
							return AuthService.getUser();
						}
					]
				}
			})
	}
]);