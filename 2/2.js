"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function filterAndSortData() {
    const jsonData = require("./inputData/data.json");
    let result = [...jsonData.data];
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
                if (a[key] < b[key])
                    return -1;
                if (a[key] > b[key])
                    return 1;
            }
            return 0;
        });
    }
    const jsonDataResult = JSON.stringify({ result }, null, 2);
    fs_1.default.writeFileSync("./2/outputData/output.json", jsonDataResult);
    return { result };
}
const result = filterAndSortData();
console.log(result);
