'use strict';

describe('Controller: HeadCtrl', function () {
	
	// load the controller's module
	beforeEach(module('ocoApp'));
	
	var HeadCtrl,
	    scope;
	
	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope) {
		scope    = $rootScope.$new();
		HeadCtrl = $controller('HeadCtrl', {
			$scope: scope
			// place here mocked dependencies
		});
	}));
	
	it('should attach a list of awesomeThings to the scope', function () {
		expect(HeadCtrl.awesomeThings.length).toBe(3);
	});
});
