(function() {
  /*jshint expr: true*/
  'use strict';

  var should = require('should');
  var app = require('../../app');
  var request = require('supertest');

  describe('POST /api/chatMessages', function() {
    var chatMessage = {
      text: 'Test Text',
      author: 'Test Author',
      time: Date.now()
    };

    it('should respond with the successful chatMessage', function(done) {
      request(app)
        .post('/api/chatMessages')
        .send(chatMessage)
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          var postedChatMessage = res.body;

          postedChatMessage.should.have.property('_id');
          postedChatMessage.should.have.property('text');
          postedChatMessage.should.have.property('author');
          postedChatMessage.should.have.property('time');

          postedChatMessage.text.should.equal(chatMessage.text);
          postedChatMessage.author.should.equal(chatMessage.author);
          // TODO figure out formatting here postedChatMessage.time.should.equal(chatMessage.time);

          done();
        });
    });

    it('should respond with an error if an invalid chatMessage (no text) is POST\'ed', function(done) {
      chatMessage.text = '';

      request(app)
        .post('/api/chatMessages')
        .send(chatMessage)
        .expect(500)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.should.have.status(500);

          done();
        });
    });

    it('should respond with an error if an invalid chatMessage (no author) is POST\'ed', function(done) {
      chatMessage.author = '';

      request(app)
        .post('/api/chatMessages')
        .send(chatMessage)
        .expect(500)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.should.have.status(500);

          done();
        });
    });

    it('should respond with an error if an invalid chatMessage (no time) is POST\'ed', function(done) {
      chatMessage.time = null;

      request(app)
        .post('/api/chatMessages')
        .send(chatMessage)
        .expect(500)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.should.have.status(500);

          done();
        });
    });
  });
})();
