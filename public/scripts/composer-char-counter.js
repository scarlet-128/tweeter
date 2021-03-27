$(document).ready(function() {
  console.log("^_^")
  $("#tweet-text").keyup(function() {
    console.log(this.value);
   let len = 140-this.value.length;
    // let len = text.length;
    // console.log(len);
    if (len >= 0 ) {
      $(".counter").css("color","blue").html(len);
    } else {
      $(".counter").css("color","red").html(len);
    }   
  })

  $(".tweet").hover(function(){
    $(this).css("box-shadow","5px 10px #888888")
    }, function(){
      $(this).css("box-shadow", "none")});
   
    


});
