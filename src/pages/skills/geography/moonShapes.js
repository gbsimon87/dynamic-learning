import * as THREE from "three";

// Small moons too weak to pull themselves round. Axes are the measured
// long × middle × short sizes, scaled so the long axis is 1; the long axis is
// local +X, which tidally locked moons keep pointing at their planet.
export const IRREGULAR_MOON_SHAPES = {
    Phobos: { axes: [1, 0.85, 0.69], lumps: 0.1, seed: 1 },  // 27 × 22 × 18 km
    Deimos: { axes: [1, 0.81, 0.73], lumps: 0.08, seed: 2 }, // 15 × 12 × 11 km
    Amalthea: { axes: [1, 0.58, 0.51], lumps: 0.1, seed: 3 }, // 250 × 146 × 128 km
    Hyperion: { axes: [1, 0.74, 0.57], lumps: 0.14, seed: 4 }, // 360 × 266 × 205 km
};

// Smooth, seam-free bumps: a sum of waves over the surface direction, so the
// two copies of each UV-seam vertex always move together.
function lumpiness(seed, x, y, z) {
    let value = 0;
    for (let i = 1; i <= 4; i++) {
        const a = seed * 12.9898 + i * 78.233;
        const fx = Math.sin(a) * 2.1 * i, fy = Math.cos(a * 1.3) * 2.1 * i, fz = Math.sin(a * 0.7) * 2.1 * i;
        value += Math.sin(x * fx + y * fy + z * fz + a) / i;
    }
    return value / 2.08; // roughly -1..1
}

/** A unit-sized lumpy ellipsoid for `name`, or null for a round moon. */
export function irregularMoonGeometry(name, segments = 32) {
    const shape = IRREGULAR_MOON_SHAPES[name];
    if (!shape) return null;
    const geometry = new THREE.SphereGeometry(1, segments, segments);
    const position = geometry.attributes.position;
    const point = new THREE.Vector3();
    let longest = 0;
    for (let i = 0; i < position.count; i++) {
        point.fromBufferAttribute(position, i);
        const bump = 1 + shape.lumps * lumpiness(shape.seed, point.x, point.y, point.z);
        point.set(point.x * shape.axes[0], point.y * shape.axes[1], point.z * shape.axes[2]).multiplyScalar(bump);
        position.setXYZ(i, point.x, point.y, point.z);
        longest = Math.max(longest, point.length());
    }
    // Keep the whole moon inside its listed radius, which the camera and
    // flight bumpers treat as solid.
    geometry.scale(1 / longest, 1 / longest, 1 / longest);
    geometry.computeVertexNormals();
    shareSeamNormals(geometry);
    return geometry;
}

// SphereGeometry repeats the vertices along its UV seam and at the poles, so
// computed normals differ either side of the join. Average them by position.
function shareSeamNormals(geometry) {
    const position = geometry.attributes.position, normal = geometry.attributes.normal;
    const groups = new Map();
    for (let i = 0; i < position.count; i++) {
        const key = [position.getX(i), position.getY(i), position.getZ(i)].map((v) => v.toFixed(5)).join(",");
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(i);
    }
    const sum = new THREE.Vector3(), n = new THREE.Vector3();
    for (const indices of groups.values()) {
        if (indices.length < 2) continue;
        sum.set(0, 0, 0);
        for (const i of indices) sum.add(n.fromBufferAttribute(normal, i));
        sum.normalize();
        for (const i of indices) normal.setXYZ(i, sum.x, sum.y, sum.z);
    }
    normal.needsUpdate = true;
}
