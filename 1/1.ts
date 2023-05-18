const fs = require("fs")
type ConversionRules = {
  [unit: string]: {
    [convertTo: string]: number;
  };
};

type convertArgumentsType = {
  distance: { unit: string; value: number },
  convertTo: string
}

function convertDistance() {
  const argData: convertArgumentsType = require('./inputData/data.json');
  const { distance, convertTo } = argData
  const units: ConversionRules = require('./contants/units.json');

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
