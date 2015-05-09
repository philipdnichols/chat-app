(function() {
  /*jshint expr: true*/
  'use strict';

  var should = require('should');
  var app = require('../../app');
  var request = require('supertest');

  describe('PATCH /api/chatMessages', function() {
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
      .patch('/api/chatMessages/' + id + 'invalid')
      .send({})
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
      request(app)
        .patch('/api/chatMessages/' + id)
        .send({ text: 'Test Text Updated' })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          var patchedChatMessage = res.body;

          patchedChatMessage.text.should.equal('Test Text Updated');
          patchedChatMessage.author.should.equal(chatMessage.author);
          // TODO figure out formatting here patchedChatMessage.time.should.equal(chatMessage.time);

          done(err);
        });
    });

    it('should update chatMessage.author', function(done) {
      request(app)
        .patch('/api/chatMessages/' + id)
        .send({ author: 'Test Author Updated' })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          var patchedChatMessage = res.body;

          patchedChatMessage.text.should.equal(chatMessage.text);
          patchedChatMessage.author.should.equal('Test Author Updated');
          // TODO figure out formatting here patchedChatMessage.time.should.equal(chatMessage.time);

          done(err);
        });
    });

    it('should update chatMessage.time', function(done) {
      var newTime = Date.now();

      request(app)
        .patch('/api/chatMessages/' + id)
        .send({ time: newTime })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          var patchedChatMessage = res.body;

          patchedChatMessage.text.should.equal(chatMessage.text);
          patchedChatMessage.author.should.equal(chatMessage.author);
          // TODO figure out formatting here patchedChatMessage.time.should.equal(newTime);

          done(err);
        });
    });
  });
})();
