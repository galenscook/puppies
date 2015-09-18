$(document).ready(function() {
  // This is called after the document has loaded in its entirety
  // This guarantees that any elements we bind to will exist on the page
  // when we try to bind to them

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
  heart();
  unheart();
  // photoGrid();

  // function append(title, content) {
  //     // build/select our elements
  //     var grid = $('#columns')[0];
  //     var item = document.createElement('div');
  //     // build the html
  //     var h = '<div class="panel panel-primary">';
  //     h += '<div class="panel-heading">';
  //     h += title;
  //     h += '</div>';
  //     h += '<div class="panel-body">';
  //     h += content;
  //     h += '</div>';
  //     h += '</div>';
  //     salvattore['append_elements'](grid, [item])
  //     item.outerHTML = h;
  // }
  // $.getJSON("https://www.googleapis.com/books/v1/volumes?q=inauthor:Ernest+Hemingway&callback=?", function (data) {
  //     $(data.items).each(function (i, book) {
  //         append(book.volumeInfo.title, book.volumeInfo.description);
  //     });
  // });
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



function photoGrid () {
  var elem = document.querySelector('.photo-grid');
  var msnry = new Masonry( elem, {
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true,
    gutter: 10,
  });

}
