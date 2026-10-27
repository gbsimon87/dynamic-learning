import React, { useRef, useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Pane } from "tweakpane";
import { matchBodies } from "./solarSearch.js";
import { createSolarDefaults, createWorldTime, advanceWorldTime, getBodyPose } from "./solarSimulation.js";
import { createMeteorExperiment } from "./meteorExperiment.js";
import { createModuleHost } from "./solarModules.js";
import { detectQuality, readDebugFlags } from "./solarQuality.js";
import { createFrameReadout } from "./solarFrameReadout.js";
import { createRenderPipeline } from "./solarRenderPipeline.js";
import { SUN_SAFETY_LINE, SUN_SNEEZE_LINE, createBounces, createSunTapCounter } from "./solarTaps.js";
import { createSunSneeze } from "./sunSneeze.js";
import { createSolarSky } from "./solarSky.js";
import { createEarthDayNight, EARTH_DAY_NIGHT_LINE } from "./earthDayNight.js";
import { createPlanetAtmospheres } from "./planetAtmospheres.js";
import { createShootingStars } from "./shootingStars.js";
import { WISH_LINE } from "./shootingStarTiming.js";
import { createWarpIn } from "./warpIn.js";
import { createWarpStreaks } from "./warpStreaks.js";
import { markWarpSeen, shouldPlayWarp } from "./warpTimeline.js";
import { buildShip, createAutopilotShip } from "./autopilotShip.js";
import { SHIP_LINE } from "./shipFlight.js";
import { createIss } from "./issStation.js";
import { ISS_LINE } from "./issOrbit.js";
import { createLiftOff } from "./liftOff.js";
import { COUNT_WORDS } from "./liftOffTimeline.js";
import { createLineUp } from "./lineUp.js";
import { LINE_UP_LINE } from "./lineUpLayout.js";
import { createPaleBlueDot } from "./paleBlueDot.js";
import { PALE_BLUE_DOT_STORY, PALE_BLUE_DOT_TITLE } from "./paleBlueDotView.js";
import { isMuted } from "../../../components/celebration/sound/player.js";
import { speak, stopNarration, stopNarrationOf } from "../../../utils/speech.js";
import { createConstellationSky } from "./constellationSky.js";
import { constellations } from "./constellations.js";
import ConstellationCard from "./ConstellationCard.jsx";
import JoinDots from "./JoinDots.jsx";
import SolarFlightControls from "./SolarFlightControls.jsx";
import SolarCameraChoices from "./SolarCameraChoices.jsx";
import SolarOrbitControl from "./SolarOrbitControl.jsx";
import SolarToolbarMenu from "./SolarToolbarMenu.jsx";
import SolarCockpit from "./SolarCockpit.jsx";
import { createSolarFreeFlight } from "./solarFreeFlight.js";
import { applySceneSettings, moonLabelVisible } from "./solarSceneSettings.js";
import SolarSettingsDrawer from "./SolarSettingsDrawer.jsx";
import { createSaturnRingDetail, SATURN_RING_BANDS, SATURN_RING_LINE } from "./saturnRingDetail.js";
import { COMET_HIT_RADIUS, createHalleyComet } from "./halleyComet.js";
import { COMET_ID, COMET_NAME, COMET_LINE } from "./cometOrbit.js";
import { asteroidInfo, createNamedAsteroids } from "./namedAsteroids.js";
import { createBeltRockField } from "./beltRockField.js";
import { PLANET_ORBITS, orbitPathPoints } from "./planetOrbits.js";
import { createEarthAurora } from "./earthAurora.js";
import { moonPhase } from "./moonPhase.js";
import SolarMissions from "./SolarMissions.jsx";
import SolarInfoCard from "./SolarInfoCard.jsx";
import { CONSTELLATION_BRIGHTNESS, DEFAULT_SPEED, SPEED_PRESETS, loadViewSettings, saveViewSettings } from "./solarViewSettings.js";
import { badgePixelHeight, badgeWorldHeight, pickUnoverlapped } from "./labelLayout.js";
import { worldSurfacePath } from "./worldSurfaces.js";
import { irregularMoonGeometry } from "./moonShapes.js";
import { createSmallBodyRegions } from "./smallBodyRegions.js";
import { createSolarRegionLabels } from "./solarRegionLabels.js";
import { SOLAR_REGIONS } from "./solarRegionInfo.js";
import { createBeyond } from "./beyond.js";
import { availableDestinations } from "./beyondDestinations.js";
import BeyondPicker from "./BeyondPicker.jsx";
import BeyondWarpControls from "./BeyondWarpControls.jsx";
import SpaceRipplesCard from "./SpaceRipplesCard.jsx";
import { SPACE_RIPPLES_ARRIVAL_LINE } from "./spaceRipplesFacts.js";
import { HOME_SYSTEM } from "./systems/home.js";
import { buildMoonInfo, buildPlanetInfo, buildStarInfo } from "./systems/bodyInfo.js";
import { proceduralPlanetMaterial } from "./systems/proceduralPlanet.js";
import { HOME_SYSTEM_ID, SYSTEM_REGISTRY, registryEntry, tripDestination } from "./systems/registry.js";
import SolarTripHud from "./SolarTripHud.jsx";
import { SIGN_OFFSET, signpostsFor } from "./systems/signposts.js";
import { createSystemSignposts } from "./systemSignposts.js";
import { createGalaxyMap } from "./galaxyMap.js";
import { mapCatalogue } from "./galaxyMapData.js";
import GalaxyMapPanel from "./GalaxyMapPanel.jsx";
import "./SolarSystem.css";

/**
 * ThreeSolarSystem.jsx
 * React wrapper around your standalone Three.js solar system.
 *
 * Notes:
 * - Keep your textures & cubemap under public/static/... so the existing paths work.
 * - This component is self-contained; mount it full-screen or inside any sized parent.
 */

// The ⌕ character has patchy font coverage, so draw the glyph instead.
function SearchGlyph() {
    return (
        <svg className="solar-search__glyph" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <circle cx="10.5" cy="10.5" r="6.5" />
            <line x1="15.4" y1="15.4" x2="21" y2="21" />
        </svg>
    );
}

// Home-only features (a definition's `extras`). When a system leaves one off,
// a quiet stand-in answers the same questions, so the code that asks never
// needs to know which system it is in.
const NO_COMET = { object3d: { visible: false }, hitTarget: null };
const NO_ISS = { object3d: null, hitTarget: null };
const NO_LINE_UP = { isActive: () => false, open() {}, close() {}, render() {} };
const NO_PALE_BLUE_DOT = { isActive: () => false, hidesScenery: () => false, holdsClock: () => false, begin() {}, look() {}, end() {}, marker: null };
const NO_LIFT_OFF = { isCounting: () => false, skip() {}, cancel() {}, start() {} };
const NO_REGION_LABELS = { hitTargets: [], select: () => false };
const NO_BELT = { enabled: false, count: 0 };

// Every galaxy, event and star system the galaxy map shows (#108).
const MAP_CATALOGUE = mapCatalogue(SYSTEM_REGISTRY, availableDestinations());

/**
 * `arrival` (from the page) says how the child got here: a trip arriving
 * plays its second half here. `onTravel` asks the page for another system at
 * a trip's hand-over; `onArrived` tells it the child has landed (it speaks
 * the welcome).
 */
