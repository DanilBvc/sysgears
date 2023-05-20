import { JSONData, DataObject } from '../../types/types';

const jsonData: JSONData = require("../../inputData/data.json");
const conditionIncludeFilter = (prevState: DataObject[]) => {
  const conditionInclude = jsonData.condition.include;
  if (conditionInclude) {
    return prevState.filter((item) => {
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
  return prevState
}
export default conditionIncludeFilter
