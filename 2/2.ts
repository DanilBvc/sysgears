import fs from "fs";
import filters from './conditions/filters';
import { Result, JSONData, DataObject } from './types/types';
const jsonData: JSONData = require("./inputData/data.json");



function filterAndSortData(): Result {
  let result: DataObject[] = [...jsonData.data];
  const filtersArray = Object.values(filters)
  result = filtersArray.reduce((acc, filter) => filter(acc), result);
  const jsonDataResult = JSON.stringify({ result }, null, 2);
  fs.writeFileSync("./2/outputData/output.json", jsonDataResult);

  return { result };
}
const result: Result = filterAndSortData();
console.log(result);
