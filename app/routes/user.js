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
  res.render('user/dashboard.ejs', {
     moment : moment
   });
 });

 app.get('/create/issue', (req, res) => {
  res.render('user/create-issue.ejs', {
    moment: moment,
    user: req.user

  });
});
app.get('/add/issue/sources', (req, res) => {
  res.render('user/add-issue-sources.ejs', {
    moment: moment,
    user: req.user

  });
});
app.get('/add/issue/standard', (req, res) => {
  res.render('user/add-issue-standard.ejs', {
    moment: moment,
    user: req.user

  });
});
app.get('/add/issue/type', (req, res) => {
  res.render('user/add-issue-type.ejs', {
    moment: moment,
    user: req.user
  });
});
app.get('/add/issue/titles', (req, res) => {
  res.render('user/add-issue-titles.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/add/issue/suppliers', (req, res) => {
  res.render('user/add-issue-suppliers.ejs', {
    moment: moment,
    user: req.user
  });
});
app.get('/add/issue/tags', (req, res) => {
  res.render('user/add-issue-tags.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/view/issue', (req, res) => {
  res.render('user/view-issues.ejs', {
    moment: moment,
    user: req.user
  });
});
app.get('/create/procedure', (req, res) => {
  res.render('user/create_procedure.ejs', {
    moment: moment,
    user: req.user
  });
});
app.get('/add/procedure/category', (req, res) => {
  res.render('user/add-procedure-category.ejs', {
    moment: moment,
    user: req.user
  });
});
app.get('/add/procedure/tags', (req, res) => {
  res.render('user/add-procedure-tags.ejs', {
    moment: moment,
    user: req.user
  });
});
app.get('/add/procedure/type', (req, res) => {
  res.render('user/add-procedure-type.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/add/procedure/norms', (req, res) => {
  res.render('user/add-norms.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/create/new/tools', (req, res) => {
  res.render('user/add-new-tools.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/view/procedure', (req, res) => {
  res.render('user/view-procedures.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/add/tool/categories', (req, res) => {
  res.render('user/add-tool-categories.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/add/tool/tags', (req, res) => {
  res.render('user/add-tools-tags.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/add/file/tags', (req, res) => {
  res.render('user/add-file-tags.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/upload/file', (req, res) => {
  res.render('user/upload-file.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/view/file', (req, res) => {
  res.render('user/view-file.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/add/form/tags', (req, res) => {
  res.render('user/add-form-tags.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/add/survey/tags', (req, res) => {
  res.render('user/add-survey-tags.ejs', {
    moment: moment,
    user: req.user
  });
});


app.get('/add/tool/inspectiontype', (req, res) => {
  res.render('user/add-insepection-type.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/add/tool/maintenance', (req, res) => {
  res.render('user/add-maintanence-type.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/create/tool', (req, res) => {
  res.render('user/create-new-tools.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/create/task', (req, res) => {
  res.render('user/create-task.ejs', {
    moment: moment,
    user: req.user
  });
});




app.get('/view/tool', (req, res) => {
  res.render('user/view-tools.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/add/task/source', (req, res) => {
  res.render('user/add-task-source.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/add/task/type', (req, res) => {
  res.render('user/add-task-type.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/add/planning/categories', (req, res) => {
  res.render('user/add-meeting-type.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/create/planning', (req, res) => {
  res.render('user/create-planning.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/user/information', (req, res) => {
  res.render('user/user-information.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/user/profile', (req, res) => {
  res.render('user/user-profile.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/confirm/user', (req, res) => {
  res.render('user/confirm-user.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/change/permission', (req, res) => {
  res.render('user/change-permission.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/view/user', (req, res) => {
  res.render('user/view-user.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/view/tinymce', (req, res) => {
  res.render('user/tinymce.ejs', {
    moment: moment,
    user: req.user
  });
});



app.get('/add/employee', (req, res) => {
  res.render('user/add-employee.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/view/employee', (req, res) => {
  res.render('user/view-employee.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/add/job', (req, res) => {
  res.render('user/add-jobdescription.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/add/basic', (req, res) => {
  res.render('user/basic-setup.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/view/oneissue', (req, res) => {
  res.render('user/one-issue.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/create/rootcause', (req, res) => {
  res.render('user/create-root-cause.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/create/test', (req, res) => {
  res.render('user/testingpage.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/create/datatable', (req, res) => {
  res.render('user/datatable.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/create/calender', (req, res) => {
  res.render('user/calender.ejs', {
    moment: moment,
    user: req.user
  });
});

app.get('/create/form', (req, res) => {
  res.render('user/formbuilder.ejs', {
    moment: moment,
    user: req.user
  });
});

    

     module.exports = app;
