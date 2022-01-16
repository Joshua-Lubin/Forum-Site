var express = require('express');
var functions = require('./functions');
var router = express.Router();
var pg = require('pg');
var bcrypt = require('bcryptjs');
var cookie = require('cookie-parser');
var escapePg = require('pg-escape');
var randomString = require('randomstring');

/*
 *   usersConfig and forumConfig define the login information for
 *   the users and forum databases.
 */

var forumConfig = {
  host: 'localhost',
  user: 'joshualubin',
  database: 'forum',
  password: 'Facetime2.0',
  port: 5432,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

//pool and forumPool are used for their corresponding database's queries
var forumPool = new pg.Pool(forumConfig);

//console.log("" + functions.queryUsers('SELECT users."userID" FROM main."users";'));
forumPool.on('error', function (err, client) {
  console.error('idle client error', err.message, err.stack)
});

router.get('/', function(req, res, next) {
  functions.getUserFromToken(req.cookies.token2, function(userOb) {

    if(userOb) {

      res.render('loggedError', { title: "Creative Sharing | Logout", userOb:userOb});

    }
    else {

      res.render('register', { title: "Register", Error13:{hasError:false}, tError:{hasError:false}, eError:{hasError:false},uError:{hasError:false},pError:{hasError:false}});

    }

  });
});

router.post('/', function(req, res, next) {

  functions.getUserFromToken(req.cookies.token2, function(userOb) {
    if(userOb) {
      res.render('loggedError', { title: "Creative Sharing | Logout", userOb:userOb});
    }
    else {

      var pError = {hasError:false};
      var uError = {hasError:false};
      var eError = {hasError:false};
      var Error13 = {hasError:false};
      var tError = {hasError:false};

      var password = req.body.password;
      var cPass = req.body.cPassword;
      var username = req.body.username;
      var email = req.body.email;
      var user13 = req.body.user13;
      var tos = req.body.tos;
      console.log(req.body);

      var pNull = functions.isNull(password);
      var cPNull = functions.isNull(cPass);
      var uNull = functions.isNull(username);
      var eNull = functions.isNull(email);
      var user13Null = functions.isNull(user13);
      var tosNull = functions.isNull(tos);

      pError = functions.checkPassword(password,cPass);
      uError = functions.checkUsername(username);
      eError = functions.checkEmail(email);
      Error13 = functions.checkTOS13(user13);
      tError = functions.checkTOS13(tos);


      forumPool.query(escapePg('SELECT username.username FROM users.username WHERE username.username LIKE %L', username), [], function(err, result) {

        if(result.rows.length > 0) {

          uError.alreadyExists = true;
          uError.hasError = true;

        }

        forumPool.query(escapePg('SELECT email.email FROM users.email WHERE email.email LIKE %L', email), [], function(err, result) {

          if(result.rows.length > 0) {

            eError.alreadyExists = true;
            eError.hasError = true;

          }

          if(Error13.hasError || tError.hasError || pError.hasError || uError.hasError || eError.hasError || pNull || cPNull || uNull || eNull || user13Null || tosNull) {

            res.render('register', { title: "Register", tError:tError, Error13:Error13, eError:eError,uError:uError,pError:pError, user:username, password:password, email:email, cPass:cPass, pNull:pNull, uNull:uNull, eNull:eNull, cPNull:cPNull});
            return;

          }

          //TODO: Scalability (small chance it would crash eventually)
          var userID = randomString.generate(64);

          forumPool.query(escapePg('SELECT username.userid FROM users.username WHERE username.userid=%L', userID), [], function(err, result) {

            if(result.rows.length < 1) {

              forumPool.query(escapePg("INSERT INTO users.username (userid, username) VALUES (%L, %L)", userID, username), [], function(err) {

              var ePassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

                forumPool.query(escapePg("INSERT INTO users.email (userid, email) VALUES (%L, %L);", userID, email), [], function(err) {

                  forumPool.query(escapePg("INSERT INTO users.password (userid, password) VALUES (%L, %L);", userID, ePassword), [], function(err) {

                    forumPool.query(escapePg("INSERT INTO users.description (userid, description) VALUES (%L, 'This is the default description. Change me to customize your profile!');", userID), [], function(err) {

                      functions.setToken(userID,res, function() {

                          res.redirect('/');

                      });
                    });
                  });
                });
              });
            }
          });
        });
      });
    }
  });
});

module.exports = router;
