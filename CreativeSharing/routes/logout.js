var express = require('express');
var router = express.Router();
var functions = require('./functions');

/* GET home page. */
router.get('/', function(req, res) {
  functions.logout(req.cookies.token2, function() {
    res.redirect('/');
  });
});
router.post('/', function(req, res) {
  functions.logout(req.cookies.token2, function() {
    res.redirect('/');
  });
});

module.exports = router;
