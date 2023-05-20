export interface Question {
  [question: string]: Answer[];
}

export interface Answer {
  answer: string;
  nextQuestionId: string | null;
}

export interface Path {
  [question: string]: string;
}

export interface PathsResult {
  number: number;
  list: Path[][];
}
