export interface DataObject {
  [key: string]: any;
}
export interface AdditionalFilter {
  key: string;
  value: any;
}

export interface Condition {
  include?: DataObject[];
  exclude?: DataObject[];
  sortBy?: string[];
  additionalFilters?: AdditionalFilter[]
}

export interface Result {
  result: DataObject[];
}

export interface JSONData {
  data: DataObject[];
  condition: Condition;
}
