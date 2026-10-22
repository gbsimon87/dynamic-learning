import * as THREE from "three";
import {
    STEERING_COLOURS, TARGET_COUNT, addAct, addBump, addTime, createRound, notesFor,
    recordReached, resultsSummary, steerInput, targetIndex,
} from "./steeringRound.js";

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const cssColour = (hex) => `#${hex.toString(16).padStart(6, "0")}`;
const HEIGHTS = [0, 12, -10, 8, -6];
const KEY_NAMES = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "];

/**
 * The rocket-steering game: five coloured planets, fly to the one you are
 * asked for. Style A steers with a joystick and a GO! button (or the keyboard),
 * style B flies to wherever you tap. Gentle bounces, a soft boundary, and an
 * edge arrow that points at the target when it is off-screen.
 *
 * The React overlay owns all the buttons; it feeds input in through
 * `setStick`, `setThrust` and `tap`, and reads what to show from `getState()`.
 * `onChange(state)` fires when the target, toast, notes or style change, never
 * every frame. Keyboard (arrows, WASD, Space) is handled here and removed by
 * `dispose()`. Nothing is stored or sent anywhere.
 *
 * @param {object} options
 * @param {HTMLCanvasElement} options.canvas
 * @param {boolean} [options.reducedMotion] skip bursts and camera shake
 * @param {(state: object) => void} [options.onChange]
 * @param {HTMLElement|null} [options.arrowEl] element moved to the screen edge towards an off-screen target
 */
