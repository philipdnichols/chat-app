(function() {
  'use strict';

  angular.module('chatApp')
    .controller('ChatController', ChatController);

  ChatController.$inject = ['$scope', 'ChatMessageService'];

  function ChatController($scope, ChatMessageService) {
    var chat = this;

    chat.init = init;
    chat.sendMessage = sendMessage;

    function init() {
      chat.messages = ChatMessageService.chatMessages;

      chat.chatName = '';
      chat.newMessage = '';
    }

    function sendMessage() {
      if (chat.newMessage === '') {
        return;
      }

      ChatMessageService.sendMessage({
        text: chat.newMessage,
        author: (chat.chatName === '') ? 'Anonymous' : chat.chatName,
        time: Date.now()
      });

      chat.newMessage = '';
    }

    $scope.$on('$destroy', function() {
      ChatMessageService.unInitSocket();
    });

    chat.init();
  }
})();
