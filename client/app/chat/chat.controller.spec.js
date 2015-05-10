(function() {
  'use strict';

  describe('Controller: ChatController', function() {
    var $rootScope, ChatMessageService, createController;

    beforeEach(module('chatApp', function($provide) {
      ChatMessageService = jasmine.createSpyObj('ChatMessageService', [
        'sendMessage'
      ]);

      ChatMessageService.chatMessages = [{
        _id: 1,
        text: 'test text 1',
        author: 'test author 1',
        time: Date.now()
      }, {
        _id: 2,
        text: 'test text 2',
        author: 'test author 2',
        time: Date.now()
      }];

      ChatMessageService.sendMessage.andCallFake(function(newChatMessage) {
        ChatMessageService.chatMessages.push(newChatMessage);
      });

      // ChatMessageService.getChatMessages.andCallFake(function() {
      //   console.log('im in here');
      //   return [{
      //     _id: 1,
      //     text: 'test text 1',
      //     author: 'test author 1',
      //     time: Date.now()
      //   }, {
      //     _id: 2,
      //     text: 'test text 2',
      //     author: 'test author 2',
      //     time: Date.now()
      //   }];
      // });

      // ChatMessageService.chatMessages.andReturn([{
      //   _id: 1,
      //   text: 'test text 1',
      //   author: 'test author 1',
      //   time: Date.now()
      // }, {
      //   _id: 2,
      //   text: 'test text 2',
      //   author: 'test author 2',
      //   time: Date.now()
      // }]);

      $provide.value('ChatMessageService', ChatMessageService);
    }));

    beforeEach(inject(function($injector) {
      $rootScope = $injector.get('$rootScope');

      ChatMessageService = $injector.get('ChatMessageService');

      var $controller = $injector.get('$controller');

      createController = function() {
        return $controller('ChatController', {
          '$scope': $rootScope,
          'ChatMessageService': ChatMessageService
        });
      };
    }));

    it('should be true', function() {
      expect(true).toBe(true);
    });

    it('should attach a list of messages', function() {
      var controller = createController();

      expect(controller.messages.length).toBe(2);
    });

    it('should send chat messages', function() {
      var controller = createController();

      controller.chatName = 'test author 3';
      controller.newMessage = 'test text 3';

      var newChatMessage = {
        _id: 3,
        text: 'test text 3',
        author: 'test author 3',
        time: Date.now()
      };

      controller.sendMessage(newChatMessage);

      expect(controller.messages.length).toBe(3);
    });
  });
})();
