import fs from "fs";
import filters from './conditions/filters';

export interface DataObject {
  [key: string]: any;
}
interface AdditionalFilter {
  key: string;
  value: any;
}

interface Condition {
  include?: DataObject[];
  exclude?: DataObject[];
  sortBy?: string[];
  additionalFilters?: AdditionalFilter[]
}

interface Result {
  result: DataObject[];
}

export interface JSONData {
  data: DataObject[];
  condition: Condition;
}

function filterAndSortData(): Result {
  const jsonData: JSONData = require("./inputData/data.json");
  let result: DataObject[] = [...jsonData.data];
  const filtersArray = Object.values(filters)
  result = filtersArray.reduce((acc, filter) => filter(acc), result);
  const jsonDataResult = JSON.stringify({ result }, null, 2);
  fs.writeFileSync("./2/outputData/output.json", jsonDataResult);

  return { result };
}
const result: Result = filterAndSortData();
console.log(result);
