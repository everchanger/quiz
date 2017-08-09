// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var db = new PouchDB('quiz_db');

db.allDocs({include_docs: true}).then(function(response) {
    console.log(response);

    for(var i=0; i<response.rows.length; ++i) {
        response.rows[i]
    } 
});


document.getElementById ("add_new_question").addEventListener ("click", addQuestion, false);

function addQuestion() {
    var question = document.getElementById("question");
    var answer1 = document.getElementById("answer1");
    var answer2 = document.getElementById("answer2");
    var answer3 = document.getElementById("answer3");
    var correct1 = document.getElementById("correct1");
    var correct2 = document.getElementById("correct2");
    var correct3 = document.getElementById("correct3");

    if(!is(question.value) || !is(answer1.value) || !is(answer2.value) || !is(answer3.value)) {
        return;
    }

    var correct = 0;
    if(correct1.checked) {
        correct = 0;
    } else if(correct2.checked) {
        correct = 1;
    } else if(correct3.checked) {
        correct = 2;
    }

    var newEntry = {
        "_id": question.value,
        "question": question.value,
        "answers": [
            answer1.value,
            answer2.value,
            answer3.value
        ],
        "correct": correct
    }

    db.put(newEntry);

    return false;
}

function is(elm) {
    if(!elm || elm == "" || elm === undefined) {
        return false;
    }
    return true;
}