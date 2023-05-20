import fs from "fs"
interface Question {
  [question: string]: Answer[];
}

interface Answer {
  answer: string;
  nextQuestionId: string | null;
}

interface Path {
  [question: string]: string;
}

interface PathsResult {
  number: number;
  list: Path[][];
}

function getPaths(config: Question[]): PathsResult {
  const paths: Path[][] = [];

  function traverse(path: Path[], questionId: string) {
    const currentQuestion = config.find((q) => q.questionId === questionId as unknown as Answer[]);
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
      } else {
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

const surveyConfig: Question[] = require('./inputData/data.json')

const result = getPaths(surveyConfig);

console.log(JSON.stringify(result, null, 2));


fs.writeFileSync('./4/outputData/output.json', JSON.stringify({ paths: result }, null, 2))
