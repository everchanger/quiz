var db = require('./db.js');
var g_currentQuestion = 0;
var g_questions = [];

var g_score = 0;

$( document ).ready(function() {
    db.getAllQuestions().then(function(response) {
         for(var i=0;i<response.length; ++i) {
            var doc = response[i];
            
            var question = { 
                question: doc.question,
                answers: doc.answers,
                correct: doc.correct 
            };
            
            g_questions.push(question);
        }

        g_questions.reverse();

        setCurrentQuestion(g_questions[g_currentQuestion]);
    });

    g_currentQuestion = 0;

    $('#answer1').on('click', nextQuestion);
    $('#answer2').on('click', nextQuestion);
    $('#answer3').on('click', nextQuestion);
    $('#answer4').on('click', nextQuestion);
});

function nextQuestion() 
{
    // Get the id of the button pressed
    var id = $(this).attr('id');
    var answer_num = parseInt(id.substring(id.length - 1));

    // Was the users answer correct?
    if(answer_num == g_questions[g_currentQuestion].correct+1) {
        g_score++;
        console.log('correct!');
    } else {
        console.log('incorrect');
    }
    
    // Store the answer
    // Check how many more questions we have
    if(g_currentQuestion == g_questions.length-1) {
        // If this was the last question we should show the end screen
        submitScore();
        location = 'end_screen.html';
    } else {
        g_currentQuestion++;
        setCurrentQuestion(g_questions[g_currentQuestion]);
    }
}

function submitScore()
{
    var url_string = location.href;
    var url = new URL(url_string);
    var name = url.searchParams.get("name");
    var phone = url.searchParams.get("phone");
    var email = url.searchParams.get("email");
    
    db.addContestant(name, phone, email, g_score);
}

function setCurrentQuestion(obj) 
{
    $('#question').html(obj.question);
    $('#answer1').html(obj.answers[0]);
    $('#answer2').html(obj.answers[1]);
    $('#answer3').html(obj.answers[2]);
    $('#answer4').html(obj.answers[3]);
}

