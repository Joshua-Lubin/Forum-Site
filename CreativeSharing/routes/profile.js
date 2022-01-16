var express = require('express');
var router = express.Router();
var functions = require('./functions');
router.get('/', function(req, res) {

  functions.getUserFromToken(req.cookies.token2, function(user) {

    if(!user) {

      res.redirect("/login");

    }

    else {

      var username = user.username.replace(" ", "-");

      res.redirect("/profile/" + username);

    }

  });

});

router.get('/:user', function(req, res) {
  functions.getUserFromToken(req.cookies.token2, function(user) {

    var username = req.params.user.replace("-", " ");

    functions.getUserFromName(username, function(userProfile) {

      if(!userProfile) {

        res.redirect("/404");
        return false;

      }

      var sameUser = false;

      if(user.username == username) {

        sameUser = true;

      }

      //functions.getPostsByAuthor(userProfile.userid, function(postResult) {

        res.render('profile', { title: 'Creative Sharing | Profile', userOb:user, userProfile:userProfile, sameUser:sameUser, /*postResult:postResult*/ });

      //});

    });
  });
});

router.post('/:user/description', function(req, res) {

  functions.getUserFromToken(req.cookies.token2, function(user) {

    functions.editDescription(user.userID, req.body.description, function() {

      res.redirect("/profile/" + user.username);

    });
  });
});

module.exports = router;
