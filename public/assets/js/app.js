// Whenever someone clicks a p tag
$(document).on("click", ".title", function() {
  console.log("TESTING for on click event .title");
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");
  // console.log(thisId);

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .done(function(data) {
      console.log(data);
      // An input to enter a new note title
      $("#notes").append("<div class='input-field col s12'><input id='titleinput' name='title'></div>");
      // A textarea to add a new note body
      $("#notes").append("<div class='input-field col s12'><textarea id='bodyinput' class='materialize-textarea' name='body'></textarea></div>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<a class='waves-effect waves-light btn savenote' data-id='" + data._id + "' id='updatenotebutton'>Update Note</a>");

      // If there's a note in the article
      if (data.note) {
        console.log("Testing if note exists:" + data.note);
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
        // Change savenotebutton to updatenotebutton
        $("#savenotebutton").empty().append("<a class='waves-effect waves-light btn savenote' data-id='" + data._id + "' id='updatenotebutton'>Update Note</a>");
      }
    });
});

// When you click the savenote button
$(".savenote").on("click", function() {

  console.log("This is when a note is saved.")
  // Grab the id associated with the article from the submit button
  let thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log("DATA: ======= " + data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

// Save article upon click
$(document).on("click", ".savearticle", function() {
  let thisId = $(this).attr("data-id");
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      saved: true
    }
  })
  .done(function(data) {
    console.log(data);
    $("a.savearticle").attr("data-id", data._id).hide();
  });
});
