var db = require('./db.js');
var g_currentQuestion = 0;

$( document ).ready(function() {


    db.getAllQuestions().then(function(response) {
         for(var i=0;i<response.rows.length; ++i) {
            if(g_currentQuestion == i) {
                setCurrentQuestion(response.rows[i].doc);
                break;
            }
        }
    });
});

function setCurrentQuestion(doc) 
{
    $('#question_anchor').html(doc.question);
    $('#answer1_anchor').html(doc.answers[0]);
    $('#answer2_anchor').html(doc.answers[1]);
    $('#answer3_anchor').html(doc.answers[2]);
    $('#answer4_anchor').html(doc.answers[3]);

    console.log('correct: ' + doc.correct);
}