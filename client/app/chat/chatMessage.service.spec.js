(function() {
  'use strict';

  describe('Service: ChatMessageService', function() {
    var $httpBackend, socket, ChatMessageService;

    beforeEach(module('chatApp'));
    beforeEach(module('socketMock'));

    beforeEach(inject(function($injector) {
      $httpBackend = $injector.get('$httpBackend');

      $httpBackend.whenGET('/api/chatMessages')
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

      socket = $injector.get('socket');

      ChatMessageService = $injector.get('ChatMessageService');
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be true', function() {
      expect(true).toBe(true);
    });

    it('should get chat messages', function() {
      ChatMessageService.getAll();

      $httpBackend.flush();

      expect(ChatMessageService.chatMessages.length).toBe(2);
    });

    it('should send chat messages', function() {
      ChatMessageService.initSocket();

      var newChatMessage = {
        _id: 3,
        text: 'test text 3',
        author: 'test author 3',
        time: Date.now()
      };

      $httpBackend.expectPOST('/api/chatMessages')
        .respond(newChatMessage);

      ChatMessageService.sendMessage(newChatMessage);

      socket.socket.emit('chatMessage:save', newChatMessage);

      expect(ChatMessageService.chatMessages.length).toBe(1);

      ChatMessageService.unInitSocket();

      $httpBackend.flush();
    });
  });
})();
