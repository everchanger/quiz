// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var db = require('./db.js');

$( document ).ready(function() {

    db.getAllQuestions().then(function(response) {
         for(var i=0;i<response.length; ++i) {
            addQuestiontoDOM(response[i], i);
        }
    });

    $('#add_new_question').on('click', addQuestion);
    $('.deleteBtn').on('click', deleteQuestion);
    console.log( "ready!" );
});

function addQuestiontoDOM(doc, questionNumber) {
    var  question_div = '<div class="col-xs-4">';
    question_div += '<div class="col-xs-12 question-wrapper" id="question_number_'+questionNumber+'">';
    question_div += '<div class="col-xs-12">';
    question_div += '<p class="question pull-left">Question #'+(questionNumber+1)+'</p>';
    question_div += '<a href="#" id="'+doc._id+'" class="btn btn-danger deleteBtn pull-right">Delete</a>';
    question_div += '</div>'
    question_div += '<div class="col-xs-12 question">';
    question_div += 'Question: '+doc.question;
    question_div += '</div>'
    for(var i=0;i<doc.answers.length;++i) {
        question_div += '<div class="col-xs-12"><span class="bold">Answer '+ (i+1) + ':</span>' + doc.answers[i]+'</div>';
    }
    question_div += '<div class="col-xs-12 correct"><span class="bold">Correct: </span>'+(doc.answers[doc.correct])+'</div>';
    question_div += '</div>';
    question_div += '</div>'

    $('#quiz_anchor').append(question_div)

    $('.deleteBtn').on('click', deleteQuestion);
}

function deleteQuestion() {
    db.deleteQuestion($(this).attr('id'));
    location.reload();
}

function addQuestion() {
    var question = $("#question");
    var answer1 = $("#answer1");
    var answer2 = $("#answer2");
    var answer3 = $("#answer3");
    var answer4 = $("#answer4");
    var correct1 = $("#correct1");
    var correct2 = $("#correct2");
    var correct3 = $("#correct3");
    var correct4 = $("#correct4");

    if(!is(question.val()) || !is(answer1.val()) || !is(answer2.val()) || !is(answer3.val()) || !is(answer4.val())) {
        return;
    }

    var correct = 0;
    if(correct1.prop('checked')) {
        correct = 0;
    } else if(correct2.prop('checked')) {
        correct = 1;
    } else if(correct3.prop('checked')) {
        correct = 2;
    } else if(correct4.prop('checked')) {
        correct = 3;
    }

    db.addQuestion(question.val(), answer1.val(), answer2.val(), answer3.val(), answer4.val(), correct);

    location.reload();

    return false;
}

function is(elm) {
    if(!elm || elm == "" || elm === undefined) {
        return false;
    }
    return true;
}