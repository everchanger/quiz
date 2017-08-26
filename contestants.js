// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var db = require('./db.js');

$( document ).ready(function() {

    db.getAllContestants().then(function(response) {
        for(var i=0;i<response.length; ++i) {
            addContestanttoDOM(response[i], i);
        }
    });

    $('.deleteBtn').on('click', deleteContestant);
});

function addContestanttoDOM(doc, number) {
    var  question_div = '<div class="col-xs-4">';
    question_div += '<div class="col-xs-12 question-wrapper" id="question_number_'+number+'">';
    question_div += '<div class="col-xs-12">';
    question_div += '<p class="question pull-left">Contestant #'+(number+1)+'</p>';
    question_div += '<a href="#" id="'+doc._id+'" class="btn btn-danger deleteBtn pull-right">Delete</a>';
    question_div += '</div>'
    question_div += '<div class="col-xs-12 question">';
    question_div += 'Name: '+doc.name;
    question_div += '</div>'
    question_div += '<div class="col-xs-12 question">';
    question_div += 'Phone: '+doc.phone;
    question_div += '</div>'
    question_div += '<div class="col-xs-12 question">';
    question_div += 'Email: '+doc.email;
    question_div += '</div>'
    question_div += '<div class="col-xs-12 question">';
    question_div += 'Score: '+doc.score;
    question_div += '</div>'
    question_div += '</div>';
    question_div += '</div>'

    $('#contestant_anchor').append(question_div)

    $('.deleteBtn').on('click', deleteContestant);
}

function deleteContestant() {
    db.deleteContestant($(this).attr('id'));
    location.reload();
}