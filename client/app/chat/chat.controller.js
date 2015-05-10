(function() {
  'use strict';

  angular.module('chatApp')
    .controller('ChatController', ChatController);

  ChatController.$inject = ['$scope', '$http', 'socket'];

  function ChatController($scope, $http, socket) {
    var chat = this;

    chat.init = init;
    chat.sendMessage = sendMessage;

    function init() {
      chat.messages = [];

      chat.chatName = '';
      chat.newMessage = '';

      $http.get('/api/chatMessages').success(function(chatMessages) {
        chat.messages = chatMessages;
        socket.syncUpdates('chatMessage', chat.messages);
      });
    }

    function sendMessage() {
      if (chat.newMessage === '') {
        return;
      }

      $http.post('/api/chatMessages', {
        text: chat.newMessage,
        author: (chat.chatName === '') ? 'Anonymous' : chat.chatName,
        time: Date.now()
      });

      chat.newMessage = '';
    }

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('chatMessage');
    });

    chat.init();
  }
})();
