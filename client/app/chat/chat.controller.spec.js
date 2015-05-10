(function() {
  'use strict';

  describe('Controller: ChatController', function() {
    var $httpBackend, $rootScope, socket, createController;

    beforeEach(module('chatApp'));
    beforeEach(module('socketMock'));

    beforeEach(inject(function($injector) {
      $httpBackend = $injector.get('$httpBackend');

      $httpBackend.expectGET('/api/chatMessages')
        .respond([{
          _id: 1,
          text: 'test text 1',
          author: 'test author 1',
          time: Date.now()
        }, {
          _id: 2,
          text: 'test text 2',
          author: 'test author 2',
          time: Date.now()
        }]);

      $rootScope = $injector.get('$rootScope');

      socket = $injector.get('socket');

      var $controller = $injector.get('$controller');

      createController = function() {
        return $controller('ChatController', {
          '$scope': $rootScope
        });
      };
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be true', function() {
      createController();
      $httpBackend.flush();

      expect(true).toBe(true);
    });

    it('should attach a list of messages', function() {
      var controller = createController();
      $httpBackend.flush();

      expect(controller.messages.length).toBe(2);
    });

    it('should send chat messages', function() {
      var controller = createController();
      $httpBackend.flush();

      controller.chatName = 'test author 3';
      controller.newMessage = 'test text 3';

      var newChatMessage = {
        _id: 3,
        text: 'test text 3',
        author: 'test author 3',
        time: Date.now()
      };

      $httpBackend.expectPOST('/api/chatMessages')
        .respond(newChatMessage);

      controller.sendMessage();
      socket.socket.emit('chatMessage:save', newChatMessage);

      $httpBackend.flush();

      expect(controller.messages.length).toBe(3);
    });
  });
})();
