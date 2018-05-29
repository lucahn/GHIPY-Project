$(document).ready(function(){

var topics = ["wink", "smile", "charm", "cute"];

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

// $(".giphy-btn").on("click", 

function displayGifs() {
    
    var topic = $(this).attr("data-name");
    var queryURL= "https://api.giphy.com/v1/gifs/search?api_key=4HLv3wFHdk65tcEPg2YHHtUVOZHb45Ff&q=" + topic + "&limit=10&rating=G&lang=en";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response){
            console.log(response);
            
            var gifURL = response.data;

            for (var i = 0; i < gifURL.length; i++) {
                var theTAG = $("<img>");
                var stillGIF = gifURL[i].images.fixed_width_still.url;
                var animateGIF = gifURL[i].images.fixed_width.url;

                theTAG.attr("src", stillGIF);
                theTAG.addClass("giphy-image");
                theTAG.attr("data-still", stillGIF);
                theTAG.attr("data-animate", animateGIF);
                theTAG.attr("alt", topic);
                theTAG.attr("data-type", "still");
                
                $("#all-gifs").append(theTAG);
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

