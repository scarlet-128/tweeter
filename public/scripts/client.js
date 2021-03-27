
$(() =>{
  console.log("something")
  const fetchTweets = () =>{
    $.ajax({
      url: '/tweets/',
      method: 'GET',
      dataType : 'json',
      success : (tweets) => {
        renderTweets(tweets);
      },
      error: (error) => {
        throw error;
      }
    })
  }
  const $tweetButton = $("tweet-button");
  $tweetButton.click(()=>{
    fetchTweets();
  })
  const renderTweets = (tweets) => {
    console.log("tweets",tweets)
    const $tweets = $('#tweet');
    $tweets.empty();
    for(const id in tweets) {
      console.log("id",id)
      const tweet = tweets[id];
      console.log("tweetid",tweet)
      // const newTweet = `<article class="tweet">
      // <header class="tweet__header">
      //   <img src="/images/profile-hex.png">
      //   <p>${tweet.user.name}</p>
      // </header>
      // <article>
      //   <h3> Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, expedita maiores dolorem adipisci totam cupiditate deleniti. A dolor veniam exercitationem eum velit, recusandae ab sint, reiciendis soluta sit eaque sunt!</h3>
      // </article>
      // <footer>
      //   <p>youare hello>
      //     <div>
      //       SMT
      //     </div>
          
      //   </footer>
      // </article>`
      // $tweets.append(newTweet);
      const $tweet = $('<article>').addClass('tweet');
      const $header = $('<div>').addClass('tweet__header')
      const $avatars = $('<img>').attr("src",tweet.user.avatars);
      const $userName = $('<h3>').text(tweet.user.name);
      const $handle = $('<b>').addClass('user-name').text(tweet.user.handle);
      const $body = $('<article>')
      const $content = $('<h5>').text(tweet.content.text);
      const $footer = $('<footer>');
      $userName.append($handle);
      $body.append($content);
      $header.append($avatars,$userName);

      $tweet.append($header,$body,$footer)
      $tweets.prepend($tweet)
    }

  }
  const $tweetForm = $('#new-tweet');

  $tweetForm.on('submit', function (event) {
    event.preventDefault();

    const serializedData = $(this).serialize();

    
    $.post('/tweets/', serializedData)
      .then((response) => {
        console.log("tweet",'^^')
        fetchTweets();

        $(this).children('input').val('');
      });  
  });

})