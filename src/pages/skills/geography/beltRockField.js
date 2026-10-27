import * as THREE from "three";

// Rocks to weave past in the asteroid-belt run (#84). The instanced belt stays
// the far view; while the child steers inside the band, a small pool of rocks
// sits around the rocket, recycled ahead as it flies. They are squished
// together so there is something to dodge: the real belt is mostly empty
// space, and the chapter card says so. Bumping one only wobbles the rocket.
export const ROCK_REACH = 14;
const MIN_GAP = 3;
const CLEAR_OF_SHIP = 4;
const SHIP_RADIUS = 0.35;

export function createBeltRockField({ scene, getRegion, quality, random = Math.random }) {
    const count = quality === "low" ? 12 : 24;
    const geometry = new THREE.IcosahedronGeometry(1, 1);
    const position = geometry.attributes.position;
    const point = new THREE.Vector3();
    for (let i = 0; i < position.count; i++) {
        point.fromBufferAttribute(position, i);
        point.multiplyScalar(0.8 + 0.35 * Math.abs(Math.sin(point.x * 3.1 + point.y * 1.7 + point.z * 2.3)));
        position.setXYZ(i, point.x, point.y, point.z);
    }
    geometry.computeVertexNormals();
    const material = new THREE.MeshStandardMaterial({ color: 0x8a8076, roughness: 1, flatShading: true });
    const mesh = new THREE.InstancedMesh(geometry, material, count);
    mesh.name = "belt-rock-field";
    mesh.visible = false;
    mesh.frustumCulled = false;
    scene.add(mesh);
    const rocks = [];
    const dummy = new THREE.Object3D();
    const scratch = new THREE.Vector3(), side = new THREE.Vector3(), up = new THREE.Vector3();
    let active = false;

    const insideBand = (p, region, margin = 0) => {
        const r = Math.hypot(p.x, p.z);
        return r >= region.innerRadius - margin && r <= region.outerRadius + margin && Math.abs(p.y) <= region.halfHeight + margin;
    };
    const clampToBand = (p, region) => {
        const r = Math.hypot(p.x, p.z) || 1;
        const clamped = Math.min(region.outerRadius - 0.5, Math.max(region.innerRadius + 0.5, r));
        p.x *= clamped / r; p.z *= clamped / r;
        return p;
    };
    // A free spot near the ship: ahead of it when `ahead`, anywhere around it otherwise.
    function place(rock, ship, forward, region, ahead) {
        side.crossVectors(forward, THREE.Object3D.DEFAULT_UP);
        if (side.lengthSq() < 1e-6) side.set(1, 0, 0);
        side.normalize(); up.crossVectors(side, forward).normalize();
        for (let attempt = 0; attempt < 12; attempt++) {
            // Always in front, so no rock sits between the chase camera and the rocket.
            const along = ahead ? ROCK_REACH * (0.55 + 0.4 * random()) : ROCK_REACH * (0.3 + 0.65 * random());
            scratch.copy(ship).addScaledVector(forward, along)
                .addScaledVector(side, (random() * 2 - 1) * ROCK_REACH * 0.6)
                .addScaledVector(up, (random() * 2 - 1) * ROCK_REACH * 0.25);
            clampToBand(scratch, region);
            if (scratch.distanceTo(ship) > ROCK_REACH) scratch.sub(ship).setLength(ROCK_REACH * 0.95).add(ship);
            if (scratch.distanceTo(ship) < CLEAR_OF_SHIP + rock.radius) continue;
            if (rocks.some((other) => other !== rock && other.position.distanceTo(scratch) < MIN_GAP + other.radius + rock.radius)) continue;
            break;
        }
        rock.position.copy(scratch);
        rock.drift.set(0, 0, 0);
        rock.spin = random() * Math.PI * 2;
    }
    function draw() {
        rocks.forEach((rock, i) => {
            dummy.position.copy(rock.position);
            dummy.rotation.set(rock.spin, rock.spin * 0.7, 0);
            dummy.scale.setScalar(rock.radius);
            dummy.updateMatrix();
            mesh.setMatrixAt(i, dummy.matrix);
        });
        mesh.count = rocks.length;
        mesh.instanceMatrix.needsUpdate = true;
    }

    return {
        mesh,
        rocks,
        /** Call every frame with the ship; `steering` is false during autopilot, trips, orbit and warps. */
        update({ position: ship, forward, steering, dt = 1 / 60 }) {
            const region = getRegion();
            const wanted = steering && region && insideBand(ship, region, 2);
            if (!wanted) { active = false; mesh.visible = false; rocks.length = 0; return; }
            if (!active) {
                active = true;
                rocks.length = 0;
                for (let i = 0; i < count; i++) {
                    const rock = { position: new THREE.Vector3(), drift: new THREE.Vector3(), radius: 0.25 + random() * 0.3, spin: 0 };
                    rocks.push(rock);
                    place(rock, ship, forward, region, false);
                }
            }
            for (const rock of rocks) {
                rock.position.addScaledVector(rock.drift, dt);
                rock.drift.multiplyScalar(Math.exp(-0.8 * dt));
                if (rock.position.distanceTo(ship) > ROCK_REACH) place(rock, ship, forward, region, true);
            }
            mesh.visible = true;
            draw();
        },
        /** Pushes the ship clear of any rock it touches; returns true on a bump. */
        collide(shipPosition, velocity) {
            if (!active) return false;
            let bumped = false;
            for (const rock of rocks) {
                scratch.subVectors(shipPosition, rock.position);
                const limit = rock.radius + SHIP_RADIUS;
                if (scratch.lengthSq() >= limit * limit) continue;
                if (scratch.lengthSq() < 1e-10) scratch.set(0, 1, 0);
                scratch.normalize();
                shipPosition.copy(rock.position).addScaledVector(scratch, limit);
                const inward = velocity.dot(scratch);
                if (inward < 0) velocity.addScaledVector(scratch, -inward);
                velocity.multiplyScalar(0.5);
                rock.drift.copy(scratch).multiplyScalar(-1.5);
                bumped = true;
            }
            return bumped;
        },
        dispose() {
            mesh.removeFromParent();
            geometry.dispose();
            material.dispose();
        },
    };
}
