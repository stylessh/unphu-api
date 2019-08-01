"use strict";

$('#btn-like').click(function (e) {
  e.preventDefault();
  var bookId = $(this).data('id');
  $.post('/api/books/like/' + bookId).done(function (data) {
    $('.likes-count').text(data.likes);
  });
});
$('#btn-dislike').click(function (e) {
  e.preventDefault();
  var bookId = $(this).data('id');
  $.post('/api/books/dislike/' + bookId).done(function (data) {
    $('.dislikes-count').text(data.dislikes);
  });
});