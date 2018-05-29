$(document).ready(function(){

var topics = ["wink", "smile", "charm", "cute", "laugh"];

function renderButtons() {
    $("#all-buttons").empty();

    for (var i = 0; i < topics.length; i++) {
        var btn = $("<button>");
        btn.addClass("giphy-btn");
        btn.attr("data-name", topics[i]);
        btn.text(topics[i]);
        $("#all-buttons").append(btn);
    }
}

$("#add-btn").on("click", function(event) {
    event.preventDefault();

    var gifs = $("#gif-input").val().trim();

    topics.push(gifs);

    renderButtons();
});

function displayGifs() {
    
    var topic = $(this).attr("data-name");
    var queryURL= "https://api.giphy.com/v1/gifs/search?api_key=4HLv3wFHdk65tcEPg2YHHtUVOZHb45Ff&q=" + topic + "&limit=10&rating=R&lang=en";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response){
            console.log(response);
            
            var gifDiv = $("<div class='the-div'>")
            var gifURL = response.data;

            for (var i = 0; i < gifURL.length; i++) {
    
                var gifTitle = (gifURL[i].title);
                var theTitle = $("<p>").text('"' + gifTitle + '"');
                theTitle.addClass("gif-title");
                
                gifDiv.append(theTitle);

                
                var theImage = $("<img>");
                var stillGIF = gifURL[i].images.fixed_width_still.url;
                var animateGIF = gifURL[i].images.fixed_width.url;

                theImage.attr("src", stillGIF);
                theImage.addClass("giphy-image");
                theImage.attr("data-still", stillGIF);
                theImage.attr("data-animate", animateGIF);
                theImage.attr("alt", topic);
                theImage.attr("data-type", "still");

                gifDiv.append(theImage);


                var gifRating = (gifURL[i].rating);
                var theRating = $("<p>").text("Rating: " + gifRating);
                theRating.addClass("gif-rating");
               
                gifDiv.append(theRating);


                // gifDiv.append(theTitle, theImage, theRating);
                $("#all-gifs").prepend(gifDiv)
            }
        });
}

$(document).on("click", ".giphy-image", function() {
    
    var state = $(this).attr("data-type");
    console.log(state);
    
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-type", "animate");
    }

    else {
        var source = $(this).attr("data-still")
        $(this).attr("src", source);
        $(this).attr("data-type", "still");
    }
});

$(document).on("click", ".giphy-btn", displayGifs);

renderButtons();





});

