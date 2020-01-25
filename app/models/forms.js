var mongoose = require('mongoose');


var formsschema = mongoose.Schema({               // making user model to store the enquery form information into database

    forms_name :String,
});


module.exports = mongoose.model('Forms', formsschema); //use outside this model
