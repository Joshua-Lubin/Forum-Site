var express = require('express');
var router = express.Router();
var functions = require('./functions');
/* GET home page. */
router.get('/', function(req, res) {
  functions.getUserFromToken(req.cookies.token2, function(userOb) {
    
    res.render('index', { title: 'Creative Sharing | Home', userOb:userOb});

  });
});

module.exports = router;
