export type ConversionRules = {
  [unit: string]: {
    [convertTo: string]: number;
  };
};

export type convertArgumentsType = {
  distance: { unit: string; value: number },
  convertTo: string
}
