// const passport = require('./config/passport');
const app = require('express').Router();
const moment = require('moment');
const uniqueString = require('unique-string');
const nodemailer = require("nodemailer");
const User = require('../models/user');
// const Externaldoc = require('../models/externaldoc');
const Procedurecategory = require('../models/procedurecategory');
const Proceduretag = require('../models/proceduretag');
// const Qulaitytag = require('../models/qulaitytag');
// const Policy = require('../models/policy');
const Norms = require('../models/norms');
// const Procedure = require('../models/procedure');
// const Qualitymanual = require('../models/qualitymanual');
// const Forms = require('../models/forms');
// const Qualitymanual = require('../models/qualitymanual');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const {
  TRANSPORTER_OPTIONS,
  SENDER
} = require("../../config/mailer");


// Rout For Dashboard
app.get('/dashboard', (req, res) => {
  res.render('admin/dashboard.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/confirm/users', (req, res) => {
  User.find({
    companyname: req.user.companyname,
    permission: "other"
  }, function (err, foundUser) {
    res.render('admin/confirmusers.ejs', {
      data: foundUser,
      user: req.user,
      moment: moment
    });
  });
});

app.get('/active/users', (req, res) => {
  User.find({
    companyname: req.user.companyname,
    permission: "user",
    status: "active"
  }, function (err, foundUser) {
    res.render('admin/allusers.ejs', {
      data: foundUser,
      user: req.user,
      moment: moment
    });
  });
});

app.get('/rejected/users', (req, res) => {
  User.find({
    companyname: req.user.companyname,
    permission: "user",
    status: "suspended"
  }, function (err, foundUser) {
    res.render('admin/rejectedusers.ejs', {
      data: foundUser,
      user: req.user,
      moment: moment
    });
  });
});

app.get('/deactivate/user/:id', (req, res) => {
  User.updateOne({
    _id: req.params.id
  }, {
    $set: {
      status: "suspended"
    }
  }, function (err, foundUser) {
    res.redirect("/admin/active/users");
  });
});

app.get('/activate/user/:id', (req, res) => {
  User.updateOne({
    _id: req.params.id
  }, {
    $set: {
      status: "active"
    }
  }, function (err, foundUser) {
    res.redirect("/admin/rejected/users");
  });
});

app.get('/change/permission/:id', (req, res) => {
  User.updateOne({
    _id: req.params.id
  }, {
    $set: {
      permission: "user"
    }
  }, function (err, foundUser) {
    res.redirect("/admin/active/users");
  });
});

app.get('/change/subpermission/:id', (req, res) => {
  User.find({
    _id: req.params.id
  }, function (err, foundUser) {
    res.render('admin/changesubpermission.ejs', {
      profile: foundUser,
      user: req.user,
      moment: moment
    });
  });
});

app.post('/user/:id', function (req, res) {
  User.findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: {
        subpermission: req.body.subpermission,

      }
    }, {
      new: true,
      upsert: true
    },
    function (err, changedpermission) {
      if (err) {
        console.log(err);
      } else {
        // console.log(changedpermission);
        res.redirect('/admin/active/users');
      }
    }
  )
});


