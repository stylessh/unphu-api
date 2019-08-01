$('#btn-like').click(function(e) {
    e.preventDefault();
    let bookId = $(this).data('id')

    $.post('/api/books/like/' + bookId)
        .done(data => {
            $('.likes-count').text(data.likes)
        })
})

$('#btn-dislike').click(function(e) {
    e.preventDefault();
    let bookId = $(this).data('id')

    $.post('/api/books/dislike/' + bookId)
        .done(data => {
            $('.dislikes-count').text(data.dislikes)
        })
})