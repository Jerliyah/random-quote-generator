
// General
var themeColor = "#6666ff";
getQuote();

// Learned Something: For ajax call, don't place parenthesis with function name
// Self invoking function
function getQuote() {
    // AJAX call to get random quotes
    $.ajax({
      type: "GET",
      url: "http://api.forismatic.com/api/1.0/?",
      dataType: "jsonp",
      data: "method=getQuote&format=jsonp&lang=en&jsonp=?",
      success: start,
      error: errorMessage
  });
}



/*========================
    New Quote Button
========================*/
// Loading gear icon when waiting for quote aftern new quote button clicked
function loading() {
  $("main").html('<i class="fa fa-cog fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span>');
}

// A new quote is generated everytime the new quote button is clicked
$("#new-quote-btn").click( function() {
    // Loading icon
    loading();
    // Grab a quote
    getQuote();
} );


/*=========================
    Tweet Button Styling
==========================*/
var tweetBtn = $('.twitter-share-button');

// Forced styling for twitter anchor tag
tweetBtn.css('color', 'black');
tweetBtn.mouseenter( function() { tweetBtn.css('color', themeColor); });
tweetBtn.mouseleave( function() { tweetBtn.css('color', 'black'); });



/*****************************
    If ajax call succeeds...
******************************/
function start(response) {

    // Quote variables
    var quoteText = response.quoteText;
    var quoteAuthor = response.quoteAuthor;

    // From Font Awesome
    var leftQuoteMark = '<i class="fa fa-quote-left fa-2x" aria-hidden="true"></i>';
    // The right quote mark is created in css
    $("main").html('<h1>' + leftQuoteMark + ' ' + quoteText + ' </h1> <br> <h4> -- ' + quoteAuthor + '<h4>');



    // To Tweet
    // Function expressed here for access to ajax response variables
    function twitterButton() {
        // Make sure the quote can fit into the tweet, quoteText and quoteAuthor combined <= 135 (formatting takes up 5)
        var combined = quoteText + quoteAuthor;
        if (combined.length > 135) {
            $("main").html("<h2> Sorry, that quote is too large to tweet. <br> Try finding a shorter one </h2>");
            tweetBtn.attr('href', 'https://twitter.com/intent/tweet?text=' + 'Sorry, that quote is too large to tweet. Try finding a shorter one');

        }
        else {
            tweetBtn.attr('href', 'https://twitter.com/intent/tweet?text=' + '"' + quoteText + '"' + ' --' + quoteAuthor);
        }
    }

    tweetBtn.on('click', twitterButton);
}


/*****************************
    If ajax call fails...
******************************/
function errorMessage() {
  $("main").html("<h1>Oops!</h1> <h3>There was an error retrieving the quote</h3>");
}
