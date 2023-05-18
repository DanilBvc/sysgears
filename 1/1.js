"use strict";
const fs = require("fs");
function convertDistance() {
    const argData = require('./inputData/data.json');
    const { distance, convertTo } = argData;
    const units = require('./contants/units.json');
    if (!units[distance.unit] || !units[convertTo]) {
        throw new Error('Invalid units');
    }
    const conversionFactor = units[distance.unit][convertTo];
    const convertedValue = distance.value * conversionFactor;
    const result = {
        unit: convertTo,
        value: roundToTwoDecimalPlaces(convertedValue),
    };
    const jsonData = JSON.stringify(result, null, 2);
    fs.writeFileSync('./1/outputData/output.json', jsonData);
    return result;
}
function roundToTwoDecimalPlaces(value) {
    return Math.round(value * 100) / 100;
}
const convertedDistance = convertDistance();
console.log(convertedDistance);
