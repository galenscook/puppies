$(document).ready(function() {
  // This is called after the document has loaded in its entirety
  // This guarantees that any elements we bind to will exist on the page
  // when we try to bind to them

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
  heart();
  unheart();
});


function heart() {
  $('#heart').submit(function(event){
    event.preventDefault();

    var heartInfo = $(this).serialize()

    $.ajax({
      method:"post",
      url: "/hearts",
      data: heartInfo,
      //datatype: "json"
    })

    .done(function(response) {
      response = JSON.parse(response);
      $('.heart_count').text("Heart Count = "+response["heart_count"]);
      $('.comments').append('<li>'+response.comment+'</li>');
      $('#heart').hide();
      $('#unheart.hidden').show();
    })

    .fail(function(response){
      console.log("FAIL")
      console.log(response)
    })
  })
};

function unheart() {
  $('#unheart').submit(function(event){
    event.preventDefault();

    var heartInfo = $(this).serialize()

    $.ajax({
      method: "post",
      url: "/hearts",
      data: heartInfo
    })

    .done(function(response){
      response = JSON.parse(response);
      console.log(response.comment);
      $('.heart_count').text("Heart Count = "+response["heart_count"]);
      $('<li>'+response.comment+'</li>').remove();
      $('#unheart').hide();
      $('#heart.hidden').show();
    })

    .fail(function(response){
      console.log("FAIL")
      console.log(response)
    })

  });


}
