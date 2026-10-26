import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { MAP_LEVELS } from "./galaxyMapData.js";

const FOV = 50;
// Each level is its own group, far apart, so the camera can glide between them.
export const LEVEL_CENTRES = {
    galaxies: new THREE.Vector3(0, 0, 0),
    "milky-way": new THREE.Vector3(5000, 0, 0),
    neighbourhood: new THREE.Vector3(10000, 0, 0),
};
// How far the camera may pull back, come in and pan on each level (map units).
const LEVEL_VIEW = {
    galaxies: { distance: 330, min: 60, max: 520, pan: 220 },
    "milky-way": { distance: 230, min: 50, max: 380, pan: 120 },
    neighbourhood: { distance: 120, min: 25, max: 260, pan: 80 },
};
// The Milky Way picture's width in map units on its own level.
const DISC_SIZE = 200;
// Where the Sun is on NASA/JPL-Caltech/R. Hurt's picture (u across, v down from
// the top): straight below the bar, on the Orion Spur, about 26,000 light-years
// from the centre.
export const SUN_ON_IMAGE = { u: 0.5, v: 0.71 };
const GLIDE_RATE = 4;

function defaultControls(camera, domElement) {
    const controls = new OrbitControls(camera, domElement);
    controls.enableDamping = true;
    controls.rotateSpeed = 0.5;
    controls.screenSpacePanning = false;
    controls.minPolarAngle = 0.2;
    controls.maxPolarAngle = 1.4;
    return controls;
}

// A soft round glow, made without a canvas so it also builds in node.
function glowTexture(size = 64) {
    const data = new Uint8Array(size * size * 4);
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
        const r = Math.hypot(x - size / 2 + 0.5, y - size / 2 + 0.5) / (size / 2);
        const a = Math.max(0, 1 - r) ** 2;
        data.set([255, 255, 255, Math.round(a * 255)], (y * size + x) * 4);
    }
    const texture = new THREE.DataTexture(data, size, size);
    texture.needsUpdate = true;
    return texture;
}

const toVector = ({ x, y, z }) => new THREE.Vector3(x, y, z);

/**
 * The galaxy map (#108): its own scene and camera, drawn instead of the star
 * system (like lineUp.js). Three levels — the galaxies near ours, the Milky
 * Way (NASA/JPL-Caltech/R. Hurt's picture on a disc, with a star layer and a
 * raised bulge) and our neighbourhood of real star systems. Markers are DOM
 * buttons placed from `projectMarkers()`. Built on `open`, freed on `close`.
 */
