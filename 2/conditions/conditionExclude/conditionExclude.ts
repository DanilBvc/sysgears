import { JSONData, DataObject } from '../../types/types';

const jsonData: JSONData = require("../../inputData/data.json");
const conditionExcludeFilter = (prevState: DataObject[]) => {
  const conditionExclude = jsonData.condition.exclude;
  if (conditionExclude) {
    return prevState.filter((item) => {
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
  return prevState
}
export default conditionExcludeFilter
