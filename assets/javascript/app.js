// array of types of comedies
var comedies = ["Golden Girls", "Modern Family", "Fresh Prince of Bel Air", "Friends", "Frasier"];

function renderButtons() {
    $("#buttons-view").empty();

    // Looping through the array of comedies
    for (var i = 0; i < comedies.length; i++) {

        var gifBtn = $("<button>");
        gifBtn.addClass("comedy");
        gifBtn.attr("data-comedy", comedies[i]);
        gifBtn.text(comedies[i]);
        $("#buttons-view").append(gifBtn);
        $("#buttons-view").append("");
    }
}
//Add new button
$("#add-comedy").on("click", function (event) {
    event.preventDefault();
    var comedy = $("#comedy-input").val().trim();
    if (comedy == "") {
        return false; // added so user cannot add a blank button
    }
    comedies.push(comedy);
    $("#comedy-input").val("");
    renderButtons();
});

renderButtons();

    $("#remove-comedy").on("click", function(){
    comedies.pop(comedy);
    renderButtons();
    return false;
    });

//Displaying gifs
$("button").on("click", function () {
    var comedy = $(this).attr("data-comedy");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + comedy + "&api_key=fIJaqVlWoTrh9SXh5DqUd3qva4eVsiAV&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response) {

            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    var gifDiv = $("<div>");

                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);

                    var comedyImage = $("<img>");
                    comedyImage.attr("src", results[i].images.fixed_height.url);
                    comedyImage.attr("src", results[i].images.fixed_height.url); // still image stored into src of image
                    comedyImage.attr("still", results[i].images.fixed_height.url); // still image
                    comedyImage.attr("animate", results[i].images.fixed_height.url); // animated image
                    comedyImage.attr("state", "still"); // set the image state
                    comedyImage.addClass("image");
                    gifDiv.prepend(p);
                    gifDiv.prepend(comedyImage);

                    $(".gif-container").prepend(gifDiv);
                }
            }
        });
})
// displayGifBtn(); // displays list of actions already created
// addNewButton();
// removeLastButton();
// // Document Event Listeners
// $(document).on("click", ".comedy", displayGifBtn);
// $(document).on("click", function (event) {
//     var state = $(this).attr('state');
//     var source = $(this).attr("src");
//     if (state == "still") {
//         $(this).attr("src", $(this).attr("animate"));
//         $(this).attr("state", "animate");
//     } else {
//         $(this).attr("src", $(this).attr("still"));
//         $(this).attr("state", "still");
//     }
// });
