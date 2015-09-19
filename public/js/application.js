$(document).ready(function() {
  heart();
  unheart();
});


function heart() {
  $('.heart-buttons').on("submit", "#heart", function(event){
    event.preventDefault();
    console.log("HEART")
    var heartInfo = $(this).serialize()
    var photoID = $(this).closest('.photo').attr('id')

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
      
      $('#'+photoID+' #unheart').removeClass('hidden');
      $('#'+photoID+' #heart').addClass('hidden');
    })

    .fail(function(response){
      console.log("FAIL")
      console.log(response)
    })
  })
};

function unheart() {
  $('.heart-buttons').on("submit", "#unheart", function(event){
    event.preventDefault();
    console.log("UNHEART")

    var heartInfo = $(this).serialize()
    var photoID = $(this).closest('.photo').attr('id')


    $.ajax({
      method: "post",
      url: "/hearts",
      data: heartInfo
    })

    .done(function(response){
      response = JSON.parse(response);
      console.log('article#'+response.heart_id);
      if ($('.comments').length != 0) {
        $('.heart_count').text("Heart Count = "+response["heart_count"]);
        $('article#'+response.heart_id).remove();
      }
      $('#'+photoID+' #heart').removeClass('hidden');
      $('#'+photoID+' #unheart').addClass('hidden');
    })

    .fail(function(response){
      console.log("FAIL")
      console.log(response)
    })
  });
}


