var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var qualitymanualschema = mongoose.Schema({
  
  qualitymanualname : String,
  qualitymanualnumber : String,
  companyname : String,
  version : String,
  owner: String,
  qualitymanualfiles : String,
  qualitymanualdescriptoin : String
});

// generating a password hash



// create the model for users and expose it to our app
module.exports = mongoose.model('Qualitymanual', qualitymanualSchema);