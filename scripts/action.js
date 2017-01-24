
    function errorMessage() {
        $("main").html("<h1>Oops!</h1> <h3>There was an error retrieving the quote</h3>");
    }


    function formatting(response) {

        var leftQuoteMark = '<i class="fa fa-quote-left fa-2x" aria-hidden="true"></i>';

        var quote = response.quoteText;
        $("main").html('<h1>' + leftQuoteMark + ' ' + quote + ' </h1> <br> <h4> -- ' + response.quoteAuthor + '<h4>');
    }

    // Learned Something: For ajax call, don't place parenthesis with function name
    function randomQuote() {
        $.ajax({
          type: "GET",
          url: "http://api.forismatic.com/api/1.0/?",
          dataType: "jsonp",
          data: "method=getQuote&format=jsonp&lang=en&jsonp=?",
          success: formatting,
          error: errorMessage
      });
    }


    function loading() {
        $("main").html('<i class="fa fa-cog fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span>');
    }

//------------------------------------------------------------------------------

// A quote shows up when page loads
    randomQuote();

// A new quote is generated everytime the new quote button is clicked
    $("#new-quote-btn").click( function() {
        loading();
        randomQuote();
    } );
