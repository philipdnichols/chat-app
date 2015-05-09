(function() {
  /*jshint expr: true*/
  'use strict';

  var should = require('should');
  var app = require('../../app');
  var request = require('supertest');

  describe('PUT /api/chatMessages', function() {
    var id;
    var chatMessage = {
      text: 'Test Text',
      author: 'Test Author',
      time: Date.now()
    };

    beforeEach(function(done) {
      request(app)
        .post('/api/chatMessages')
        .send(chatMessage)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          id = res.body._id;
          done();
        });
    });

    it('should fail with an invalid id', function(done) {
      request(app)
      .put('/api/chatMessages/' + id + 'invalid')
      .send(chatMessage)
      .expect(500)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }

        res.should.have.status(500);
        done();
      })
    });

    it('should update chatMessage.text', function(done) {
      chatMessage.text = 'Test Text Updated';

      request(app)
        .put('/api/chatMessages/' + id)
        .send(chatMessage)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          var puttedChatMessage = res.body;

          puttedChatMessage.text.should.equal(chatMessage.text);
          puttedChatMessage.author.should.equal(chatMessage.author);
          // TODO figure out formatting here puttedChatMessage.time.should.equal(chatMessage.time);

          done(err);
        });
    });

    it('should update chatMessage.author', function(done) {
      chatMessage.author = 'Test Author Updated';

      request(app)
        .put('/api/chatMessages/' + id)
        .send(chatMessage)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          var puttedChatMessage = res.body;

          puttedChatMessage.text.should.equal(chatMessage.text);
          puttedChatMessage.author.should.equal(chatMessage.author);
          // TODO figure out formatting here puttedChatMessage.time.should.equal(chatMessage.time);

          done(err);
        });
    });

    it('should update chatMessage.time', function(done) {
      chatMessage.time = Date.now();

      request(app)
        .put('/api/chatMessages/' + id)
        .send(chatMessage)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          var puttedChatMessage = res.body;

          puttedChatMessage.text.should.equal(chatMessage.text);
          puttedChatMessage.author.should.equal(chatMessage.author);
          // TODO figure out formatting here puttedChatMessage.time.should.equal(chatMessage.time);

          done(err);
        });
    });
  });
})();
