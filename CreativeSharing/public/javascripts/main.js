var hideMenu = function() {
  $("#blur").css({filter:"blur(0px)", "-webkit-filter": "blur(0px)", "-o-filter": "blur(0px)"});
  $("#menu").animate({opacity:"0"}, function() {$("#menu").css({zIndex: "-1"})});
};

var openMenu = function(title, body) {

  $("#menuSecondLayer").html("<div class='menuTitle'>" + title + "<div id='closeMenu'>x</div></div><div class='menuBody'>" + body + "</div>");
  $("#blur").css({filter:"blur(4px)", "-webkit-filter": "blur(2px)", "-o-filter": "blur(0px)"});
  $("#menu").css({zIndex: "10"}).animate({opacity:"1"});
  $("#closeMenu").click(

    function() {
      hideMenu();
    }
  );
}

var openLoginMenu = function() {

  openMenu("Login", "<form action='/login' method='post'><input placeholder='Username' name='username' type='username' class='loginRegisterMenuInput'/><br><input placeholder='Password' name='password' type='Password' class='loginRegisterMenuInput'/><br><input type='submit' class='loginRegisterMenuInput'/></form>");

};

//Opens the registration menu, is run when the register button is clicked
var openRegisterMenu = function() {

  openMenu("Register", "<form action='/register' method='post'><input placeholder='Username' name='username' type='username' class='loginRegisterMenuInput'/><br><input placeholder='Email' name='email' type='email' class='loginRegisterMenuInput'/><br><input placeholder='Password' name='password' type='Password' class='loginRegisterMenuInput'/><br><input placeholder='Confirm Password' name='cPassword' type='Password' class='loginRegisterMenuInput'/><br><div id='checksCont'><label class='checks'><input name='user13' type='checkbox' class='check'><span class='checkmark'></span><div class='agreeText'>I am at least 13 years of age</div></label><br><label class='checks'><input name='tos' type='checkbox' class='check'><span class='checkmark'></span><div class='agreeText'>I agree to the Creative Sharing <a href='/tos'>Terms of Service</a></div></label></div><input type='submit' class='loginRegisterMenuInput'/></form>")

}

var removeTimeoutClass = function() {
  $("#loginRegister").removeClass("timeout");
}

//Function is run whenever the window is resized
//and resizes the contents accordingly
function updateMobile() {

  var loginHover = false;
  var offsetOne = $('#rightlinks').offset().left + $('#rightlinks').width() < 1370;

  //Checking whether window size is "mobile" or "desktop" size
  if(offsetOne) {

    //Setting mobile configuration
    $("#desktop").css("opacity","0");
    $("#mobileNav").css("opacity","1");
    $(".userDesc").css({"max-width":"72%"});
  }
  else {

    //Setting desktop configuration
    $("#desktop").css("opacity","1");
    $("#mobileNav").css("opacity","0");
    $(".userDesc").css({"max-width":""});

  }

}

