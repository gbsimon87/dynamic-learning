import * as THREE from "three";
import { liftOffFrame } from "./liftOffTimeline.js";

function makePuffTexture(size = 64) {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.5, "rgba(235,235,240,0.55)");
    gradient.addColorStop(1, "rgba(220,220,230,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
}

/**
 * The lift-off that starts the tour (#35): "Three, two, one, lift off!" with
 * the ship's engine burning harder and smoke billowing from under it, then
 * the ship leaves for the first stop. Smoke is a fixed pool of sprites.
 *
 * A module for solarModules.js. `onCount(n)` gets 3, 2, 1, 0 ("Lift off!")
 * and null when it's over; `onLaunch()` is when the caller should fly the
 * ship. `skip()` launches at once (a tap), `cancel()` stops without
 * launching (Reset, search, the meteor). The caller doesn't start it under
 * reduced motion.
 */
// A double-tap on Tour lands its second tap on the scene; that is not a skip.
const SKIP_GRACE_MS = 500;

export function createLiftOff({ scene, ship, quality, onCount = () => {}, onLaunch = () => {} }) {
    const count = quality === "low" ? 40 : 80;
    const texture = makePuffTexture();
    const puffs = [];
    for (let i = 0; i < count; i++) {
        const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false, opacity: 0 });
        const sprite = new THREE.Sprite(material);
        sprite.visible = false;
        sprite.raycast = () => {};
        scene.add(sprite);
        puffs.push({ sprite, velocity: new THREE.Vector3(), age: 0, life: 1, size: 1 });
    }
    const nozzle = new THREE.Vector3();
    let next = 0;
    let age = 0;
    let startedAt = 0;
    let running = false;
    let launched = false;
    let shownCount;
    let smokeDebt = 0;

    function puff(speed) {
        const p = puffs[next];
        next = (next + 1) % count;
        const shipSize = ship.size();
        ship.nozzle(nozzle);
        p.sprite.position.copy(nozzle);
        const angle = Math.random() * Math.PI * 2;
        // Smoke spreads sideways along the pad and sinks a little.
        p.velocity.set(Math.cos(angle), -0.25 - Math.random() * 0.3, Math.sin(angle))
            .multiplyScalar(shipSize * speed * (0.6 + Math.random() * 0.8));
        p.age = 0;
        p.life = 1.1 + Math.random() * 0.9;
        p.size = shipSize * (0.25 + Math.random() * 0.25);
        p.sprite.visible = true;
    }

    function show(n) {
        if (n === shownCount) return;
        shownCount = n;
        onCount(n);
    }

    function launch() {
        if (launched) return;
        launched = true;
        ship.ignite(0);
        for (let i = 0; i < count / 2; i++) puff(2.2);
        onLaunch();
    }

    function stop() {
        running = false;
        ship.ignite(0);
        show(null);
    }

    return {
        isCounting: () => running && !launched,
        start() {
            startedAt = performance.now();
            age = 0;
            running = true;
            launched = false;
            shownCount = undefined;
            smokeDebt = 0;
            show(liftOffFrame(0).count);
        },
        skip() {
            if (!running || performance.now() - startedAt < SKIP_GRACE_MS) return;
            launch();
            stop();
        },
        cancel() {
            if (running) stop();
        },
        update(dt, { active }) {
            if (active) {
                if (running) stop();
                for (const p of puffs) p.sprite.visible = false;
                return;
            }
            if (running) {
                age += dt;
                const frame = liftOffFrame(age);
                show(frame.count);
                if (frame.launch) launch();
                else {
                    ship.ignite(frame.ignition);
                    smokeDebt += frame.smoke * dt;
                    while (smokeDebt >= 1) {
                        puff(0.6 + frame.ignition);
                        smokeDebt -= 1;
                    }
                }
                if (frame.done) stop();
            }
            for (const p of puffs) {
                if (!p.sprite.visible) continue;
                p.age += dt;
                const x = p.age / p.life;
                if (x >= 1) {
                    p.sprite.visible = false;
                    continue;
                }
                p.sprite.position.addScaledVector(p.velocity, dt);
                p.velocity.multiplyScalar(Math.exp(-1.5 * dt));
                p.sprite.scale.setScalar(p.size * (1 + 3 * x));
                p.sprite.material.opacity = 0.7 * (1 - x) * Math.min(1, x * 8);
            }
        },
        dispose() {
            for (const p of puffs) {
                p.sprite.removeFromParent();
                p.sprite.material.dispose();
            }
            texture.dispose();
        },
    };
}
