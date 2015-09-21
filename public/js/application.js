$(document).ready(function() {
  heart();
  unheart();
  lightBox();
  hideLightBox();
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

// Lightbox
function lightBox() {
  $('.panel-body').on("click", "a", function(event){
    event.preventDefault()
  $('#lightbox-background').fadeIn("slow")

  var url = $(this).attr('href')

  $.ajax({
    method: 'get',
    url: url,
    dataType: 'html',
  })

  .done(function(response){
    var lightbox = "<div class='lightbox-panel'>"+response+"</div>"
    $('#lightbox-background').append(lightbox).fadeIn(400)
  })
  })
}

function hideLightBox() {
  $('body').on('click', '#lightbox-background', function(){
    $('.lightbox-panel').remove()
    $(this).fadeOut(300)
  })
}
