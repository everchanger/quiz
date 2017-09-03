var g_db = new PouchDB('quiz_db');
var fs = require('fs');
// g_db.destroy();

function getAllQuestions() {
    return new Promise(function(resolve, reject) {
         g_db.allDocs({include_docs: true}).then(function(response) {
             // Create a new array and only include the questions in this array
             var questions = [];

             if(response.rows.length <= 0) {
                resolve(questions);
             }

             for(var i=0;i<response.rows.length;++i) {
                 if(typeof response.rows[i].doc.question === 'undefined') {
                     continue;
                 }

                 questions.push(response.rows[i].doc);
             }

             resolve(questions);
         });
    });
}

function getAllContestants() {
    return new Promise(function(resolve, reject) {
         g_db.allDocs({include_docs: true}).then(function(response) {
             // Create a new array and only include the questions in this array
             var contestants = [];

             if(response.rows.length <= 0) {
                resolve(contestants);
             }

             for(var i=0;i<response.rows.length;++i) {
                 if(typeof response.rows[i].doc.email === 'undefined') {
                     continue;
                 }

                 contestants.push(response.rows[i].doc);
             }

             resolve(contestants);
         });
    });
}

function addContestant(name, phone, email, score) {
    var newEntry = {
        "_id": email,
        "name": name,
        "phone": phone,
        "email": email,
        "score": score
    }

    g_db.put(newEntry);

    // Also write this contestant to the external file!
    var path = '..//contestants.csv';
    if (!fs.existsSync(path)) {
        fs.writeFile(path, 'Name;Phone;Email;Score', function(err) {
            if(err) {
                return console.log(err);
            }
        
            console.log("The file was created!");

            addContestantFile(path, name, phone, email, score);
        });
    } else {
        addContestantFile(path, name, phone, email, score);
    }
}

function addContestantFile(path, name, phone, email, score) {
    fs.appendFile(path, "\r\n" + name + ";"+phone + ";"+email + ";"+score, function(err) {
        if(err) {
            return console.log(err);
        }
    
        console.log("The file was updated!");
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

    // Also write this question to the external file as json!
    /*var json = JSON.stringify(newEntry);
    var path = './questions.json';
    addQuestionFile(path, json);   */
}

/*function addQuestionFile(path, entry) {
    fs.appendFile(path, "\r\n" + entry, function(err) {
        if(err) {
            return console.log(err);
        }
    
        console.log("The file was updated!");
    }); 
}*/

function deleteQuestion(id) {
    g_db.get(id).then(function (doc) {
        return g_db.remove(doc._id, doc._rev);
    });
}

module.exports.getAllQuestions = getAllQuestions;
module.exports.addQuestion = addQuestion;
module.exports.deleteQuestion = deleteQuestion;

module.exports.getAllContestants = getAllContestants;
module.exports.addContestant = addContestant;
module.exports.deleteContestant = deleteQuestion;