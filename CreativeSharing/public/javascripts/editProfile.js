$(function() {
  $("#descriptionEdit").click(function() {
    function openMenuJQ(title,desc) {
      openMenu(title, desc);
    }
    openMenuJQ("Edit Description", "<form action='/profile/testUser/description' method='post'><textarea name='description' placeholder='Description' class='textarea'/></textarea><br><input type='submit' class='loginRegisterMenuInput'/></form>");
  });
});
