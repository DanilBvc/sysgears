"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const argData = require('./inputData/data.json');
const units = require('./contants/units.json');
function convertDistance() {
    const { distance, convertTo } = argData;
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
    fs_1.default.writeFileSync('./1/outputData/output.json', jsonData);
    return result;
}
function roundToTwoDecimalPlaces(value) {
    return Math.round(value * 100) / 100;
}
const convertedDistance = convertDistance();
console.log(convertedDistance);
