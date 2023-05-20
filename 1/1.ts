import fs from "fs"
import { convertArgumentsType, ConversionRules } from './types/types';

const argData: convertArgumentsType = require('./inputData/data.json');
const units: ConversionRules = require('./contants/units.json');

function convertDistance() {
  const { distance, convertTo } = argData

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
  return result
}

function roundToTwoDecimalPlaces(value: number): number {
  return Math.round(value * 100) / 100;
}


const convertedDistance = convertDistance();
console.log(convertedDistance);
