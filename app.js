var express = require('express');
var config = require('./config/config');
var glob = require('glob');
var mongoose = require('mongoose');
var awsIot = require('aws-iot-device-sdk');

var thingShadows = awsIot.thingShadow({
   keyPath: "../aws-iot/coffee-maker-bot.private.key",
  certPath: "../home/noah/aws-iot/coffee-maker-bot.cert.pem",
    caPath: "../home/noah/aws-iot/root-CA.crt",
  clientId: "coffee-maker-bot",
    region: "us-west-2"
});

thingShadows.on('connect', function() {
    thingShadows.register( 'coffee-maker-bot', function() {
       if (clientTokenUpdate === null)
       {
          console.log('update shadow failed, operation still in progress');
       }
    });

thingShadows.on('status', 
    function(thingName, stat, clientToken, stateObject) {
       console.log('received '+stat+' on '+thingName+': '+
                   JSON.stringify(stateObject));
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
    });
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

