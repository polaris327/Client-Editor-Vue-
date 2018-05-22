var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  providers: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model('Client', ClientSchema);
