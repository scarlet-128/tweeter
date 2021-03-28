$(() =>{
  // console.log("something")
  jQuery("time.timeago").timeago();
  const fetchTweets = () =>{
    $.ajax({
      url: '/tweets/',
      method: 'GET',
      dataType : 'json',
      success : (tweets) => {
        renderTweets(tweets);
      },
      error: function (request, status, error) {
        alert(request.responseText);
      }
    })
  }
  const $tweetButton = $("#tweet-button");
  $tweetButton.click(()=>{
    fetchTweets();
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
      const $handle = $('<h>').addClass('user-handle').text(tweet.user.handle)
      
      const $body = $('<article>')
      const $content = $('<h5>').text(tweet.content.text);
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
   event.preventDefault();
     const serializedData = $(this).serialize();
     const tweet = $('textarea').val()
     
      $.post('/tweets/', serializedData)
        .then((response) => {
        
          fetchTweets();

          $(this).children("#tweet-text").val(''); 
          

        }) 
        // if(tweet.length === 0 || tweet.length > 140){
          .catch((error) =>  {
            alert( "please insert text befor submit" )
          })
        // };
    // }  
  })
    
  


});

