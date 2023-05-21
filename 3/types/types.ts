export interface Coordinate {
  x: number;
  y: number;
  z: number;
}

export interface Cube {
  minX: number;
  minY: number;
  minZ: number;
  maxX: number;
  maxY: number;
  maxZ: number;
}



export interface ProbeResult {
  count: number;
  coordinates: Coordinate[] | Coordinate;
}
