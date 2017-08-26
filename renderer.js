// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const remote = require('electron').remote

var db = require('./db.js');

$( document ).ready(function() {

    console.log(remote.process.argv + remote.process.argv.length);

    var argv = remote.process.argv;
    if(argv.length > 1) {
        $('#admin').show();
    }

    $('#start-quiz').on('click', startQuiz);
});

function startQuiz() 
{
    var name = $('#name').val();
    var phone = $('#phone').val();
    var email = $('#email').val();

    if(typeof name === undefined || name.length == 0 ) {
        $('#name').addClass('input-error');
    } else {
        $('#name').removeClass('input-error');
    }
    
    if(typeof phone === undefined || phone.length == 0) {
        $('#phone').addClass('input-error');
    } else {
        $('#phone').removeClass('input-error');
    }
    
    if(typeof email === undefined || email.length == 0) {
        $('#email').addClass('input-error');
        return;
    } else {
        $('#email').removeClass('input-error');
    }

    if($('#name').hasClass('input-error') || $('#phone').hasClass('input-error') || $('#email').hasClass('input-error')) {
        return;
    }

    location = 'question.html?name='+name+'&phone=' + phone+'&email=' + email;
}

function setCurrentQuestion(obj) 
{
    $('#question').html(obj.question);
    $('#answer1').html(obj.answers[0]);
    $('#answer2').html(obj.answers[1]);
    $('#answer3').html(obj.answers[2]);
    $('#answer4').html(obj.answers[3]);
}