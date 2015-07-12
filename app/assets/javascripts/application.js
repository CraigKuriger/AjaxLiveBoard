// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

$(document).ready(function(){

    /* Show Menu*/
    $('.icon-menu').click(function() {
      $('.menu').animate({
        left: "0px"
      }, 200);

      $('body').animate({
        left: "285px"
      }, 200);
    });

    /* Hide Menu */
    $('.icon-close').click(function() {
      $('.menu').animate({
        left: "-285px"
      }, 200);

      $('body').animate({
        left: "0px"
      }, 200);
    });
 

  $(document).on('click', '.delete', function(e){
    e.preventDefault();
      var $target = $(e.target);
      var $article = $target.parent().parent();
      var id = $article.attr('id');

        var remove = {
          url: "/posts/" + id,
          type: 'DELETE',
            success:function(data) {
              $article.remove();
            },
            error:function(data){
            }
        };
        $.ajax(remove);
  })

  $('#posts').on('submit', function(e){
    e.preventDefault();
      var $form = $(e.target);
      var data = $form.serialize();

      var submit = {
        url: '/posts',
        type: 'POST',
        data: data,
        success:function(data) {
          var $clone = $('article').last().clone()
          console.log(data)
          $clone.attr('id', data.id)
          $clone.attr('href', 'posts/' + data.id + '/vote');
          $clone.find('h2 a').attr('href','/posts/' + data.id);
          $clone.find('h2 a').text(data.title);
          $clone.find('p span[class="points"]').text(data.points);
          $clone.find('p span[class="username"]').text(data.username);
          $clone.find('p span[class="timestamp"]').text(data.timestamp);
          $clone.find('p span[class="comment-count"]').text(data.comment_count);
          $clone.find('p a').attr('href', '/posts/' + data.id);
          $('.post-container').append($clone);
        },
        error:function(data){
          console.log("Error");
        }
      };
      $.ajax(submit);
  })

$(document).on('click', '.vote-button', function(e) {
  e.preventDefault();
    var $target = $(e.target);
    var article = $target.parent();
    var id = article.attr('id');
    var $points = $(article.find('span[class="points"]')[0]);
    var options = {
      url: "/posts/" + id + "/vote",
      type: 'GET',
      success:function(data) {
      $points.text(parseInt($points.text())+1)
      },
      error:function(data) {

      }
    };
    $.ajax(options);
});

})// End
