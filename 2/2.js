"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const filters_1 = __importDefault(require("./conditions/filters"));
function filterAndSortData() {
    const jsonData = require("./inputData/data.json");
    let result = [...jsonData.data];
    const filtersArray = Object.values(filters_1.default);
    result = filtersArray.reduce((acc, filter) => filter(acc), result);
    const jsonDataResult = JSON.stringify({ result }, null, 2);
    fs_1.default.writeFileSync("./2/outputData/output.json", jsonDataResult);
    return { result };
}
const result = filterAndSortData();
console.log(result);
