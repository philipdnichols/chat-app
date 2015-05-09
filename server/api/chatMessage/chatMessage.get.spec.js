(function() {
  /*jshint expr: true*/
  'use strict';

  var should = require('should');
  var app = require('../../app');
  var request = require('supertest');

  describe('GET /api/chatMessages', function() {
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

    it('should respond with a JSON array', function(done) {
      request(app)
        .get('/api/chatMessages')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.should.be.an.Array;
          done();
        });
    });

    it('should respond with a valid chatMessage', function(done) {
      request(app)
        .get('/api/chatMessages/' + id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          var retrievedChatMessage = res.body;

          retrievedChatMessage.should.have.property('_id');
          retrievedChatMessage.should.have.property('text');
          retrievedChatMessage.should.have.property('author');
          retrievedChatMessage.should.have.property('time');

          retrievedChatMessage.text.should.equal(chatMessage.text);
          retrievedChatMessage.author.should.equal(chatMessage.author);
          // TODO figure out formatting here retrievedChatMessage.time.should.equal(chatMessage.time);

          done();
        });
    });

  });
})();
