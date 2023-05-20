


import { DataObject, JSONData } from '../../2';
const jsonData: JSONData = require("../../inputData/data.json");
const additionalFiltersFilter = (prevState: DataObject[]) => {
  const additionalFilters = jsonData.condition.additionalFilters;
  if (additionalFilters) {
    return prevState.filter((item) => {
      for (const filter of additionalFilters) {
        const key = Object.keys(filter)[0]
        const value = Object.values(filter)[0]
        if (item[key] === value) {
          return false;
        }
      }
      return true;
    });
  }
  return prevState
}
export default additionalFiltersFilter
