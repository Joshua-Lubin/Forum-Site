var express = require('express');
var functions = require('./functions');
var router = express.Router();

router.get('/', function(req, res, next) {
  functions.getUserFromToken(req.cookies.token2,function (user) {
    if(!user) {
      res.render('login', { title: "Creative Sharing | Login", isError:false, userOb:false});
    }
    else {
      res.render('loggedError', {title:"Creative Sharing | Logout", userOb:user, isError:false});
    }
  });

});

router.post('/', function(req, res, next) {

  functions.getUserFromToken(req.cookies.token2,function (user) {
    if(!user) {

        if(req.body.username == null || req.body.password == null || req.body.username == "" || req.body.password == "") {
            isError = true;
            if(req.body.username != null && req.body.username != "") {
              res.render('login', { title: "Creative Sharing | Login", isError:isError,user:req.body.username});
            } else {
              res.render('login', { title: "Creative Sharing | Login", isError:isError,user:false});
            }
            return false;
        }

        var username = req.body.username;
        var password = req.body.password;

        functions.login(username, password, res, function(success) {
          if(success==false) {
            isError = true;
            res.render('login', { title: "Creative Sharing | Login", userOb:user, isError:isError});
            return false;
          }
          res.redirect('/');
        });

      }
      else {
        res.render('loggedError', {title:"Creative Sharing | Logout", userOb:user, isError:isError});
      }
  });

});

module.exports = router;
