var express = require('express');
var pg = require('pg'); //used for defining query pools
var bcrypt = require('bcryptjs'); //manages ALL encryption
var cookie = require('cookie-parser');
var escapeHtml = require('escape-html');
var escapePg = require('pg-escape');
var randomString = require('randomstring'); //TODO: move all IDs over to randomString

/*
 *  ALL userOb variables should follow this format:
 *  var userOb = {
 *    userID: '',
 *    username: '',
 *    email: '',
 *    description: '',
 *    token: '',
 *    password: ''
 *  }
 *
 *  ALL forumOb variables should follow this format:
 *  var forumOb = {
 *    forumID: '',
 *    name: '',
 *    authors: [],
 *    download: '',
 *    website: '',
 *    content: '',
 *    comments: [
 *      {
 *        commentID: '',
 *        content: '',
 *        replyTo: '',
 *        Author: '',
 *        username: '',
 *        date: ''
 *      }
 *    ],
 */

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

//Providing error messages for databse queries
forumPool.on('error', function (err, client) {
  console.error('idle client error', err.message, err.stack)
  console.log("DATABASE ERROR: " + err.stack);
});

/*
 * Summary:     Creates a forum post and adds the post to the database
 * Parameters:  Request variable | Title of the post | Content of the post |
 *              Function to be run when operations are completed
 * Category: Forum
 * Return:      Runs hopefullyFunction(errors)
 * TODO:        Implement new query design, optimize queries, implement new variable design, check for security
 *              flaws, add error functionality
 */
function postForum(token, title, content, website, download, hopefullyFunction) {

  var contentEscaped = escapeHtml(content); //Protecting against injection attacks

  var forumID = randomString.generate({
    length: 8,            //Generating an random, 8 character long
    charset: 'alphabetic' //string to be use as the post's ID
  });

  function callSelf() {
    var hasError = { error:true };

    //TODO: Compress these queries
    forumPool.query(escapePg('SELECT name."name" FROM forum."name" WHERE name."ForumID"=%L',  forumID), [], function(err, result) {

      if(result == null) {

        result = {
          rows: {
            length: 0
          }
        }

      }

      if(result.rows.length == 0) {

        forumPool.query(escapePg('INSERT INTO forum.content ("ForumID", "CurrentContent") VALUES (%L, %L);',  forumID, contentEscaped), [], function(err) {

          forumPool.query(escapePg('INSERT INTO forum.name ("ForumID", "name") VALUES (%L, %L);',  forumID, title), [], function(err) {

            forumPool.query(escapePg('SELECT token.userid FROM users.token WHERE token.token=%L;',  token), [], function(err, token) {

              if(token.rows.length == 1) {

                  forumPool.query(escapePg('INSERT INTO forum.authors ("ForumID", "Author") VALUES (%L, %L);',  forumID, token.rows[0].userid), [], function(err) {

                    hasError.error = false;
                    hasError.url = "/forum/post/" + forumID;
                    hopefullyFunction(hasError);
                    return;

                  });

              }
              else {
                hopefullyFunction(hasError);
                return;
              }

            });
          });
        });
      }
      else {
        callSelf();
      }

    });

  }
  callSelf();
}

/*
 * Summary:     Gets an array of forum posts
 * Parameters:  Number of forum post | Number of the first post | Function
 *              to be run when operations are completed
 * Category: Forum
 * Return:      Runs hopefullyFunction(forumArray)
 * TODO:        Implement new query design, optimize queries, implement new variable design, check for security
 *              flaws, add error functionality
 */
