(function() {
  'use strict';

  angular.module('chatApp')
    .factory('ChatMessageService', ChatMessageService);

  ChatMessageService.$inject = ['$http', 'socket'];

  function ChatMessageService($http, socket) {
    var service = {
      chatMessages: [],
      sendMessage: sendMessage,
      getAll: getAll,
      initSocket: initSocket,
      unInitSocket: unInitSocket
    };

    function getAll() {
      return $http.get('/api/chatMessages').success(function(data) {
        angular.copy(data, service.chatMessages);
      });
    }

    function sendMessage(chatMessage) {
      return $http.post('/api/chatMessages', chatMessage);
    }

    function initSocket() {
      socket.syncUpdates('chatMessage', service.chatMessages);
    }

    function unInitSocket() {
      socket.unsyncUpdates('chatMessage');
    }

    return service;
  }
})();
