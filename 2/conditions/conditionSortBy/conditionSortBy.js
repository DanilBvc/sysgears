"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonData = require("../../inputData/data.json");
const conditionSortByFilter = (prevState) => {
    const conditionSortBy = jsonData.condition.sortBy;
    if (conditionSortBy) {
        return prevState.sort((a, b) => {
            for (const key of conditionSortBy) {
                if (a[key] < b[key])
                    return -1;
                if (a[key] > b[key])
                    return 1;
            }
            return 0;
        });
    }
    return prevState;
};
exports.default = conditionSortByFilter;
