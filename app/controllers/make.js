const clri = require('clri');

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
      res.json({ text: 'Starting to brew coffee!' });
      clri.exec(`sudo python ./coffee-maker-script/servo_controller.py`);
    }
    else if (make.type === "tea") {
      res.json({ text: 'Heating water for tea!' });
    }
    else if (make.type === "water") {
      res.json({ text: 'Heating water!' });
    }
    else {
      res.json({ text: 'Not sure what you meant by that.' });
    }

    make.save(function(err) {
      if (err)
        res.send(err);
    });
});