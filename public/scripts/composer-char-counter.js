$(document).ready(function() {
  // console.log("^_^")
  $("#tweet-text").keyup(function() {
    // console.log(this.value);
   let len = 140-this.value.length;
    // let len = text.length;
    // console.log(len);
    if (len >= 0 ) {
      $(".counter").css("color","blue").html(len);
    } else  {
    //  $('#tweet-button').error(function() {
    //   alert( "Handler for .error() called." )})
      $(".counter").css("color","red").html(len);
      
    }
  })
  $("#tweet").hover(function(){
    $(".user__handle").show();
    }, function(){
      // $(this).css("box-shadow", "none")
      $(".user__handle").hide();
    });
 
      
  


});
