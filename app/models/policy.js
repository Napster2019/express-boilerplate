var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var policyschema = mongoose.Schema({
  
  policyname : String,
  policynumber : String,
  companyname : String,
  version : String,
  owner: String,
  policyfiles : String,
  policydescriptoin : String
});

// generating a password hash



// create the model for users and expose it to our app
module.exports = mongoose.model('Policy', policySchema);
