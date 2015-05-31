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
//= require turbolinks
//= require_tree .

$(document).ready(function(){


  $('.delete').click(function(e){
    e.preventDefault();
    console.log("hello");
      var $target = $(e.target);
      var $article = $target.parent().parent();
      var id = $article.attr('id');

        var remove = {
          alert('Grumpy Cat Says NO!!!');
          url: "/posts/" + id,
          type: 'DELETE',
            success:function(data) {
              $article.remove();
              console.log('SUCCESS');
            },
            error:function(data){
              console.log('ERROR');
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
          var $newArticle = $(data).find('article').last();
          $('.post-container').append($newArticle)
        },
        error:function(data){
          console.log("Error");
        }
      };
      $.ajax(submit);
  })

})// End
