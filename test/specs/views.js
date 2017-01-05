var assert = require('assert');
var Launcher = require('webdriverio').Launcher;
var webdriverio = require('wdio-mocha-framework');
var wdio = new Launcher('./wdio.conf.js');

describe('main view page', function() {
  it('should have the right title', function() {
    browser.url('http://localhost:8080');
    var title = browser.getTitle();
    assert.equal(title, 'Coffee (Maker) Bot');
  });
  
  it('should have option to log a brew', function() {
    browser.url('http://localhost:8080');
    var logBrew = browser.getText('#brew-logger');
    assert.equal(logBrew, 'Tap here to log a brew!');
  });

  it('should have option to log a brew', function() {
    browser.url('http://localhost:8080');
    var startBrew = browser.getText('#brew-starter');
    assert.equal(startBrew, 'Tap here to start a brew!');
  });
});