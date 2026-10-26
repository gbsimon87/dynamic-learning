import * as THREE from "three";

// The home star dot sits this far from the camera, so it stays "at infinity".
const SKY_DISTANCE = 4000;

function glowTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 64;
    const context = canvas.getContext("2d");
    const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.25, "rgba(255,244,214,0.75)");
    gradient.addColorStop(1, "rgba(255,244,214,0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(canvas);
}

/**
 * Glowing signposts out past the edge (see systems/signposts.js), shown while
 * the child flies: an arrow pointing the real way to each other system, a
 * ring round it and its label. Away from home it also draws a faint star for
 * our Sun in home's direction. A module for solarModules.js.
 */
export function createSystemSignposts({ scene, camera, signposts, edgeRadius, makeLabel, homeStarDot = false, quality = "high", isVisible = () => true }) {
    const size = Math.max(3, edgeRadius * 0.012);
    const disposables = [];
    const track = (item) => { disposables.push(item); return item; };
    const glow = track(glowTexture());
    const arrowGeometry = track(new THREE.ConeGeometry(size * 0.45, size * 1.4, quality === "low" ? 12 : 24));
    arrowGeometry.rotateX(Math.PI / 2); // points along +z, then lookAt aims it
    const ringGeometry = track(new THREE.TorusGeometry(size, size * 0.08, 8, quality === "low" ? 32 : 64));
    const group = new THREE.Group();
    group.name = "system-signposts";
    const signs = signposts.map((sign) => {
        const color = sign.home ? 0x9fe8b0 : 0xffd27a;
        const holder = new THREE.Group();
        holder.name = sign.id;
        holder.position.set(sign.position.x, sign.position.y, sign.position.z);
        const material = track(new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9 }));
        const arrow = new THREE.Mesh(arrowGeometry, material);
        const ring = new THREE.Mesh(ringGeometry, material);
        const outward = holder.position.clone().multiplyScalar(2);
        arrow.lookAt(outward); ring.lookAt(outward);
        const halo = new THREE.Sprite(track(new THREE.SpriteMaterial({ map: glow, color, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending })));
        halo.scale.setScalar(size * 4);
        const label = makeLabel(sign.label);
        label.scale.multiplyScalar(size * 0.45);
        label.position.y = size * 1.9;
        track(label.material.map); track(label.material);
        holder.add(halo, ring, arrow, label);
        group.add(holder);
        return holder;
    });
    scene.add(group);

    let star = null;
    const home = signposts.find((sign) => sign.home);
    const homeDirection = home ? new THREE.Vector3(home.direction.x, home.direction.y, home.direction.z).normalize() : null;
    if (homeStarDot && homeDirection) {
        star = new THREE.Sprite(track(new THREE.SpriteMaterial({ map: glow, color: 0xfff1c9, transparent: true, opacity: 0.8, depthWrite: false })));
        star.name = "home-star-dot";
        star.scale.setScalar(SKY_DISTANCE * 0.012);
        scene.add(star);
    }

    return {
        signs,
        update() {
            group.visible = isVisible();
            if (star) star.position.copy(camera.position).addScaledVector(homeDirection, SKY_DISTANCE);
        },
        dispose() {
            group.removeFromParent();
            star?.removeFromParent();
            disposables.forEach((item) => item.dispose());
        },
    };
}
