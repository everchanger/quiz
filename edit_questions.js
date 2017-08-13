// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var db = require('./db.js');

$( document ).ready(function() {

    db.getAllQuestions().then(function(response) {
         for(var i=0;i<response.rows.length; ++i) {
            console.log(response.rows[i]);
            addQuestiontoDOM(response.rows[i].doc, i);
        }
    });

    $('#add_new_question').on('click', addQuestion);
    console.log( "ready!" );
});

function addQuestiontoDOM(doc, questionNumber) {
    var question_div = '<div class="col-xs-12 question-wrapper" id="question_number_'+questionNumber+'">';
    question_div += '<div class="col-xs-12">';
    question_div += '<p class="question pull-left">Question #'+(questionNumber+1)+'</p>';
    question_div += '<a href="#" class="btn btn-primary editBtn pull-right">Edit</a>';
    question_div += '</div>'
    question_div += '<div class="col-xs-12 question">';
    question_div += 'Question: '+doc.question;
    question_div += '</div>'
    for(var i=0;i<doc.answers.length;++i) {
        question_div += '<div class="col-xs-12"><span class="bold">Answer '+ (i+1) + ':</span>' + doc.answers[i]+'</div>';
    }
    question_div += '<div class="col-xs-12 correct"><span class="bold">Correct: </span>'+(doc.answers[doc.correct])+'</div>';
    question_div += '</div>';

    $('#quiz_anchor').append(question_div)
}

function addQuestion() {
    var question = $("#question");
    var answer1 = $("#answer1");
    var answer2 = $("#answer2");
    var answer3 = $("#answer3");
    var correct1 = $("#correct1");
    var correct2 = $("#correct2");
    var correct3 = $("#correct3");

    if(!is(question.val()) || !is(answer1.val()) || !is(answer2.val()) || !is(answer3.val())) {
        return;
    }

    var correct = 0;
    if(correct1.attr('checked', 'checked')) {
        correct = 0;
    } else if(correct2.attr('checked', 'checked')) {
        correct = 1;
    } else if(correct3.attr('checked', 'checked')) {
        correct = 2;
    }

    db.addQuestion(question.val(), answer1.val(), answer2.val(), answer3.val(), correct);

    location.reload();

    return false;
}

function is(elm) {
    if(!elm || elm == "" || elm === undefined) {
        return false;
    }
    return true;
}