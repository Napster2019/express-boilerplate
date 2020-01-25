var mongoose = require('mongoose');


var qulaitytagschema = mongoose.Schema({               // making user model to store the enquery form information into database

    tag_name :String,
    
});


module.exports = mongoose.model('Qulaitytag', qulaitytagSchema); //use outside this model
