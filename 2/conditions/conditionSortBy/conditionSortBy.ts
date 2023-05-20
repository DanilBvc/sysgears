import { JSONData, DataObject } from '../../types/types';


const jsonData: JSONData = require("../../inputData/data.json");
const conditionSortByFilter = (prevState: DataObject[]) => {
  const conditionSortBy = jsonData.condition.sortBy;
  if (conditionSortBy) {
    return prevState.sort((a, b) => {
      for (const key of conditionSortBy) {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
      }
      return 0;
    });
  }
  return prevState
}
export default conditionSortByFilter
