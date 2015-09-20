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

    $('#'+photoID+' #unheart').removeClass('hidden');
    $('#'+photoID+' #heart').addClass('hidden');

    $('input[type=text]').val('');
    $.ajax({
      method:"post",
      url: "/hearts",
      data: heartInfo,
      datatype: "json"
    })

    .done(function(response) {
      response = JSON.parse(response);
      $('.comments').prepend(response.html);  
      $('.photo'+response.photo).text(response.heart_count)
    })

    .fail(function(response){
      console.log("FAIL")
      $('#'+photoID+' #heart').removeClass('hidden');
      $('#'+photoID+' #unheart').addClass('hidden');
    });


  })
};

function unheart() {
  $('.heart-buttons').on("submit", "#unheart", function(event){
    event.preventDefault();
    console.log("UNHEART")

    var heartInfo = $(this).serialize()
    var photoID = $(this).closest('.photo').attr('id')

      $('#'+photoID+' #heart').removeClass('hidden');
      $('#'+photoID+' #unheart').addClass('hidden');

    $.ajax({
      method: "post",
      url: "/hearts",
      data: heartInfo
    })

    .done(function(response){
      response = JSON.parse(response);
      console.log('#photo'+response.photo);
      if ($('.comments').length != 0) {
        $('#'+response.heart_id).remove();
      }
      $('.photo'+response.photo).text(response.heart_count)
    })

    .fail(function(response){
      console.log("FAIL")
      $('#'+photoID+' #unheart').removeClass('hidden');
      $('#'+photoID+' #heart').addClass('hidden');
    })
  });
}


