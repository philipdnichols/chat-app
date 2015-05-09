(function() {
  'use strict';

  var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

  var ChatMessageSchema = new Schema({
    text: String,
    author: String,
    time: Date
  });

  /**
   * Validations
   */

  // Validate empty text
  ChatMessageSchema
    .path('text')
    .validate(function(text) {
      return text.length;
    }, 'ChatMessage \'text\' cannot be blank');

  // Validate empty author
  ChatMessageSchema
    .path('author')
    .validate(function(author) {
      return author.length;
    }, 'ChatMessage \'author\' cannot be blank');

  // Validate empty time
  ChatMessageSchema
    .path('time')
    .validate(function(time) {
      return time !== '' && time !== null;
    }, 'ChatMessage \'time\' cannot be blank');

  module.exports = mongoose.model('ChatMessage', ChatMessageSchema);
})();
