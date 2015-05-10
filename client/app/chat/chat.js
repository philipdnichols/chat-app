(function() {
  'use strict';

  angular.module('chatApp')
    .config(function($stateProvider) {
      $stateProvider
        .state('chat', {
          url: '/chat',
          templateUrl: 'app/chat/chat.html',
          controller: 'ChatController',
          controllerAs: 'chat',
          resolve: {
            getAllChatMessagesPromise: [
              'ChatMessageService',
              function(ChatMessageService) {
                ChatMessageService.initSocket();
                return ChatMessageService.getAll();
              }
            ]
          }
        });
    });
})();
