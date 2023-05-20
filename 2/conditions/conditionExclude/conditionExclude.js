"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonData = require("../../inputData/data.json");
const conditionExcludeFilter = (prevState) => {
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
    return prevState;
};
exports.default = conditionExcludeFilter;
