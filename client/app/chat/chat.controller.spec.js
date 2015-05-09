'use strict';

describe('Controller: ChatCtrl', function () {

  // load the controller's module
  beforeEach(module('chatApp'));
  beforeEach(module('socketMock'));

  var ChatCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/chatMessages')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    ChatCtrl = $controller('ChatCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of things to the scope', function () {
    $httpBackend.flush();
    expect(scope.messages.length).toBe(4);
  });
});