function getForumArray(limit, offset, hopefullyFunction) {
  var returnVar = {

    error: true,
    output: false

  }
  if(isNaN(limit) || isNaN(offset) || limit < 1 || offset < 0) {

    hopefullyFunction(returnVar);
    return;

  } else {
    forumPool.query(escapePg('SELECT COUNT(*) FROM forum.content'), function(err, count) {

      var offsetGreater = false;
      var number = parseInt(count.rows[0].count,10);
      returnVar.l = number;

      if(offset > number) {

        offsetGreater = true;
        offset = number - 1;
        hopefullyFunction(returnVar);
        return;

      } else if(number - (offset + limit) < 1) {

        offset = 0;

      } else {

        offset = number - (offset + limit);

      }
      forumPool.query(escapePg('SELECT content."ForumID",content."Date" FROM forum.content ORDER BY content."Date" LIMIT %s OFFSET %s;',limit,offset), [], function(err, result) {
        if(result != null) {
          var iDList = "";
          var orderList = "";
          var orderList2 = "";
          var authorList = "";
          for(i=0; i<result.rows.length; i++) {
            iDList+= "'" + result.rows[i].ForumID + "'";
            if(i+1<result.rows.length) {
              iDList+=", ";
            }
          }
          for(b=0; b<result.rows.length; b++) {
            orderList+= " WHEN name.\"ForumID\" = '" + result.rows[b].ForumID + "' THEN '" + (b+1) + "'";
            if(b+1>=result.rows.length) {
              orderList+=" ELSE name.\"ForumID\" END ASC;";
            }
          }
          for(x=0; x<result.rows.length; x++) {
            orderList2+= " WHEN authors.\"ForumID\" = '" + result.rows[x].ForumID + "' THEN '" + (x+1) + "'";
            if(x+1>=result.rows.length) {
              orderList2+=" ELSE authors.\"ForumID\" END ASC;";
            }
          }
          forumPool.query(escapePg('SELECT name."name" FROM forum.name WHERE name."ForumID" IN (' + iDList + ") ORDER BY CASE" + orderList), [], function(err, result3) {
            forumPool.query(escapePg('SELECT authors."Author" FROM forum.authors WHERE authors."ForumID" IN (' + iDList + ") ORDER BY CASE" + orderList2), [], function(err, result4) {

              for(y=0; y<result4.rows.length; y++) {
                authorList+= "'" + result4.rows[y].Author + "'";
                if(y+1<result.rows.length) {
                  authorList+=", ";
                }
              }

              forumPool.query(escapePg('SELECT username.username,username.userid FROM users.username WHERE username.userid IN (' + authorList + ")"), [], function(err, result5) {
                returnVar.error = false;

                var result6 = {
                  rows: []
                };

                var times = 0;

                for(c=0; c<result5.rows.length; c++) {

                  for(d=0; d<result4.rows.length; d++) {

                    if(result4.rows[d].Author == result5.rows[c].userid) {

                      result6.rows[times] = {

                        author: result5.rows[c].username

                      }

                      times++;

                    }
                  }
                }

                for(d=0; d<result.rows.length; d++) {
                    var date = result.rows[d].Date.toString();
                    date = date.slice(4,15);
                    date= spliceSlice(date,6,0, ",");
                    result.rows[d].Date = date;
                }
                result6.rows.reverse();
                result.rows.reverse();
                result3.rows.reverse();
                returnVar.output = {
                  author: result6.rows,
                  content: result.rows,
                  name: result3.rows,
                  l: result.rows.length,
                  number: number,
                  error: false
                }
                hopefullyFunction(returnVar);
                return;
              });
            });
          });
        }
        else {
          hopefullyFunction(returnVar);
          return;
        }
      });
    });
  }
}

/*
 * Summary:     Gets all of the posts made by a single author
 * Parameters:  The author's User ID | Function to be run
 *              when operations are completed
 * Category: Forum
 * Return:      Runs hopefullyFunction(result)
 * TODO:        Implement new query design, optimize queries, implement new variable design, check for security
 *              flaws, add error functionality
 */
function getPostsByAuthor(authorID, hopefullyFunction) {
  forumPool.query(escapePg('SELECT "Name"."name","Content"."Date","Content"."views","Name"."ForumID" FROM main."Name" INNER JOIN main."Content" on "Name"."ForumID"="Content"."ForumID" WHERE "Name"."ForumID" IN (SELECT "Authors"."ForumID" FROM main."Authors" WHERE "Authors"."Author"=%L) ORDER BY "Content"."Date" DESC;', authorID), [], function(err, result) {

    for(var v = 0; v < result.rowCount; v++) {

      var date = result.rows[v].Date.toString();
      date = date.slice(4,15);
      date= spliceSlice(date,6,0, ",");
      result.rows[v].Date = date;

    }

    hopefullyFunction(result);
    return true;

  });
}

/*
 * Summary:     Posts a comment
 * Parameters:  Comment text | Author ID | Author replying did |
 *              Function to be run when operations are completed
 * Category:    Forum
 * Return:      Runs hopefullyFunction(forumArray)
 * TODO:        Implement new query design, optimize queries, implement new variable design, check for security
 *              flaws, add error functionality
 */
