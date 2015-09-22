$(document).ready(function() {
  heart();
  unheart();
  lightBox();
  hideLightBox();
});


function heart() {
  $('body').on("submit", ".heart-buttons #heart", function(event){
    event.preventDefault();
    
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
      $('#'+photoID+' #heart').removeClass('hidden');
      $('#'+photoID+' #unheart').addClass('hidden');
    });


  })
};

function unheart() {
  $('body').on("submit", ".heart-buttons #unheart", function(event){
    event.preventDefault();

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
      if ($('.comments').length != 0) {
        $('#'+response.heart_id).remove();
      }
      $('.photo'+response.photo).text(response.heart_count)
    })

    .fail(function(response){
      $('#'+photoID+' #unheart').removeClass('hidden');
      $('#'+photoID+' #heart').addClass('hidden');
    })
  });
}

// Lightbox
function lightBox() {
  $('.panel-body').on("click", "a", function(event){
    event.preventDefault()

  $('html, body').css({
       'overflow': 'hidden',
       'height': '100%'
   });

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


// AHHH MAKE THIS WORK ONLY WHEN YOU CLICK OUTSIDE PANEL
function hideLightBox() {
  $('#lightbox-background').on("click", ".photo.single", function(event){
    event.stopPropagation()
  })
  $('#lightbox-background').click(function(event){

      $('#lightbox-background').fadeOut(300);
      $('.lightbox-panel').remove();
      $('html, body').css({
          'overflow': 'auto',
          'height': 'auto'
      });

    })

}

