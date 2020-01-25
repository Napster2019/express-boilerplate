// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({
  username : String,
  password : String,
  name : String,
  email : String,
  phone : Number,
  language : String,
  companyname: String,
  departmentname : String,
  notes : String,
  status:{type:String,lowercase:true,enum:["active","suspended","notallowed"]},
  profilePhoto : String,
  permission : {type:String,lowercase:true,enum:["superadmin","admin","consultant","user","other"]},
  permit : {type:String,lowercase:true,enum:["verified","notverified"]},
  subpermission : {type:String,lowercase:true,enum:["author","reveiwer","approver","user","other"]},
  reset_key : String,
  verify_key:String,
  jobdescription : String,

});

// generating a password hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
