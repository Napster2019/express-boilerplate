var mongoose = require('mongoose');


var proceduretagschema = mongoose.Schema({               // making user model to store the enquery form information into database

    tag_name :String,
    
});


module.exports = mongoose.model('Proceduretag', proceduretagschema); //use outside this model
