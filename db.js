var g_db = new PouchDB('quiz_db');

function getAllQuestions() {
    return new Promise(function(resolve, reject) {
         g_db.allDocs({include_docs: true}).then(function(response) {
             resolve(response);
         });
    });
}

function addQuestion(question, answer1, answer2, answer3, correctAnswer) {
    var newEntry = {
        "_id": question,
        "question": question,
        "answers": [
            answer1,
            answer2,
            answer3
        ],
        "correct": correctAnswer
    }

    g_db.put(newEntry);
}

module.exports.getAllQuestions = getAllQuestions;
module.exports.addQuestion = addQuestion;