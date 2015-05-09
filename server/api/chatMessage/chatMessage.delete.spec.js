(function() {
  /*jshint expr: true*/
  'use strict';

  var should = require('should');
  var app = require('../../app');
  var request = require('supertest');

  describe('DELETE /api/chatMessages', function() {
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

    it('should delete a valid chat message', function(done) {
      request(app)
      .delete('/api/chatMessages/' + id)
      .expect(204)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }

        res.should.have.status(204);

        request(app)
        .get('/api/chatMessages/' + id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.should.have.status(404);

          done();
        });
      });
    });

    it('should fail with an invalid id', function(done) {
      request(app)
      .delete('/api/chatMessages/' + id + 'invalid')
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
