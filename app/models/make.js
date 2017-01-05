// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var MakeSchema = new Schema({
  type: String,
  brew_time: Number,
});

MakeSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Make', MakeSchema);

