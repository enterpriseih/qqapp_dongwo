const { data } = require('./star.json');
const questions = data.questions.map(quest => ({ title: quest.question, options: quest.options, answer: quest.type }));
const fs = require('fs');
const name = '蔡徐坤';
const json = {
    name,
    questions
}
const arrJson = require('./result.json');
arrJson.push(json);
fs.writeFile('./result.json', JSON.stringify(arrJson, null, 4), function(err) {
    if (err) {
        console.error(err);
    }
});