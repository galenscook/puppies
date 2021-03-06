scrollable = true

$(document).ready(function() {
  heart();
  unheart();
  comment();
  deleteComment();
  lightBox();
  hideLightBox();
  loginPrompt();
  showForm();
  $(document).on("scrollend", function() {
    infiniteScroll.requestPuppies(scrollable);   
  });

  

  // Setup for Facebook integration
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1639495569664010',
      xfbml      : true,
      version    : 'v2.4'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

});

function showForm() {
  $('body').on('click', '.call-form', function(event){
    event.preventDefault()
    var url = $(this).attr('href')

    $.ajax({
      method: 'get',
      url: url,
    })
    .done(function(response){
      if($('.user-form').length == 0){
        $('.main').prepend(response)
      }
      else{
        $('.user-form').remove()
        $('.main').prepend(response)
      }
    })
    
  })
}

function heart() {
  $('body').on("submit", ".heart-buttons #heart", function(event){
    event.preventDefault();
    
    var heartInfo = $(this).serialize()
    var photoID = $(this).closest('.photo').attr('id')

    $('#'+photoID+' #unheart').removeClass('hidden');
    $('#'+photoID+' #heart').addClass('hidden');

    $.ajax({
      method:"post",
      url: "/hearts",
      data: heartInfo,
      datatype: "json"
    })

    .done(function(response) {
      response = JSON.parse(response);
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
      $('.photo'+response.photo).text(response.heart_count)
    })

    .fail(function(response){
      $('#'+photoID+' #unheart').removeClass('hidden');
      $('#'+photoID+' #heart').addClass('hidden');
    })
  });
}

function comment() {
  $('body').on("submit", "#comment", function(event){
    event.preventDefault();
    
    var comment = $(this).serialize()
    var photoID = $(this).closest('.photo').attr('id')
    photoID = photoID.substr(5)

    console.log(comment)
    console.log(photoID)
    $('input[type=text]').val('');
    $.ajax({
      method:"post",
      url: "/comments/"+photoID,
      data: comment,
      datatype: "json"
    })

    .done(function(response) {
      response = JSON.parse(response);
      $('.comments').prepend(response.html); 
    })

    .fail(function(response){
      console.log(this)
    });
  })
};

function deleteComment() {
  $('body').on("submit", "#delete_comment", function(event){
    event.preventDefault();
    
    var comment = $(this).closest('li')
    var commentID = $(this).closest('li').attr('id');

    comment.remove();
    $.ajax({
      method:"delete",
      url: "/comments/"+commentID,
      datatype: "json"
    })

    .done(function(response) {
      
    })

    .fail(function(response){
      $('.comments').prepend(comment)
    });
  })
};

// Lightbox
function lockScroll(){
  var scrollPosition = [
    self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
    self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
  ];
  var html = jQuery('html'); // it would make more sense to apply this to body, but IE7 won't have that
  html.data('scroll-position', scrollPosition);
  html.data('previous-overflow', html.css('overflow'));
  html.css('overflow', 'hidden');
  $('#lightbox-background').css('top', scrollPosition[1])
  window.scrollTo(scrollPosition[0], scrollPosition[1]);
}

function unlockScroll(){
  var html = jQuery('html');
  var scrollPosition = html.data('scroll-position');
  html.css('overflow', html.data('previous-overflow'));
  window.scrollTo(scrollPosition[0], scrollPosition[1])
}

function lightBox() {
  $('body').on("click", ".panel-body a", function(event){
    event.preventDefault()

    lockScroll();

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

    if (scrollable){
    $.ajax({
      method: 'get',
      url: location.pathname,
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
        $('#columns').append('<div class="panel" id="end_scroll"><h3>that\'s all we have.  go find more to <a href=\'/photos/new\'>add to our collection!</a></h3></div>')
    }
    })
      this.start += 20
      this.stop += 20
    }
  }
}

function loginPrompt() {
  $('body').on('mouseup', '.login', function(){

    // console.log($(this).closest('div.panel-footer'))

      $(this).closest('.panel-footer').children().children('.login-prompt').fadeIn().delay(2000).fadeOut('slow')

      // $(this).parent().children('.login-prompt').fadeIn().delay(2000).fadeOut('slow')
      // $(this).closest('.panel-footer').prepend("<div class='login-prompt'>please <a href='/login'>log in</a> or <a href='/users/new'>sign up</a> to heart.</div>").remove().delay(10000000000000)
      // $('.login-prompt').remove().delay(10000000000000)
    // }
  });

  $('body').on('')
  // $('lightbox-background').on('click', '.login', function(){
  //   console.log($(this))
  // });

  // $('body').on('click', '.login-lightbox', function(){
  //   console.log($(this))
  // })

}

// JSON ATTEMPTS
      // length = response.length
      // test = response.substr(1, length-6)
      // testlength = test.length

      // sliced = test.slice(1, testlength-3)
      // again = sliced+"]"