function postComment(text, author, forumId, replyTo, hopefullyFunction) {
  var commentEscaped = escapeHtml(text);
  if(replyTo == false) {
    forumPool.query(escapePg('SELECT name."ForumID" FROM forum.name WHERE name."ForumID"=%L',  forumId), [], function(err,values) {
      if(values.rows.length >= 1) {
        forumPool.query(escapePg('INSERT INTO forum.comments ("ForumID", "Author", "Comment") VALUES (%L, %L, %L);',  forumId, author, commentEscaped), [], function(err) {
          hopefullyFunction(false);
          return;
        });
      }
      else {
        hopefullyFunction(true);
        return;
      }
    });
  }
  else if(replyTo > 0) {
    forumPool.query(escapePg('SELECT comments.replyto, comments."ForumID", comments."CommentID" FROM forum.comments WHERE comments."ForumID"=%L AND comments."CommentID"=%L',  forumId, replyTo), [], function(err,values) {
      if(values.rows.length == 1) {
        if(values.rows[0].replyto != null) {
          replyTo = values.rows[0].replyto;
        }
        forumPool.query(escapePg('INSERT INTO forum.comments ("ForumID", "Author", "Comment", replyto) VALUES (%L, %L, %L, %L);',  forumId, author, commentEscaped, replyTo), [], function(err) {
          hopefullyFunction(false);
          return;
        });
      }
      else {
        hopefullyFunction(true);
        return;
      }
    });
  }
  else {
    hopefullyFunction(true);
    return;
  }
}

/*
 * Summary:     Gets all of the data for a forum post
 * Parameters:  Forum ID | Function
 *              to be run when operations are completed
 * Category: Forum
 * Return:      Runs hopefullyFunction(forumData)
 * TODO:        Implement new query design, optimize queries, implement new variable design, check for security
 *              flaws, add error functionality
 */
function getForumData(forumID, hopefullyFunction) {
    var forumData = {
      error: true
    };
    forumPool.query(escapePg('SELECT name.name, name."ForumID", authors."Author", content."CurrentContent", content.views, content."Date" FROM forum.name JOIN forum.authors ON (name."ForumID" = authors."ForumID") JOIN forum.content ON (name."ForumID" = content."ForumID") WHERE name."ForumID" = %L', forumID), [], function(err, result) {
      if(result.rows.length < 1) {

        hopefullyFunction(forumData);
        return true;

      }
      else {

        forumData = result.rows[0];

        forumData.error = false;

        var date = forumData.Date.toString();
        date = date.slice(4,15);
        date = spliceSlice(date,6,0, ",");
        forumData.Date = date;

        forumPool.query(escapePg('SELECT username.username FROM users.username WHERE username.userid=%L', forumData.Author), [], function(err, result2) {

          forumData.Author = result2.rows[0]['1'];

          hopefullyFunction(forumData);
          return true;

        });
      }
    });
}

/*
 * Summary:     Gets comments from a forum post
 * Parameters:  Forum ID | Function
 *              to be run when operations are completed
 * Category: Forum
 * Return:      Runs hopefullyFunction(comments)
 * TODO:        Implement new query design, optimize queries, implement new variable design, check for security
 *              flaws, add error functionality
 */
function getComments(forumID, hopefullyFunction) {

  forumPool.query(escapePg('SELECT username.username,comments."Author",comments."Comment",comments."RemovedBy",comments.datecreated,comments."CommentID",comments.replyto FROM forum.comments JOIN users.username ON comments."Author"=username.userid WHERE comments."ForumID"=%L ORDER BY comments.datecreated DESC;', forumID), [], function(err, comments) {

    hopefullyFunction(comments);

  });
}

/*
 * Summary:     Adds a view to a forum post
 * Parameters:  The post's ID | Function to be run
 *              when operations are completed
 * Category: Forum
 * Return:      Runs hopefullyFunction()
 * TODO:        Implement new query design, optimize queries, implement new variable design, check for security
 *              flaws, add error functionality
 */
function addView(forumID, hopefullyFunction) {
  forumPool.query(escapePg('UPDATE forum.content SET views=content.views+1, "Date"=content."Date" WHERE "ForumID"=%L', forumID), [], function(err) {

    hopefullyFunction();
    return true;

  });
}

/*
 * Summary:     Gets user Object from a token
 * Parameters:  The user's token | Function
 *              to be run when operations are completed
 * Category: User
 * Return:      Runs hopefullyFunction(userOb) or false if not logged in
 * TODO:        Optimize queries, check for security
 *              flaws, add error functionality
 */
function getUserFromToken(token, hopefullyFunction) {

  if(token == null) {

    hopefullyFunction(false);
    return false;

  }

  forumPool.query(escapePg('SELECT * FROM users.email JOIN users.description ON (description.userid = email.userid) JOIN users.password ON (password.userid = email.userid) JOIN users.token ON (email.userid = token.userid) JOIN users.username ON (email.userid = username.userid) WHERE token=%L;', token), [], function(err, result) {

    if(result.rows.length < 1) {

      hopefullyFunction(false);
      return false;

    }


    var userOb = {
      userID: result.rows[0].userid,
      username: result.rows[0].username,
      email: result.rows[0].email,
      description: result.rows[0].description,
      token: token,
      password:result.rows[0].password
    }
    hopefullyFunction(userOb);
    return;

  });
}

