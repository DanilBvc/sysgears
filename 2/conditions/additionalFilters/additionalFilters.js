"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonData = require("../../inputData/data.json");
const additionalFiltersFilter = (prevState) => {
    const additionalFilters = jsonData.condition.additionalFilters;
    if (additionalFilters) {
        return prevState.filter((item) => {
            for (const filter of additionalFilters) {
                const key = Object.keys(filter)[0];
                const value = Object.values(filter)[0];
                if (item[key] === value) {
                    return false;
                }
            }
            return true;
        });
    }
    return prevState;
};
exports.default = additionalFiltersFilter;
