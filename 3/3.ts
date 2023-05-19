import fs from "fs"
interface Coordinate {
  x: number;
  y: number;
  z: number;
}

interface ProbeResult {
  count: number;
  coordinates: Coordinate[];
}

interface Result {
  location: Coordinate;
  probes: ProbeResult;
}

function generateRandomCoordinate(): Coordinate {
  const coordinate: Coordinate = {
    x: Math.floor(Math.random() * 101),
    y: Math.floor(Math.random() * 101),
    z: Math.floor(Math.random() * 101),
  };
  return coordinate;
}

function calculateDistance(probe: Coordinate, asteroid: Coordinate): number {
  const dx = Math.abs(probe.x - asteroid.x);
  const dy = Math.abs(probe.y - asteroid.y);
  const dz = Math.abs(probe.z - asteroid.z);
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

function findAsteroidLocation(): Result {
  const asteroid: Coordinate = generateRandomCoordinate();
  const probes: Coordinate[] = [];
  const maxAttempts = 1000000;
  const cubeSize = 100;

  let probeCount = 0;
  let closestProbe: Coordinate | null = null;

  for (let x = 0; x <= cubeSize; x += cubeSize / 2) {
    for (let y = 0; y <= cubeSize; y += cubeSize / 2) {
      for (let z = 0; z <= cubeSize; z += cubeSize / 2) {
        const probe: Coordinate = { x, y, z };
        const distance = calculateDistance(probe, asteroid);
        probes.push(probe);
        probeCount++;

        if (distance === 0) {
          closestProbe = probe;
          break;
        } else if (
          closestProbe === null ||
          distance < calculateDistance(closestProbe, asteroid)
        ) {
          closestProbe = probe;
        }

        if (probeCount >= maxAttempts) {
          break;
        }
      }
    }
  }

  return {
    location: asteroid,
    probes: {
      count: probeCount,
      coordinates: probes,
    },
  };
}


const result: Result = findAsteroidLocation();


fs.writeFileSync("./3/outputData/output.json", JSON.stringify(result, null, 2))
console.log(result);