/*
 * Summary:     Gets user Object from a username
 * Parameters:  The user's username | Function
 *              to be run when operations are completed
 * Category: User
 * Return:      Runs hopefullyFunction(userOb) or false if not logged in
 * TODO:        Optimize queries, check for security
 *              flaws, add error functionality
 */
function getUserFromName(name, hopefullyFunction) {

  if(name == null) {

    hopefullyFunction(false);
    return false;

  }

  forumPool.query(escapePg('SELECT * FROM users.email JOIN users.description ON (description.userid = email.userid) JOIN users.password ON (password.userid = email.userid) JOIN users.token ON (email.userid = token.userid) JOIN users.username ON (email.userid = username.userid) WHERE username=%L;', name), [], function(err, result) {

    if(result.rows.length < 1) {

      hopefullyFunction(false);
      return false;

    }


    var userOb = {
      userID: result.rows[0].userid,
      username: result.rows[0].username,
      email: result.rows[0].email,
      description: result.rows[0].description,
      token: result.rows[0].token,
      password:result.rows[0].password
    }
    hopefullyFunction(userOb);
    return;

  });
}

/*
 * Summary:     Sets a user's token (logs in a user )
 * Parameters:  User ID | Result | Function
 *              to be run when operations are completed
 * Category: User
 * Return:      Runs hopefullyFunction()
 * TODO:        Optimize queries, check for security
 *              flaws, add error functionality
 */
function setToken(userID, res, hopefullyFunction) {

  runSelf();
  function runSelf() {

    var token = randomString.generate(64);

    forumPool.query(escapePg('SELECT token.token FROM users.token WHERE token.token=%L', token), [], function(err, result) {

      if(result.rows.length < 1) {

        forumPool.query(escapePg('UPDATE users.token SET token=%L WHERE token.userid=%L', token, userID), [], function(err, result2) {

            if(result2.rowCount == 0) {

              forumPool.query(escapePg('INSERT INTO users.token(token, userid) VALUES(%L, %L)', token, userID), [], function(err, result3) {

                res.cookie('token2', token, { maxAge: 1209600000, httpOnly: true });
                hopefullyFunction();

              });
            }
            else {

              res.cookie('token2', token, { maxAge: 1209600000, httpOnly: true });
              hopefullyFunction();

            }

        });
      }
      else {

        runSelf();

      }
    });
  }
}

/*
 * Summary:     Runs setToken function if password and username are correct (logs in a user )
 * Parameters:  Username | Password | Result | Function
 *              to be run when operations are completed
 * Category: User
 * Return:      Runs hopefullyFunction(True/False)
 * TODO:        Optimize queries, check for security
 *              flaws, add error functionality
 */
function login(username, password, res, hopefullyFunction) {

  forumPool.query(escapePg("SELECT password.password, password.userid FROM users.password JOIN users.username ON username.userid=password.userid WHERE username=%L", username), [], function(err, result) {

    if(result.rows == null || result.rows[0] == null) {

        hopefullyFunction(false);
        return false;

    }

    var correct = bcrypt.compareSync(password, result.rows[0].password);

    if(correct==true) {
      setToken(result.rows[0].userid, res, function() {

        hopefullyFunction(true);
        return true;

      });

    }
    else {

      hopefullyFunction(false);
      return false;

    }
  });
}

/*
 * Summary:     Deletes a user's token (logs out a user )
 * Parameters:  Token | Function
 *              to be run when operations are completed
 * Category: User
 * Return:      Runs hopefullyFunction()
 * TODO:        Optimize queries, implement new variable design, check for security
 *              flaws, add error functionality
 */
function logout(token, hopefullyFunction) {

  forumPool.query(escapePg('UPDATE users.token SET token=null WHERE token.token=%L', token), [], function(err) {

    hopefullyFunction();
    return true;

  });

}

/*
 * Summary:     Changes a user's description
 * Parameters:  A user ID | The new descrition | Function
 *              to be run when operations are completed
 * Category: User
 * Return:      Null
 * TODO:        Check for security
 *              flaws, add error functionality
 */
function editDescription(userID, newDesc, hopefullyFunction) {

  var eNewDesc = escapeHtml(newDesc);

  forumPool.query(escapePg('UPDATE users.description SET description=%L WHERE description.userid=%L', eNewDesc, userID), function(err) {

    hopefullyFunction();

  });
}

