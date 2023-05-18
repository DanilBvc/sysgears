import fs from "fs";

interface DataObject {
  [key: string]: any;
}

interface Condition {
  include?: DataObject[];
  exclude?: DataObject[];
  sortBy?: string[];
}

interface Result {
  result: DataObject[];
}

interface JSONData {
  data: DataObject[];
  condition: Condition;
}

function filterAndSortData(): Result {
  const jsonData: JSONData = require("./inputData/data.json");
  let result: DataObject[] = [...jsonData.data];
  const conditionInclude = jsonData.condition.include;
  const conditionExclude = jsonData.condition.exclude;
  const conditionSortBy = jsonData.condition.sortBy;

  if (conditionInclude) {
    result = result.filter((item) => {
      for (const includeItem of conditionInclude) {
        const keys = Object.keys(includeItem);
        for (const key of keys) {
          if (item[key] !== includeItem[key]) {
            return false;
          }
        }
      }
      return true;
    });
  }

  if (conditionExclude) {
    result = result.filter((item) => {
      for (const excludeItem of conditionExclude) {
        const keys = Object.keys(excludeItem);
        for (const key of keys) {
          if (item[key] === excludeItem[key]) {
            return false;
          }
        }
      }
      return true;
    });
  }

  if (conditionSortBy) {
    result = result.sort((a, b) => {
      for (const key of conditionSortBy) {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
      }
      return 0;
    });
  }

  const jsonDataResult = JSON.stringify({ result }, null, 2);
  fs.writeFileSync("./2/outputData/output.json", jsonDataResult);

  return { result };
}

const result: Result = filterAndSortData();
console.log(result);
