// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var procedureschema = mongoose.Schema({
  proceduretype : String,
  procedurename : String,
  procedurenumber : String,
  scope : String,
  status:{type:String,lowercase:true,enum:["draft", "active", "pending"]},
  forms : String,
  relatedprocedure : String,
  selectnorms : String,
  qualityrecords : String,
  expdate : String,
  companyname : String,
  version : String,
  owner: String,
  approver : String,
  procedurefiles : String,
  flowchart : String,
  proceduredescriptoin : String,
  isotags : String,
});

// generating a password hash



// create the model for users and expose it to our app
module.exports = mongoose.model('Procedure', procedureSchema);
