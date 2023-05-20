"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonData = require("../../inputData/data.json");
const conditionIncludeFilter = (prevState) => {
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
    return prevState;
};
exports.default = conditionIncludeFilter;
