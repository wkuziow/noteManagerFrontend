$(document).ready(function () {
    clearListAndGetNotes();

});
var BASE_URL = 'http://localhost:8080/note-manager/note';

function clearListAndGetNotes() {
    var notesList = $('#notes-list');
    notesList.empty();
    $.ajax({
        url: BASE_URL,
        method: 'GET',
        contentType: 'application/json',
        mode: 'no-cors',
        dataType: "jsonp"
    }).done(function (result) {
        console.log(result)
        result.forEach(function (element) {
            var newListItem = $('<li>');
            newListItem.attr('note-id', element.noteId);
            newListItem.text(element.title);
            createDeleteButtonAndRegisterEvent(newListItem);
            notesList.append(newListItem);
        })
    })
}

function createDeleteButtonAndRegisterEvent(listItem) {
    var noteId = listItem.attr('note-id');
    var deleteButton = $('<button>');
    deleteButton.text('Delete');
    deleteButton.on('click', function () {
        $.ajax({
            url: BASE_URL + noteId,
            method: 'DELETE'
        }).done(function () {
            clearListAndGetNotes();
        })

    });
    listItem.append(deleteButton);
}