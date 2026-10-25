import * as THREE from "three";
import { orbitPosition, orbitPointAt } from "./planetOrbits.js";

const TAU = Math.PI * 2;
const DEG = Math.PI / 180;
const COUNTS = {
    low: { hungaria: 240, trojan: 450, kuiper: 2200 },
    standard: { hungaria: 700, trojan: 1400, kuiper: 6500 },
};

/** Teaching scale: use the existing Mars/main-belt gap and Neptune/Pluto region. */
export function smallBodyLayout({ mars, jupiter, neptune, pluto, mainBeltInnerRadius }) {
    const marsEdge = mars.distance * (1 + mars.orbit.eccentricity);
    const gap = mainBeltInnerRadius - marsEdge;
    return {
        hungaria: { inner: marsEdge + gap * 0.25, outer: mainBeltInnerRadius - gap * 0.15 },
        trojan: { radius: jupiter.distance },
        kuiper: { inner: neptune.distance * 1.025, outer: Math.max(neptune.distance * 50 / 30, pluto.distance * (1 + pluto.orbit.eccentricity)) },
    };
}

function vector(point) {
    return new THREE.Vector3(point.x, point.y, point.z);
}

/**
 * Four instanced populations (one draw call each). Their local rocks are fixed;
 * the groups move with the shared simulation clock, including pause and Reset.
 * L4/L5 follow Jupiter's actual elliptical, inclined orbit rather than a second
 * clock that could drift away from the planet.
 */
export function createSmallBodyRegions({ scene, planets, mainBeltInnerRadius, getOrbitTime, getQuality, isVisible, rng = Math.random }) {
    const layout = smallBodyLayout({ ...planets, mainBeltInnerRadius });
    const object3d = new THREE.Group();
    object3d.name = "small-body-regions";
    const trojans = new THREE.Group();
    trojans.name = "jupiter-trojans";
    object3d.add(trojans);
    scene.add(object3d);

    // Label owners stay stable when quality changes rebuild the rock meshes.
    const anchors = {};
    function anchor(id, parent, radius, angle, height) {
        const owner = new THREE.Object3D();
        owner.name = `${id}-anchor`;
        owner.position.set(Math.sin(angle) * radius, height, Math.cos(angle) * radius);
        parent.add(owner);
        anchors[id] = owner;
    }
    anchor("hungaria-group", object3d, (layout.hungaria.inner + layout.hungaria.outer) / 2, -Math.PI / 10, layout.hungaria.outer * Math.sin(25 * DEG));
    anchor("trojans-l4", trojans, layout.trojan.radius, Math.PI / 3, layout.trojan.radius * 0.04);
    anchor("trojans-l5", trojans, layout.trojan.radius, -Math.PI / 3, layout.trojan.radius * 0.04);
    anchor("kuiper-belt", object3d, (layout.kuiper.inner + layout.kuiper.outer) / 2, -Math.PI / 6, 0);

    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const rock = new THREE.MeshStandardMaterial({ color: 0xa99b8b, roughness: 1 });
    const ice = new THREE.MeshStandardMaterial({ color: 0xb4cfdf, roughness: 0.9 });
    const dummy = new THREE.Object3D();
    const matrix = new THREE.Matrix4();
    const radial = new THREE.Vector3();
    const tangent = new THREE.Vector3();
    const normal = vector(orbitPointAt(1, planets.jupiter.orbit, 0))
        .cross(vector(orbitPointAt(1, planets.jupiter.orbit, Math.PI / 2))).normalize();
    const populations = [];
    let hungaria;
    let kuiper;
    let quality;
    let lastTime;

    const between = (min, max) => min + (max - min) * rng();
    function populate(name, count, material, parent, sample) {
        const mesh = new THREE.InstancedMesh(geometry, material, count);
        mesh.name = name;
        mesh.raycast = () => {}; // Scenery must not intercept planet taps.
        for (let i = 0; i < count; i++) {
            sample();
            dummy.rotation.set(rng() * TAU, rng() * TAU, rng() * TAU);
            dummy.updateMatrix();
            mesh.setMatrixAt(i, dummy.matrix);
        }
        mesh.instanceMatrix.needsUpdate = true;
        mesh.computeBoundingSphere();
        parent.add(mesh);
        populations.push(mesh);
        return mesh;
    }

    function disk(region, minTilt, maxTilt, minSize, maxSize) {
        const radius = between(region.inner, region.outer);
        const angle = rng() * TAU;
        const node = rng() * TAU;
        const tilt = between(minTilt, maxTilt) * DEG;
        // A ring in an inclined plane with a random ascending node.
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        dummy.position.set(
            Math.cos(node) * x + Math.sin(node) * z * Math.cos(tilt),
            z * Math.sin(tilt),
            -Math.sin(node) * x + Math.cos(node) * z * Math.cos(tilt),
        );
        const size = between(minSize, maxSize);
        dummy.scale.set(size, size * between(0.6, 1), size * between(0.7, 1.2));
    }

    function resize() {
        const next = getQuality();
        if (next === quality) return;
        quality = next;
        for (const mesh of populations) { mesh.removeFromParent(); mesh.dispose(); }
        populations.length = 0;
        const counts = COUNTS[quality] ?? COUNTS.standard;
        hungaria = populate("hungaria-group", counts.hungaria, rock, object3d,
            () => disk(layout.hungaria, 16, 25, 0.15, 0.28));
        for (const [name, direction] of [["trojans-l4-leading", 1], ["trojans-l5-trailing", -1]]) {
            populate(name, counts.trojan, rock, trojans, () => {
                // Concentrate each swarm around +/-60 degrees, with tapered ends.
                const spread = (rng() + rng() + rng() - 1.5) / 1.5;
                const angle = direction * Math.PI / 3 + spread * 20 * DEG;
                const radius = layout.trojan.radius * between(0.96, 1.04);
                dummy.position.set(Math.sin(angle) * radius, between(-1, 1) * radius * 0.025, Math.cos(angle) * radius);
                const size = between(0.22, 0.48);
                dummy.scale.set(size, size * 0.7, size * between(0.8, 1.3));
            });
        }
        kuiper = populate("kuiper-belt", counts.kuiper, ice, object3d,
            () => disk(layout.kuiper, 0, 12, 0.9, 2.4));
        lastTime = undefined;
    }

    function update() {
        object3d.visible = isVisible();
        if (!object3d.visible) return;
        const time = getOrbitTime();
        if (time === lastTime) return;
        lastTime = time;
        hungaria.rotation.y = time * 0.0018;
        kuiper.rotation.y = time * 0.00016;
        const position = orbitPosition(planets.jupiter, time);
        radial.set(position.x, position.y, position.z);
        trojans.scale.setScalar(radial.length() / layout.trojan.radius);
        radial.normalize();
        tangent.crossVectors(normal, radial).normalize();
        trojans.quaternion.setFromRotationMatrix(matrix.makeBasis(tangent, normal, radial));
    }

    resize();
    update();
    return {
        object3d, anchors, update, resize,
        dispose() {
            object3d.removeFromParent();
            for (const mesh of populations) mesh.dispose();
            geometry.dispose();
            rock.dispose();
            ice.dispose();
        },
    };
}
