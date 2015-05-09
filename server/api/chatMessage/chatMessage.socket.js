/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var ChatMessage = require('./chatMessage.model');

exports.register = function(socket) {
  ChatMessage.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  ChatMessage.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('chatMessage:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('chatMessage:remove', doc);
}