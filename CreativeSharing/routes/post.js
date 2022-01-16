var express = require('express');
var router = express.Router();
var functions = require('./functions');
/* GET home page. */
router.get('/', function(req, res) {
  functions.getUserFromToken(req.cookies.token2, function(userOb) {
    if(userOb==false) {
      res.redirect("/login");
    } else {
      res.render('post', { title: 'Creative Sharing | Post', userOb});
    }

  });
});

router.post('/', function(req, res) {

  functions.getUserFromToken(req.cookies.token2, function(username) {

    var title = req.body.title;
    var content = req.body.content;

    if(username==false) {

      res.redirect("/login");

    }
    else {

      functions.postForum(req.cookies.token2, title, content, "website", "download", function(url) {

        if(url.hasError != false) {

          res.redirect(url.url);

        }
        else {

          res.redirect("/404");

        }
      });
    }
  });
});

module.exports = router;
