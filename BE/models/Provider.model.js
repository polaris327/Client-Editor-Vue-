var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProviderSchema = new Schema({
  name: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Provider', ProviderSchema);
