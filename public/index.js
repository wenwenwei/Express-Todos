$(document).ready(function () {

  $('form').on('submit', function (event) {
    event.preventDefault();
    var item = $('form input');
    var todo = {
      item: item.val().trim()
    };

    $.ajax({
      type: 'POST',
      url: '/todo',
      data: todo,
      success: function (data) {
        //do something with the data via front-end framework
        location.reload();
      }
    });

    return false;

  });

  $('li').on('click', function () {
    var id = $(this).attr('data-id');
    console.log(id)
    $.ajax({
      type: 'DELETE',
      url: '/todo/' + id,
      success: function (data) {
        //do something with the data via front-end framework
        location.reload();
      }
    });
  });

});