//When window is loaded, this is run
$(function() {
  //custom drop down select code
  var x, i, j, selElmnt, a, b, c;
  /*look for any elements with the class "custom-select":*/
  x = document.getElementsByClassName("custom-select");
  for (i = 0; i < x.length; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    /*for each element, create a new DIV that will act as the selected item:*/
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /*for each element, create a new DIV that will contain the option list:*/
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < selElmnt.length; j++) {
      /*for each option in the original select element,
      create a new DIV that will act as an option item:*/
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function(e) {
          /*when an item is clicked, update the original select box,
          and the selected item:*/
          var y, i, k, s, h;
          s = this.parentNode.parentNode.getElementsByTagName("select")[0];
          h = this.parentNode.previousSibling;
          for (i = 0; i < s.length; i++) {
            if (s.options[i].innerHTML == this.innerHTML) {
              s.selectedIndex = i;
              h.innerHTML = this.innerHTML;
              y = this.parentNode.getElementsByClassName("same-as-selected");
              for (k = 0; k < y.length; k++) {
                y[k].removeAttribute("class");
              }
              this.setAttribute("class", "same-as-selected");
              break;
            }
          }
          h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function(e) {
        /*when the select box is clicked, close any other select boxes,
        and open/close the current select box:*/
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
    });
  }
  function closeAllSelect(elmnt) {
    /*a function that will close all select boxes in the document,
    except the current select box:*/
    var x, y, i, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    for (i = 0; i < y.length; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i)
      } else {
        y[i].classList.remove("select-arrow-active");
      }
    }
    for (i = 0; i < x.length; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
      }
    }
  }
  /*if the user clicks anywhere outside the select box,
  then close all select boxes:*/
  document.addEventListener("click", closeAllSelect);
  //Initially checks if the device is mobile or desktop
  updateMobile();

  //Sets navbar transitions so updateMobile(); doesn't cause fading initially
  $("#navbar").css({"transition":"all 0.5s"});
  $("#userDropDown").css({"transition":"background-color 0.5s"});
  $("#commentButton").hide();

  //Opens the comment reply box
  $(".commentReply").click(function() {
    var commentId = $(this).parent().attr("commentId");
    var postId = $(".child").attr("postId")
    $(this).parent().append('<form action="/forum/reply/' + commentId + '" method="post"><textarea class="replyText" name="reply"></textarea><input type="hidden" name="postId" value="' +postId + '"><input value="Send" type="submit" class="submitButton" id="replyButton"></form>');
    $(this).remove();
    $(".replyText").css({height:"100px", width:"92%"});
  })

  //Expands the comment box on the forumpost page
  function expandCommentBox() {
    $(".commentBox").css({
      height: "200",
      width:"60%"
    });
    $("#commentButton").slideDown();
    $(".expand").addClass("rotate");
  }

  //Runs expandCommentBox(); on focus
  $(".commentBox").focus(function() {
    expandCommentBox();
  });

  //Contracts the comment box on the forumpost page
  $(".expand").click(function() {
    if($(this).hasClass("rotate")) {
      $(".commentBox").css({
        height: "32",
        width:"40%"
      });
      $(this).removeClass("rotate");
    }
    else {
      $(".commentBox").focus();
    }
  });

  //Is run whenever client scrolls and updates the navigation bar accordingly
  $(window).scroll(function() {

    if($(this).scrollTop() <= 0) {

      //Updating the navigation bar and drop down menu's colors
      $("#navbar").css({"background-color":"rgba(0, 59, 88, 0.65)"});
      $("#userDropDown").css({"background-color":"rgba(0, 59, 88, 0.65)"});

    }
    else {

      //Updating the navigation bar and drop down menu's colors
      $("#navbar").css({"background-color":"rgb(13, 86, 110)"});
      $("#userDropDown").css({"background-color":"rgb(13, 86, 110)"});

    }

  });

  //Checks window size on resize for responsive design
  $(window).resize(function() {

    //Sets version navbar transitions so updateMobile(); doesn't cause initial fading
    $("#desktop").css({"transition":"all 0.5s"});
    $("#mobileNav").css({"transition":"all 0.5s"});
    updateMobile();

  });

  //Initially hides the navbar dropdown menu
  $("#userDropDown").hide();

  //Opens the dropdown menu on hover
  $("#userCont").mouseenter(function() {
      $("#userDropDown").animate({
        height: "toggle",
        opacity: "1",
        right: "30px"
      }, 250, function() {

      });
  });

  $("#userCont").mouseleave(function() {
    $("#userDropDown").animate({
      height: "toggle",
      opacity: "0",
      right: "0"
    }, 250, function() {

    });
  });

  $("#title").click(

    function() {
      $("#title").html("Testing <div id='description'>Test | Testing | Tester</div>");
    }
  );

  $("#loginRegister").hover(

    function() {
      if(!$("#loginRegister").hasClass("timeout")) {
        $(this).animate({top: "0", height: "72px"}).css({borderColor: "#919191"});
        $("#login").css({backgroundColor: "rgba(56, 56, 56, 0.5)"}).animate({paddingLeft: "35px", width: "90px", paddingTop: "21px", paddingBottom: "21px"});
        $("#register").animate({opacity: "1", width: "95px", paddingRight: "30px", paddingLeft:"15px"});
        $(this).addClass("timeout");
      }
    }
    );

  $("body").click(

    function() {
      $("#loginRegister").animate({top: "7px", height: "55px"}).css({borderColor: "#2e6975"});
      $("#login").css({backgroundColor: "rgba(56, 56, 56, 0)"}).animate({paddingLeft: "100px", width:"auto", paddingTop: "13px", paddingBottom: "0px"});
      $("#register").animate({opacity: "0", width: "0", paddingRight: "0"});
      timeoutOne = window.setTimeout(removeTimeoutClass, 1500);
    }

  );

  $("#login").click(

    function() {
      openLoginMenu();
    }

  );

  $("#register").click(

    function() {
      openRegisterMenu();
    }

  );

  $("#menu").click(

    function() {

      if($('#menuSecondLayer').is(":hover") == false) {
        hideMenu();
      }

    }
  );
});
