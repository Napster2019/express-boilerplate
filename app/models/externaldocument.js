// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var externaldocschema = mongoose.Schema({
  
  externaldocname : String,
  externaldocnumber : String,
  companyname : String,
  version : String,
  owner: String,
  externaldocfiles : String,
  externaldocdescriptoin : String
});

// generating a password hash



// create the model for users and expose it to our app
module.exports = mongoose.model('Externaldoc', externaldocSchema);
