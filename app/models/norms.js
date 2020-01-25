var mongoose = require('mongoose');


var normsschema = mongoose.Schema({               // making user model to store the enquery form information into database

    norms_name :String,
});


module.exports = mongoose.model('Norms', normsschema); //use outside this model
