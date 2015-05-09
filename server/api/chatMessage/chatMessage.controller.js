(function() {
  'use strict';

  var _ = require('lodash');
  var ChatMessage = require('./chatMessage.model');

  // Get list of chatMessages
  exports.index = function(req, res) {
    ChatMessage.find(function(err, chatMessages) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, chatMessages);
    });
  };

  // Get a single chatMessage
  exports.show = function(req, res) {
    ChatMessage.findById(req.params.id, function(err, chatMessage) {
      if (err) {
        return handleError(res, err);
      }
      if (!chatMessage) {
        return res.send(404);
      }
      return res.json(chatMessage);
    });
  };

  // Creates a new chatMessage in the DB.
  exports.create = function(req, res) {
    ChatMessage.create(req.body, function(err, chatMessage) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(201, chatMessage);
    });
  };

  // Updates an existing chatMessage in the DB.
  exports.update = function(req, res) {
    if (req.body._id) {
      delete req.body._id;
    }
    ChatMessage.findById(req.params.id, function(err, chatMessage) {
      if (err) {
        return handleError(res, err);
      }
      if (!chatMessage) {
        return res.send(404);
      }
      var updated = _.merge(chatMessage, req.body);
      updated.save(function(err) {
        if (err) {
          return handleError(res, err);
        }
        return res.json(200, chatMessage);
      });
    });
  };

  // Deletes a chatMessage from the DB.
  exports.destroy = function(req, res) {
    ChatMessage.findById(req.params.id, function(err, chatMessage) {
      if (err) {
        return handleError(res, err);
      }
      if (!chatMessage) {
        return res.send(404);
      }
      chatMessage.remove(function(err) {
        if (err) {
          return handleError(res, err);
        }
        return res.send(204);
      });
    });
  };

  function handleError(res, err) {
    return res.send(500, err);
  }
})();