export function createSteeringGame({ canvas, reducedMotion = false, onChange, arrowEl = null }) {
    let disposed = false;
    let width = canvas.clientWidth || 800;
    let height = canvas.clientHeight || 600;

    // ---------- scene ----------
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05061a);
    const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 2000);
    scene.add(new THREE.AmbientLight(0xffffff, 1.1));
    const sun = new THREE.DirectionalLight(0xffffff, 2.2);
    sun.position.set(1, 1.2, 0.6);
    scene.add(sun);

    // stars: a far shell plus nearer specks so you can feel yourself moving
    function makeStars(n, rMin, rMax, size) {
        const pos = new Float32Array(n * 3);
        for (let i = 0; i < n; i++) {
            const v = new THREE.Vector3().randomDirection().multiplyScalar(rMin + Math.random() * (rMax - rMin));
            pos.set([v.x, v.y, v.z], i * 3);
        }
        const g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        scene.add(new THREE.Points(g, new THREE.PointsMaterial({ color: 0xffffff, size, sizeAttenuation: true })));
    }
    makeStars(1500, 500, 900, 3);
    makeStars(350, 70, 260, 0.45);

    const planets = STEERING_COLOURS.map((c, i) => {
        const a = (i * Math.PI * 2) / 5;
        const r = 7 + (i % 3);
        const mesh = new THREE.Mesh(
            new THREE.SphereGeometry(r, 40, 28),
            new THREE.MeshStandardMaterial({ color: c.hex, emissive: c.hex, emissiveIntensity: 0.3, roughness: 0.6 }),
        );
        mesh.position.set(Math.sin(a) * 60, HEIGHTS[i], -Math.cos(a) * 60);
        if (i === 3 || i === 4) { // rings on two planets for fun
            const ring = new THREE.Mesh(
                new THREE.TorusGeometry(r * 1.6, 0.6, 8, 60),
                new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x666666 }),
            );
            ring.rotation.x = Math.PI / 2.4;
            mesh.add(ring);
        }
        const halo = new THREE.Mesh(
            new THREE.SphereGeometry(r * 1.25, 24, 16),
            new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3, side: THREE.BackSide }),
        );
        halo.visible = false;
        mesh.add(halo);
        scene.add(mesh);
        return { ...c, mesh, halo, r };
    });

    // rocket: built along +y, then the inner group is turned so the nose points to -z
    const ship = new THREE.Group();
    const rocket = new THREE.Group();
    rocket.rotation.x = -Math.PI / 2;
    ship.add(rocket);
    const mat = (c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.5 });
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 1.8, 20), mat(0xf4f4ff));
    const nose = new THREE.Mesh(new THREE.ConeGeometry(0.6, 1.1, 20), mat(0xff3d5a));
    nose.position.y = 1.45;
    const win = new THREE.Mesh(new THREE.SphereGeometry(0.28, 16, 12), mat(0x55ccff));
    win.position.set(0, 0.4, 0.5);
    rocket.add(body, nose, win);
    for (let i = 0; i < 3; i++) {
        const fin = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.9, 0.7), mat(0xff3d5a));
        const g = new THREE.Group();
        g.rotation.y = (i * Math.PI * 2) / 3;
        fin.position.set(0.75, -0.8, 0);
        g.add(fin);
        rocket.add(g);
    }
    const flame = new THREE.Mesh(new THREE.ConeGeometry(0.4, 1.4, 14), new THREE.MeshBasicMaterial({ color: 0xffa21f }));
    flame.rotation.x = Math.PI;
    flame.position.y = -1.6;
    rocket.add(flame);
    ship.scale.setScalar(0.75);
    scene.add(ship);

    const marker = new THREE.Mesh(new THREE.TorusGeometry(1, 0.15, 8, 32), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    marker.visible = false;
    scene.add(marker);

    // ---------- game state ----------
    const P = { pos: new THREE.Vector3(), vel: new THREE.Vector3(), yaw: 0, pitch: 0, roll: 0 };
    const input = { stickX: 0, stickY: 0, thrustTouch: false, keys: new Set() };
    let style = "A";
    let goalPos = null;
    let shake = 0;
    let bumpCooldown = 0;
    let prevThrust = false;
    let toast = null;
    let toastId = 0;
    const rounds = { A: createRound(), B: createRound() };
    const round = () => rounds[style];
    const target = () => {
        const i = targetIndex(round());
        return i === null ? null : planets[i];
    };

    function getState() {
        const t = target();
        const r = round();
        return {
            style,
            target: t ? { name: t.name, hex: t.hex, css: cssColour(t.hex) } : null,
            done: r.done,
            progress: { done: r.log.length, total: TARGET_COUNT },
            toast,
            notes: { A: notesFor(rounds.A), B: notesFor(rounds.B) },
        };
    }
    let lastNotes = JSON.stringify(getState().notes);
    function emit() {
        if (disposed) return;
        lastNotes = JSON.stringify(getState().notes);
        onChange?.(getState());
    }

    function showTarget() {
        const t = target();
        planets.forEach((p) => {
            p.halo.visible = p === t;
            p.halo.material.color.set(p.hex);
        });
    }
    function setStyle(st) {
        if (st !== "A" && st !== "B") return;
        style = st;
        goalPos = null;
        marker.visible = false;
        input.stickX = input.stickY = 0;
        input.thrustTouch = false;
        showTarget();
        emit();
    }
    function newRound() {
        rounds[style] = createRound();
        goalPos = null;
        marker.visible = false;
        showTarget();
        emit();
    }

    // ---------- controls ----------
    function setStick(x, y) {
        input.stickX = clamp(x, -1, 1);
        input.stickY = clamp(y, -1, 1);
    }
    function setThrust(on) {
        input.thrustTouch = !!on;
    }

    const keyName = (e) => (typeof e.key !== "string" || !e.key ? null : e.key.length === 1 ? e.key.toLowerCase() : e.key);
    // Space on a focused button presses that button rather than firing the engine.
    const onButton = (e) => e.key === " " && e.target instanceof Element && !!e.target.closest("button, input, select, textarea, a[href]");
    const onKeyDown = (e) => {
        const key = keyName(e);
        if (!key || onButton(e)) return;
        if (KEY_NAMES.includes(e.key)) e.preventDefault();
        input.keys.add(key);
    };
    const onKeyUp = (e) => {
        const key = keyName(e);
        if (key) input.keys.delete(key);
    };
    const onBlur = () => input.keys.clear();
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onBlur);

    // Style B: tap a planet or empty space
    const ray = new THREE.Raycaster();
    function tap(clientX, clientY) {
        if (style !== "B") return;
        const rect = canvas.getBoundingClientRect();
        const w = rect.width || width;
        const h = rect.height || height;
        ray.setFromCamera(new THREE.Vector2(((clientX - rect.left) / w) * 2 - 1, -((clientY - rect.top) / h) * 2 + 1), camera);
        const hit = ray.intersectObjects(planets.map((p) => p.mesh), false)[0];
        goalPos = hit ? hit.point.clone() : ray.ray.at(70, new THREE.Vector3());
        marker.position.copy(goalPos);
        marker.visible = true;
        addAct(round());
    }

    // ---------- effects ----------
    const bursts = [];
    function burst(at, hex) {
        if (reducedMotion) return;
        const n = 60;
        const pos = new Float32Array(n * 3);
        const vel = [];
        for (let i = 0; i < n; i++) {
            pos.set([at.x, at.y, at.z], i * 3);
            vel.push(new THREE.Vector3().randomDirection().multiplyScalar(8 + Math.random() * 14));
        }
        const g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        const pts = new THREE.Points(g, new THREE.PointsMaterial({ color: hex, size: 1.6, transparent: true }));
        scene.add(pts);
        bursts.push({ pts, vel, life: 1.2 });
    }
    function showToast(text) {
        toast = { text, id: ++toastId };
    }

    function reached(t) {
        burst(ship.position.clone().add(new THREE.Vector3(0, 1, 0)), t.hex);
        const finished = recordReached(round());
        if (finished) {
            goalPos = null;
            marker.visible = false;
            showToast("You did it! All done!");
        } else {
            showToast("You did it!");
        }
        showTarget();
        emit();
    }

    // ---------- physics ----------
    const fwd = new THREE.Vector3();
    const tmp = new THREE.Vector3();
    const forward = (yaw, pitch, out) => out.set(-Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), -Math.cos(yaw) * Math.cos(pitch));
    const wrap = (a) => Math.atan2(Math.sin(a), Math.cos(a));
    let thrusting = false;
    let turnRate = 0;

    function step(dt) {
        forward(P.yaw, P.pitch, fwd);
        turnRate = 0;
        if (style === "A") {
            const { x: sx, y: sy } = steerInput(input.stickX, input.stickY, input.keys); // dead zone so shaky thumbs don't wobble
            turnRate = -sx * 1.7;
            P.yaw += turnRate * dt;
            if (sy) P.pitch = clamp(P.pitch + sy * 1.0 * dt, -0.9, 0.9);
            else P.pitch *= Math.exp(-1.4 * dt); // auto-level
            thrusting = input.thrustTouch || input.keys.has(" ");
            if (prevThrust && !thrusting) addAct(round());
            prevThrust = thrusting;
            if (thrusting) P.vel.addScaledVector(fwd, 24 * dt);
            P.vel.multiplyScalar(Math.exp(-0.8 * dt));
            const sp = P.vel.length();
            if (sp > 22) P.vel.multiplyScalar(Math.exp(-3 * dt)); // soft speed cap
        } else {
            thrusting = false;
            prevThrust = false;
            if (goalPos) {
                tmp.subVectors(goalPos, P.pos);
                const dist = tmp.length();
                if (dist < 2.5) {
                    goalPos = null;
                    marker.visible = false;
                } else {
                    const wantYaw = Math.atan2(-tmp.x, -tmp.z);
                    const wantPitch = clamp(Math.asin(tmp.y / dist), -0.9, 0.9);
                    const dy = wrap(wantYaw - P.yaw);
                    const before = P.yaw;
                    P.yaw += clamp(dy * (1 - Math.exp(-4 * dt)), -2.4 * dt, 2.4 * dt);
                    turnRate = dt > 0 ? (P.yaw - before) / dt : 0;
                    P.pitch += (wantPitch - P.pitch) * (1 - Math.exp(-3 * dt));
                    const speed = Math.min(22, dist * 0.9) * clamp(1 - Math.abs(dy) / 1.6, 0, 1);
                    P.vel.lerp(fwd.multiplyScalar(speed), 1 - Math.exp(-2.5 * dt));
                    thrusting = speed > 3;
                }
            }
            if (!goalPos) {
                P.vel.multiplyScalar(Math.exp(-2.5 * dt));
                P.pitch *= Math.exp(-1.4 * dt);
            }
        }
        P.pos.addScaledVector(P.vel, dt);

        // gentle bounce off invisible bumpers around planets
        bumpCooldown -= dt;
        for (const p of planets) {
            tmp.subVectors(P.pos, p.mesh.position);
            const d = tmp.length();
            const lim = p.r + 1.8;
            if (d < lim) {
                tmp.divideScalar(d || 1);
                P.pos.copy(p.mesh.position).addScaledVector(tmp, lim);
                const vn = P.vel.dot(tmp);
                if (vn < 0) {
                    P.vel.addScaledVector(tmp, -1.4 * vn);
                    if (-vn > 3 && bumpCooldown <= 0) {
                        bumpCooldown = 0.6;
                        addBump(round());
                        if (!reducedMotion) shake = 0.6;
                    }
                }
            }
        }
        // soft boundary: the further out, the harder it nudges you home
        const out = P.pos.length() - 120;
        if (out > 0) P.vel.addScaledVector(tmp.copy(P.pos).normalize(), -out * 4 * dt).multiplyScalar(Math.exp(-0.5 * dt));

        // challenge
        const t = target();
        if (t) {
            addTime(round(), dt);
            if (P.pos.distanceTo(t.mesh.position) < t.r + 7) reached(t);
        }

        // ship visuals
        ship.position.copy(P.pos);
        P.roll += (clamp(-turnRate * 0.3, -0.7, 0.7) - P.roll) * (1 - Math.exp(-6 * dt));
        ship.rotation.set(P.pitch, P.yaw, P.roll, "YXZ");
        flame.scale.setScalar(thrusting ? 1 + Math.random() * 0.3 : 0.35);
    }

    const camBase = new THREE.Vector3();
    const look = new THREE.Vector3();
    const camDir = new THREE.Vector3();
    function updateCamera(dt, snap) {
        forward(P.yaw, P.pitch * 0.5, camDir);
        tmp.copy(P.pos).addScaledVector(camDir, -11);
        tmp.y += 4;
        if (snap) camBase.copy(tmp);
        else camBase.lerp(tmp, 1 - Math.exp(-5 * dt));
        camera.position.copy(camBase);
        if (shake > 0) {
            camera.position.add(new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).multiplyScalar(shake));
            shake = Math.max(0, shake - dt * 2);
        }
        forward(P.yaw, P.pitch, tmp);
        look.copy(P.pos).addScaledVector(tmp, 8);
        camera.lookAt(look);
    }

    // arrow at the screen edge pointing to the goal when it is off-screen
    function updateArrow() {
        const a = arrowEl;
        if (!a) return;
        const t = target();
        if (!t) {
            a.style.display = "none";
            return;
        }
        camera.updateMatrixWorld();
        const c = t.mesh.position.clone().applyMatrix4(camera.matrixWorldInverse);
        const behind = c.z > 0;
        const ndc = t.mesh.position.clone().project(camera);
        if (!behind && Math.abs(ndc.x) < 0.85 && Math.abs(ndc.y) < 0.8) {
            a.style.display = "none";
            return;
        }
        let x = c.x;
        let y = c.y;
        if (behind) {
            x = -x;
            y = -y;
        }
        const len = Math.hypot(x, y) || 1;
        x /= len;
        y /= len;
        const cx = width / 2;
        const cy = height / 2;
        const m = 50;
        const sc = Math.min((cx - m) / (Math.abs(x) || 1e-6), (y > 0 ? cy - (height > 520 ? 170 : 90) : cy - 130) / (Math.abs(y) || 1e-6));
        a.style.display = "block";
        a.style.borderBottomColor = cssColour(t.hex);
        a.style.left = `${cx + x * sc}px`;
        a.style.top = `${cy - y * sc}px`;
        a.style.transform = `rotate(${Math.atan2(x, y)}rad)`;
    }

    // ---------- loop ----------
    function resize(w, h) {
        width = Math.max(1, w);
        height = Math.max(1, h);
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.fov = camera.aspect < 1 ? 80 : 65;
        camera.updateProjectionMatrix();
    }
    resize(width, height);
    showTarget();
    updateCamera(0, true);

    let last = performance.now();
    let time = 0;
    let frame = 0;
    function loop(now) {
        frame = requestAnimationFrame(loop);
        // rAF can hand back a timestamp at or before the last one; never step backwards.
        const dt = Math.max(0, Math.min((now - last) / 1000, 0.05));
        last = now;
        time += dt;
        step(dt);
        updateCamera(dt, false);
        planets.forEach((p, i) => {
            p.mesh.rotation.y += dt * 0.15;
            p.halo.material.opacity = 0.3 + 0.15 * Math.sin(time * 4 + i);
        });
        if (marker.visible) {
            marker.quaternion.copy(camera.quaternion);
            marker.scale.setScalar(1 + 0.2 * Math.sin(time * 6));
        }
        for (let i = bursts.length - 1; i >= 0; i--) {
            const b = bursts[i];
            const pos = b.pts.geometry.attributes.position;
            b.life -= dt;
            b.vel.forEach((v, j) => pos.setXYZ(j, pos.getX(j) + v.x * dt, pos.getY(j) + v.y * dt, pos.getZ(j) + v.z * dt));
            pos.needsUpdate = true;
            b.pts.material.opacity = Math.max(0, b.life);
            if (b.life <= 0) {
                scene.remove(b.pts);
                b.pts.geometry.dispose();
                b.pts.material.dispose();
                bursts.splice(i, 1);
            }
        }
        updateArrow();
        renderer.render(scene, camera);
    }
    frame = requestAnimationFrame(loop);

    // the live time in the notes ticks on while the panel is open
    const notesTimer = setInterval(() => {
        if (JSON.stringify(getState().notes) !== lastNotes) emit();
    }, 500);

    function dispose() {
        if (disposed) return;
        disposed = true;
        cancelAnimationFrame(frame);
        clearInterval(notesTimer);
        window.removeEventListener("keydown", onKeyDown);
        window.removeEventListener("keyup", onKeyUp);
        window.removeEventListener("blur", onBlur);
        scene.traverse((o) => {
            o.geometry?.dispose();
            const m = o.material;
            if (Array.isArray(m)) m.forEach((x) => x.dispose());
            else m?.dispose();
        });
        renderer.dispose();
        // dispose() keeps the WebGL context; after many opens the browser
        // drops the oldest one, which is the Solar System's. Release it once
        // the canvas has left the page (StrictMode remounts reuse it).
        setTimeout(() => {
            if (!canvas.isConnected) renderer.forceContextLoss();
        }, 0);
    }

    return {
        setStyle,
        newRound,
        goAgain: newRound,
        setThrust,
        setStick,
        tap,
        resize,
        getState,
        resultsText: () => resultsSummary(rounds),
        dispose,
    };
}
