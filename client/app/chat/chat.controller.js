'use strict';

angular.module('chatApp')
  .controller('ChatCtrl', function ($scope, $http, socket) {
    $scope.messages = [];

    $scope.newMessage = '';

    $http.get('/api/chatMessages').success(function(chatMessages) {
      $scope.messages = chatMessages;
      socket.syncUpdates('chatMessage', $scope.messages);
    });

    $scope.sendMessage = function() {
      if ($scope.newMessage === '') {
        return;
      }

      $http.post('/api/chatMessages', { text: $scope.newMessage, author: ($scope.chatName === '') ? 'Anonymous' : $scope.chatName, time: Date.now() });
      $scope.newMessage = '';
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('chatMessage');
    });
  });
