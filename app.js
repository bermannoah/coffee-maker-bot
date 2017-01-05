var express = require('express');
var config = require('./config/config');
var glob = require('glob');
var mongoose = require('mongoose');

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

router.route('/makes')

  .get(function(req, res){
    Make.find(function(err, makes) {
      if (err)
        res.send(err);
        console.log(err);
        
      res.json(makes);
    });
  })
  
  .post(function(req, res) {
    var make = new Make();
    make.type = req.body.type;
    
    if (make.type === "coffee") {
      res.json({ message: 'Heating water for coffee!' });
    }
    else if (make.type === "tea") {
      res.json({ message: 'Heating water for tea!' });
    }
    else if (make.type === "water") {
      res.json({ message: 'Heating water!' });
    }
    else {
      res.json({ message: 'Not sure what you meant by that.' });
    }
    
    make.save(function(err) {
      if (err)
        res.send(err);
    });
  });
  
module.exports = require('./config/express')(app, config);

app.use('/api/v1/', router)

app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});