export function createGalaxyMap({ renderer, quality = "standard", reducedMotion = () => false, catalogue, currentSystemId,
    createControls = defaultControls, loader = new THREE.TextureLoader() }) {
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.5, 6000);
    const size = { width: 1, height: 1 };
    const disposables = [];
    const own = (item) => { disposables.push(item); return item; };
    const markers = { galaxies: [], "milky-way": [], neighbourhood: [] };
    const positions = new Map();
    const desiredTarget = new THREE.Vector3(), desiredCamera = new THREE.Vector3();
    const scratch = new THREE.Vector3();
    let scene = null, controls = null, groups = null, youAreHere = null;
    let active = false, level = "galaxies", gliding = false;

    function addMarker(levelName, id, position, extra) {
        const world = position.clone().add(LEVEL_CENTRES[levelName]);
        positions.set(id, world);
        markers[levelName].push({ id, ...extra });
        return world;
    }

    function glowSprite(texture, color, scale, opacity = 1) {
        const sprite = new THREE.Sprite(own(new THREE.SpriteMaterial({ map: texture, color, transparent: true, opacity, depthWrite: false, blending: THREE.AdditiveBlending })));
        sprite.scale.setScalar(scale);
        return sprite;
    }

    function starField(count, radius, thickness, color, pointSize, falloff) {
        const points = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const r = radius * (falloff ? -Math.log(1 - Math.random() * 0.98) / 4 : Math.cbrt(Math.random()));
            const angle = Math.random() * Math.PI * 2;
            points.set([Math.cos(angle) * r, (Math.random() - 0.5) * thickness, Math.sin(angle) * r], i * 3);
        }
        const geometry = own(new THREE.BufferGeometry());
        geometry.setAttribute("position", new THREE.BufferAttribute(points, 3));
        return new THREE.Points(geometry, own(new THREE.PointsMaterial({ color, size: pointSize, transparent: true, opacity: 0.8, depthWrite: false, blending: THREE.AdditiveBlending })));
    }

    function build() {
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x02030a);
        const low = quality === "low";
        const glow = own(glowTexture());
        const picture = own(loader.load(`/static/milky-way-${low ? 2048 : 4096}.jpg`));
        picture.colorSpace = THREE.SRGBColorSpace;
        const discMaterial = own(new THREE.MeshBasicMaterial({ map: picture, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }));
        const disc = (sizeUnits) => {
            const geometry = own(new THREE.PlaneGeometry(sizeUnits, sizeUnits));
            geometry.rotateX(-Math.PI / 2);
            return new THREE.Mesh(geometry, discMaterial);
        };
        groups = Object.fromEntries(MAP_LEVELS.map((name) => {
            const group = new THREE.Group();
            group.name = `map-${name}`;
            group.position.copy(LEVEL_CENTRES[name]);
            scene.add(group);
            return [name, group];
        }));
        positions.clear();
        for (const list of Object.values(markers)) list.length = 0;

        // Galaxies: ours as a small picture, the others as soft glows; events beyond.
        groups.galaxies.add(starField(low ? 600 : 1500, 900, 900, 0xbfd4ff, 1.6, false));
        for (const galaxy of catalogue.galaxies) {
            const at = toVector(galaxy.position);
            if (galaxy.enterable) groups.galaxies.add(disc(28));
            else {
                const sprite = glowSprite(glow, 0xcfe0ff, 16, 0.9);
                sprite.position.copy(at); sprite.scale.set(22, 12, 1);
                groups.galaxies.add(sprite);
            }
            addMarker("galaxies", galaxy.id, at, { kind: "galaxy", label: galaxy.name, enterable: Boolean(galaxy.enterable) });
        }
        for (const event of catalogue.events) {
            const at = toVector(event.position);
            const sprite = glowSprite(glow, 0xc89bff, 14, 0.9);
            sprite.position.copy(at);
            groups.galaxies.add(sprite);
            addMarker("galaxies", event.id, at, { kind: "event", label: event.name });
        }

        // The Milky Way: the picture, a raised bulge and a layer of stars over it.
        const milkyWay = groups["milky-way"];
        milkyWay.add(disc(DISC_SIZE));
        milkyWay.add(starField(low ? 1200 : 3500, DISC_SIZE * 0.42, 3, 0xe8f0ff, 0.6, true));
        const bulgeGeometry = own(new THREE.SphereGeometry(1, 32, 16));
        const bulge = new THREE.Mesh(bulgeGeometry, own(new THREE.MeshBasicMaterial({ color: 0xffe3a6, transparent: true, opacity: 0.35, depthWrite: false, blending: THREE.AdditiveBlending })));
        bulge.scale.set(16, 6, 10); bulge.rotation.y = -0.55;
        milkyWay.add(bulge, glowSprite(glow, 0xfff0c8, 40, 0.6));
        const sun = new THREE.Vector3((SUN_ON_IMAGE.u - 0.5) * DISC_SIZE, 0.5, (SUN_ON_IMAGE.v - 0.5) * DISC_SIZE);
        const sunGlow = glowSprite(glow, 0xfff4b0, 5);
        sunGlow.position.copy(sun);
        milkyWay.add(sunGlow);
        addMarker("milky-way", "you-are-here", sun, { kind: "here", label: "You are here" });

        // Our neighbourhood: real star systems, one map unit per light-year.
        const neighbourhood = groups.neighbourhood;
        neighbourhood.add(starField(low ? 500 : 1200, 700, 700, 0xdde6ff, 1.2, false));
        const ringMaterial = own(new THREE.LineBasicMaterial({ color: 0x5b6f9a, transparent: true, opacity: 0.45 }));
        for (const ly of [10, 25, 50]) {
            const curve = new THREE.EllipseCurve(0, 0, ly, ly);
            const geometry = own(new THREE.BufferGeometry().setFromPoints(curve.getPoints(96).map((p) => new THREE.Vector3(p.x, 0, p.y))));
            neighbourhood.add(new THREE.LineLoop(geometry, ringMaterial));
        }
        const pathMaterial = own(new THREE.LineDashedMaterial({ color: 0x9fb8e8, dashSize: 2, gapSize: 2, transparent: true, opacity: 0.6 }));
        const home = catalogue.systems.find((system) => system.home);
        for (const system of catalogue.systems) {
            const at = toVector(system.position);
            const star = glowSprite(glow, system.home ? 0xffe08a : 0xff9a6a, 7);
            star.position.copy(at);
            neighbourhood.add(star);
            if (home && system !== home) {
                const line = new THREE.Line(own(new THREE.BufferGeometry().setFromPoints([toVector(home.position), at])), pathMaterial);
                line.computeLineDistances();
                neighbourhood.add(line);
            }
            addMarker("neighbourhood", system.id, at, { kind: "system", label: system.name, here: system.id === currentSystemId });
        }
        const ringGeometry = own(new THREE.TorusGeometry(4, 0.25, 8, 48));
        youAreHere = new THREE.Mesh(ringGeometry, own(new THREE.MeshBasicMaterial({ color: 0x9fe8b0 })));
        youAreHere.name = "map-you-are-here";
        youAreHere.rotation.x = Math.PI / 2;
        const current = catalogue.systems.find((system) => system.id === currentSystemId);
        if (current) youAreHere.position.copy(toVector(current.position));
        neighbourhood.add(youAreHere);
    }

    // Tall phone screens see less from side to side, so the camera pulls back.
    const fit = () => Math.max(1, 0.9 / camera.aspect);

    function frame(levelName, snap) {
        const view = LEVEL_VIEW[levelName];
        desiredTarget.copy(LEVEL_CENTRES[levelName]);
        desiredCamera.copy(desiredTarget).add(scratch.set(0, 0.62, 0.78).multiplyScalar(view.distance * fit()));
        controls.minDistance = view.min; controls.maxDistance = view.max * fit();
        gliding = true;
        if (snap) { controls.target.copy(desiredTarget); camera.position.copy(desiredCamera); gliding = false; controls.update(); }
    }

    const api = {
        get scene() { return scene; },
        get controls() { return controls; },
        get youAreHere() { return youAreHere; },
        isActive: () => active,
        level: () => level,
        open(startLevel = "galaxies") {
            if (active) return;
            build();
            controls = createControls(camera, renderer.domElement);
            active = true; level = startLevel;
            frame(level, true);
        },
        close() {
            if (!active) return;
            active = false;
            controls?.dispose(); controls = null;
            disposables.splice(0).forEach((item) => item.dispose());
            scene = null; groups = null; youAreHere = null;
        },
        setLevel(next) {
            if (!MAP_LEVELS.includes(next)) throw new Error(`No map level called ${next}`);
            level = next;
            if (active) frame(level, reducedMotion());
        },
        /**
         * Centre a chosen marker without zooming, so its neighbours stay in
         * view. The galaxies level already shows everything and stays put.
         */
        focus(id) {
            const at = positions.get(id);
            if (!active || !at || level === "galaxies") return;
            const offset = camera.position.clone().sub(controls.target);
            // A system beyond the pan limit is aimed at from the limit, so the glide can finish.
            const centre = LEVEL_CENTRES[level], pan = LEVEL_VIEW[level].pan;
            desiredTarget.copy(at).sub(centre).clampLength(0, pan).add(centre);
            desiredCamera.copy(at).add(offset);
            gliding = true;
            if (reducedMotion()) { controls.target.copy(desiredTarget); camera.position.copy(desiredCamera); gliding = false; }
        },
        markerPosition: (id) => positions.get(id)?.clone() ?? null,
        /** Screen positions (CSS pixels) of the current level's markers. */
        projectMarkers() {
            if (!active) return [];
            camera.updateMatrixWorld();
            return markers[level].map((marker) => {
                const p = scratch.copy(positions.get(marker.id)).project(camera);
                const visible = p.z > -1 && p.z < 1 && Math.abs(p.x) <= 1.05 && Math.abs(p.y) <= 1.05;
                return { ...marker, x: (p.x + 1) / 2 * size.width, y: (1 - p.y) / 2 * size.height, visible };
            });
        },
        update(dt) {
            if (!active) return;
            if (gliding) {
                const k = 1 - Math.exp(-GLIDE_RATE * dt);
                controls.target.lerp(desiredTarget, k); camera.position.lerp(desiredCamera, k);
                if (controls.target.distanceTo(desiredTarget) < 0.05 && camera.position.distanceTo(desiredCamera) < 0.05) {
                    controls.target.copy(desiredTarget); camera.position.copy(desiredCamera); gliding = false;
                }
            }
            // Panning is held within the level, so the map never gets lost.
            const centre = LEVEL_CENTRES[level], pan = LEVEL_VIEW[level].pan;
            if (controls.target.distanceTo(centre) > pan) {
                const back = scratch.subVectors(controls.target, centre).setLength(pan).add(centre).sub(controls.target);
                controls.target.add(back); camera.position.add(back);
            }
            controls.update();
        },
        render() { if (active) renderer.render(scene, camera); },
        resize({ width, height }) {
            size.width = width; size.height = height;
            camera.aspect = width / Math.max(height, 1);
            camera.updateProjectionMatrix();
        },
        dispose() { api.close(); },
    };
    return api;
}
