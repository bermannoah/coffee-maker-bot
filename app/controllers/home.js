var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Make = mongoose.model('Make');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  Make.find(function (err, makes) {
    if (err) return next(err);
    res.render('index', {
      title: 'Coffee Maker Bot',
      makes: makes
    });
  });
});
