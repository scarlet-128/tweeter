$(() =>{
  // console.log("something")
  
  const fetchTweets = () =>{
    $.ajax({
      url: '/tweets/',
      method: 'GET',
      dataType : 'json',
      success : (tweets) => {
        renderTweets(tweets);
      },
      error: (error) => {
       console.error(error)
      }
    })
  }
  const $tweetButton = $("#tweet-button");
  $tweetButton.click(()=>{
    const len = $("#tweet-text").val().length
    let validation;
    if (len === 0 ) {
      // alert( "please insert text befor submit" )
      // const warning = $('<div>').text("Please insert text befor submit")
      const warning = $('<i>').addClass('fas fa-exclamation-triangle').text('Whooops!!! Enter something first')
      $('#warning').empty();
      $('#warning').append(warning).fadeIn();
      $('#warning').append(warning).fadeOut(5000);
      return validation === false
    } else if (len >140){
      const warning = $('<i>').addClass('fas fa-exclamation-triangle').text('Whooops!!! Exceed word limit!')
      $('#warning').empty();
      $('#warning').append(warning).fadeIn();
      $('#warning').append(warning).fadeOut(5000)
      return validation === false
     } 
     if (validation === true) {
    fetchTweets();
    }
  })
  const renderTweets = (tweets) => {
    // console.log("tweets",tweets)
    const $tweets = $('#tweet');
    $tweets.empty();
    for(const id in tweets) {
      // console.log("id",id)
      const tweet = tweets[id];
      // console.log("tweetid",tweet)
      const $tweet = $('<article>').addClass('tweet');
      const $header = $('<header>').addClass('tweet__header')
      const $avatars = $('<img>').attr("src",tweet.user.avatars);
      const $userName = $('<h3>').addClass('user-name').text(tweet.user.name);
      const $handle = $('<h>').addClass('user__handle').text(tweet.user.handle)
      
      const $body = $('<article>')
      const $content = $('<h5>').addClass('tweet__content').text(tweet.content.text);
      const $footer = $('<footer>').addClass('tweet__footer')
      const readableDate = moment(tweet.created_at).fromNow();
      const date = $('<p>').addClass('date').text(readableDate);
    
      
  // append social media buttons
      const comments = $('<i>').addClass("fas fa-comments");
      const retweet = $('<i>').addClass("fas fa-retweet");
      const like = $('<i>').addClass("fas fa-heart")
      const upload = $('<i>').addClass("fas fa-arrow-circle-up");
      $body.append($content);
      $header.append($avatars,$userName,$handle);
      $footer.append(date,comments,retweet,like,upload)
      $tweet.append($header,$body,$footer)
      $tweets.prepend($tweet)
    }

  }
  
  const $tweetForm = $('#new-tweet');

  $tweetForm.on('submit', function (event) {
    $(".counter").html('140');
   event.preventDefault();
     const serializedData = $(this).serialize();
    
     
      $.post('/tweets/', serializedData)
        .then((response) => {
        
          fetchTweets();

          $(this).children("#tweet-text").val(''); 
          
        }) 
   
  })
    


  const loadTweets = () => {

    $.ajax({
        url: "/tweets/",
        method: 'GET',
        dataType: 'json',
      })
      .then(function(data) {
        renderTweets(data);
      });
  };

  loadTweets();


});

