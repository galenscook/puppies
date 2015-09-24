scrollable = true

$(document).ready(function() {
  heart();
  unheart();
  lightBox();
  hideLightBox();


    $(document).on("scrollend", function() {

      infiniteScroll.requestPuppies(scrollable);   

  })
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
  $('body').on("click", ".panel-body a", function(event){
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

var infiniteScroll = {
  start: 0,
  stop: 19,
  requestPuppies: function(scrollable){
    console.log(this.start)
    if (scrollable){
    $.ajax({
      method: 'get',
      url: '/photos',
      data: {start: String(this.start+20), stop: String(this.stop+20)},
    })
    .done(function(response){

      length = response.length
      test = response.slice(1, length-5)
      sliced = test+"]"
      parsed = JSON.parse(sliced)

      var grid = document.querySelector('#columns');
      jQuery(parsed).each( function(index, element) {
          var item = document.createElement('article');
          salvattore['append_elements'](grid, [item]);
          jQuery(item).html(element);
      })
      
    })
    .fail(function(response){
      if($('#end_scroll').length === 0){
        $('#columns').append('<div class="panel" id="end_scroll"><h3>That\'s all we have.  Go find more to <a href=\'photos/new\'>add to our collection!</a></h3></div>')
    }
    })
      this.start += 20
      this.stop += 20
    }
  }
}



// JSON ATTEMPTS
      // length = response.length
      // test = response.substr(1, length-6)
      // testlength = test.length

      // sliced = test.slice(1, testlength-3)
      // again = sliced+"]"
