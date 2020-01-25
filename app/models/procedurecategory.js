var mongoose = require('mongoose');


var procedurecategoryschema = mongoose.Schema({               // making user model to store the enquery form information into database

    category_name :String,
});


module.exports = mongoose.model('Procedurecategory', procedurecategoryschema); //use outside this model
