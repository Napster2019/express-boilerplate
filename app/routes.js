const moment = require('moment');
const fs = require('fs');
var bodyParser = require('body-parser');
const uniqueString = require('unique-string');
const nodemailer = require("nodemailer");
var User = require('./models/user');
const {
  TRANSPORTER_OPTIONS,
  SENDER
} = require("../config/mailer");
module.exports = function(app, passport) {


  // app.get()
  app.use('/superadmin', isLoggedIn, isSuperAdmin, require('./routes/superadmin'))
  app.use('/admin', isLoggedIn, isAdmin, require('./routes/admin'))
  app.use('/consultant', isLoggedIn, isConsultant, require('./routes/consultant'))
  app.use('/user', isLoggedIn, isUser, require('./routes/user'))

  // app.use('/manager', isLoggedIn, isManager, require('./routes/manager'))
  // app.use('/vendor', isLoggedIn, isAccounts, require('./routes/vendor'))


  // dashboard redirect routing
  app.get('/dashboard', isLoggedIn, function(req, res) {
    if (req.user.permission == "superadmin" )
      res.redirect('/superadmin/dashboard');
    else if (req.user.permission == "admin")
      res.redirect('/admin/dashboard');
    else if (req.user.permission == "consultant")
      res.redirect('/consultant/dashboard');
      else if (req.user.permission == "user")
        res.redirect('/user/dashboard')
    else {
      res.send("<center><h3>You don't have the user permissions to access the software yet.</h3>Ask support@qfirst.io to access the software.</center> ")
    }
  })



  app.get('/verifyemail', function(req, res) {
    res.render('customernotpermitted.ejs',{
      message: req.flash('signupMessage'),
      user : req.user
    });
  });

  // app.get('/dashboard', function(req, res) {
  //   res.render('dashboard.ejs',{
  //     user : req.user
  //   });
  // });

  // LOGOUT ==============================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================

  // locally --------------------------------
  // LOGIN ===============================
  // show the login form
  app.get('/', function(req, res) {
    res.render('auth_login.ejs',{

    user : req.user
  });
  });

  // process the login form
  app.post('/', passport.authenticate('local-login', {
    successRedirect: '/dashboard', // redirect to the secure profile section
    failureRedirect: '/invalid', // redirect back to the signup page if there is an error
    failureFlash: 'Invalid username or password.' // allow flash messages
  }));


  app.get('/signup', function(req, res) {
    res.render('auth_register.ejs',{
    user : req.user
  });
  });

  app.get('/invalid', function(req, res) {
    res.render('invalid.ejs',{
    user : req.user
  });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/invalid', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));
    app.get('/user/password/set', function(req, res) {
      User.findOne({
        reset_key: req.query.key
      }, function(err, foundUser) {
        if (!foundUser || foundUser == null) {
          res.render('invalid.ejs');
        } else {
          res.render('set_password.ejs', {
            user: foundUser,
            moment: moment,
          });
        }
      })
    })
    app.post('/set/password', function(req, res) {
      User.updateOne({
          username: req.body.username
        }, {
          $set: {
            password: User().generateHash(req.body.password),
            reset_key: null
          }
        },
        function(err, results) {
          if (err) res.json(err);
          else {
            req.flash('password_set', 'Your password hase been set');
            res.redirect('/');
          }
        })
    });
//   app.get('/email/verify',(req,res)=> {
//     User.updateOne({verify_key:req.query.key},{$set:{permit:"verified"}},(err,data)=>{
//       if(err) throw err;
//       console.log(data);
//       res.render("after-email-verify.ejs",{data:data,user: req.user,
//       moment: moment,
//       messageError: req.flash('passwordForgotError'),
//       messageSuccess: req.flash('passwordForgotSuccess'),user : req.user})
//     });
//         User.findOne({verify_key:req.query.key}, function(err, foundUser){
//           let content,admincontent;
//           admincontent=`<div><p>Hi</p>
// <p>A new ${foundUser.permission} has Signed-in:
// <p>Name of the ${foundUser.permission}:${foundUser.name}</p>
// <p>Email Id: ${foundUser.email}</p></p>
// <p>Regards</p>
// <p>Team Wedvendors</p></div>`;
//           if (foundUser.permission=="vendor"){
//             content=`<div><p>Hi,</p>
// <p>Congratulations! Your E-mail has been verified successfully and we are delighted to have you on board with us!
// Login into your account and create your storefront. Also, you can modify and manage the listing from your account.
// Reaching your target audience has never been easier! Just click the link below and get started!
// <a href="https://${req.headers.host}">Click Here And Login</a></p>
// <p>Regards</p>
// <p>Team Wedvendors</p></div>`;
//           }else if(foundUser.permission=="customer"){
//             content=`<div><p>Welcome to the Wedvendors Platform!</p>
// <p>Thank you for signing up and confirming your email. You're now just a few clicks away from planning your big fat wedding.
// Grab a steaming mug of coffee and relax as we help you plan your wedding from the comfort of your home!
// <a href="https://${req.headers.host}">Click here</a> to find find highly sought after wedding planners, pre-eminent wedding photographers, beautiful wedding venues and so much more. So what are you waiting for? Let's plan your Instagram worthy wedding!</p>
// <p>With Warm Regards</p>
// <p>Team Wedvendors</p></div>`;
//           }
//         process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
//           var transporter = nodemailer.createTransport(TRANSPORTER_OPTIONS);
//           var mailOptions = {
//             from: SENDER , // sender address
//             to: "rajnish@weddingaffair.co.in", // list of receivers
//             subject: 'New ' + foundUser.name + ' as a ' + foundUser.permission + 'Signup', // Subject line
//             html: admincontent // You can choose to send an HTML body instead
//           };
//           transporter.sendMail(mailOptions, function(error, info){
//             if(error){
//               console.log('error: ', error);
//
//             }
//           })
//           var mailOptionsUser = {
//             from: SENDER , // sender address
//             to:foundUser.email, // list of receivers
//             subject: ' Welcome to Wedvendors:Congratulations You Have successfully Signed-up' , // Subject line
//             html: content // You can choose to send an HTML body instead
//           };
//           transporter.sendMail(mailOptionsUser, function(error, info){
//             if(error){
//               console.log('error: ', error);
//
//             }
//           })
//         });
//     });
//

//FORGET PASSWORD PAGE

  app.get('/password/forgot', function(req, res) {
    res.render('emails_forgot.ejs', {
      user : req.user
    });
  })

  app.post('/password/forgot', function (req, res) {
    User.findOne({ username : req.body.username }, function (err, foundUser){
      if(!foundUser||foundUser == null )
      {
        req.flash('passwordForgotError','Username doesnt exist')
        res.redirect('/password/forgot');
      }
      else {
        var key = uniqueString();
        User.updateOne({username : foundUser.username},{
          $set: {
            reset_key : key
          }},function(err,result){
            if(err)
            res.json(err);
            else {
              console.log("reset key saved");
            }
          })
          process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
          var transporter = nodemailer.createTransport(TRANSPORTER_OPTIONS);
          var mailOptions = {
            from: SENDER , // sender address
            to: foundUser.email , // list of receivers
            subject: 'Tea Treasure Password Reset Link', // Subject line
            html: '<div>Please use the link to change your password</div><a href="http://' + req.headers.host + '/password/reset?key='+ key +'">Click Here</a> to Change Password' // You can choose to send an HTML body instead
          };
          transporter.sendMail(mailOptions, function(error, info){
            if(error){
              console.log('error: ', error);

            }else{
              req.flash('passwordForgotSuccess','Mail sent successfully')
              res.redirect('/password/forgot');
            }
          });
        }
      })
    });

  // app.get('/password/forgot/reset', function(req, res) {
  //   User.findOne({
  //     username: req.query.a
  //   }, function(err, foundUser) {
  //       res.render('after-email-sent.ejs', {
  //         email: foundUser.email ,
  //         moment: moment,
  //
  //         user : req.user
  //       });
  //     });
  //
  //   })


  app.get('/password/reset', function(req, res) {
    User.findOne({
      reset_key: req.query.key
    }, function(err, foundUser) {
      if (!foundUser || foundUser == null) {
        res.render('invalid.ejs');
      } else {
        res.render('password-reset.ejs', {
          user: foundUser,
          moment: moment,

        });
      }
    })
  })

  app.post('/password/reset', function(req, res) {
    User.updateOne({
        username: req.body.username
      }, {
        $set: {
          password: User().generateHash(req.body.password),
          reset_key: null
        }
      },
      function(err, results) {
        if (err) res.json(err);
        else {
          req.flash('loginSuccessMessage', 'Password Changed');
          res.redirect('/');
        }
      })
  });
//enter email to Subscribe
// app.post('/submit/email', function(req, res) {
//   console.log(req.body);
//   Subscription.findOne({email:req.body.subemail},(err,data)=>{
//     if (err) res.json(err);
//     if(!data){
//   var subscription = new Subscription();
//   subscription.email=req.body.subemail;
//   subscribed=true;
//
//   subscription.save(function(err, doc) {
//     if (err) res.json(err);
//     else {
//       process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
//       var transporter = nodemailer.createTransport(TRANSPORTER_OPTIONS);
//       var mailOptions = {
//         from: SENDER, // sender address
//         to: doc.email, // list of receivers
//         subject: 'Thank You for Signing Up', // Subject line
//         html: `<div><p>Thank you so much for signing up for the Wedvendors Newsletter! Now you can get curated content, wedding inspiration and even our top vendor picks delivered straight to your inbox.
// <p>Planning a big fat wedding has never been easier!</p>
// Can't wait until our next email? <b><a href="https://${req.headers.host}">Click Here</a></b> to visit our website to explore the most highly sought after vendors in every category!
// We will be writing again soon.</p>
// <p>With Warm Regards</p>
// <p>Team Wedvendors</p></div>` // You can choose to send an HTML body instead
//       };
//       transporter.sendMail(mailOptions, function(error, info) {
//         if (error) {
//           console.log('error: ', error);
//
//         } else {
//           req.flash('')
//           res.send('<div class="modal"><h5>Thank You for Subscribing to the Wedvendors Newsletter</h5></div>');
//         }
//       });
//     }
//   });
// }else{
//   req.flash('')
//   res.send('<div class="modal"><h5>You Have Already Registered for Wedvendors Newsletter</h5></div>');
// }
// });
// });
//to display lisking database /display/listings


// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {

    return next();
  }

  res.redirect('/');
}


// isDash middleware defined here by AP

// isAdmin middleware defined here by AP
function isSuperAdmin(req, res, next) {
  if ((req.user.permission == "superadmin"))
    return next();

  else {
    res.render('not-permitted.ejs', {
      user: req.user,
      moment: moment,
      messageError: req.flash('passwordForgotError'),
      messageSuccess: req.flash('passwordForgotSuccess')
    })
  }
}


//isManager middleware define here by AP
function isAdmin(req, res, next) {
  if ((req.user.permission == 'admin'))
    return next();
  else {
    res.render('not-permitted.ejs', {
      user: req.user,
      moment: moment,
      messageError: req.flash('passwordForgotError'),
      messageSuccess: req.flash('passwordForgotSuccess')
    })
  }
}

function isConsultant(req, res, next) {
  if ((req.user.permission == 'consultant'))
    return next();
  else {
    res.render('not-permitted.ejs', {
      user: req.user,
      moment: moment,
      messageError: req.flash('passwordForgotError'),
      messageSuccess: req.flash('passwordForgotSuccess')
    })
  }
}

function isUser(req, res, next) {
  if ((req.user.permission == 'user'))
    return next();
  else {
    res.render('not-permitted.ejs', {
      user: req.user,
      moment: moment,
      messageError: req.flash('passwordForgotError'),
      messageSuccess: req.flash('passwordForgotSuccess')
    })
  }
}




// function isLinked(req, res, next) {
//   if (req.user.emp)
//     return next();

//   else {
//     res.send("Your Account is not linked with your employee Data yet. Please contact your HR");
//   }
// }

}
