'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ChatMessageSchema = new Schema({
  text: String,
  author: String,
  time: Date
});

module.exports = mongoose.model('ChatMessage', ChatMessageSchema);
