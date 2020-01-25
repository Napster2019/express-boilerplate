const app = require('express').Router();

const moment = require('moment');
const User = require('../models/user');


//routing profile page
app.get('/', function(req, res) {
    res.render('profile.ejs', {
        user : req.user,
        moment : moment
    });
});


//profile edit routing
// app.get('/profile', function(req, res) {
//     res.render('profile.ejs', {
//         user : req.user,
//         moment : moment,
//
//     });
// });


// edit details of profile
app.post('/edit', function(req, res) {
  req.files.profilePhoto.mv('./public/profilePhoto/'+ req.body.name  + '.png');
  User.findOneAndUpdate({username : req.body.username},{
    // console.log("smbhavna",req.body.username);
    $set : {
      name : req.body.name,
      email : req.body.email,
      number : req.body.number,
      notes : req.body.notes,
      twitter : req.body.twitter,
      facebook : req.body.facebook,
      google : req.body.google,
      profilePhoto : req.body.name + ".png"
    }},
    {new: true, upsert:true},
    function(err, resultss){
      if(err) {
        console.log(err);
        req.flash('profileDetailError','An error occured. Please try again!');
        res.redirect('/login');
      }
      else {
        console.log(resultss);
        req.flash('profileDetailSuccess','Your details were changed successfully!');
        res.redirect('/dashboard');
      }

    }

  )

});


//profile photo editing

app.post('/edit/photo', function(req, res) {
  req.files.profilePhoto.mv('./public/profilePhoto/'+ req.body.name + '.png');
  User.findOneAndUpdate({_id : req.body.id},{
    $set : {
      profilePhoto : req.body.name + ".png"
    }},
    function(err, result){
      if(err) {
        console.log(err);
        req.flash('profilePhotoError','An error occured. Please try again!');
        res.redirect('/profile/edit');
      }
      else {
        req.flash('profilePhotoSuccess','Your profile photo was changed successfully!');
        res.redirect('/profile/edit');
      }
    })
});

module.exports = app;
