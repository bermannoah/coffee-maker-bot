var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Make = mongoose.model('Make');

module.exports = function (app) {
  app.use('/api/v1', router);
};

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
