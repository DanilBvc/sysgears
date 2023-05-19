"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function getPaths(config) {
    const paths = [];
    function traverse(path, questionId) {
        const currentQuestion = config.find((q) => q.questionId === questionId);
        if (!currentQuestion) {
            paths.push([...path]);
            return;
        }
        const question = Object.keys(currentQuestion)[0];
        const answers = currentQuestion[question];
        for (const answer of answers) {
            const newPath = [...path, { [question]: answer.answer }];
            if (answer.nextQuestionId) {
                traverse(newPath, answer.nextQuestionId);
            }
            else {
                paths.push(newPath);
            }
        }
    }
    traverse([], '1');
    return {
        number: paths.length,
        list: paths,
    };
}
const surveyConfig = require('./inputData/data.json');
const result = getPaths(surveyConfig);
console.log(JSON.stringify(result, null, 2));
fs_1.default.writeFileSync('./4/outputData/output.json', JSON.stringify({ paths: result }, null, 2));
