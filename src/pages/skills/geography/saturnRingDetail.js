import * as THREE from "three";

// Same annuli as the distant rings; retain the deliberate Cassini Division.
export const SATURN_RING_BANDS = [
    [1.22, 1.30, 0xb4a98c, 0.18], [1.32, 1.42, 0xc9bea1, 0.28],
    [1.44, 1.53, 0xe0d2ad, 0.5], [1.54, 1.60, 0xbcae91, 0.38],
    [1.66, 1.72, 0xd8cbaa, 0.4], [1.73, 1.80, 0xa99e86, 0.26],
];
export const SATURN_RING_LINE = "Saturn's rings are not solid hoops. They are made of many separate pieces, mostly water ice with some rocky material. Each piece travels around Saturn. The dark gaps are places with much less ring material. Zoom in to see our icy chunks. We have made the pieces and the ring thickness bigger so you can see them.";

export function ringDetailBlend(distanceInRadii) {
    const t = Math.max(0, Math.min(1, (6 - distanceInRadii) / 3));
    return t * t * (3 - 2 * t);
}

export function ringParticles(count) {
    let seed = 5701;
    const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
    return Array.from({ length: count }, (_, i) => {
        const band = SATURN_RING_BANDS[i % SATURN_RING_BANDS.length];
        const size = 0.007 + random() * 0.011;
        const inner = band[0] + size * 1.5;
        const outer = band[1] - size * 1.5;
        return {
            radius: Math.sqrt(inner * inner + random() * (outer * outer - inner * inner)),
            angle: random() * Math.PI * 2,
            height: (random() - 0.5) * 0.008,
            size, color: band[2], rotation: random() * Math.PI,
        };
    });
}

/** A near-camera level of detail, owned by the Solar System module host.
 * Attach to Saturn's axial group, so tilt and the size line-up stay aligned.
 */
export function createSaturnRingDetail({ axialGroup, ringGroup, radius, getCamera, getOrbitTime, getQuality, reducedMotion }) {
    const root = new THREE.Group();
    root.name = 'saturn-ring-chunks';
    axialGroup.add(root);
    const distant = ringGroup.children.map(mesh => ({ mesh, opacity: mesh.material.opacity }));
    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x9fb2c2, emissiveIntensity: 0.35, roughness: 0.85, transparent: true, opacity: 0 });
    let quality;
    let mesh;
    let particles;
    let lastTime = null;
    const dummy = new THREE.Object3D();
    const center = new THREE.Vector3();
    const worldScale = new THREE.Vector3();
    function resize() {
        const next = getQuality();
        if (next === quality) return;
        quality = next;
        if (mesh) { mesh.removeFromParent(); mesh.dispose(); }
        particles = ringParticles(quality === 'low' ? 900 : 3200);
        mesh = new THREE.InstancedMesh(geometry, material, particles.length);
        mesh.name = 'saturn-ring-ice';
        mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        mesh.frustumCulled = false;
        mesh.raycast = () => {};
        particles.forEach((p, i) => mesh.setColorAt(i, new THREE.Color(p.color).lerp(new THREE.Color(0xe8f4ff), 0.72)));
        root.add(mesh);
        lastTime = null;
    }
    function update() {
        axialGroup.getWorldPosition(center);
        // Account for size-line-up scale as well as Saturn's ordinary radius.
        const scale = axialGroup.getWorldScale(worldScale).x;
        const blend = ringDetailBlend(getCamera().position.distanceTo(center) / (radius * scale));
        root.visible = blend > 0;
        material.opacity = blend;
        distant.forEach(({ mesh: band, opacity }) => { band.material.opacity = opacity * (1 - blend * 0.9); });
        if (!root.visible) return;
        const time = reducedMotion() ? 0 : getOrbitTime();
        if (time === lastTime) return;
        lastTime = time;
        particles.forEach((p, i) => {
            // Inner pieces move faster; every piece has its own orbit.
            const angle = p.angle + time * 0.08 / Math.pow(p.radius, 1.5);
            dummy.position.set(Math.cos(angle) * p.radius * radius, p.height * radius, Math.sin(angle) * p.radius * radius);
            dummy.rotation.set(p.rotation, p.rotation, p.rotation * 0.4);
            dummy.scale.set(p.size * radius, p.size * radius * 0.65, p.size * radius * 1.2);
            dummy.updateMatrix();
            mesh.setMatrixAt(i, dummy.matrix);
        });
        mesh.instanceMatrix.needsUpdate = true;
    }
    resize();
    root.visible = false;
    return {
        update, resize,
        dispose() {
            root.removeFromParent();
            mesh.dispose(); geometry.dispose(); material.dispose();
            distant.forEach(({ mesh: band, opacity }) => { band.material.opacity = opacity; });
        },
    };
}
