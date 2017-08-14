var g_db = new PouchDB('quiz_db');

function getAllQuestions() {
    return new Promise(function(resolve, reject) {
         g_db.allDocs({include_docs: true}).then(function(response) {
             resolve(response);
         });
    });
}

function addQuestion(question, answer1, answer2, answer3, answer4, correctAnswer) {
    var newEntry = {
        "_id": question,
        "question": question,
        "answers": [
            answer1,
            answer2,
            answer3,
            answer4
        ],
        "correct": correctAnswer
    }

    g_db.put(newEntry);
}

function deleteQuestion(id) {
    g_db.get(id).then(function (doc) {
        return g_db.remove(doc._id, doc._rev);
    });
}

module.exports.getAllQuestions = getAllQuestions;
module.exports.addQuestion = addQuestion;
module.exports.deleteQuestion = deleteQuestion;