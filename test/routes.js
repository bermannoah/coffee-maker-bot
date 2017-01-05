var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var config = require('../config/config');

describe('Routing', function() {
  var url = 'http://localhost:8080'
  
  before(function(done) {
    mongoose.connect(config.db);
    done();
  });
  
  describe('Makes', function() {
    it('should return an error when given an invalid make type', function(done) {
      var makeType = { type: 'so very wrong' };
      request(url)
        .post('/api/v1/makes')
        .send(makeType)
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          res.body.should.have.property('message', 'Not sure what you meant by that.' );
          done();
        });
    });
    
    it('should return the correct response when given the coffee brew type', function(done) {
      var makeType = { type: 'coffee' };
      request(url)
        .post('/api/v1/makes')
        .send(makeType)
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          res.body.should.have.property('message', 'Heating water for coffee!' );
          done();
        });
    });
  });
});