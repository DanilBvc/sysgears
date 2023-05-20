export interface Coordinate {
  x: number;
  y: number;
  z: number;
}

export interface ProbeResult {
  count: number;
  coordinates: Coordinate[];
}

export interface Result {
  location: Coordinate;
  probes: ProbeResult;
}
