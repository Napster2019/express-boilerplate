// load all the things we need
const LocalStrategy    = require('passport-local').Strategy;
const uniqueString = require('unique-string');
const nodemailer = require("nodemailer");
const {
  TRANSPORTER_OPTIONS,
  SENDER
} = require("./mailer");
// load up the user model

// load up the user model
const User = require('../app/models/user');


module.exports = function(passport) {

  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with username
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
  },
  function(req, username, password, done) {
    if (username)
    username = username.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

    // asynchronous
    process.nextTick(function() {
      User.findOne({ 'username' :  username }, function(err, user) {
        // if there are any errors, return the error
        if (err)
        return done(err);

        // if no user is found, return the message
        if (!user)
        return done(null, false, req.flash('loginMessage', 'No user found.'));

        if (!user.validPassword(password))
        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

        // all is well, return user
        else
        return done(null, user);
      });
    });

  }));

  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
  passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with username
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
  },
  function(req, username, password, done) {
    if (username)
    username = username.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

    // asynchronous
    process.nextTick(function() {
      // if the user is not already logged in:
      if (!req.user) {
        User.findOne({ 'username' :  username }, function(err, user) {
          // if there are any errors, return the error
          if (err)
          return done(err);

          // check to see if theres already a user with that username
          if (user) {
            return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
          } else {



              // create the user
              let newUser = new User();
              newUser.username = username;
              newUser.password = newUser.generateHash(password);
              var key = uniqueString();
              newUser.verify_key= key;
              newUser.email = req.body.email;
              newUser.name = req.body.name;
              newUser.phone = req.body.phone;
              newUser.companyname =req.body.companyname;
              newUser.permission = "other";
              newUser.subpermission = "other";
              newUser.profilePhoto = "default.png";
              newUser.status = "active";

              newUser.save(function(err) {
                if (err)
                return done(err);
console.log(newUser);
                return done(null, newUser);
              });

          }
        });
        // if the user is logged in but has no local account...
      } else if ( !req.user.username ) {
        // ...presumably they're trying to connect a local account
        // BUT let's check if the username used to connect a local account is being used by another user
        User.findOne({ 'username' :  username }, function(err, user) {
          if (err)
          return done(err);

          if (user) {
            return done(null, false, req.flash('loginMessage', 'That username is already taken.'));
            // Using 'loginMessage instead of signupMessage because it's used by /connect/local'
          } else {
            let user = req.user;
            user.username = username;
            user.password = user.generateHash(password);
            user.save(function (err) {
              if (err)
              return done(err);

              return done(null,user);
            });
          }
        });
      } else {
        // user is logged in and already has a local account. Ignore signup. (You should log out before trying to create a new account, user!)
        return done(null, req.user);
      }

    });

  }));
};
