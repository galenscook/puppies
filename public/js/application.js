$(document).ready(function() {
  heart();
  unheart();
});


function heart() {
  $('.hidden_forms').on("submit", "#heart", function(event){
    event.preventDefault();
    console.log("HEART")
    var heartInfo = $(this).serialize()

    $('input[type=text]').val('')
    $.ajax({
      method:"post",
      url: "/hearts",
      data: heartInfo,
      //datatype: "json"
    })

    .done(function(response) {
      response = JSON.parse(response);
      $('.heart_count').text("Heart Count = "+response["heart_count"]);
      $('.comments').append('<article id="'+response.heart_id+'">'+response.comment+'</article>');
      
      $('#unheart').removeClass('hidden');
      $('#heart').addClass('hidden');
    })

    .fail(function(response){
      console.log("FAIL")
      console.log(response)
    })
  })
};

function unheart() {
  $('.hidden_forms').on("submit", "#unheart", function(event){
    event.preventDefault();
    console.log("UNHEART")
    var heartInfo = $(this).serialize()

    $.ajax({
      method: "post",
      url: "/hearts",
      data: heartInfo
    })

    .done(function(response){
      response = JSON.parse(response);
      console.log('article#'+response.heart_id);
      $('.heart_count').text("Heart Count = "+response["heart_count"]);
      $('article#'+response.heart_id).remove();
      $('#heart').removeClass('hidden');
      $('#unheart').addClass('hidden');
    })

    .fail(function(response){
      console.log("FAIL")
      console.log(response)
    })
  });
}