/*
 * Summary:     Checks if a new password is valid
 * Parameters:  Password, confirm password
 * Category: Utility
 * Return:      Returns an errors array
 * TODO:        Check for optimization and security flaws
 */
function checkPassword(password, cPassword) {
  var errors = {

    hasError: false,
    pNoMatch: false,
    noAlpha: false,
    pTooShort: false,
    pTooLong: false

  };
  if(password !=cPassword) {
    errors.pNoMatch = true;
    errors.hasError = true;
  }

  if(/a-z, A-Z, 0-9, _, %,!,@,#,$,%,^,&,*/.test(password) && password != "") {
    errors.noAlpha = true;
    errors.hasError = true;
  }

  if(password.length < 8) {
    errors.pTooShort = true;
    errors.hasError = true;
  }

  if(password.length > 60) {
    errors.pTooLong = true;
    errors.hasError = true;
  }

  return errors;

}

/*
 * Summary:     Checks if a new Username is valid
 * Parameters:  Username
 * Category: Utility
 * Return:      Returns an errors array
 * TODO:        Check for optimization and security flaws
 */
function checkUsername(username) {

  var errors = {

    hasError: false,
    noAlpha: false,
    uTooShort: false,
    uTooLong: false,

  };

  if(!alpha(username)) {
    errors.noAlpha = true;
    errors.hasError = true;
  }

  if(username.length < 3) {
    errors.uTooShort = true;
    errors.hasError = true;
  }

  if(username.length > 16) {
    errors.uTooLong = true;
    errors.hasError = true;
  }

  return errors;

}

/*
 * Summary:     Checks if a new email is valid
 * Parameters:  Email
 * Category: Utility
 * Return:      Returns an errors array
 * TODO:        Check for optimization and security flaws
 */
function checkEmail(email) {

  var errors = {

    hasError: false,
    noAlpha: false,
    eTooShort: false,
    eTooLong: false,
    isNEmail: false,

  };

  if(/a-z, A-Z, 0-9, _, %,!,@,#,$,%,^,&,*/.test(email)) {
    errors.noAlpha = true;
    errors.hasError = true;
  }

  if(email.length < 6) {
    errors.eTooShort = true;
    errors.hasError = true;
  }

  if(email.length > 35) {
    errors.eTooLong = true;
    errors.hasError = true;
  }
  if(!(email.includes("@") &&  email.includes("."))) {
    errors.isNEmail = true;
    errors.hasError = true;
  }
  return errors;

}

/*
 * Summary:     Checks if a string is Alphanumeric
 * Parameters:  String
 * Category: Utility
 * Return:      Returns True or False
 * TODO:        Check for optimization and security flaws
 */
function alpha(string) {
  if( /[^a-zA-Z0-9]/.test( string ) ) {

     return false;

  }
  return true;
}

/*
 * Summary:     Checks if a variable is null
 * Parameters:  Variable
 * Category: Utility
 * Return:      Returns True or False
 * TODO:        Check for optimization
 */
function isNull(variable) {
  if(variable == null) {
    return true;
  }
  return false;
}

/*
 * Summary:     Gets comments from a forum post
 * Parameters:  ????? figure out later
 * Category: Utility
 * Return:      Spliced string
 * TODO:        Update parameters, check for optimization
 */
function spliceSlice(str, index, count, add) {
  // We cannot pass negative indexes dirrectly to the 2nd slicing operation.
  if (index < 0) {
    index = str.length + index;
    if (index < 0) {
      index = 0;
    }
  }

  return str.slice(0, index) + (add || "") + str.slice(index + count);
}

/*
 * Summary:     Function run if there is an error
 * Parameters:  String ???
 * Category: Utility
 * Return:      null
 * TODO:        ????????? Do something with it I guess
 */
var onError = function(e) {

}

/*
 * Summary:     Checking if a string is equal to on
 * Parameters:  boolean
 * Category: Registration
 * Return:      hasError
 */
var checkTOS13 = function(tos) {
  if(tos != 'on') {
    return {hasError: true};
  }
  else {
    return {hasError: false};
  }
}

module.exports = {
  getUserFromName:getUserFromName,
  getUserFromToken:getUserFromToken,
  getComments:getComments,
  postComment:postComment,
  addView:addView,
  getPostsByAuthor:getPostsByAuthor,
  editDescription:editDescription,
  getForumArray:getForumArray,
  postForum:postForum,
  getForumData:getForumData,
  logout:logout, login:login,
  setToken:setToken,
  checkEmail:checkEmail,
  checkUsername:checkUsername,
  checkPassword:checkPassword,
  isNull:isNull,
  alpha:alpha,
  checkTOS13:checkTOS13
};
