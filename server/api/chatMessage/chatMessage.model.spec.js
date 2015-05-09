(function() {
  /*jshint expr: true*/
  'use strict';

  var should = require('should');
  var app = require('../../app');
  var ChatMessage = require('./chatMessage.model');

  var chatMessage = new ChatMessage({
    text: 'Fake Message',
    author: 'Fake Author',
    time: Date.now()
  });

  describe('ChatMessage Model', function() {
    beforeEach(function(done) {
      // Clear chatMessages before testing
      ChatMessage.remove().exec().then(function() {
        done();
      });
    });

    // afterEach(function(done) {
    //   // Clear chatMessages after each test
    //   ChatMessage.remove().exec().then(function() {
    //     done();
    //   });
    // });

    it('should begin with no chatMessages', function(done) {
      ChatMessage.find({}, function(err, chatMessages) {
        if (err) {
          return done(err);
        }

        chatMessages.should.have.length(0);
        done();
      });
    });

    it('should contain text (String), author (String) and time (Date) attributes', function(done) {
      chatMessage.save(function(err) {
        if (err) {
          return done(err);
        }

        ChatMessage.find({}, function(err, chatMessages) {
          if (err) {
            return done(err);
          }

          chatMessages.should.have.length(1);

          chatMessages[0].should.have.property('_id');

          chatMessages[0].should.have.property('text');
          chatMessages[0].text.should.be.a.String;

          chatMessages[0].should.have.property('author');
          chatMessages[0].author.should.be.a.String;

          chatMessages[0].should.have.property('time');
          chatMessages[0].time.should.be.a.Date;

          done();
        });
      });
    });

    it('should fail when saving without text', function(done) {
      chatMessage.text = '';
      chatMessage.save(function(err) {
        should.exist(err);
        done();
      });
    });

    it('should fail when saving without an author', function(done) {
      chatMessage.author = '';
      chatMessage.save(function(err) {
        should.exist(err);
        done();
      });
    });

    it('should fail when saving without a time', function(done) {
      chatMessage.time = null;
      chatMessage.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });
})();