export default function ThreeSolarSystem({ system = HOME_SYSTEM, arrival = null, onPrepare = () => {}, onTravel = () => {}, onArrived = () => {} }) {
    const arrivalRef = useRef(arrival);
    const onPrepareRef = useRef(onPrepare);
    const onTravelRef = useRef(onTravel);
    const onArrivedRef = useRef(onArrived);
    onPrepareRef.current = onPrepare;
    onTravelRef.current = onTravel;
    onArrivedRef.current = onArrived;
    const homePhrase = registryEntry(HOME_SYSTEM_ID)?.phrase ?? "";
    // View switches for things this system doesn't have.
    const hiddenToggles = [
        ...(system.planets.some((planet) => planet.moons.length > 0) ? [] : ["showMoonLabels"]),
        ...(system.extras.asteroidBelt ? [] : ["asteroidBelt"]),
    ];
    const containerRef = useRef(null); // container div we control sizing from
    const canvasRef = useRef(null); // managed <canvas>
    const sceneApiRef = useRef(null);
    const searchInputRef = useRef(null);
    const moreButtonRef = useRef(null);
    // Space explorer chapters and stars last while the child stays in this system.
    const flightSessionRef = useRef({});
    const flyButtonRef = useRef(null);
    const resetButtonRef = useRef(null);
    const focusRequestRef = useRef(null);
    const [meteorPhase, setMeteorPhase] = useState("ready");
    const [sceneReady, setSceneReady] = useState(false);
    const [meteorError, setMeteorError] = useState("");
    // A line from the Sun when it's tapped (#24, #25); `id` restarts the timer.
    // A short line after tapping the Sun or a shooting star.
    const [tapMessage, setTapMessage] = useState(null);
    const [selectedPlanet, setSelectedPlanet] = useState(null);
    const [missionArrival, setMissionArrival] = useState(null);
    const saturnCardOpen = Boolean(selectedPlanet?.sections?.rings);
    useEffect(() => () => { if (saturnCardOpen) stopNarrationOf(SATURN_RING_LINE); }, [saturnCardOpen]);
    const cometCardOpen = selectedPlanet?.kind === "comet";
    useEffect(() => () => { if (cometCardOpen) stopNarrationOf(COMET_LINE); }, [cometCardOpen]);
    const earthCardOpen = Boolean(selectedPlanet?.sections?.dayNight);
    useEffect(() => () => { if (earthCardOpen) stopNarrationOf(EARTH_DAY_NIGHT_LINE); }, [earthCardOpen]);
    // While the ship flies to a planet the launch buttons step aside, as they
    // do for its card, so another mode can't start mid-flight.
    const [shipFlying, setShipFlying] = useState(false);
    const [cameraView, setCameraView] = useState("behind");
    const cameraViewRef = useRef("behind");
    const selectCameraView = (view) => {
        if (view !== "behind" && view !== "cockpit") return;
        cameraViewRef.current = view;
        setCameraView(view);
    };
    const [tourState, setTourState] = useState({ active: false, index: 0, total: 0, muted: false });
    // The lift-off countdown before the tour (#35): 3, 2, 1, 0 for "Lift off!", or null.
    const [countdown, setCountdown] = useState(null);
    // The planet the line-up by size (#62) was opened from, or null when it's closed.
    const [lineUpName, setLineUpName] = useState(null);
    // The Pale Blue Dot at the end of the tour (#47): null, "flying" or "looking".
    const [paleBlueDotPhase, setPaleBlueDotPhase] = useState(null);
    const [freeFlightOpen, setFreeFlightOpen] = useState(false);
    const [freeFlightView, setFreeFlightView] = useState(null);
    const [orbitOffer, setOrbitOffer] = useState(null);
    const [autopilotOrbit, setAutopilotOrbit] = useState(null);
    // An autopilot trip (Home, or arriving by autopilot) outside the flight HUD.
    const [tripMode, setTripMode] = useState(null);
    const tripModeRef = useRef(null);
    const tripFadeRef = useRef(null);
    // The galaxy map (#108): open or not, and which level it shows.
    const [mapLevel, setMapLevel] = useState(null);
    // Warp to Beyond (#113): nothing here is saved; reloading starts at home.
    const [beyondPickerOpen, setBeyondPickerOpen] = useState(false);
    const [beyondState, setBeyondState] = useState({ phase: "off", destinationId: null, progress: 0, calm: false, stage: null });
    const [joinedConstellations, setJoinedConstellations] = useState([]);
    // Cards and their optional 3D sky focus share the catalogue and browse index.
    const [constellationState, setConstellationState] = useState({ active: false, index: 0, muted: false });
    useEffect(() => {
        if (constellationState.active) {
            sceneApiRef.current?.showConstellationSky(constellations[constellationState.index].id);
        } else sceneApiRef.current?.closeConstellationSky();
    }, [constellationState.active, constellationState.index, sceneReady]);
    useEffect(() => {
        if (!constellationState.active) moreButtonRef.current?.focus();
    }, [constellationState.active]);
    // Serialisable mirror of searchable bodies; Object3D refs stay inside the effect.
    const [searchBodies, setSearchBodies] = useState([]);
    const [focusedId, setFocusedId] = useState(null);
    const [query, setQuery] = useState("");
    const [searchOpen, setSearchOpen] = useState(false);
    // Narrow screens keep the field collapsed behind its magnifier until tapped;
    // above 720px CSS keeps it permanently expanded and this is inert.
    const [searchExpanded, setSearchExpanded] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    // The "My view" drawer's toggles. viewSettingsRef is the copy the scene
    // effect reads, so Tweakpane, the drawer and Reset all agree.
    const [viewSettings, setViewSettings] = useState(loadViewSettings);
    const viewSettingsRef = useRef(viewSettings);
    const [debugLighting, setDebugLighting] = useState(null);
    const [settingsOpen, setSettingsOpen] = useState(false);
    // The drawer's Stop / Slow / Fast buttons (#4).
    const [speed, setSpeed] = useState(DEFAULT_SPEED);

    useEffect(() => {
        if (!containerRef.current || !canvasRef.current) return;
        const defaults = createSolarDefaults();
        let experiment = null;
        let resetting = false;
        let beyond = null; // Warp to Beyond (#113); built with the other modules below
        let disposed = false;
        let worldTime = createWorldTime();
        const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

        // ================================================================
        // Constants & Config
        // ================================================================
        const getAspect = () => containerRef.current.clientWidth / containerRef.current.clientHeight;
        const MAX_PIXEL_RATIO = Math.min(window.devicePixelRatio, 2);
        const debugFlags = readDebugFlags(window.location.search);
        // The scene can be asked for its quality while it is being swapped out
        // for another system, after the page has taken its container away.
        let lastWidth = containerRef.current.clientWidth;
        const currentQuality = () => detectQuality({
            width: (lastWidth = containerRef.current?.clientWidth ?? lastWidth),
            coarsePointer: window.matchMedia("(pointer: coarse)").matches,
            override: debugFlags.quality,
        });
        // New scene features are modules driven from animate() (see
        // docs/SOLAR_SYSTEM_IDEAS.md §11); the code above them predates this.
        const modules = createModuleHost();

        // ================================================================
        // Scene Setup
        // ================================================================
        const scene = new THREE.Scene();

        // ================================================================
        // Loaders & Textures
        // ================================================================
        const textureLoader = new THREE.TextureLoader();
        const cubeTextureLoader = new THREE.CubeTextureLoader().setPath("/static/cubeMap/");

        // Every picture comes from the system definition (systems/home.js).
        const textures = new Map();
        function loadTexture(path) {
            if (!textures.has(path)) {
                const texture = textureLoader.load(path);
                texture.colorSpace = THREE.SRGBColorSpace;
                textures.set(path, texture);
            }
            return textures.get(path);
        }
        const star = system.stars[0];
        const extras = system.extras;

        const glowSettings = { ...defaults.glow };

        // Pluto and the featured moons (see worldSurfaces.js).
        function surfaceMaterial(name) {
            const path = worldSurfacePath(name);
            if (!path) return null;
            const map = textureLoader.load(path);
            map.colorSpace = THREE.SRGBColorSpace;
            return new THREE.MeshStandardMaterial({ map });
        }

        const backgroundTexture = cubeTextureLoader.load([
            "px.png",
            "nx.png",
            "py.png",
            "ny.png",
            "pz.png",
            "nz.png",
        ]);
        scene.background = backgroundTexture;

        // ================================================================
        // Geometry & Materials
        // ================================================================
        const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

        const starTexture = star.look.texture ? loadTexture(star.look.texture) : null;
        const materials = {
            sun: new THREE.MeshStandardMaterial({
                ...(starTexture ? { map: starTexture, emissiveMap: starTexture } : { color: new THREE.Color(star.look.color) }),
                emissive: new THREE.Color(star.look.emissive),
                emissiveIntensity: star.look.emissiveIntensity,
                metalness: 0.0,
                roughness: 1.0,
            }),
            // Moons without their own map or colour.
            moon: new THREE.MeshStandardMaterial({ map: loadTexture("/static/2k_moon.jpg"), metalness: 0.0, roughness: 0.5 }),
        };

        function planetMaterial(look, id) {
            if (look.surface) return surfaceMaterial(look.surface);
            if (look.texture) return new THREE.MeshStandardMaterial({ map: loadTexture(look.texture), metalness: 0.0, roughness: 0.5 });
            return proceduralPlanetMaterial(id, look, { quality: currentQuality() });
        }

        // ================================================================
        // Planet Data
        // ================================================================
        const planetData = system.planets.map((planet) => ({ ...planet, material: planetMaterial(planet.look, planet.id) }));

        // ================================================================
        // Helpers
        // ================================================================
        function createMesh(geometry, material, scale, x = 0) {
            const mesh = new THREE.Mesh(geometry, material);
            mesh.scale.setScalar(scale);
            mesh.position.x = x;
            return mesh;
        }

        // "sky" is the constellations' quieter, see-through badge.
        function createLabel(text, fontSize = 64, color = "#ffffff", style = "planet") {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            const paddingX = 30;
            const paddingY = 18;

            context.font = `600 ${fontSize}px system-ui, sans-serif`;
            const textWidth = context.measureText(text).width;

            canvas.width = Math.ceil(textWidth + paddingX * 2);
            canvas.height = fontSize + paddingY * 2;

            // Reapply font after resizing the canvas
            context.font = `600 ${fontSize}px system-ui, sans-serif`;
            context.fillStyle = style === "sky" ? "rgba(5, 10, 24, 0.38)" : "rgba(5, 10, 24, 0.72)";
            context.beginPath();
            context.roundRect(1, 1, canvas.width - 2, canvas.height - 2, canvas.height / 2);
            context.fill();
            context.strokeStyle = style === "sky" ? "rgba(144, 201, 255, 0.4)" : "rgba(255, 255, 255, 0.22)";
            context.lineWidth = 2;
            context.stroke();
            context.fillStyle = color;
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillText(text, canvas.width / 2, canvas.height / 2);

            const texture = new THREE.CanvasTexture(canvas);
            texture.minFilter = THREE.LinearFilter;

            const material = new THREE.SpriteMaterial({
                map: texture,
                transparent: true,
                depthTest: false,
                depthWrite: false,
            });
            const sprite = new THREE.Sprite(material);
            sprite.renderOrder = 20;
            sprite.userData.isLabel = true;

            const aspect = canvas.width / canvas.height;
            sprite.userData.aspect = aspect;
            sprite.scale.set(1.75 * aspect, 1.75, 1);

            return sprite;
        }

        function createSaturnRings(radius) {
            const ringGroup = new THREE.Group();
            const bands = SATURN_RING_BANDS;

            bands.forEach(([inner, outer, color, opacity]) => {
                const geometry = new THREE.RingGeometry(radius * inner, radius * outer, 192);
                const material = new THREE.MeshStandardMaterial({
                    color,
                    emissive: new THREE.Color(color),
                    emissiveIntensity: 0.12,
                    side: THREE.DoubleSide,
                    transparent: true,
                    opacity,
                    roughness: 0.85,
                    metalness: 0,
                    depthWrite: false,
                });
                const band = new THREE.Mesh(geometry, material);
                band.userData.isRing = true;
                band.receiveShadow = true;
                ringGroup.add(band);
            });

            ringGroup.rotation.x = Math.PI / 2;
            ringGroup.userData.isRing = true;
            return ringGroup;
        }

        const createPlanetSystem = (planet) => {
            const root = new THREE.Group();
            root.position.x = planet.distance;

            const axialGroup = new THREE.Group();
            axialGroup.rotation.z = THREE.MathUtils.degToRad(planet.tilt || 0);
            root.add(axialGroup);

            const body = new THREE.Mesh(sphereGeometry, planet.material);
            body.scale.setScalar(planet.radius);
            body.castShadow = true;
            body.receiveShadow = true;
            body.userData.isPlanetBody = true;
            axialGroup.add(body);

            const planetLabel = createLabel(planet.name, 64, "#ffffff");
            planetLabel.userData.bodyRadius = planet.radius;
            planetLabel.userData.owner = root;
            planetLabel.userData.planetSystem = root;

            if (planet.hasRings) {
                axialGroup.add(createSaturnRings(planet.radius));
            }

            // Moons keep one face to their planet unless marked `spins`, and
            // circle in its equator unless marked `ecliptic` (see getBodyPose).
            const moons = planet.moons.map((moon, moonIndex) => {
                const moonMaterial = surfaceMaterial(moon.name)
                    ?? (moon.color ? new THREE.MeshStandardMaterial({ color: moon.color }) : materials.moon);
                const moonMesh = new THREE.Mesh(irregularMoonGeometry(moon.name) ?? sphereGeometry, moonMaterial);
                moonMesh.rotation.order = "ZYX";
                moonMesh.scale.setScalar(moon.radius);
                moonMesh.position.x = moon.distance;
                moonMesh.castShadow = true;
                moonMesh.receiveShadow = true;

                const moonLabel = createLabel(moon.name, 48, "#cccccc");
                moonLabel.userData.bodyRadius = moon.radius;
                moonLabel.userData.owner = moonMesh;
                moonLabel.userData.isMoonLabel = true;
                moonLabel.userData.planetSystem = root;
                root.add(moonMesh);
                const phase = planet.moons.length > 0
                    ? (moonIndex / planet.moons.length) * Math.PI * 2
                    : 0;
                return { mesh: moonMesh, label: moonLabel, data: { ...moon, tidallyLocked: !moon.spins }, phase };
            });

            root.userData = { body, axialGroup, planet, planetLabel, moons };
            return root;
        };

        function createOrbitPath(planet, segments = 256, color = 0x888888) {
            const points = orbitPathPoints(planet.distance, planet.orbit, segments)
                .map(({ x, y, z }) => new THREE.Vector3(x, y, z));
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.3 });
            const orbit = new THREE.LineLoop(geometry, material);
            orbit.userData.isOrbit = true;
            return orbit;
        }

        // ================================================================
        // Asteroid Belt
        // ================================================================
        const beltSettings = { ...defaults.belt, ...(extras.asteroidBelt ? {} : NO_BELT) };

        let asteroidBelt = null; // { mesh, angles, radii, speeds, inc, eccPhase, dummy }

        function createAsteroidBelt() {
            const o = { ...beltSettings };

            if (asteroidBelt?.mesh) {
                scene.remove(asteroidBelt.mesh);
                asteroidBelt.mesh.geometry?.dispose();
                asteroidBelt.mesh.material?.dispose();
                asteroidBelt = null;
            }

            const geo = new THREE.IcosahedronGeometry(1, 0);
            const mat = new THREE.MeshStandardMaterial({ color: 0x9a9a9a, metalness: 0.0, roughness: 0.9 });

            const mesh = new THREE.InstancedMesh(geo, mat, o.count);
            mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
            mesh.castShadow = false;
            mesh.receiveShadow = false;
            mesh.name = "AsteroidBelt";

            const angles = new Float32Array(o.count);
            const radii = new Float32Array(o.count);
            const speeds = new Float32Array(o.count);
            const scales = new Float32Array(o.count);
            const inc = new Float32Array(o.count);
            const eccPhase = new Float32Array(o.count);
            const dummy = new THREE.Object3D();

            for (let i = 0; i < o.count; i++) {
                const t = Math.random();
                const curved = 0.5 + 0.5 * Math.sin((t - 0.5) * Math.PI);
                const r = THREE.MathUtils.lerp(o.innerRadius, o.outerRadius, curved);

                const angle = Math.random() * Math.PI * 2;
                const speed = THREE.MathUtils.lerp(o.minSpeed, o.maxSpeed, Math.random());
                const size = THREE.MathUtils.lerp(o.minSize, o.maxSize, Math.random());
                const incRad = THREE.MathUtils.degToRad((Math.random() * 2 - 1) * o.maxInclinationDeg);
                const phase = Math.random() * Math.PI * 2;

                angles[i] = angle;
                radii[i] = r;
                speeds[i] = speed;
                scales[i] = size;
                inc[i] = incRad;
                eccPhase[i] = phase;

                const x = Math.cos(angle) * r;
                let z = Math.sin(angle) * r;
                const y = Math.sin(incRad) * z;
                z = Math.cos(incRad) * z;

                dummy.position.set(x, y, z);
                dummy.scale.setScalar(size);
                dummy.rotation.y = angle;
                dummy.updateMatrix();
                mesh.setMatrixAt(i, dummy.matrix);
            }

            scene.add(mesh);
            asteroidBelt = { mesh, angles, baseAngles: angles.slice(), radii, speeds, scales, inc, eccPhase, dummy, settings: o };
        }

        function updateAsteroidBelt(orbitTime, elapsed) {
            // animate() decides whether the belt shows; a hidden belt needn't move.
            if (!asteroidBelt?.mesh.visible) return;
            const { mesh, angles, baseAngles, radii, speeds, scales, inc, eccPhase, dummy, settings } = asteroidBelt;
            const count = angles.length;

            for (let i = 0; i < count; i++) {
                angles[i] = baseAngles[i] + speeds[i] * orbitTime;
                const rBase = radii[i];
                const r = rBase * (1 + settings.eccentricity * Math.sin(eccPhase[i] + elapsed * 0.2));

                const ca = Math.cos(angles[i]);
                const sa = Math.sin(angles[i]);
                let x = ca * r;
                let z = sa * r;
                const y = Math.sin(inc[i]) * z;
                z = Math.cos(inc[i]) * z;

                dummy.position.set(x, y, z);
                dummy.scale.setScalar(scales[i]);
                dummy.rotation.y = angles[i];
                dummy.updateMatrix();
                mesh.setMatrixAt(i, dummy.matrix);
            }
            mesh.instanceMatrix.needsUpdate = true;
        }

        // ================================================================
        // Scene Objects
        // ================================================================
        const sun = createMesh(sphereGeometry, materials.sun, star.radius);
        scene.add(sun);

        const planetSystems = planetData.map((planet) => {
            const system = createPlanetSystem(planet);
            scene.add(system);
            scene.add(system.userData.planetLabel);
            system.userData.moons.forEach(({ label }) => scene.add(label));
            return system;
        });
        const planetBodies = planetSystems.map((system) => system.userData.body);
        planetBodies.forEach((body, planetIndex) => { body.userData.planetIndex = planetIndex; });
        const labelSprites = planetSystems.flatMap((system, planetIndex) => {
            const labels = [system.userData.planetLabel, ...system.userData.moons.map(({ label }) => label)];
            labels.forEach((label) => { label.userData.planetIndex = planetIndex; });
            return labels;
        });

        // Flat index of every body the search box can jump to: each planet root
        // plus each moon mesh, keyed by a namespaced id so moon names can repeat.
        const searchEntries = planetSystems.flatMap((system, planetIndex) => {
            const planet = planetData[planetIndex];
            return [
                {
                    id: planet.id,
                    name: planet.name,
                    kind: "planet",
                    kindLabel: planet.kindLabel,
                    parentName: null,
                    object3d: system,
                    radius: planet.radius,
                    planetSystem: system,
                    planetIndex,
                    moon: null,
                },
                ...system.userData.moons.map(({ mesh, data }) => ({
                    id: `${planet.id}/${data.name}`,
                    name: data.name,
                    kind: "moon",
                    kindLabel: `Moon · ${planet.name}`,
                    parentName: planet.name,
                    object3d: mesh,
                    radius: data.radius,
                    planetSystem: system,
                    planetIndex,
                    moon: data,
                })),
            ];
        });
        const comet = extras.comet ? modules.add("halleyComet", createHalleyComet({
            scene, getCamera: () => camera, getOrbitTime: () => worldTime.orbitTime,
            getQuality: currentQuality,
            isHidden: () => lineUp.isActive() || paleBlueDot.hidesScenery() || constellationSky.isActive(),
        })) : NO_COMET;
        if (extras.comet) searchEntries.push({ id: COMET_ID, name: COMET_NAME, kind: "comet", kindLabel: "Comet · illustrative orbit",
            parentName: null, object3d: comet.object3d, radius: 1.2, planetSystem: null });
        // Real asteroids for the asteroid-belt run (#84), labelled like planets.
        const namedAsteroids = extras.namedAsteroids ? modules.add("namedAsteroids", createNamedAsteroids({
            scene, getOrbitTime: () => worldTime.orbitTime, quality: currentQuality(),
            makeLabel: (name) => createLabel(name, 56, "#efe6d6"),
            isHidden: () => lineUp.isActive() || paleBlueDot.hidesScenery() || constellationSky.isActive(),
        })) : null;
        if (namedAsteroids) { searchEntries.push(...namedAsteroids.entries); labelSprites.push(...namedAsteroids.labels); }
        // A star with a card can be visited and toured like a planet.
        if (star.card) searchEntries.push({ id: star.id, name: star.name, kind: "star", kindLabel: "Star", parentName: null,
            object3d: sun, radius: star.radius, planetSystem: null, star });
        const searchEntriesById = new Map(searchEntries.map((entry) => [entry.id, entry]));
        // A home extra's body (Earth for the meteor, Saturn for its ring detail…).
        const extraEntry = (key) => searchEntriesById.get(extras[key].body);
        const tourStops = system.tour.stops.map((id) => searchEntriesById.get(id)).filter(Boolean);

        const orbitPaths = planetData.map((planet) => {
            let color = 0x888888;
            if (planet.material && planet.material.color) color = planet.material.color.getHex();
            const orbit = createOrbitPath(planet, 256, color);
            orbit.material.opacity = THREE.MathUtils.clamp(1 - planet.distance / 1000, 0.18, 0.6);
            scene.add(orbit);
            return orbit;
        });

        createAsteroidBelt();
        const initialBelt = {
            baseAngles: asteroidBelt.baseAngles.slice(), radii: asteroidBelt.radii.slice(),
            speeds: asteroidBelt.speeds.slice(), scales: asteroidBelt.scales.slice(),
            inc: asteroidBelt.inc.slice(), eccPhase: asteroidBelt.eccPhase.slice(),
            matrices: asteroidBelt.mesh.instanceMatrix.array.slice(),
        };

        // ================================================================
        // Subtle, physical-looking corona anchored at the Sun
        // ================================================================
        let sunGlowSprite;
        function makeSunGlowTexture(size = 512) {
            const c = document.createElement("canvas");
            c.width = c.height = size;
            const ctx = c.getContext("2d");
            const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
            g.addColorStop(0.0, "rgba(255, 248, 215, 0.08)");
            g.addColorStop(0.54, "rgba(255, 220, 145, 0.12)");
            g.addColorStop(0.64, "rgba(255, 185, 80, 0.34)");
            g.addColorStop(0.78, "rgba(255, 145, 45, 0.12)");
            g.addColorStop(1.0, "rgba(255, 105, 25, 0)");
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, size, size);
            const tex = new THREE.CanvasTexture(c);
            tex.colorSpace = THREE.SRGBColorSpace;
            tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
            tex.minFilter = THREE.LinearMipMapLinearFilter;
            tex.magFilter = THREE.LinearFilter;
            return tex;
        }

        {
            const glowMaterial = new THREE.SpriteMaterial({
                map: makeSunGlowTexture(),
                color: 0xffffff,
                transparent: true,
                depthWrite: false,
                blending: THREE.AdditiveBlending,
                opacity: glowSettings.intensity,
            });

            sunGlowSprite = new THREE.Sprite(glowMaterial);
            sunGlowSprite.scale.setScalar(glowSettings.size);
            sunGlowSprite.userData.isSunGlow = true;
            scene.add(sunGlowSprite);
        }

        function updateSunGlow() {
            if (!sunGlowSprite) return;
            sunGlowSprite.visible = glowSettings.enabled;
            sunGlowSprite.material.opacity = glowSettings.intensity;
            sunGlowSprite.scale.setScalar(glowSettings.size);
        }

        // ================================================================
        // Background Stars
        // ================================================================
        let stars = null;
        const starSettings = { ...defaults.stars };

        function createStars() {
            if (stars) {
                scene.remove(stars);
                stars.geometry.dispose();
                stars.material.dispose();
            }
            const geometry = new THREE.BufferGeometry();
            const positions = [];
            const starCount = starSettings.count;
            const radius = 3000;
            for (let i = 0; i < starCount; i++) {
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(Math.random() * 2 - 1);
                const r = radius * Math.cbrt(Math.random());
                const x = r * Math.sin(phi) * Math.cos(theta);
                const y = r * Math.sin(phi) * Math.sin(theta);
                const z = r * Math.cos(phi);
                positions.push(x, y, z);
            }
            geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
            const material = new THREE.PointsMaterial({
                color: 0xffffff,
                size: starSettings.size,
                sizeAttenuation: true,
                depthWrite: false,
                transparent: true,
                opacity: 0.8,
            });
            stars = new THREE.Points(geometry, material);
            scene.add(stars);
        }
        createStars();
        const initialStarPositions = stars.geometry.attributes.position.array.slice();

        // ================================================================
        // Lights
        // ================================================================
        const ambientLight = new THREE.AmbientLight(0xffffff, defaults.lighting.ambient);
        scene.add(ambientLight);
        const sunLight = new THREE.PointLight(star.light.color, star.light.intensity, 0, 2);
        sunLight.position.set(0, 0, 0);
        sunLight.castShadow = true;
        sunLight.shadow.mapSize.set(2048, 2048);
        sunLight.shadow.bias = -0.0005;
        sunLight.shadow.camera.far = 4000;
        scene.add(sunLight);

        // ================================================================
        // Camera & Renderer
        // ================================================================
        const camera = new THREE.PerspectiveCamera(50, getAspect(), 0.1, 5000);
        camera.position.fromArray(system.scene.camera.position);
        scene.add(camera);

        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
        const maxAniso = renderer.capabilities.getMaxAnisotropy?.() ?? 0;
        if (maxAniso > 0 && starTexture) starTexture.anisotropy = maxAniso;
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        renderer.setPixelRatio(MAX_PIXEL_RATIO);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.0;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.physicallyCorrectLights = true;

        // Bloom is a Phase 0 test (idea #5): off unless `?bloom=1`. With it on,
        // the Sun is pushed above white so only it glows.
        const pipeline = createRenderPipeline({ renderer, scene, camera, getQuality: currentQuality });
        const sunEmissive = materials.sun.emissiveIntensity;
        const bloomSettings = { enabled: debugFlags.bloom, sunBrightness: 2.5 };
        const applyBloom = () => {
            pipeline.setBloom(bloomSettings.enabled);
            materials.sun.emissiveIntensity = bloomSettings.enabled ? bloomSettings.sunBrightness : sunEmissive;
        };
        applyBloom();
        setDebugLighting(debugFlags.debug ? { bloom: bloomSettings.enabled } : null);

        // ================================================================
        // Controls with Smooth Zoom to Mouse
        // ================================================================
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.075;
        controls.enablePan = true;
        controls.enableZoom = true; // retained for touch pinch gestures
        controls.zoomToCursor = true;
        controls.screenSpacePanning = true;
        controls.rotateSpeed = 0.65;
        controls.zoomSpeed = 0.8;
        controls.minDistance = 1.5;
        controls.maxDistance = 3000;

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        const zoomPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
        const zoomFocus = new THREE.Vector3();
        const desiredCameraPosition = camera.position.clone();
        const desiredControlsTarget = controls.target.clone();
        let zoomAnimating = false;

        function updateZoomPlane() {
            const cameraDirection = new THREE.Vector3();
            camera.getWorldDirection(cameraDirection);
            zoomPlane.setFromNormalAndCoplanarPoint(cameraDirection.negate(), controls.target);
        }

        function filterZoomTargets(intersects) {
            return intersects.filter((hit) => {
                const obj = hit.object;
                for (let owner = obj; owner; owner = owner.parent) {
                    if (owner.userData.isMeteorEffect) return false;
                }
                return (
                    obj.type === "Mesh" &&
                    !obj.userData.isOrbit &&
                    !obj.userData.isRing &&
                    !obj.userData.isSunGlow
                );
            });
        }

        // ================================================================
        // Simulation Settings & Tweakpane
        // ================================================================
        const simulation = { ...defaults.simulation, ...viewSettingsRef.current };
        const syncViewSetting = (key, value) => {
            if (viewSettingsRef.current[key] === value) return;
            viewSettingsRef.current = { ...viewSettingsRef.current, [key]: value };
            saveViewSettings(viewSettingsRef.current);
            setViewSettings(viewSettingsRef.current);
        };
        // The Milky Way sky (#9) swaps the cube map and the star dots.
        const sky = modules.add("sky", createSolarSky({
            scene, cubeTexture: backgroundTexture, getStars: () => stars, quality: currentQuality(), loader: textureLoader,
        }));

        // ⏸ in the drawer: orbits and spins both stop.
        let paused = false;
        function applySpeed(key) {
            const preset = SPEED_PRESETS.find((candidate) => candidate.key === key);
            if (!preset) return;
            paused = key === "pause";
            simulation.orbitSpeedMultiplier = preset.orbit;
            setSpeed(key);
        }

        const pane = new Pane({
            container: containerRef.current,
            title: "Fine tuning",
            expanded: false,
        });

        pane.element.classList.add("solar-tuning");
        pane.element.style.maxHeight = "calc(100% - 2rem)";
        pane.element.style.overflowY = "auto";
        pane.element.style.position = "absolute";
        pane.element.style.top = "1rem";
        pane.element.style.right = "1rem";
        pane.element.style.zIndex = "100";

        // Narrow screens share the pane's row with the four launch buttons, so the pane
        // gives up the space those buttons need. Set here rather than in CSS
        // because Tweakpane's own injected width rule would otherwise win.
        const wideQuery = window.matchMedia("(min-width: 720px)");
        const applyPaneWidth = () => {
            pane.element.style.width = wideQuery.matches
                ? "min(220px, calc(100% - 2rem))"
                : "min(232px, calc(100% - 14rem))";
        };
        applyPaneWidth();
        wideQuery.addEventListener("change", applyPaneWidth);

        const simulationFolder = pane.addFolder({ title: "Simulation", expanded: false });
        simulationFolder.addBinding(simulation, "rotationSpeedMultiplier", { label: "Rotation Speed", min: 1, max: 100, step: 0.1 });

        const lightingFolder = pane.addFolder({ title: "Lighting", expanded: false });
        lightingFolder.addBinding(sunLight, "intensity", { min: 20, max: 400, step: 1, label: "Sun Intensity" });
        lightingFolder.addBinding(ambientLight, "intensity", { min: 0, max: 0.8, step: 0.01, label: "Ambient" });

        const starsFolder = pane.addFolder({ title: "Background Stars", expanded: false });
        starsFolder
            .addBinding(starSettings, "count", { label: "Star Count", min: 0, max: 10000, step: 100 })
            .on("change", () => createStars());
        const backgroundSettings = { ...defaults.background };
        const applyMyView = () => applySceneSettings({
            settings: viewSettingsRef.current, simulation, glowSettings, beltSettings,
            backgroundSettings, sky, asteroidBelt,
        });
        applyMyView();

        if (debugFlags.debug) {
            const bloomFolder = pane.addFolder({ title: "Bloom (test)", expanded: false });
            bloomFolder.addBinding(pipeline.settings, "strength", { label: "Strength", min: 0, max: 3, step: 0.05 });
            bloomFolder.addBinding(pipeline.settings, "radius", { label: "Radius", min: 0, max: 1, step: 0.01 });
            bloomFolder.addBinding(pipeline.settings, "threshold", { label: "Threshold", min: 0, max: 2, step: 0.01 });
            bloomFolder.addBinding(bloomSettings, "sunBrightness", { label: "Sun brightness", min: 0.6, max: 6, step: 0.1 }).on("change", applyBloom);
        }

        const glowFolder = pane.addFolder({ title: "Sun Glow", expanded: false });
        glowFolder.addBinding(glowSettings, "intensity", { label: "Intensity", min: 0, max: 0.8, step: 0.01 });
        glowFolder.addBinding(glowSettings, "size", { label: "Size", min: 12, max: 24, step: 0.5 });

        // ================================================================
        // Event Listeners (click-to-follow + zoom-to-mouse)
        // ================================================================
        const clickRaycaster = new THREE.Raycaster();
        const clickMouse = new THREE.Vector2();

        let followActive = false;
        let followSystem = null; // planet root owning the focused body; scopes moon labels
        let followTarget = null; // the object the camera actually tracks
        let followRadius = 1;
        let forceMoonLabels = false; // on while a moon is followed, without touching the user's toggle
        let followDesiredDistance = 50;
        const previousFollowPosition = new THREE.Vector3();
        let tourActive = false;
        let tourIndex = 0;
        let tourMuted = false;

        let followBlendT = 0;
        const followBlendDuration = 1.1;
        const followBlendCamStart = new THREE.Vector3();
        const followBlendTargetStart = new THREE.Vector3();
        const followOffset = new THREE.Vector3();

        function leavePlanetOrbit() {
            if (!ship.isOrbiting()) return;
            ship.leaveOrbit(); pane.hidden = false;
            if (followTarget) {
                followTarget.getWorldPosition(previousFollowPosition);
                followOffset.subVectors(camera.position, previousFollowPosition);
                followDesiredDistance = followOffset.length(); followBlendT = 0;
                followBlendCamStart.copy(camera.position); followBlendTargetStart.copy(controls.target);
            }
        }

        function stopFollowing() {
            if (ship?.isOrbiting()) pane.hidden = false;
            ship?.cancel();
            setOrbitOffer(null);
            followActive = false;
            followSystem = null;
            followTarget = null;
            forceMoonLabels = false;
            setFocusedId(null);
            zoomAnimating = false;
            desiredCameraPosition.copy(camera.position);
            desiredControlsTarget.copy(controls.target);
        }

        function speakPlanet(planet, intro = "") {
            if (tourMuted) return;
            speak(`${intro}${planet.spokenName ?? planet.name}. ${planet.tourNarration}`);
        }

        function stopTour(hideCard = false) {
            leavePlanetOrbit(); liftOff.cancel();
            tourActive = false;
            stopNarration();
            setTourState((current) => ({ ...current, active: false }));
            if (hideCard) setSelectedPlanet(null);
        }

        function resetView() {
            warpIn?.skip();
            if (experiment?.isActive()) {
                resetSolarSystem();
                return;
            }
            stopFollowing();
            stopTour(true);
            followBlendT = 0;
            desiredCameraPosition.fromArray(system.scene.camera.position);
            desiredControlsTarget.fromArray(system.scene.camera.target);
            zoomAnimating = true;
        }

        function clearControlDamping() {
            const position = camera.position.clone();
            const target = controls.target.clone();
            const damping = controls.enableDamping;
            controls.enableDamping = false;
            controls.update();
            camera.position.copy(position);
            controls.target.copy(target);
            controls.update();
            controls.enableDamping = damping;
        }

        function resetSolarSystem() {
            if (disposed || resetting) return;
            beyond?.exitNow();
            setBeyondPickerOpen(false);
            selectCameraView("behind");
            closeLineUp();
            endPaleBlueDot({ home: false });
            warpIn?.skip();
            resetting = true;
            stopNarration();
            stopTour(true);
            stopFollowing();
            followBlendT = 0;
            zoomAnimating = false;
            experiment?.reset();
            bounces.settle();
            // Reset puts the world back, but keeps the child's "My view" choices.
            Object.assign(simulation, defaults.simulation, viewSettingsRef.current);
            applySpeed(DEFAULT_SPEED);
            Object.assign(glowSettings, defaults.glow);
            Object.assign(starSettings, defaults.stars);
            Object.assign(beltSettings, defaults.belt, extras.asteroidBelt ? {} : NO_BELT);
            Object.assign(backgroundSettings, defaults.background);
            sunLight.intensity = star.light.intensity;
            ambientLight.intensity = defaults.lighting.ambient;
            applyMyView();
            if (stars.geometry.attributes.position.count !== initialStarPositions.length / 3) createStars();
            stars.geometry.attributes.position.array.set(initialStarPositions);
            stars.geometry.attributes.position.needsUpdate = true;
            stars.material.size = starSettings.size;
            if (asteroidBelt.mesh.count !== initialBelt.baseAngles.length) createAsteroidBelt();
            for (const key of ["baseAngles", "radii", "speeds", "scales", "inc", "eccPhase"]) asteroidBelt[key].set(initialBelt[key]);
            asteroidBelt.angles.set(initialBelt.baseAngles);
            asteroidBelt.mesh.instanceMatrix.array.set(initialBelt.matrices);
            asteroidBelt.mesh.instanceMatrix.needsUpdate = true;
            asteroidBelt.mesh.visible = beltSettings.enabled;
            asteroidBelt.settings = { ...beltSettings };
            worldTime = createWorldTime();
            applyWorldPoses();
            camera.position.fromArray(system.scene.camera.position);
            camera.up.set(0, 1, 0);
            camera.fov = defaults.camera.fov;
            camera.near = defaults.camera.near;
            camera.far = defaults.camera.far;
            camera.zoom = 1;
            camera.updateProjectionMatrix();
            controls.target.fromArray(system.scene.camera.target);
            clearControlDamping();
            controls.enabled = true;
            controls.enableDamping = true;
            controls.dampingFactor = 0.075;
            desiredCameraPosition.copy(camera.position);
            desiredControlsTarget.copy(controls.target);
            previousFollowPosition.copy(controls.target);
            parkShipAtStart();
            tourMuted = false;
            setTourState({ active: false, index: 0, total: 0, muted: false });
            pane.hidden = false;
            pane.disabled = false;
            pane.expanded = false;
            pane.refresh();
            updateSunGlow();
            orbitPaths.forEach((orbit) => { orbit.visible = true; });
            labelSprites.forEach((label) => { label.visible = !label.userData.isMoonLabel; });
            setSelectedPlanet(null);
            setFocusedId(null);
            setQuery("");
            setSearchOpen(false);
            setSearchExpanded(false);
            setActiveIndex(0);
            setMeteorPhase("ready");
            setMeteorError("");
            prevTime = performance.now() / 1000;
            resetting = false;
            focusRequestRef.current = "launch";
        }

        function launchExperiment() {
            if (disposed || resetting || experiment?.isActive() || !extras.meteor) return false;
            warpIn?.skip();
            // The meteor needs Earth at its exact size.
            bounces.settle();
            try {
                if (!experiment) experiment = createMeteorExperiment({
                    scene, camera, earthBody: extraEntry("meteor").planetSystem.userData.body,
                    earthTexture: planetData.find((planet) => planet.id === extras.meteor.body).material.map,
                    quality: currentQuality(),
                    onPhaseChange: (phase) => { if (!disposed) setMeteorPhase(phase); },
                });
                experiment.resize({ width: containerRef.current.clientWidth, height: containerRef.current.clientHeight, reservedBottomPx: 24 });
                stopTour(true);
                stopFollowing();
                followBlendT = 0;
                zoomAnimating = false;
                setQuery("");
                setSearchOpen(false);
                setSearchExpanded(false);
                setSelectedPlanet(null);
                searchInputRef.current?.blur();
                clearControlDamping();
                controls.enabled = false;
                scene.updateMatrixWorld(true);
                if (!experiment.launch({ reducedMotion: reducedQuery.matches, cameraTarget: controls.target.clone() })) return false;
                pane.hidden = true;
                pane.disabled = true;
                setMeteorError("");
                focusRequestRef.current = "reset";
                return true;
            } catch (error) {
                console.error("Meteor experiment could not launch", error);
                resetSolarSystem();
                experiment?.dispose();
                experiment = null;
                setMeteorError("That meteor did not launch. Try again.");
                return false;
            }
        }

        const createPlanetInfo = (planet, planetIndex) => buildPlanetInfo(system, planet, planetIndex);
        const createMoonInfo = (entry) => buildMoonInfo(system, planetData[entry.planetIndex], entry.moon);

        function createFocusInfo(entry) {
            if (entry.kind === "comet") return {
                kind: "comet", name: COMET_NAME, classification: "Comet",
                moonSummary: "Illustrative orbit", narration: COMET_LINE,
                facts: ["The blue ion tail points away from the Sun.", "The wider dust tail curves as sunlight pushes dust away.", "Halley's real trip around the Sun takes about 76 years."],
                factsHeading: "Two tails to spot", summary: COMET_LINE,
            };
            if (entry.kind === "star") return buildStarInfo(system, entry.star);
            if (entry.kind === "asteroid") return asteroidInfo(entry.asteroid);
            return entry.kind === "moon"
                ? createMoonInfo(entry)
                : createPlanetInfo(planetData[entry.planetIndex], entry.planetIndex);
        }

        // How far the camera frames a planet or moon from.
        function framingDistanceFor(entry) {
            // Moons are tiny, so frame them tighter — but stay clear of minDistance.
            if (entry.kind === "comet") return 32;
            if (entry.kind === "asteroid") return Math.max(entry.radius * 8, 3);
            return entry.kind === "moon"
                ? Math.max(entry.radius * 8, 1.8)
                : Math.max(entry.radius * 6, 4);
        }

        function focusEntry(entry, fromTour = false, { card = true } = {}) {
            if (!entry || experiment?.isActive() || resetting) return;
            leavePlanetOrbit(); setOrbitOffer(null);
            closeLineUp();
            endPaleBlueDot({ home: false });
            warpIn?.skip();
            if (!fromTour) liftOff.cancel();
            if (!fromTour && tourActive) stopTour();
            // Regions are broad areas: show their card from the current view.
            if (entry.kind === "region") {
                stopFollowing();
                setSelectedPlanet(card ? entry : null);
                setFocusedId(entry.id);
                return;
            }
            const isMoon = entry.kind === "moon";
            followActive = true;
            followSystem = entry.planetSystem;
            followTarget = entry.object3d;
            followRadius = entry.radius;
            forceMoonLabels = isMoon;
            zoomAnimating = false;
            followBlendT = 0;
            followBlendCamStart.copy(camera.position);
            followBlendTargetStart.copy(controls.target);
            const targetPos = new THREE.Vector3();
            entry.object3d.getWorldPosition(targetPos);
            followDesiredDistance = framingDistanceFor(entry);
            followOffset.subVectors(camera.position, targetPos);
            if (followOffset.lengthSq() < 0.001) {
                followOffset.set(0, entry.radius * 2, entry.radius * 6);
            }
            followOffset.setLength(followDesiredDistance);
            previousFollowPosition.copy(targetPos);
            // The ship flies there and the follow camera takes over when it lands.
            // Under reduced motion it just appears there, and the camera glides as before.
            const calm = reducedQuery.matches;
            const info = card ? createFocusInfo(entry) : null;
            const arrive = () => {
                setOrbitOffer(entry.kind === "planet" || entry.kind === "moon" ? { id: entry.id, name: entry.name } : null);
                setSelectedPlanet(info);
                if (!fromTour && info) setMissionArrival(info);
            };
            if (calm) ship.park(entry.object3d, { radius: entry.radius, framingDistance: () => followDesiredDistance, from: camera.position });
            if (!calm && ship.flyTo(entry.object3d, {
                radius: entry.radius,
                framingDistance: () => followDesiredDistance,
                onArrive: () => {
                    followBlendT = 1;
                    entry.object3d.getWorldPosition(previousFollowPosition);
                    arrive();
                },
            })) {
                followBlendT = 1;
                // On a phone the card covers the middle of the screen, where the
                // ship flies, so it opens on landing. The tour's card stays: it
                // holds the tour's buttons.
                setSelectedPlanet(fromTour ? info : null);
            } else {
                // Already there, or reduced motion: glide round to where the ship sees the planet from.
                ship.framingDirection(followOffset).setLength(followDesiredDistance);
                arrive();
            }
            setFocusedId(entry.id);
        }

        function flyToPlanet(planetSystem, fromTour = false) {
            if (!planetSystem) return;
            focusEntry(searchEntriesById.get(planetSystem.userData.planet.id), fromTour);
        }

        // At home the tour starts with a lift-off from Earth (#35), unless motion is reduced.
        function startTour() {
            if (experiment?.isActive() || resetting) return;
            if (tourActive || reducedQuery.matches || !extras.liftOff) {
                visitTourPlanet(0);
                return;
            }
            const earth = extraEntry("liftOff");
            if (!ship.isBeside(earth.object3d)) {
                ship.park(earth.object3d, { radius: earth.radius, framingDistance: framingDistanceFor(earth) });
            }
            pane.expanded = false;
            focusEntry(earth, true, { card: false });
            liftOff.start();
        }

        function visitTourPlanet(nextIndex, intro = "") {
            if (experiment?.isActive() || resetting) return;
            if (!tourActive) pane.expanded = false;
            const clampedIndex = THREE.MathUtils.clamp(nextIndex, 0, tourStops.length - 1);
            tourActive = true;
            tourIndex = clampedIndex;
            setTourState({
                active: true,
                index: clampedIndex,
                total: tourStops.length,
                muted: tourMuted,
                finish: system.tour.finish,
                finishLabel: system.tour.finishLabel,
            });
            focusEntry(tourStops[clampedIndex], true);
            speakPlanet(tourStopData(clampedIndex), intro);
        }

        // The definition's tour stops are bodies; narration lives on their data.
        function tourStopData(index) {
            const stop = tourStops[index];
            return stop.kind === "star" ? { name: stop.star.name, spokenName: stop.star.spokenName, tourNarration: stop.star.card.tourNarration } : planetData[stop.planetIndex];
        }

        // After the last stop: Pale Blue Dot at home, otherwise the tour ends.
        function finishTour() {
            if (system.tour.finish === "pale-blue-dot" && extras.paleBlueDot) startPaleBlueDot();
            else stopTour(true);
        }

        function toggleTourNarration() {
            tourMuted = !tourMuted;
            setTourState((current) => ({ ...current, muted: tourMuted }));
            if (tourMuted) stopNarration();
            else if (tourActive) speakPlanet(tourStopData(tourIndex));
        }

        const phaseEarth = new THREE.Vector3();
        const phaseMoon = new THREE.Vector3();
        sceneApiRef.current = {
            getMoonPhase: () => {
                if (!extras.moonPhases) return null;
                const earth = extraEntry("moonPhases").planetSystem;
                earth.getWorldPosition(phaseEarth);
                earth.userData.moons[0].mesh.getWorldPosition(phaseMoon);
                return moonPhase(phaseEarth, phaseMoon);
            },
            showConstellationSky: (id) => {
                if (!constellationSky.isActive()) {
                    warpIn?.skip(); stopFollowing(); zoomAnimating = false;
                    clearControlDamping(); controls.enabled = false; pane.hidden = true;
                }
                constellationSky.enter(id);
            },
            closeConstellationSky: () => {
                if (!constellationSky.isActive()) return;
                constellationSky.exit(); controls.enabled = true; pane.hidden = false;
                sky.apply({ milkyWay: simulation.milkyWay, skyVisible: backgroundSettings.enabled });
            },
            setConstellationTrace: (count) => constellationSky.setTrace(count),
            projectConstellationStar: (id) => constellationSky.projectStar(id),
            get freeFlight() { return freeFlight; },
            startFreeFlight: () => {
                warpIn?.skip(); stopFollowing(); stopTour(true); zoomAnimating = false;
                clearControlDamping(); pane.hidden = true; ship.setHidden(true); freeFlight.enter();
            },
            stopFreeFlight: () => {
                freeFlight.exit(); ship.setHidden(false); pane.hidden = false;
                desiredCameraPosition.copy(camera.position); desiredControlsTarget.copy(controls.target);
            },
            // Home (away from home) and Jump there: the trip by autopilot, from the overview or from flight.
            travelTo: (id) => {
                const to = tripDestination(system.id, id);
                if (!to || freeFlight.isTravelling()) return false;
                if (freeFlight.isActive()) return freeFlight.startAutopilotTrip(to);
                setSelectedPlanet(null); setTapMessage(null);
                sceneApiRef.current.startFreeFlight();
                tripModeRef.current = "autopilot"; setTripMode("autopilot");
                return freeFlight.startAutopilotTrip(to);
            },
            goHome: () => sceneApiRef.current.travelTo(HOME_SYSTEM_ID),
            openMap: () => {
                if (galaxyMap.isActive() || experiment?.isActive() || beyond.isActive()) return false;
                warpIn?.skip(); stopFollowing(); stopTour(true); zoomAnimating = false;
                clearControlDamping(); controls.enabled = false; pane.hidden = true;
                galaxyMap.resize({ width: containerRef.current.clientWidth, height: containerRef.current.clientHeight });
                galaxyMap.open();
                return true;
            },
            closeMap: () => {
                if (!galaxyMap.isActive()) return;
                galaxyMap.close(); controls.enabled = true; pane.hidden = false;
            },
            setMapLevel: (level) => galaxyMap.setLevel(level),
            focusMap: (id) => galaxyMap.focus(id),
            mapMarkers: () => galaxyMap.projectMarkers(),
            enterOrbit: (id) => {
                const entry = searchEntriesById.get(id);
                if (!followActive || followTarget !== entry?.object3d || ship.isFlying()) return false;
                clearControlDamping();
                const entered = ship.enterOrbit(entry);
                if (entered) pane.hidden = true;
                return entered;
            },
            leaveOrbit: leavePlanetOrbit,
            focusById: (id) => focusEntry(searchEntriesById.get(id)),
            resetView,
            resetSolarSystem,
            launchMeteor: launchExperiment,
            start: () => startTour(),
            previous: () => visitTourPlanet(tourIndex - 1),
            next: () => {
                if (tourIndex >= tourStops.length - 1) finishTour();
                else visitTourPlanet(tourIndex + 1);
            },
            endPaleBlueDot: () => endPaleBlueDot(),
            replay: () => speakPlanet(tourStopData(tourIndex)),
            toggleNarration: toggleTourNarration,
            exit: (hideCard = false) => stopTour(hideCard),
            collapsePane: () => { pane.expanded = false; },
            openLineUp,
            closeLineUp,
            setSpeed: applySpeed,
            goBeyond,
            setWarpHolding: (holding) => beyond.setHolding(holding),
            goHomeFromBeyond: () => {
                stopNarration();
                focusRequestRef.current = "beyond";
                beyond.goHome();
            },
            prepareBeyond: () => beyond.prepare(),
            releaseBeyond: () => beyond.release(),
            bringTogether: () => beyond.destination()?.bringTogether(),
            replayRipples: () => beyond.destination()?.replay(),
            setViewSetting: (key, value) => {
                syncViewSetting(key, value);
                applyMyView();
            },
            setBloom: (enabled) => {
                if (!debugFlags.debug) return;
                bloomSettings.enabled = enabled;
                applyBloom();
                frameReadout?.reset();
                setDebugLighting({ bloom: enabled });
            },
        };
        setSceneReady(true);

        function onClick(event) {
            if (experiment?.isActive() || lineUp.isActive() || paleBlueDot.isActive() || constellationSky.isActive() || freeFlight.isActive() || beyond.isActive() || galaxyMap.isActive()) return;
            if (liftOff.isCounting()) {
                liftOff.skip();
                return;
            }
            const rect = renderer.domElement.getBoundingClientRect();
            if (shootingStars.tryTap(event.clientX, event.clientY, rect)) {
                setTapMessage({ icon: "🌠", text: WISH_LINE, id: performance.now() });
                if (!isMuted()) speak(WISH_LINE);
                return;
            }
            clickMouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            clickMouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            clickRaycaster.setFromCamera(clickMouse, camera);
            const regionHits = clickRaycaster.intersectObjects(regionLabels.hitTargets.filter((target) => target.visible), false);
            if (regionLabels.select(regionHits[0]?.object)) return;
            const visibleLabels = labelSprites.filter((label) => label.visible);
            const intersects = clickRaycaster.intersectObjects([...visibleLabels, ...planetBodies, sun, ship.hitTarget, ...(iss.hitTarget ? [iss.hitTarget] : []), ...(comet.object3d.visible ? [comet.hitTarget] : []), ...(namedAsteroids?.hitTargets.filter((target) => target.visible) ?? [])], false);
            if (intersects[0]?.object === sun) {
                if (extras.sunTaps) tapSun();
                else if (star.card) focusEntry(searchEntriesById.get(star.id));
            } else if (intersects[0]?.object.userData.asteroidId) {
                focusEntry(searchEntriesById.get(intersects[0].object.userData.asteroidId));
            } else if (intersects[0]?.object === comet.hitTarget && comet.object3d.visible) {
                focusEntry(searchEntriesById.get(COMET_ID));
            } else if (intersects[0]?.object === ship.hitTarget || (iss.hitTarget && intersects[0]?.object === iss.hitTarget)) {
                const [icon, text] = intersects[0].object === iss.hitTarget ? ["🛰️", ISS_LINE] : ["🚀", SHIP_LINE];
                setTapMessage({ icon, text, id: performance.now() });
                if (!isMuted()) speak(text);
            } else if (intersects.length > 0) {
                const planetIndex = intersects[0].object.userData.planetIndex;
                if (!reducedQuery.matches) bounces.bounce(planetBodies[planetIndex]);
                flyToPlanet(planetSystems[planetIndex]);
            } else if (!ship.isFlying()) {
                // A stray tap mid-flight shouldn't strand the ship in space.
                stopFollowing();
            }
        }

        function onWheel(event) {
            if (freeFlight.isActive() || beyond.isActive()) { event.preventDefault(); return; }
            // The line-up and the galaxy map have their own controls, which need this event.
            if (lineUp.isActive() || galaxyMap.isActive()) return;
            // The sky view does not zoom, but a pinch must not zoom the page either.
            if (constellationSky.isActive()) {
                event.preventDefault();
                return;
            }
            event.preventDefault();
            event.stopImmediatePropagation();
            if (experiment?.isActive() || paleBlueDot.isActive()) return;
            warpIn?.skip();

            const zoomFactor = Math.exp(THREE.MathUtils.clamp(event.deltaY, -120, 120) * 0.0025);
            if (followActive && followTarget) {
                followDesiredDistance = THREE.MathUtils.clamp(
                    followDesiredDistance * zoomFactor,
                    Math.max(followRadius * 2.2, 1.5),
                    Math.max(followRadius * 80, 40),
                );
                return;
            }

            const rect = renderer.domElement.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            updateZoomPlane();
            raycaster.setFromCamera(mouse, camera);
            const allIntersects = raycaster.intersectObjects(scene.children, true);
            const meshIntersects = filterZoomTargets(allIntersects);
            if (meshIntersects.length > 0) zoomFocus.copy(meshIntersects[0].point);
            else if (!raycaster.ray.intersectPlane(zoomPlane, zoomFocus)) zoomFocus.copy(controls.target);

            if (!zoomAnimating) {
                desiredCameraPosition.copy(camera.position);
                desiredControlsTarget.copy(controls.target);
            }

            const currentDistance = desiredCameraPosition.distanceTo(desiredControlsTarget);
            const clampedFactor = THREE.MathUtils.clamp(
                zoomFactor,
                controls.minDistance / currentDistance,
                controls.maxDistance / currentDistance,
            );
            desiredCameraPosition.sub(zoomFocus).multiplyScalar(clampedFactor).add(zoomFocus);
            desiredControlsTarget.sub(zoomFocus).multiplyScalar(clampedFactor).add(zoomFocus);
            zoomAnimating = true;
        }

        function onControlsStart() {
            if (experiment?.isActive()) return;
            warpIn?.skip();
            liftOff.skip();
            ship.skip();
            zoomAnimating = false;
            desiredCameraPosition.copy(camera.position);
            desiredControlsTarget.copy(controls.target);
        }

        function onKeyDown(e) {
            if (e.key !== "Escape" || e.defaultPrevented) return;
            // The steering game is open on top and closes itself on Escape.
            if (constellationSky.isActive() || freeFlight.isActive() || beyond.isActive() || galaxyMap.isActive()) return;
            if (ship.isOrbiting()) { leavePlanetOrbit(); return; }
            if (lineUp.isActive()) {
                closeLineUp();
                return;
            }
            if (paleBlueDot.isActive()) {
                endPaleBlueDot();
                return;
            }
            if (experiment?.isActive()) {
                resetSolarSystem();
                return;
            }
            // Escape inside the search field clears the field instead of the view.
            if (e.target?.closest?.(".solar-toolbar, .solar-settings")) return;
            stopFollowing();
            stopTour(true);
        }

        // Taps on a Beyond destination, such as a ripple on the grid.
        function onBeyondPointerDown(event) {
            if (beyond.isActive()) beyond.destination()?.pointerDown(event);
        }
        function onBeyondPointerUp(event) {
            if (beyond.isActive()) beyond.destination()?.pointerUp(event, renderer.domElement.getBoundingClientRect());
        }
        function onBeyondPointerCancel(event) {
            if (beyond.isActive()) beyond.destination()?.pointerCancel(event);
        }

        renderer.domElement.addEventListener("click", onClick, true);
        renderer.domElement.addEventListener("pointerdown", onBeyondPointerDown);
        renderer.domElement.addEventListener("pointerup", onBeyondPointerUp);
        renderer.domElement.addEventListener("pointercancel", onBeyondPointerCancel);
        renderer.domElement.addEventListener("wheel", onWheel, { passive: false, capture: true });
        window.addEventListener("keydown", onKeyDown);
        controls.addEventListener("start", onControlsStart);

        // ================================================================
        // Animation Loop
        // ================================================================
        let prevTime = performance.now() / 1000;
        const onVisibilityChange = () => { prevTime = performance.now() / 1000; };
        const onReducedMotionChange = (event) => {
            if (event.matches && experiment?.isActive()) resetSolarSystem();
        };
        document.addEventListener("visibilitychange", onVisibilityChange);
        reducedQuery.addEventListener("change", onReducedMotionChange);

        const labelWorldPosition = new THREE.Vector3();
        const labelScreenPosition = new THREE.Vector3();
        let regionLabelObstacles = [];
        // Kept by the ResizeObserver so the per-frame badge sizing reads no layout.
        const viewport = { width: containerRef.current.clientWidth, height: containerRef.current.clientHeight };
        const currentFollowPosition = new THREE.Vector3();
        let animationFrameId = 0;

        function applyWorldPoses() {
            planetSystems.forEach((system, i) => {
                const data = planetData[i];
                const pose = getBodyPose(data, worldTime);
                system.position.set(pose.position.x, pose.position.y, pose.position.z);
                system.userData.axialGroup.rotation.z = simulation.enableTilt ? THREE.MathUtils.degToRad(data.tilt || 0) : 0;
                system.userData.body.rotation.y = pose.rotationY;
                const equatorTilt = simulation.enableTilt ? THREE.MathUtils.degToRad(data.tilt || 0) : 0;
                system.userData.moons.forEach(({ mesh, data: moonData, phase }) => {
                    const tilt = moonData.ecliptic ? 0 : equatorTilt;
                    const moonPose = getBodyPose({ ...moonData, phase, tilt }, worldTime);
                    mesh.position.set(moonPose.position.x, moonPose.position.y, moonPose.position.z);
                    mesh.rotation.set(0, moonPose.rotationY, moonPose.rotationZ);
                });
            });
        }

        // Tap feedback (#24, #25, #26).
        const bounces = modules.add("bounces", createBounces());
        const sunSneeze = extras.sunTaps ? modules.add("sunSneeze", createSunSneeze({ scene, sun, camera, quality: currentQuality() })) : null;
        const sunTaps = createSunTapCounter();

        if (extras.earthEffects) {
            modules.add("earthDayNight", createEarthDayNight({
                material: planetData.find((planet) => planet.id === extras.earthEffects.body).material,
                nightTexture: textureLoader.load("/static/2k_earth_nightmap.jpg"),
            }));

            // Earth's clouds (#11) and the glow round Earth, Venus and Mars (#12).
            modules.add("atmospheres", createPlanetAtmospheres({
                bodies: Object.fromEntries(planetSystems.map((planetSystem) => [planetSystem.userData.planet.name, planetSystem.userData.body])),
                cloudTexture: textureLoader.load("/static/2k_earth_clouds.jpg"),
                getSpinTime: () => worldTime.spinTime,
            }));
            modules.add("earthAurora", createEarthAurora({
                earthBody: extraEntry("earthEffects").planetSystem.userData.body,
                getTime: () => worldTime.elapsed,
                reducedMotion: () => reducedQuery.matches,
                getQuality: currentQuality,
            }));
        }
        if (extras.saturnRingDetail) {
            const saturnSystem = extraEntry("saturnRingDetail").planetSystem;
            modules.add("saturnRingDetail", createSaturnRingDetail({
                axialGroup: saturnSystem.userData.axialGroup,
                ringGroup: saturnSystem.userData.axialGroup.children.find((child) => child.userData.isRing),
                radius: saturnSystem.userData.planet.radius,
                getCamera: () => camera, getOrbitTime: () => worldTime.orbitTime,
                getQuality: currentQuality, reducedMotion: () => reducedQuery.matches,
            }));
        }
        // The International Space Station (#50) zips round Earth; tap it.
        const iss = extras.iss ? modules.add("iss", createIss({
            earthRoot: extraEntry("iss").object3d,
            getOrbitTime: () => worldTime.orbitTime,
            quality: currentQuality(),
        })) : NO_ISS;

        function tapSun() {
            const result = sunTaps.tap(performance.now());
            const calm = reducedQuery.matches;
            if (!calm) bounces.bounce(sun, result === "sneeze" ? 0.3 : 0.12);
            if (!result) return;
            const text = result === "sneeze" ? SUN_SNEEZE_LINE : SUN_SAFETY_LINE;
            if (result === "sneeze" && !calm) sunSneeze.sneeze();
            setTapMessage({ icon: "☀️", text, id: performance.now() });
            if (!isMuted()) speak(text);
        }

        // Shooting stars (#8): tap one to make a wish.
        const shootingStars = modules.add("shootingStars", createShootingStars({
            scene, camera, quality: currentQuality(), reducedMotion: () => reducedQuery.matches,
            isHidden: () => constellationSky.isActive(),
        }));

        // The autopilot ship (#34) starts beside the start body (Earth at home).
        const ship = modules.add("ship", createAutopilotShip({
            scene, camera, controls, quality: currentQuality(), reducedMotion: () => reducedQuery.matches,
            getCameraView: () => cameraViewRef.current,
            onOrbitChange: setAutopilotOrbit,
            obstacles: [...searchEntries.filter((entry) => entry.id !== star.id), { kind: "star", radius: star.radius, object3d: sun }],
        }));
        // The ship waits beside the system's start body (Earth at home).
        const parkShipAtStart = () => {
            const start = searchEntriesById.get(system.flight.startBodyId);
            ship.park(start.object3d, { radius: start.radius, framingDistance: framingDistanceFor(start) });
        };
        parkShipAtStart();

        // The warp-in's streaks rush past on every flight too, strongest at top speed.
        const flightStreaks = createWarpStreaks({ camera, quality: currentQuality() });
        modules.add("flightStreaks", {
            update(dt, { active }) {
                // A trip between systems drives the streaks and the hand-over fade.
                const trip = freeFlight.isActive() ? freeFlight.tripEffects() : null;
                const fade = trip?.fade ?? 0;
                if (tripFadeRef.current && tripFadeRef.current.style.opacity !== String(fade)) tripFadeRef.current.style.opacity = String(fade);
                if (trip) { flightStreaks.update(dt, { speed: trip.streakSpeed, brightness: trip.streakBrightness }); return; }
                const thrust = active || reducedQuery.matches ? 0 : freeFlight.isActive() ? freeFlight.boostStrength() : ship.thrust();
                flightStreaks.update(dt, { speed: thrust, brightness: thrust });
            },
            dispose: () => flightStreaks.dispose(),
        });

        // Lift-off (#35): a countdown at Earth, then the ship leaves for the tour's first stop.
        const liftOff = !extras.liftOff ? NO_LIFT_OFF : modules.add("liftOff", createLiftOff({
            scene,
            ship,
            quality: currentQuality(),
            onCount: (n) => {
                if (disposed) return;
                setCountdown(n);
                // "Lift off!" is said with the first stop's narration, so it isn't cut off.
                if (n > 0 && !isMuted()) speak(COUNT_WORDS[n]);
            },
            onLaunch: () => visitTourPlanet(0, isMuted() ? "" : `${COUNT_WORDS[0]} `),
        }));

        // Line-up by size (#62): its own small scene, drawn instead of this one while open.
        const lineUp = !extras.lineUp ? NO_LINE_UP : modules.add("lineUp", createLineUp({
            renderer,
            getSky: () => scene,
            names: planetData.map(({ name }) => name),
            materialFor: (name) => planetData.find((planet) => planet.name === name).material,
            sunMaterial: materials.sun,
            makeRings: createSaturnRings,
            makeLabel: (text, color) => createLabel(text, 64, color),
            reducedMotion: () => reducedQuery.matches,
        }));

        function openLineUp(name) {
            if (experiment?.isActive() || resetting || lineUp.isActive() || !extras.lineUp) return;
            warpIn?.skip();
            clearControlDamping();
            controls.enabled = false;
            pane.hidden = true;
            lineUp.open(name);
            setLineUpName(name);
            if (!isMuted()) speak(LINE_UP_LINE);
        }

        function closeLineUp() {
            if (!lineUp?.isActive()) return;
            lineUp.close();
            controls.enabled = true;
            pane.hidden = false;
            stopNarration();
            setLineUpName(null);
        }

        // Warp to Beyond (#113) and its destinations, starting with Space
        // ripples (#94). Like the line-up, drawn instead of the Solar System
        // while away; the world clock holds until the child is home.
        let beyondShown = { phase: "off", progress: 0, calm: false, stage: null };
        beyond = modules.add("beyond", createBeyond({
            renderer,
            getQuality: currentQuality,
            reducedMotion: () => reducedQuery.matches,
            makeRocket: () => buildShip(currentQuality()),
            onChange: (state) => {
                const previous = beyondShown;
                // Progress changes every frame; React only needs whole percents.
                const same = previous.phase === state.phase && previous.stage === state.stage && previous.calm === state.calm
                    && Math.abs(previous.progress - state.progress) < 0.01 && state.progress < 1;
                if (same) return;
                beyondShown = state;
                setBeyondState(state);
                if (state.phase === "arrived" && previous.phase !== "arrived" && state.destinationId === "space-ripples" && !isMuted()) {
                    speak(SPACE_RIPPLES_ARRIVAL_LINE);
                }
                if (state.phase === "off" && previous.phase !== "off") returnFromBeyond();
            },
        }));

        function goBeyond(id) {
            if (disposed || resetting || beyond.isActive() || experiment?.isActive() || lineUp.isActive()) return;
            warpIn?.skip();
            if (freeFlight.isActive()) {
                freeFlight.exit();
                ship.setHidden(false);
            }
            stopFollowing();
            stopTour(true);
            zoomAnimating = false;
            clearControlDamping();
            stopNarration();
            controls.enabled = false;
            pane.hidden = true;
            beyond.go(id);
        }

        // Home always lands at the overview (owner).
        function returnFromBeyond() {
            stopNarration();
            controls.enabled = true;
            pane.hidden = false;
            resetView();
        }

        // The Pale Blue Dot (#47): after the last stop, the ship flies out past
        // Neptune and the camera looks back at home, as Voyager 1 did.
        const paleBlueDot = !extras.paleBlueDot ? NO_PALE_BLUE_DOT : modules.add("paleBlueDot", createPaleBlueDot({
            scene,
            camera,
            controls,
            getEarthPosition: (out) => extraEntry("paleBlueDot").object3d.getWorldPosition(out),
            defaultFov: defaults.camera.fov,
            reducedMotion: () => reducedQuery.matches,
        }));

        function startPaleBlueDot() {
            if (experiment?.isActive() || resetting || !extras.paleBlueDot) return;
            stopTour(true);
            stopFollowing();
            clearControlDamping();
            controls.enabled = false;
            pane.hidden = true;
            paleBlueDot.begin();
            setPaleBlueDotPhase("flying");
            const lookBack = () => {
                ship.setHidden(true);
                paleBlueDot.look(() => {
                    if (disposed) return;
                    setPaleBlueDotPhase("looking");
                    if (!tourMuted) speak(`${PALE_BLUE_DOT_TITLE}. ${PALE_BLUE_DOT_STORY.join(" ")}`);
                });
            };
            const leg = { radius: 2, framingDistance: () => 24 };
            if (reducedQuery.matches) {
                ship.park(paleBlueDot.marker, leg);
                lookBack();
            } else ship.flyTo(paleBlueDot.marker, { ...leg, onArrive: lookBack });
        }

        // `home`: the ship comes back to Earth and the camera to the overview.
        function endPaleBlueDot({ home = true } = {}) {
            if (!paleBlueDot?.isActive()) return;
            paleBlueDot.end();
            sky.apply({ milkyWay: simulation.milkyWay, skyVisible: backgroundSettings.enabled });
            ship.cancel();
            ship.setHidden(false);
            controls.enabled = true;
            pane.hidden = false;
            stopNarration();
            setPaleBlueDotPhase(null);
            if (home) {
                parkShipAtStart();
                resetView();
            }
        }

        // Warp-in arrival (#1), once per visit. Anything the child does skips it.
        const warpIn = extras.warpIn && shouldPlayWarp({ reducedMotion: reducedQuery.matches }) ? modules.add("warpIn", createWarpIn({
            camera,
            endPosition: new THREE.Vector3().fromArray(system.scene.camera.position),
            target: controls.target.clone(),
            quality: currentQuality(),
            onDone: () => markWarpSeen(),
        })) : null;

        // After the warp-in, which moves the camera: the sky layer copies its position.
        const constellationSky = modules.add("constellationSky", createConstellationSky({
            scene, camera, domElement: renderer.domElement,
            makeLabel: (name) => createLabel(name, 48, "#dceeff"),
            makeNameLabel: (name) => createLabel(name, 48, "#cfe6ff", "sky"),
            getQuality: currentQuality, reducedMotion: () => reducedQuery.matches,
            isHidden: () => lineUp.isActive() || paleBlueDot.isActive(),
            getDisplay: () => (simulation.constellations
                ? CONSTELLATION_BRIGHTNESS.find((level) => level.key === simulation.constellationBrightness) ?? null
                : null),
        }));

        // The galaxy map (#108): its own scene, drawn instead of this one while open.
        const galaxyMap = modules.add("galaxyMap", createGalaxyMap({
            renderer, quality: currentQuality(), reducedMotion: () => reducedQuery.matches,
            catalogue: MAP_CATALOGUE, currentSystemId: system.id,
        }));

        // Signposts past the edge to every other system, seen in flight (#108/#109).
        const signList = signpostsFor(system.id, SYSTEM_REGISTRY, system.flight.edgeRadius);
        const signposts = modules.add("signposts", createSystemSignposts({
            scene, camera, edgeRadius: system.flight.edgeRadius, quality: currentQuality(),
            signposts: signList,
            makeLabel: (text) => createLabel(text, 64, "#fff4d6"),
            homeStarDot: !system.home,
            isVisible: () => freeFlight.isActive(),
        }));
        // The belt's region, for clue arrivals and the rocks to weave past (#84).
        const beltRegion = () => asteroidBelt && ({ innerRadius: asteroidBelt.settings.innerRadius, outerRadius: asteroidBelt.settings.outerRadius,
            halfHeight: asteroidBelt.settings.outerRadius * Math.sin(asteroidBelt.settings.maxInclinationDeg * Math.PI / 180) + .5 });
        // Free flight drives the rocks each frame; the module host only frees them.
        const beltRocks = extras.asteroidBelt ? createBeltRockField({ scene, getRegion: beltRegion, quality: currentQuality() }) : null;
        if (beltRocks) modules.add("beltRocks", { dispose: () => beltRocks.dispose() });
        const freeFlight = modules.add("freeFlight", createSolarFreeFlight({
            scene, camera, controls, quality: currentQuality(), reducedMotion: () => reducedQuery.matches,
            getCameraView: () => cameraViewRef.current,
            edgeRadius: system.flight.edgeRadius, startBodyId: system.flight.startBodyId,
            bodies: [...searchEntries.filter((entry) => entry.id !== star.id),
                { id: star.id, name: star.name, radius: star.radius, object3d: sun, kind: "star" },
                // A sign's reach starts just inside the edge, so finding one never starts a trip.
                ...signList.map((sign, i) => ({ id: sign.id, name: sign.label, radius: SIGN_OFFSET + 10, object3d: signposts.signs[i], kind: "sign" })),
                ...(extras.iss ? [{ id: "ISS", name: "International Space Station", parentName: extras.iss.body, radius: .12, object3d: iss.object3d, kind: "satellite" }] : []),
                ...(extras.asteroidBelt ? [{ id: "asteroid-belt", name: "Asteroid belt", radius: 0, kind: "belt", getRegion: beltRegion }] : []),
            ],
            onChange: setFreeFlightView,
            tripTo: tripDestination(system.id),
            systemPhrase: system.phrase, systemSpokenName: system.spokenName ?? system.phrase,
            onTripStart: (to) => onPrepareRef.current(to.id),
            rocks: beltRocks,
            onHandoff: (request) => onTravelRef.current(request),
            onTripDone: ({ mode, turnedBack = false }) => {
                // An autopilot trip outside the flight HUD ends at the overview.
                if (mode === "autopilot" && tripModeRef.current) {
                    tripModeRef.current = null; setTripMode(null);
                    sceneApiRef.current?.stopFreeFlight(); resetView();
                }
                if (!turnedBack) onArrivedRef.current();
            },
        }));

        // The asteroid belt's neighbours: Trojans, Hildas and the Kuiper belt (home extra).
        const smallBodyRegions = extras.asteroidBelt ? modules.add("smallBodyRegions", createSmallBodyRegions({
            scene,
            planets: Object.fromEntries(extras.asteroidBelt.regionPlanets
                .map((name) => [name.toLowerCase(), planetData.find((planet) => planet.name === name)])),
            mainBeltInnerRadius: defaults.belt.innerRadius,
            getOrbitTime: () => worldTime.orbitTime,
            getQuality: currentQuality,
            isVisible: () => asteroidBelt.mesh.visible,
        })) : null;
        const regionLabels = !smallBodyRegions ? NO_REGION_LABELS : modules.add("regionLabels", createSolarRegionLabels({
            scene, anchors: smallBodyRegions.anchors, camera,
            makeLabel: (name) => createLabel(name, 64, "#dceeff"),
            getViewport: () => viewport,
            getBeltSettings: () => asteroidBelt.settings,
            getObstacles: () => regionLabelObstacles,
            isVisible: () => simulation.showLabels && asteroidBelt.mesh.visible && !followActive
                && !freeFlight.isActive() && !lineUp.isActive(),
            onSelect: (entry) => focusEntry(entry),
        }));
        const regions = smallBodyRegions ? SOLAR_REGIONS : [];
        regions.forEach((entry) => searchEntriesById.set(entry.id, entry));
        setSearchBodies([...searchEntries, ...regions].map(({ id, name, kind, kindLabel, parentName }) => ({
            id, name, kind, kindLabel, parentName,
        })));

        const frameReadout = debugFlags.debug ? modules.add("frameReadout", createFrameReadout({
            container: containerRef.current,
            getInfo: () => ({
                quality: currentQuality(),
                dpr: renderer.getPixelRatio(),
                width: containerRef.current?.clientWidth ?? 0,
                height: containerRef.current?.clientHeight ?? 0,
                bloom: pipeline.bloomEnabled,
            }),
        })) : null;
        let lastFrameStart = 0;
        let wasFlying = false;

        function animate() {
            const frameStart = performance.now();
            const now = frameStart / 1000;
            let dt = now - prevTime;
            prevTime = now;
            dt = document.hidden ? 0 : Math.min(Math.max(dt, 0), 0.1);
            const active = experiment?.isActive() ?? false;
            if (!active) {
                worldTime = advanceWorldTime(worldTime, dt, simulation, paused || paleBlueDot.holdsClock() || beyond.isActive());
                applyWorldPoses();
            } else {
                try { experiment.update(dt); }
                catch (error) {
                    console.error("Meteor experiment stopped", error);
                    resetSolarSystem();
                    experiment?.dispose();
                    experiment = null;
                    setMeteorError("That meteor did not launch. Try again.");
                }
            }

            // The Pale Blue Dot's zoomed view is just the Sun, Earth and the stars.
            const quiet = active || paleBlueDot.hidesScenery() || constellationSky.isActive();
            orbitPaths.forEach((orbit) => (orbit.visible = !quiet && simulation.showOrbits));
            asteroidBelt.mesh.visible = !quiet && (beltSettings.enabled || (freeFlight.isActive() && Boolean(extras.asteroidBelt)));

            // Badges keep one on-screen size and sit just above their body.
            const badgePixels = badgePixelHeight(viewport.width);
            const shownBadges = [];
            labelSprites.forEach((label) => {
                label.userData.owner.getWorldPosition(labelWorldPosition);
                const distance = camera.position.distanceTo(labelWorldPosition);
                const height = badgeWorldHeight(badgePixels, distance, camera.fov, viewport.height);
                label.scale.set(height * label.userData.aspect, height, 1);
                label.position.copy(labelWorldPosition);
                label.position.y += label.userData.bodyRadius + height * 0.75;
                label.visible = !quiet && (label.userData.isMoonLabel
                    ? moonLabelVisible({
                        showMoonLabels: simulation.showMoonLabels, forced: forceMoonLabels, following: followActive,
                        inFollowedSystem: label.userData.planetSystem === followSystem,
                        isFollowTarget: label.userData.owner === followTarget,
                    })
                    : simulation.showLabels && !followActive);
                // In the overview, planet names win overlaps with their moons'.
                if (label.visible) shownBadges.push({ label, distance, rank: label.userData.isMoonLabel && !followActive ? 1 : 0 });
            });
            // Where badges overlap, the body nearer the camera keeps its name.
            const onScreen = shownBadges
                .sort((a, b) => a.rank - b.rank || a.distance - b.distance)
                .map(({ label }) => {
                    labelScreenPosition.copy(label.position).project(camera);
                    return {
                        label,
                        inFront: labelScreenPosition.z < 1,
                        x: (labelScreenPosition.x + 1) * viewport.width / 2,
                        y: (1 - labelScreenPosition.y) * viewport.height / 2,
                        halfWidth: badgePixels * label.userData.aspect / 2,
                        halfHeight: badgePixels / 2,
                    };
                })
                .filter(({ inFront }) => inFront);
            pickUnoverlapped(onScreen).forEach((keep, index) => { onScreen[index].label.visible = keep; });
            regionLabelObstacles = onScreen.filter(({ label }) => label.visible);
            // The comet has no badge, so its tap target keeps a finger-sized 44px on screen.
            if (comet.object3d.visible) {
                comet.hitTarget.getWorldPosition(labelWorldPosition);
                const reach = badgeWorldHeight(44, camera.position.distanceTo(labelWorldPosition), camera.fov, viewport.height) / 2;
                comet.hitTarget.scale.setScalar(Math.max(1, reach / COMET_HIT_RADIUS));
            }

            const flying = ship.isFlying();
            if (flying !== wasFlying) {
                wasFlying = flying;
                setShipFlying(flying);
            }

            if (!active && !constellationSky.isActive() && !freeFlight.isActive() && followActive && followTarget && !flying && !ship.isOrbiting()) {
                followTarget.getWorldPosition(currentFollowPosition);

                if (followBlendT < 1) {
                    followBlendT = Math.min(1, followBlendT + dt / followBlendDuration);
                    const eased = followBlendT * followBlendT * (3 - 2 * followBlendT);
                    const desired = currentFollowPosition.clone().add(followOffset);
                    camera.position.lerpVectors(followBlendCamStart, desired, eased);
                    const blendedTarget = new THREE.Vector3().lerpVectors(
                        followBlendTargetStart,
                        currentFollowPosition,
                        eased
                    );
                    controls.target.copy(blendedTarget);
                } else {
                    camera.position.add(currentFollowPosition.clone().sub(previousFollowPosition));
                    controls.target.copy(currentFollowPosition);
                    const currentOffset = camera.position.clone().sub(currentFollowPosition);
                    const distanceAlpha = 1 - Math.exp(-10 * dt);
                    const distance = THREE.MathUtils.lerp(currentOffset.length(), followDesiredDistance, distanceAlpha);
                    if (currentOffset.lengthSq() > 0.0001) {
                        camera.position.copy(currentFollowPosition).add(currentOffset.setLength(distance));
                    }
                }
                previousFollowPosition.copy(currentFollowPosition);
            } else if (!active && !constellationSky.isActive() && !freeFlight.isActive() && !ship.isOrbiting() && zoomAnimating) {
                const zoomAlpha = 1 - Math.exp(-12 * dt);
                camera.position.lerp(desiredCameraPosition, zoomAlpha);
                controls.target.lerp(desiredControlsTarget, zoomAlpha);
                if (
                    camera.position.distanceToSquared(desiredCameraPosition) < 0.0001 &&
                    controls.target.distanceToSquared(desiredControlsTarget) < 0.0001
                ) {
                    camera.position.copy(desiredCameraPosition);
                    controls.target.copy(desiredControlsTarget);
                    zoomAnimating = false;
                }
            }

            if (!active) {
                if (!constellationSky.isActive() && !freeFlight.isActive() && !ship.isOrbiting() && !beyond.isActive()) controls.update();
                updateAsteroidBelt(worldTime.orbitTime, worldTime.elapsed);
            }
            updateSunGlow();
            modules.update(dt, { active });
            // Zoomed that far in, the star dots turn into grey squares and the sky
            // photo into blurry blocks, so the sky goes black, as in Voyager's
            // photo. After modules.update, because the sky module sets the dots too.
            stars.material.opacity = constellationSky.isActive() ? 0.12 : 0.8;
            if (constellationSky.isActive()) {
                // Decorative dots stay faint; the photo is not aligned to our catalogue.
                stars.visible = true;
                scene.background = null;
            }
            if (paleBlueDot.hidesScenery()) {
                stars.visible = false;
                scene.background = null;
            }
            if (beyond.isActive()) beyond.render();
            else if (galaxyMap.isActive()) galaxyMap.render();
            else if (lineUp.isActive()) lineUp.render();
            else pipeline.render();
            if (frameReadout && lastFrameStart > 0 && !document.hidden) {
                frameReadout.record(frameStart - lastFrameStart, performance.now() - frameStart);
            }
            lastFrameStart = frameStart;
            animationFrameId = requestAnimationFrame(animate);
        }
        animate();

        // Arriving by trip: the second half of the dash plays here, in flight
        // (flown) or on autopilot; otherwise the child has already arrived.
        const landing = arrivalRef.current;
        if (landing?.fromDirection) {
            const origin = registryEntry(landing.from);
            if (landing.mode === "autopilot") { tripModeRef.current = "autopilot"; setTripMode("autopilot"); }
            else setFreeFlightOpen(true);
            sceneApiRef.current.startFreeFlight();
            freeFlight.beginArrival({
                from: landing.from, fromDirection: landing.fromDirection, mode: landing.mode,
                fromPhrase: origin?.phrase, fromSpoken: origin?.spokenName, distanceLy: tripDestination(system.id, landing.from)?.distanceLy,
            });
        } else onArrivedRef.current();

        // ================================================================
        // Resize Handling (ResizeObserver for container)
        // ================================================================
        const ro = new ResizeObserver(() => {
            if (!containerRef.current) return;
            if (containerRef.current.clientWidth <= 0 || containerRef.current.clientHeight <= 0) return;
            camera.aspect = getAspect();
            camera.updateProjectionMatrix();
            viewport.width = containerRef.current.clientWidth;
            viewport.height = containerRef.current.clientHeight;
            renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
            pipeline.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
            experiment?.resize({ width: containerRef.current.clientWidth, height: containerRef.current.clientHeight, reservedBottomPx: 24 });
            modules.resize({ width: containerRef.current.clientWidth, height: containerRef.current.clientHeight });
        });
        ro.observe(containerRef.current);

        // ================================================================
        // Cleanup
        // ================================================================
        return () => {
            disposed = true;
            stopNarration();
            sceneApiRef.current = null;
            cancelAnimationFrame(animationFrameId);
            ro.disconnect();
            document.removeEventListener("visibilitychange", onVisibilityChange);
            reducedQuery.removeEventListener("change", onReducedMotionChange);
            renderer.domElement.removeEventListener("click", onClick, true);
            renderer.domElement.removeEventListener("pointerdown", onBeyondPointerDown);
            renderer.domElement.removeEventListener("pointerup", onBeyondPointerUp);
            renderer.domElement.removeEventListener("pointercancel", onBeyondPointerCancel);
            renderer.domElement.removeEventListener("wheel", onWheel, true);
            window.removeEventListener("keydown", onKeyDown);
            wideQuery.removeEventListener("change", applyPaneWidth);
            controls.removeEventListener("start", onControlsStart);
            pane.dispose();
            controls.dispose();
            experiment?.dispose();
            modules.dispose();
            pipeline.dispose();
            const seenGeometries = new Set();
            const seenMaterials = new Set();
            const seenTextures = new Set(textures.values());
            seenTextures.add(backgroundTexture);
            scene.traverse((obj) => {
                if (obj.geometry) seenGeometries.add(obj.geometry);
                for (const material of obj.material ? (Array.isArray(obj.material) ? obj.material : [obj.material]) : []) {
                    seenMaterials.add(material);
                    for (const value of Object.values(material)) if (value?.isTexture) seenTextures.add(value);
                }
            });
            seenGeometries.forEach((g) => g.dispose());
            seenMaterials.forEach((m) => m.dispose());
            seenTextures.forEach((t) => t.dispose());
            renderer.dispose();
            // Release the WebGL context once the canvas has left the page, so
            // repeat visits don't pile up contexts (StrictMode remounts reuse it).
            const canvas = renderer.domElement;
            setTimeout(() => {
                if (!canvas.isConnected) renderer.forceContextLoss();
            }, 0);
        };
    }, [system]);

    useEffect(() => {
        if (searchExpanded) searchInputRef.current?.focus();
    }, [searchExpanded]);

    useEffect(() => {
        if (!sceneReady) return;
        if (focusRequestRef.current === "launch" && meteorPhase === "ready") moreButtonRef.current?.focus();
        else if (focusRequestRef.current === "reset" && meteorPhase !== "ready") resetButtonRef.current?.focus();
        else return;
        focusRequestRef.current = null;
    }, [meteorPhase, sceneReady]);

    // While the Beyond picker is open the warp is built and compiled, so the
    // ride starts without a stutter; closing it without a choice frees it.
    useEffect(() => {
        if (!beyondPickerOpen) return undefined;
        sceneApiRef.current?.prepareBeyond();
        return () => sceneApiRef.current?.releaseBeyond();
    }, [beyondPickerOpen]);

    // Home from Beyond lands at the overview, with focus on the Beyond button.
    useEffect(() => {
        if (beyondState.phase !== "off" || focusRequestRef.current !== "beyond") return;
        focusRequestRef.current = null;
        moreButtonRef.current?.focus();
    }, [beyondState.phase]);

    // Closing the rocket game hands focus back to the button that opened it.
    useEffect(() => {
        if (freeFlightOpen || focusRequestRef.current !== "fly") return;
        focusRequestRef.current = null;
        flyButtonRef.current?.focus();
    }, [freeFlightOpen]);

    const matches = useMemo(() => matchBodies(searchBodies, query), [searchBodies, query]);
    const highlighted = matches.length === 0 ? -1 : Math.min(activeIndex, matches.length - 1);
    const resultsVisible = meteorPhase === "ready" && searchOpen && query.trim().length > 0;

    const collapseSearch = () => {
        setQuery("");
        setSearchOpen(false);
        setSearchExpanded(false);
        setActiveIndex(0);
    };

    const jumpTo = (id) => {
        sceneApiRef.current?.focusById(id);
        collapseSearch();
        searchInputRef.current?.blur();
    };

    const onSearchKeyDown = (event) => {
        if (event.key === "Escape") {
            // Keep the window-level Escape handler from also resetting the view.
            event.stopPropagation();
            collapseSearch();
            searchInputRef.current?.blur();
            return;
        }
        if (!resultsVisible || matches.length === 0) return;
        if (event.key === "ArrowDown") {
            event.preventDefault();
            setActiveIndex((current) => (Math.min(current, matches.length - 1) + 1) % matches.length);
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            setActiveIndex((current) => (Math.min(current, matches.length - 1) + matches.length - 1) % matches.length);
        } else if (event.key === "Enter") {
            event.preventDefault();
            jumpTo(matches[highlighted].id);
        }
    };

    const closeMap = ({ refocus = true } = {}) => {
        sceneApiRef.current?.closeMap();
        setMapLevel(null);
        if (refocus) window.requestAnimationFrame(() => moreButtonRef.current?.focus());
    };

    const meteorActive = meteorPhase !== "ready";
    // Derived, never stored: meteorPhase, tourState and constellationState are
    // the sources of truth, so these four modes cannot drift out of sync.
    let mode = "idle";
    if (meteorActive) mode = "meteor";
    else if (beyondState.phase !== "off") mode = "beyond";
    else if (tripMode) mode = "trip";
    else if (mapLevel) mode = "map";
    else if (freeFlightOpen) mode = "freeflight";
    else if (lineUpName) mode = "lineup";
    else if (paleBlueDotPhase) mode = "palebluedot";
    else if (tourState.active) mode = "tour";
    else if (countdown !== null) mode = "liftoff";
    else if (constellationState.active) mode = "constellations";
    // Same rule as the launch buttons: the drawer steps aside for a planet
    // card or any other mode, and comes back closed.
    const drawerVisible = mode === "idle" && !selectedPlanet && !shipFlying;
    const autopilotViewVisible = (shipFlying || Boolean(autopilotOrbit)) && !freeFlightOpen && (mode === "idle" || mode === "tour");
    useEffect(() => {
        if (!drawerVisible) setSettingsOpen(false);
    }, [drawerVisible]);
    useEffect(() => {
        if (!tapMessage) return undefined;
        const timer = window.setTimeout(() => setTapMessage(null), 5000);
        return () => window.clearTimeout(timer);
    }, [tapMessage]);
    const phaseMessages = {
        ready: "",
        preparing: "Getting Earth ready to watch…",
        approaching: "Here comes the meteor!",
        impact: "The meteor has reached Earth!",
        breaking: "Watch the pieces drift apart.",
        aftermath: "Reset the Solar System to rebuild the scene.",
    };

    return (
        <div
            ref={containerRef}
            className="solar-system"
            style={{
                width: "100%",
                height: "calc(100dvh - var(--navbar-height))",
                position: "relative",
                overflow: "hidden",
                background: "#02040a",
            }}
        >
            <canvas
                ref={canvasRef}
                className="solar-system__canvas"
                aria-label={`Interactive model of ${system.phrase}`}
                style={{ display: "block", width: "100%", height: "100%", cursor: meteorActive ? "default" : "grab" }}
            />
            {cameraView === "cockpit" && (freeFlightOpen || autopilotViewVisible) && <SolarCockpit />}
            {autopilotViewVisible && !autopilotOrbit && <SolarCameraChoices
                className="solar-camera-choices--floating"
                value={cameraView}
                onChange={selectCameraView}
            />}
            {!freeFlightOpen && orbitOffer && (mode === "idle" || mode === "tour") && <SolarOrbitControl
                name={orbitOffer.name} active={Boolean(autopilotOrbit)} floating reducedMotion={autopilotOrbit?.steady}
                onEnter={() => sceneApiRef.current?.enterOrbit(orbitOffer.id)}
                onLeave={() => sceneApiRef.current?.leaveOrbit()}
            >
                {autopilotOrbit && <SolarCameraChoices value={cameraView} onChange={selectCameraView} compact />}
            </SolarOrbitControl>}
            {mode === "idle" && (
                <div className={`solar-toolbar${searchExpanded ? " solar-toolbar--searching" : ""}`}>
                    <button
                        type="button"
                        className="solar-search-toggle"
                        aria-label={`Search ${system.phrase}`}
                        aria-expanded={searchExpanded}
                        onClick={() => setSearchExpanded(true)}
                    >
                        <SearchGlyph />
                    </button>
                    <div
                        className="solar-search"
                        onBlur={(event) => {
                            if (event.currentTarget.contains(event.relatedTarget)) return;
                            collapseSearch();
                        }}
                    >
                        <span className="solar-search__icon">
                            <SearchGlyph />
                        </span>
                        <input
                            ref={searchInputRef}
                            className="solar-search__input"
                            type="search"
                            role="combobox"
                            aria-label={`Search ${system.phrase}`}
                            aria-expanded={resultsVisible}
                            aria-controls="solar-search-results"
                            aria-autocomplete="list"
                            aria-activedescendant={
                                resultsVisible && highlighted >= 0
                                    ? `solar-search-option-${highlighted}`
                                    : undefined
                            }
                            placeholder={`Search ${system.phrase}`}
                            value={query}
                            onChange={(event) => {
                                setQuery(event.target.value);
                                setActiveIndex(0);
                                setSearchOpen(true);
                            }}
                            onFocus={() => setSearchOpen(true)}
                            onKeyDown={onSearchKeyDown}
                        />
                        {resultsVisible && (
                            <div
                                className="solar-search__results"
                                id="solar-search-results"
                                role="listbox"
                                aria-label="Matching bodies"
                                onMouseDown={(event) => event.preventDefault()} /* keeps focus on the input */
                            >
                                {matches.length === 0 ? (
                                    <p className="solar-search__empty">
                                        Nothing matches “{query.trim()}”
                                    </p>
                                ) : (
                                    matches.map((body, index) => (
                                        <div
                                            key={body.id}
                                            id={`solar-search-option-${index}`}
                                            role="option"
                                            aria-selected={index === highlighted}
                                            className={`solar-search__result${index === highlighted ? " solar-search__result--active" : ""}`}
                                            onClick={() => jumpTo(body.id)}
                                            onMouseEnter={() => setActiveIndex(index)}
                                        >
                                            <span className="solar-search__result-name">{body.name}</span>
                                            <span className="solar-search__result-kind">{body.kindLabel}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                    {(focusedId || selectedPlanet) && (
                        <button
                            type="button"
                            className="solar-overview-button"
                            onClick={() => sceneApiRef.current?.resetView()}
                        >
                            <span aria-hidden="true">⟲</span>
                            Overview
                        </button>
                    )}
                </div>
            )}
            {system.extras.missions && <SolarMissions enabled={mode === "idle" && !shipFlying} body={missionArrival}
                onOpen={() => sceneApiRef.current?.collapsePane?.()}
                onStart={() => { setMissionArrival(null); setSelectedPlanet(null); sceneApiRef.current?.resetView(); }} />}
            {mode === "idle" && !selectedPlanet && !shipFlying && (
                <div className="solar-launch-buttons">
                    <button
                        type="button"
                        className="solar-tour-launch"
                        aria-label={`Tour ${system.phrase}`}
                        onClick={() => sceneApiRef.current?.start()}
                    >
                        <span className="solar-tour-launch__icon" aria-hidden="true">▶</span>
                        <span className="solar-action-label">Tour {system.phrase}</span>
                    </button>
                    <button
                        type="button"
                        className="solar-tour-launch"
                        ref={flyButtonRef}
                        aria-label="Fly the rocket"
                        disabled={!sceneReady}
                        onClick={() => {
                            sceneApiRef.current?.startFreeFlight();
                            setFreeFlightOpen(true);
                        }}
                    >
                        <span className="solar-tour-launch__icon" aria-hidden="true">🕹</span>
                        <span className="solar-action-label">Fly the rocket</span>
                    </button>
                    <SolarToolbarMenu
                        buttonRef={moreButtonRef}
                        disabled={!sceneReady}
                        items={[
                            { id: "constellations", icon: "✦", label: "Constellations", ariaLabel: "Explore constellations", onSelect: () => {
                                sceneApiRef.current?.collapsePane?.();
                                setConstellationState({ active: true, index: 0, muted: false });
                            } },
                            ...(system.extras.meteor ? [{ id: "meteor", icon: "☄", label: "Launch meteor", onSelect: () => sceneApiRef.current?.launchMeteor() }] : []),
                            { id: "beyond", icon: "🌀", label: "Beyond", ariaLabel: "Warp to Beyond", onSelect: () => {
                                sceneApiRef.current?.collapsePane?.();
                                setBeyondPickerOpen(true);
                            } },
                            { id: "map", icon: "🗺", label: "Galaxy map", onSelect: () => {
                                sceneApiRef.current?.collapsePane?.();
                                if (sceneApiRef.current?.openMap()) setMapLevel("galaxies");
                            } },
                        ]}
                    />
                    {!system.home && <button
                        type="button"
                        className="solar-tour-launch"
                        aria-label={`Fly home to ${homePhrase}`}
                        disabled={!sceneReady}
                        onClick={() => sceneApiRef.current?.goHome()}
                    >
                        <span className="solar-tour-launch__icon" aria-hidden="true">🏠</span>
                        <span className="solar-action-label">Home</span>
                    </button>}
                </div>
            )}
            {mode === "meteor" && (
                <div className="solar-launch-buttons solar-launch-buttons--meteor">
                    <button
                        ref={resetButtonRef}
                        type="button"
                        className="solar-tour-launch solar-tour-launch--reset solar-tour-launch--meteor-reset"
                        disabled={!sceneReady}
                        onClick={() => sceneApiRef.current?.resetSolarSystem()}
                    >
                        <span className="solar-tour-launch__icon" aria-hidden="true">↻</span>
                        <span>Reset Solar System</span>
                    </button>
                </div>
            )}
            {(meteorActive || meteorError) && (
                <p className="solar-meteor-status" role="status" aria-live="polite" aria-atomic="true">
                    {meteorError || phaseMessages[meteorPhase]}
                </p>
            )}
            {mode === "palebluedot" && paleBlueDotPhase === "looking" && (
                <aside className="solar-info-card solar-pale-blue-dot" aria-label={PALE_BLUE_DOT_TITLE} aria-live="polite">
                    <div className="solar-info-card__header">
                        <div>
                            <span className="solar-info-card__eyebrow">Looking back at home</span>
                            <h2>{PALE_BLUE_DOT_TITLE}</h2>
                        </div>
                    </div>
                    <div className="solar-info-card__body">
                        {PALE_BLUE_DOT_STORY.map((line) => <p key={line}>{line}</p>)}
                    </div>
                    <button
                        type="button"
                        className="solar-info-card__tour-button"
                        onClick={() => sceneApiRef.current?.endPaleBlueDot()}
                    >
                        🚀 Fly home
                    </button>
                </aside>
            )}
            {freeFlightOpen && <SolarFlightControls api={sceneApiRef.current?.freeFlight} bodies={sceneApiRef.current?.freeFlight.getTargets() ?? []} view={freeFlightView}
                clues={system.flight.clues} chapters={system.flight.chapters} badges={system.flight.badges} session={flightSessionRef.current} systemName={system.name} systemPhrase={system.phrase}
                startName={system.planets.find((planet) => planet.id === system.flight.startBodyId)?.name ?? system.flight.startBodyId}
                cameraView={cameraView} onCameraViewChange={selectCameraView}
                onHome={system.home ? undefined : () => sceneApiRef.current?.goHome()} homePhrase={homePhrase}
                onClose={() => {
                    sceneApiRef.current?.stopFreeFlight(); focusRequestRef.current = "fly"; setFreeFlightOpen(false);
                }}
            />}
            {beyondPickerOpen && (mode === "idle" || mode === "freeflight") && <BeyondPicker
                destinations={availableDestinations()}
                onClose={() => setBeyondPickerOpen(false)}
                onChoose={(id) => {
                    setBeyondPickerOpen(false);
                    setSelectedPlanet(null);
                    setTapMessage(null);
                    if (freeFlightOpen) {
                        sceneApiRef.current?.stopFreeFlight();
                        setFreeFlightOpen(false);
                    }
                    sceneApiRef.current?.goBeyond(id);
                }}
            />}
            {beyondState.phase === "warp-out" && <BeyondWarpControls
                progress={beyondState.progress}
                calm={beyondState.calm}
                onHoldChange={(holding) => sceneApiRef.current?.setWarpHolding(holding)}
            />}
            {beyondState.phase === "arrived" && beyondState.destinationId === "space-ripples" && <SpaceRipplesCard
                stage={beyondState.stage}
                onBringTogether={() => sceneApiRef.current?.bringTogether()}
                onReplay={() => sceneApiRef.current?.replayRipples()}
                onHome={() => sceneApiRef.current?.goHomeFromBeyond()}
            />}
            {mode === "lineup" && (
                <div className="solar-lineup" role="region" aria-label="The planets lined up by size">
                    <button
                        type="button"
                        className="solar-tour-launch solar-lineup__back"
                        onClick={() => sceneApiRef.current?.closeLineUp()}
                    >
                        <span className="solar-tour-launch__icon" aria-hidden="true">←</span>
                        <span>Back</span>
                    </button>
                    <p className="solar-lineup__caption">{LINE_UP_LINE}</p>
                </div>
            )}
            {countdown !== null && (
                <p key={countdown} className={`solar-countdown${countdown === 0 ? " solar-countdown--go" : ""}`} role="status">
                    {countdown === 0 ? COUNT_WORDS[0] : countdown}
                </p>
            )}
            <div ref={tripFadeRef} className="solar-trip-fade" aria-hidden="true" />
            {mode === "map" && <GalaxyMapPanel
                catalogue={MAP_CATALOGUE}
                level={mapLevel}
                currentSystemId={system.id}
                getMarkers={() => sceneApiRef.current?.mapMarkers() ?? []}
                onLevel={(level) => { sceneApiRef.current?.setMapLevel(level); setMapLevel(level); }}
                onFocus={(id) => sceneApiRef.current?.focusMap(id)}
                onClose={closeMap}
                onJump={(id) => { closeMap({ refocus: false }); sceneApiRef.current?.travelTo(id); }}
                onGoHome={() => { closeMap({ refocus: false }); sceneApiRef.current?.goHome(); }}
                onVisitEvent={(id) => { closeMap({ refocus: false }); sceneApiRef.current?.goBeyond(id); }}
            />}
            {mode === "trip" && freeFlightView?.trip && <div className="solar-flight">
                <SolarTripHud trip={freeFlightView.trip} onTurnBack={() => sceneApiRef.current?.freeFlight.turnBack()} />
            </div>}
            {tapMessage && !meteorActive && (
                <p key={tapMessage.id} className="solar-meteor-status solar-tap-message" role="status">
                    <span aria-hidden="true">{tapMessage.icon} </span>{tapMessage.text}
                </p>
            )}
            {(mode === "idle" || mode === "tour") && selectedPlanet && (
                <SolarInfoCard body={selectedPlanet} tour={tourState} orbiting={Boolean(autopilotOrbit)} api={sceneApiRef.current} sceneApiRef={sceneApiRef}
                    onClose={() => { if (tourState.active) sceneApiRef.current?.exit(true); else setSelectedPlanet(null); }} />
            )}

            {mode === "constellations" && constellationState.join && <JoinDots
                key={constellations[constellationState.index].id}
                constellation={constellations[constellationState.index]} api={sceneApiRef.current}
                muted={constellationState.muted} index={constellationState.index} total={constellations.length}
                completedIds={joinedConstellations}
                onCollect={(id) => setJoinedConstellations(ids => ids.includes(id) ? ids : [...ids, id])}
                onClose={() => setConstellationState(current => ({ ...current, join: false }))}
                onPrevious={() => setConstellationState(current => ({ ...current, index: Math.max(0, current.index - 1) }))}
                onNext={() => setConstellationState(current => ({ ...current, index: Math.min(constellations.length - 1, current.index + 1) }))}
            />}
            {mode === "constellations" && !constellationState.join && (
                <ConstellationCard
                    viewpointNote={!system.home}
                    onJoinDots={() => setConstellationState(current => ({ ...current, join: true }))}
                    onFindSky={() => sceneApiRef.current?.showConstellationSky(constellations[constellationState.index].id)}
                    constellation={constellations[constellationState.index]}
                    index={constellationState.index}
                    total={constellations.length}
                    muted={constellationState.muted}
                    onPrevious={() => setConstellationState((current) => ({
                        ...current,
                        index: Math.max(0, current.index - 1),
                    }))}
                    onNext={() => setConstellationState((current) => ({
                        ...current,
                        index: Math.min(constellations.length - 1, current.index + 1),
                    }))}
                    onToggleMute={() => setConstellationState((current) => ({
                        ...current,
                        muted: !current.muted,
                    }))}
                    onExit={() => {
                        setConstellationState({ active: false, index: 0, muted: false });
                    }}
                />
            )}
            {drawerVisible && (
                <SolarSettingsDrawer
                    settings={viewSettings}
                    bloom={debugLighting?.bloom}
                    hiddenToggles={hiddenToggles}
                    onBloomChange={(value) => sceneApiRef.current?.setBloom(value)}
                    open={settingsOpen}
                    onOpenChange={(next) => {
                        // Tweakpane sits above the drawer, so fold it away (as Constellations does).
                        if (next) sceneApiRef.current?.collapsePane?.();
                        setSettingsOpen(next);
                    }}
                    onChange={(key, value) => sceneApiRef.current?.setViewSetting(key, value)}
                    speed={speed}
                    onSpeedChange={(key) => sceneApiRef.current?.setSpeed(key)}
                    onReset={() => {
                        setSettingsOpen(false);
                        sceneApiRef.current?.resetSolarSystem();
                    }}
                />
            )}
            {mode === "idle" && <div
                className="solar-system__hint"
                style={{
                    position: "absolute",
                    left: "1rem",
                    // Leaves room for the My view button in the bottom-right corner.
                    maxWidth: "calc(100% - 5.5rem)",
                    padding: "0.5rem 0.75rem",
                    border: "1px solid rgba(255,255,255,0.14)",
                    borderRadius: "999px",
                    background: "rgba(3, 8, 20, 0.72)",
                    color: "rgba(255,255,255,0.78)",
                    font: "500 0.75rem/1.25 system-ui, sans-serif",
                    pointerEvents: "none",
                    backdropFilter: "blur(8px)",
                }}
            >
                Drag to orbit · Pinch or scroll to zoom · Search or select a body to follow
            </div>}
        </div>
    );
}
