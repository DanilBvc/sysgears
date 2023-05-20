"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function generateRandomCoordinate() {
    const coordinate = {
        x: Math.floor(Math.random() * 101),
        y: Math.floor(Math.random() * 101),
        z: Math.floor(Math.random() * 101),
    };
    return coordinate;
}
function calculateDistance(probeCoordinates, asteroidCoordinates) {
    const dx = probeCoordinates.x - asteroidCoordinates.x;
    const dy = probeCoordinates.y - asteroidCoordinates.y;
    const dz = probeCoordinates.z - asteroidCoordinates.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}
function findAsteroidLocation() {
    const asteroidCoordinates = generateRandomCoordinate();
    function exploreCube(cube, probes) {
        const xMid = Math.floor((cube.minX + cube.maxX) / 2);
        const yMid = Math.floor((cube.minY + cube.maxY) / 2);
        const zMid = Math.floor((cube.minZ + cube.maxZ) / 2);
        const subCubes = [
            { minX: cube.minX, minY: cube.minY, minZ: cube.minZ, maxX: xMid, maxY: yMid, maxZ: zMid },
            { minX: xMid + 1, minY: cube.minY, minZ: cube.minZ, maxX: cube.maxX, maxY: yMid, maxZ: zMid },
            { minX: cube.minX, minY: yMid + 1, minZ: cube.minZ, maxX: xMid, maxY: cube.maxY, maxZ: zMid },
            { minX: xMid + 1, minY: yMid + 1, minZ: cube.minZ, maxX: cube.maxX, maxY: cube.maxY, maxZ: zMid },
            { minX: cube.minX, minY: cube.minY, minZ: zMid + 1, maxX: xMid, maxY: yMid, maxZ: cube.maxZ },
            { minX: xMid + 1, minY: cube.minY, minZ: zMid + 1, maxX: cube.maxX, maxY: yMid, maxZ: cube.maxZ },
            { minX: cube.minX, minY: yMid + 1, minZ: zMid + 1, maxX: xMid, maxY: cube.maxY, maxZ: cube.maxZ },
            { minX: xMid + 1, minY: yMid + 1, minZ: zMid + 1, maxX: cube.maxX, maxY: cube.maxY, maxZ: cube.maxZ },
        ];
        let closestCube;
        let minDistance = Number.MAX_VALUE;
        for (const subCube of subCubes) {
            const probeCoordinates = {
                x: Math.floor((subCube.minX + subCube.maxX) / 2),
                y: Math.floor((subCube.minY + subCube.maxY) / 2),
                z: Math.floor((subCube.minZ + subCube.maxZ) / 2),
            };
            const distance = calculateDistance(probeCoordinates, asteroidCoordinates);
            if (distance < minDistance) {
                minDistance = distance;
                closestCube = subCube;
            }
        }
        if (closestCube) {
            probes.push({
                x: Math.floor((closestCube.minX + closestCube.maxX) / 2),
                y: Math.floor((closestCube.minY + closestCube.maxY) / 2),
                z: Math.floor((closestCube.minZ + closestCube.maxZ) / 2),
            });
        }
        if (minDistance === 0) {
            return { count: probes.length, coordinates: probes };
        }
        else {
            if (closestCube) {
                return exploreCube(closestCube, probes);
            }
            else {
                return { count: 0, coordinates: { x: 0, y: 0, z: 0, } }; //nothing found
            }
        }
    }
    const result = exploreCube({ minX: 0, minY: 0, minZ: 0, maxX: 100, maxY: 100, maxZ: 100 }, []);
    return { location: asteroidCoordinates, probes: { count: result.count, coordinates: result.coordinates } };
}
const result = findAsteroidLocation();
fs_1.default.writeFileSync("./3/outputData/output.json", JSON.stringify(result, null, 2));
console.log(result);
