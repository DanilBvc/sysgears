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
function calculateDistance(probe, asteroid) {
    const dx = Math.abs(probe.x - asteroid.x);
    const dy = Math.abs(probe.y - asteroid.y);
    const dz = Math.abs(probe.z - asteroid.z);
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}
function findAsteroidLocation() {
    const asteroid = generateRandomCoordinate();
    const probes = [];
    const maxAttempts = 1000000;
    const cubeSize = 100;
    let probeCount = 0;
    let closestProbe = null;
    for (let x = 0; x <= cubeSize; x += cubeSize / 2) {
        for (let y = 0; y <= cubeSize; y += cubeSize / 2) {
            for (let z = 0; z <= cubeSize; z += cubeSize / 2) {
                const probe = { x, y, z };
                const distance = calculateDistance(probe, asteroid);
                probes.push(probe);
                probeCount++;
                if (distance === 0) {
                    closestProbe = probe;
                    break;
                }
                else if (closestProbe === null ||
                    distance < calculateDistance(closestProbe, asteroid)) {
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
const result = findAsteroidLocation();
fs_1.default.writeFileSync("./3/outputData/output.json", JSON.stringify(result, null, 2));
console.log(result);
