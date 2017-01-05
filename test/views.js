var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var config = require('../config/config');
var expect = require('chai').expect

describe('Routing', function() {
  var url = 'http://localhost:8080'
  var page = '../app/views/index.jade'
  
  before(function(done) {
    mongoose.connect(config.db);
    done();
  });
  
  // expect(url).to.have.property('Coffee (Maker) Bot')
  // expect(url).to.have.property('Tap here to report a brew!')
  // expect(url).to.have.property('Tap here to start a brew!')
  expect(page).to.have.property('p')


});