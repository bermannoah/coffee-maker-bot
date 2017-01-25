var express = require('express');
var config = require('./config/config');
var glob = require('glob');
var mongoose = require('mongoose');
var awsIot = require('aws-iot-device-sdk');

var thingShadows = awsIot.thingShadow({
   keyPath: "/home/noah/aws-iot/coffee-maker-bot.private.key",
  certPath: "/home/noah/aws-iot/coffee-maker-bot.cert.pem",
    caPath: "/home/noah/aws-iot/root-CA.crt",
  clientId: "coffee-maker-bot",
    region: "us-west-2"
});

thingShadows.on('connect', function() {
//
// After connecting to the AWS IoT platform, register interest in the
// Thing Shadow named 'RGBLedLamp'.
//
    thingShadows.register( 'coffee-maker-bot', function() {

// Once registration is complete, update the Thing Shadow named
// 'RGBLedLamp' with the latest device state and save the clientToken
// so that we can correlate it with status or timeout events.
//
// Thing shadow state
////
// The update method returns a clientToken; if non-null, this value will
// be sent in a 'status' event when the operation completes, allowing you
// to know whether or not the update was successful.  If the update method
// returns null, it's because another operation is currently in progress and
// you'll need to wait until it completes (or times out) before updating the 
// shadow.
//
       if (clientTokenUpdate === null)
       {
          console.log('update shadow failed, operation still in progress');
       }
    });

thingShadows.on('status', 
    function(thingName, stat, clientToken, stateObject) {
       console.log('received '+stat+' on '+thingName+': '+
                   JSON.stringify(stateObject));
//
// These events report the status of update(), get(), and delete() 
// calls.  The clientToken value associated with the event will have
// the same value which was returned in an earlier call to get(),
// update(), or delete().  Use status events to keep track of the
// status of shadow operations.
//
    });

thingShadows.on('delta', 
    function(thingName, stateObject) {
       console.log('received delta on '+thingName+': '+
                   JSON.stringify(stateObject));
    });

thingShadows.on('timeout',
    function(thingName, clientToken) {
       console.log('received timeout on '+thingName+
                   ' with token: '+ clientToken);
//
// In the event that a shadow operation times out, you'll receive
// one of these events.  The clientToken value associated with the
// event will have the same value which was returned in an earlier
// call to get(), update(), or delete().
//
    });

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});
db.once('open', function() {
  // connection!
});

var port = process.env.PORT || 8080;

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});
var app = express();

app.use(express.static('public'))

var router = express.Router();

router.use(function(req, res, next) {
  console.log('Request received.');
  next();
});
  
module.exports = require('./config/express')(app, config);

app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});