app.get('/create/issue', (req, res) => {
  res.render('admin/create-issue.ejs', {
    moment: moment,
    user: req.user

  });
});
app.get('/add/issue/sources', (req, res) => {
  res.render('admin/add-issue-sources.ejs', {
    moment: moment,
    user: req.user

  });
});
app.get('/add/issue/standard', (req, res) => {
  res.render('admin/add-issue-standard.ejs', {
    moment: moment,
    user: req.user

  });
});
app.get('/add/issue/type', (req, res) => {
  res.render('admin/add-issue-type.ejs', {
    moment: moment,
    user: req.user
  });
});
app.get('/add/issue/titles', (req, res) => {
  res.render('admin/add-issue-titles.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/add/issue/suppliers', (req, res) => {
  res.render('admin/add-issue-suppliers.ejs', {
    moment: moment,
    user: req.user
  });
});
app.get('/add/issue/tags', (req, res) => {
  res.render('admin/add-issue-tags.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/view/issue', (req, res) => {
  res.render('admin/view-issues.ejs', {
    moment: moment,
    user: req.user
  });
});
app.get('/create/procedure', (req, res) => {
  res.render('admin/create_procedure.ejs', {
    moment: moment,
    user: req.user
  });
});
app.get('/add/procedure/category', (req, res) => {
  res.render('admin/add-procedure-category.ejs', {
    moment: moment,
    user: req.user
  });
});





app.get('/add/procedure/type', (req, res) => {
  Procedurecategory.find({}, function (err, foundProductcat){ 
  res.render('admin/add-procedure-type.ejs', {
    moment: moment,
    user: req.user,
    data : foundProductcat
  });
  })
});

app.post('/add/procedure/type', function(req, res) {
  // console.log(req.body);

  var procedurecat = Procedurecategory();
  procedurecat.category_name = req.body.category_name;
  
  procedurecat.save(function(err, getprocedurecat){
    if(err) res.json(err);
    else{
      res.redirect("/admin/add/procedure/type");
    }

  });
});

app.get('/add/procedure/norms', (req, res) => {
  Norms.find({}, function(err, foundNorms){
  res.render('admin/add-norms.ejs', {
    moment: moment,
    user: req.user,
    norms : foundNorms
  });
  })
});

app.post('/add/procedure/norms', function(req, res) {
  // console.log(req.body);

  var norms = Norms();
  norms.norms_name = req.body.norms_name;
  
  norms.save(function(err, getnorms){
    if(err) res.json(err);
    else{
      res.redirect("/admin/add/procedure/norms");
    }

  });
});

app.get('/add/procedure/tags', (req, res) => {
  Proceduretag.find({}, function(err, foundProceduretag){
  res.render('admin/add-procedure-tags.ejs', {
    moment: moment,
    user: req.user,
    data :foundProceduretag
  });
  })
});

app.post('/add/procedure/tags', function(req, res) {
  // console.log(req.body);

  var proceduretag = Proceduretag();
  proceduretag.tag_name = req.body.tag_name;
  
  proceduretag.save(function(err, gettags){
    if(err) res.json(err);
    else{
      res.redirect("/admin/add/procedure/tags");
    }

  });
});


app.get('/create/new/tools', (req, res) => {
  res.render('admin/add-new-tools.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/view/procedure', (req, res) => {
  res.render('admin/view-procedures.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/add/tool/categories', (req, res) => {
  res.render('admin/add-tool-categories.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/add/tool/tags', (req, res) => {
  res.render('admin/add-tools-tags.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/add/file/tags', (req, res) => {
  res.render('admin/add-file-tags.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/upload/file', (req, res) => {
  res.render('admin/upload-file.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/view/file', (req, res) => {
  res.render('admin/view-file.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/add/form/tags', (req, res) => {
  res.render('admin/add-form-tags.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/add/survey/tags', (req, res) => {
  res.render('admin/add-survey-tags.ejs', {
    moment: moment,
    user: req.user
  });
});


app.get('/add/tool/inspectiontype', (req, res) => {
  res.render('admin/add-insepection-type.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/add/tool/maintenance', (req, res) => {
  res.render('admin/add-maintanence-type.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/create/tool', (req, res) => {
  res.render('admin/create-new-tools.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/create/task', (req, res) => {
  res.render('admin/create-task.ejs', {
    moment: moment,
    user: req.user
  });
});




app.get('/view/tool', (req, res) => {
  res.render('admin/view-tools.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/add/task/source', (req, res) => {
  res.render('admin/add-task-source.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/add/task/type', (req, res) => {
  res.render('admin/add-task-type.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/add/planning/categories', (req, res) => {
  res.render('admin/add-meeting-type.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/create/planning', (req, res) => {
  res.render('admin/create-planning.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/user/information', (req, res) => {
  res.render('admin/user-information.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/user/profile', (req, res) => {
  res.render('admin/user-profile.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/confirm/user', (req, res) => {
  res.render('admin/confirm-user.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/change/permission', (req, res) => {
  res.render('admin/change-permission.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/view/user', (req, res) => {
  res.render('admin/view-user.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/view/tinymce', (req, res) => {
  res.render('admin/tinymce.ejs', {
    moment: moment,
    user: req.user
  });
});



app.get('/add/employee', (req, res) => {
  res.render('admin/add-employee.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/view/employee', (req, res) => {
  res.render('admin/view-employee.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/add/job', (req, res) => {
  res.render('admin/add-jobdescription.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/add/basic', (req, res) => {
  res.render('admin/basic-setup.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/view/oneissue', (req, res) => {
  res.render('admin/one-issue.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/create/rootcause', (req, res) => {
  res.render('admin/create-root-cause.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/create/test', (req, res) => {
  res.render('admin/testingpage.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/create/datatable', (req, res) => {
  res.render('admin/datatable.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/create/calender', (req, res) => {
  res.render('admin/calender.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/create/form', (req, res) => {
  res.render('admin/formbuilder.ejs', {
    moment: moment,
    user: req.user
  });
});





module.exports = app;