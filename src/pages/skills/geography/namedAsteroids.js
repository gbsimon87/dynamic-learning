import * as THREE from "three";
import { FLIGHT_CLUES } from "./flightClues.js";

// Four real asteroids for the asteroid-belt run (#84). Ceres, Vesta and Psyche
// circle inside the scene's belt band (55–90 units); Bennu is a near-Earth
// asteroid, so it travels just outside Earth's path (25.64). Sizes are
// exaggerated so a child can find them; speeds follow the belt's own range.
// Facts were checked against the NASA pages listed in docs/SOLAR_SYSTEM_IDEAS.md.
const clueFact = (id) => FLIGHT_CLUES.find((clue) => clue.target === id).fact;
const PRETEND = "Its size here is made bigger so you can find it.";

export const NAMED_ASTEROIDS = [
    {
        id: "Ceres", name: "Ceres", classification: "Dwarf planet", kindLabel: "Dwarf planet · asteroid belt",
        distance: 75, speed: 0.0009, phase: 0.6, incline: 0.03, radius: 0.55, lumpiness: 0.04, color: 0x8f8a84, seed: 3,
        facts: [clueFact("Ceres"), "In 2015 the Dawn spacecraft made it the first dwarf planet ever visited.", "Scientists think it holds lots of water ice inside.", PRETEND],
    },
    {
        id: "Vesta", name: "Vesta", classification: "Asteroid", kindLabel: "Asteroid · asteroid belt",
        distance: 62, speed: 0.0011, phase: 2.4, incline: -0.05, radius: 0.42, lumpiness: 0.18, color: 0xa39a8c, seed: 7,
        facts: [clueFact("Vesta"), "It is the second heaviest thing in the asteroid belt, after Ceres.", PRETEND],
    },
    {
        id: "Psyche", name: "Psyche", classification: "Asteroid", kindLabel: "Asteroid · asteroid belt",
        distance: 81, speed: 0.0008, phase: 4.3, incline: 0.04, radius: 0.38, lumpiness: 0.22, color: 0x9a9a9e, seed: 11,
        facts: [clueFact("Psyche"), "It is shaped a bit like a potato.", PRETEND],
    },
    {
        id: "Bennu", name: "Bennu", classification: "Near-Earth asteroid", kindLabel: "Asteroid · near Earth",
        distance: 29, speed: 0.0045, phase: 1.2, incline: 0.06, radius: 0.2, lumpiness: 0.16, color: 0x5b5753, seed: 19,
        facts: [clueFact("Bennu"), "It passes close to Earth about every six years.", "The real Bennu is only about a third of a mile wide.", PRETEND],
    },
];

export function asteroidPosition(asteroid, orbitTime, out) {
    const angle = asteroid.speed * orbitTime + asteroid.phase;
    return out.set(Math.cos(angle) * asteroid.distance, Math.sin(angle) * asteroid.distance * asteroid.incline, -Math.sin(angle) * asteroid.distance);
}

export function asteroidInfo(asteroid) {
    const narration = `${asteroid.name}. ${asteroid.facts[0]}`;
    return {
        kind: "asteroid", name: asteroid.name, classification: asteroid.classification,
        moonSummary: asteroid.kindLabel, narration, summary: asteroid.facts[0],
        facts: asteroid.facts, factsHeading: "Rock facts",
    };
}

// A lumpy rock: a sphere pushed in and out by a few fixed bumps (the same every visit).
function rockGeometry({ radius, lumpiness, seed }, low) {
    const geometry = new THREE.IcosahedronGeometry(radius, low ? 2 : 3);
    const position = geometry.attributes.position;
    const point = new THREE.Vector3();
    const bumps = Array.from({ length: 5 }, (_, i) => new THREE.Vector3(Math.sin(seed * 1.7 + i * 2.1), Math.cos(seed * 0.9 + i * 1.3), Math.sin(seed * 2.3 + i * 0.7)).normalize());
    for (let i = 0; i < position.count; i++) {
        point.fromBufferAttribute(position, i).normalize();
        const push = bumps.reduce((sum, bump, b) => sum + (b % 2 ? -1 : 1) * Math.max(0, point.dot(bump)) ** 3, 0);
        point.multiplyScalar(radius * (1 + lumpiness * push));
        position.setXYZ(i, point.x, point.y, point.z);
    }
    geometry.computeVertexNormals();
    return geometry;
}

/** The asteroids as scene bodies with labels; `entries` join search, clues and free flight. */
export function createNamedAsteroids({ scene, getOrbitTime, quality, makeLabel, isHidden = () => false }) {
    const low = quality === "low";
    const owned = [];
    const items = NAMED_ASTEROIDS.map((asteroid) => {
        const material = new THREE.MeshStandardMaterial({ color: asteroid.color, roughness: 0.95, metalness: asteroid.id === "Psyche" ? 0.35 : 0.05, flatShading: true });
        const mesh = new THREE.Mesh(rockGeometry(asteroid, low), material);
        mesh.name = `asteroid-${asteroid.id}`;
        mesh.userData.asteroidId = asteroid.id;
        // The scene sizes and places labels like planet names (owner + bodyRadius).
        const label = makeLabel(asteroid.name);
        Object.assign(label.userData, { asteroidId: asteroid.id, owner: mesh, bodyRadius: asteroid.radius });
        scene.add(mesh, label);
        owned.push(mesh.geometry, material);
        return { asteroid, mesh, label };
    });
    const entries = items.map(({ asteroid, mesh }) => ({
        id: asteroid.id, name: asteroid.name, kind: "asteroid", kindLabel: asteroid.kindLabel, parentName: null,
        object3d: mesh, radius: asteroid.radius, planetSystem: null, asteroid,
    }));
    const place = () => {
        for (const { asteroid, mesh } of items) {
            asteroidPosition(asteroid, getOrbitTime(), mesh.position);
            mesh.rotation.y = getOrbitTime() * 0.02 + asteroid.seed;
        }
    };
    // Placed now, but `isHidden` is only asked from the first frame: the
    // scene's other modules may not exist yet while this one is built.
    place();
    const update = () => {
        place();
        const hidden = isHidden();
        for (const { mesh } of items) mesh.visible = !hidden;
    };
    return {
        entries,
        labels: items.map(({ label }) => label),
        hitTargets: items.flatMap(({ mesh, label }) => [mesh, label]),
        update,
        dispose() {
            for (const { mesh, label } of items) { mesh.removeFromParent(); label.removeFromParent(); label.material?.map?.dispose(); label.material?.dispose(); }
            owned.forEach((item) => item.dispose());
        },
    };
}
