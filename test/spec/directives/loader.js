'use strict';

describe('Directive: Loader', function () {

  // load the directive's module
  beforeEach(module('ocoApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<-loader></-loader>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the Loader directive');
  }));
});
