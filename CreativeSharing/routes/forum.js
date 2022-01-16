var express = require('express');
var router = express.Router();
var functions = require('./functions');

//Getting a post
router.get('/post/:postid', function(req, res) {
  var postId = req.params.postid;

  //Getting user's username
  functions.getUserFromToken(req.cookies.token2, function(userOb) {

    //Getting the post
    functions.getForumData(postId, function(forumData) {

      //404 callback
      if(forumData.error) {
        console.log(forumData);
        res.redirect('/404');
      }

      //Adding a view to the post
      functions.addView(postId, function() {

        //Getting 5 most recent posts for left sidebar
        functions.getForumArray(5,0, function(fivePost) {

          //Getting the post's comments
          functions.getComments(postId, function(comments) {

            var commentsWithReplies = [];

            //Running through each comment to search for replies
            for (var b = 0; b < comments.rowCount; ++b) {

              //Checking if the current comment is a reply
              if(comments.rows[b].replyto != null) {
                commentsWithReplies.push(comments.rows[b].replyto);
              }

            }

            res.render('forum', { title: 'Creative Sharing | Forum', commentsWithReplies:commentsWithReplies, comments:comments, userOb:userOb,forumData:forumData,fivePost:fivePost});

          });
        });
      });
    });
  });
});

//Posting a comment
router.post('/post/:postid', function(req, res, next) {
  //Getting user's username
  functions.getUserFromToken(req.cookies.token2, function(userOb) {
    //Checking if user is logged in, if not, redirecting
    //to login page
    if(userOb == false) {
      res.redirect("/login");
      return;
    }

    //Assigning variables to the comment text and the
    //post that the comment will be assigned to
    var comment = req.body.comment;
    var forumId = req.params.postid;

    //Making sure the comment is not null
    if(comment == " " || comment == null || comment == "") {
      res.redirect('/forum/post/' + forumId);
      return;
    }

    //Adding the comment to database
    functions.postComment(comment, userOb.userID, forumId, false, function(err) {

      //If the comment was added, redirect to post
      if(err==false) {
        res.redirect('/forum/post/' + forumId);
      }

      //If comment was not added, redirect to 404
      else {
        res.redirect("/404");
      }
    });
  });
});

//Replying to a comment
router.post('/reply/:commentid', function(req, res, next) {

  //Getting the user's username
  functions.getUserFromToken(req.cookies.token2, function(userOb) {

    //Making sure user is logged in, if not, redirect
    //to login page
    if(userOb == false) {
      res.redirect("/login");
      return;
    }

    //Assigning variables to the reply text, the commentId
    //that is being replied to, and the forum that the
    //comment will be assigned to
    var reply = req.body.reply;
    var replyId = req.params.commentid;
    var forumId = req.body.postId;

    //Making sure the reply is not null
    if(reply == " " || reply == null || reply == "") {
      res.redirect('/forum/post/' + forumId);
      return;
    }
    console.log(forumId + " "  + replyId)
    //Adding the reply to the database
    functions.postComment(reply, userOb.userID, forumId, replyId, function(err) {

      //Checking if the reply was added
      if(err==false) {

        //If added, redirect to post
        res.redirect('/forum/post/' + forumId);

      }
      else {

        //Otherwise, redirect to 404
        res.redirect("/404");

      }
    });
  });
});

//Home forum page with first five results
router.get('/', function(req, res) {

  //Getting the user's username
  functions.getUserFromToken(req.cookies.token2, function(userOb) {

    //Getting the first five posts
    functions.getForumArray(5,0, function(result) {

        //Load the page
        res.render('listPosts', { title: 'Creative Sharing | Forum', listNumber:1, fivePost:result, result:result, userOb:userOb });

        return;
    });

  });
});

//Getting 5 posts based on pager number
router.get('/list/:number', function(req, res) {

  //Defining the page number
  var listNumber = parseInt(req.params.number, 10);

  //Getting the user's username
  functions.getUserFromToken(req.cookies.token2, function(userOb) {

    //Getting the first post's number
    var listNumber5 = 5*(listNumber-1);

    //Getting the list of posts
    functions.getForumArray(5, listNumber5, function(result) {

      //Getting posts for sidebar
      functions.getForumArray(5, 0, function(fivePost) {

        //Error catch
        if(result.error) {

          //If the page number is negative, display first
          //five posts
          if(listNumber5 < 0) {

            res.render('listPosts', { title: 'Creative Sharing | Forum', fivePost:fivePost, listNumber:1, result:fivePost, userOb:userOb });

          }

          //If page number was too high, get the last
          //posts
          else {

            functions.getForumArray(5,result.l, function(result2) {
              res.render('listPosts', { title: 'Creative Sharing | Forum', fivePost:fivePost, listNumber:(result.l+(5-result.l%5))/5, result:result2, username:username });
            });

          }
        }
        else {

          //If there weren't any errors, display the page
          res.render('listPosts', { title: 'Creative Sharing | Forum', fivePost:fivePost, listNumber:listNumber, result:result, userOb:userOb });

        }
      });
      return;
    });

  });
});

module.exports = router;
