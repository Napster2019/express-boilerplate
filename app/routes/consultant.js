const app = require('express').Router();
const moment = require('moment');
const uniqueString = require('unique-string');
const nodemailer = require("nodemailer");
const User = require('../models/user');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const {
  TRANSPORTER_OPTIONS,
  SENDER
} = require("../../config/mailer");


// Rout For Dashboard
app.get('/dashboard', (req, res)=> {
  res.render('consultant/dashboard.ejs', {
     moment : moment
   });
 });

     
     module.exports = app;
