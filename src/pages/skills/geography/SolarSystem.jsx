import React, { useRef, useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Pane } from "tweakpane";
import { matchBodies } from "./solarSearch.js";
import { moonFacts } from "./moonFacts.js";
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
import { createAutopilotShip } from "./autopilotShip.js";
import { SHIP_LINE } from "./shipFlight.js";
import { createIss } from "./issStation.js";
import { ISS_LINE } from "./issOrbit.js";
import { createLiftOff } from "./liftOff.js";
import { COUNT_WORDS } from "./liftOffTimeline.js";
import { createLineUp } from "./lineUp.js";
import { LINE_UP_LINE, TRUE_RADII_KM } from "./lineUpLayout.js";
import { createPaleBlueDot } from "./paleBlueDot.js";
import { PALE_BLUE_DOT_STORY, PALE_BLUE_DOT_TITLE } from "./paleBlueDotView.js";
import { isMuted } from "../../../components/celebration/sound/player.js";
import { speak, stopNarration, stopNarrationOf } from "../../../utils/speech.js";
import { createConstellationSky } from "./constellationSky.js";
import { constellations } from "./constellations.js";
import ConstellationCard from "./ConstellationCard.jsx";
import SolarSettingsDrawer from "./SolarSettingsDrawer.jsx";
import { createSaturnRingDetail, SATURN_RING_BANDS, SATURN_RING_LINE } from "./saturnRingDetail.js";
import { COMET_HIT_RADIUS, createHalleyComet } from "./halleyComet.js";
import { COMET_ID, COMET_NAME, COMET_LINE } from "./cometOrbit.js";
import { createEarthAurora } from "./earthAurora.js";
import AuroraCard from "./AuroraCard.jsx";
import MoonPhaseCard from "./MoonPhaseCard.jsx";
import { moonPhase } from "./moonPhase.js";
import SolarMissions from "./SolarMissions.jsx";
import PlanetPlayCard from "./PlanetPlayCard.jsx";
// With the extension: steeringFlight.js once differed from this only by case.
import SteeringGame from "./SteeringGame.jsx";
import { CONSTELLATION_BRIGHTNESS, DEFAULT_SPEED, SPEED_PRESETS, loadViewSettings, saveViewSettings, speedPresetFor } from "./solarViewSettings.js";
import { badgePixelHeight, badgeWorldHeight, pickUnoverlapped } from "./labelLayout.js";
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

export default function ThreeSolarSystem() {
    const containerRef = useRef(null); // container div we control sizing from
    const canvasRef = useRef(null); // managed <canvas>
    const sceneApiRef = useRef(null);
    const searchInputRef = useRef(null);
    const launchButtonRef = useRef(null);
    const flyButtonRef = useRef(null);
    const constellationButtonRef = useRef(null);
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
    const saturnCardOpen = selectedPlanet?.name === "Saturn";
    useEffect(() => () => { if (saturnCardOpen) stopNarrationOf(SATURN_RING_LINE); }, [saturnCardOpen]);
    const cometCardOpen = selectedPlanet?.kind === "comet";
    useEffect(() => () => { if (cometCardOpen) stopNarrationOf(COMET_LINE); }, [cometCardOpen]);
    const earthCardOpen = selectedPlanet?.name === "Earth";
    useEffect(() => () => { if (earthCardOpen) stopNarrationOf(EARTH_DAY_NIGHT_LINE); }, [earthCardOpen]);
    // While the ship flies to a planet the launch buttons step aside, as they
    // do for its card, so another mode can't start mid-flight.
    const [shipFlying, setShipFlying] = useState(false);
    const [tourState, setTourState] = useState({ active: false, index: 0, total: 0, muted: false });
    // The lift-off countdown before the tour (#35): 3, 2, 1, 0 for "Lift off!", or null.
    const [countdown, setCountdown] = useState(null);
    // The planet the line-up by size (#62) was opened from, or null when it's closed.
    const [lineUpName, setLineUpName] = useState(null);
    // The Pale Blue Dot at the end of the tour (#47): null, "flying" or "looking".
    const [paleBlueDotPhase, setPaleBlueDotPhase] = useState(null);
    // "Fly the rocket", the steering game: its own overlay and scene, so the
    // Solar System stops drawing while it's open.
    const [steeringOpen, setSteeringOpen] = useState(false);
    // Cards and their optional 3D sky focus share the catalogue and browse index.
    const [constellationState, setConstellationState] = useState({ active: false, index: 0, muted: false });
    useEffect(() => {
        if (constellationState.active && constellationState.sky) {
            sceneApiRef.current?.showConstellationSky(constellations[constellationState.index].id);
        } else sceneApiRef.current?.closeConstellationSky();
    }, [constellationState.active, constellationState.sky, constellationState.index, sceneReady]);
    useEffect(() => {
        if (!constellationState.active) constellationButtonRef.current?.focus();
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
    const [settingsOpen, setSettingsOpen] = useState(false);
    // The drawer's speed buttons (#4); null when Tweakpane set some other speed.
    const [speed, setSpeed] = useState(DEFAULT_SPEED);

    useEffect(() => {
        if (!containerRef.current || !canvasRef.current) return;
        const defaults = createSolarDefaults();
        let experiment = null;
        let resetting = false;
        let disposed = false;
        let worldTime = createWorldTime();
        const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

        // ================================================================
        // Constants & Config
        // ================================================================
        const getAspect = () => containerRef.current.clientWidth / containerRef.current.clientHeight;
        const MAX_PIXEL_RATIO = Math.min(window.devicePixelRatio, 2);
        const debugFlags = readDebugFlags(window.location.search);
        const currentQuality = () => detectQuality({
            width: containerRef.current.clientWidth,
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

        const textures = {
            sun: textureLoader.load("/static/2k_sun.jpg"),
            mercury: textureLoader.load("/static/2k_mercury.jpg"),
            venus: textureLoader.load("/static/2k_venus.jpg"),
            earth: textureLoader.load("/static/2k_earth.jpg"),
            moon: textureLoader.load("/static/2k_moon.jpg"),
            mars: textureLoader.load("/static/2k_mars.jpg"),
            jupiter: textureLoader.load("/static/2k_jupiter.jpg"),
            saturn: textureLoader.load("/static/2k_saturn.jpg"),
            uranus: textureLoader.load("/static/2k_uranus.jpg"),
            neptune: textureLoader.load("/static/2k_neptune.jpg"),
        };

        const glowSettings = { ...defaults.glow };

        Object.values(textures).forEach((tex) => {
            if (tex && tex.isTexture) tex.colorSpace = THREE.SRGBColorSpace;
        });

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

        const materials = {
            sun: new THREE.MeshStandardMaterial({
                map: textures.sun,
                emissive: new THREE.Color(0xffcc66),
                emissiveMap: textures.sun,
                emissiveIntensity: 0.6,
                metalness: 0.0,
                roughness: 1.0,
            }),
            moon: new THREE.MeshStandardMaterial({ map: textures.moon }),
            mercury: new THREE.MeshStandardMaterial({ map: textures.mercury }),
            venus: new THREE.MeshStandardMaterial({ map: textures.venus }),
            earth: new THREE.MeshStandardMaterial({ map: textures.earth }),
            mars: new THREE.MeshStandardMaterial({ map: textures.mars }),
            jupiter: new THREE.MeshStandardMaterial({ map: textures.jupiter }),
            saturn: new THREE.MeshStandardMaterial({ map: textures.saturn }),
            uranus: new THREE.MeshStandardMaterial({ map: textures.uranus }),
            neptune: new THREE.MeshStandardMaterial({ map: textures.neptune }),
        };

        [
            materials.mercury,
            materials.venus,
            materials.earth,
            materials.mars,
            materials.jupiter,
            materials.saturn,
            materials.uranus,
            materials.neptune,
            materials.moon,
        ].forEach((m) => {
            if (m) {
                m.metalness = 0.0;
                m.roughness = 0.5;
            }
        });

        // ================================================================
        // Planet Data
        // ================================================================
        const planetData = [
            {
                name: "Mercury",
                radius: 0.15,
                distance: 10,
                speed: 0.01,
                material: materials.mercury,
                tilt: "0",
                moons: [],
                tourNarration: "Mercury is our first stop and the closest planet to the Sun. It is a small, rocky world with a huge iron core and some of the most extreme temperature changes in the Solar System.",
                facts: [
                    "Mercury is the smallest planet in our solar system.",
                    "A day on Mercury (sunrise to sunrise) lasts about 176 Earth days.",
                    "It has virtually no atmosphere, so temperatures swing from 430°C (800°F) to -180°C (-290°F).",
                    "Mercury has a large iron core, making up about 85% of its radius.",
                    "It’s the closest planet to the Sun, but not the hottest — Venus holds that title.",
                ],
            },
            {
                name: "Venus",
                radius: 0.38,
                distance: 18.46,
                speed: 0.007,
                material: materials.venus,
                tilt: "177.4",
                moons: [],
                tourNarration: "Venus is wrapped in thick clouds that trap heat, making it the hottest planet. It also turns in the opposite direction to most planets, and one Venus day lasts longer than its year.",
                facts: [
                    "Venus spins backwards — it has a retrograde rotation compared to most planets.",
                    "It’s the hottest planet, with surface temperatures around 465°C (869°F).",
                    "Venus is sometimes called Earth’s twin because of its similar size and mass.",
                    "The thick atmosphere is mostly carbon dioxide with clouds of sulfuric acid.",
                    "A day on Venus is longer than its year — it rotates once every 243 Earth days.",
                ],
            },
            {
                name: "Earth",
                radius: 0.45,
                distance: 25.64,
                speed: 0.005,
                material: materials.earth,
                tilt: "23.44",
                moons: [{ name: "Moon", radius: 0.12, distance: 3, speed: 0.015, tidallyLocked: true }],
                tourNarration: EARTH_DAY_NIGHT_LINE,
                facts: [
                    EARTH_DAY_NIGHT_LINE,
                    "Earth is the only known planet to support life.",
                    "About 71% of Earth's surface is covered by water.",
                    "Earth’s atmosphere protects life by blocking harmful solar radiation.",
                    "Its single moon influences tides and stabilizes Earth’s axial tilt.",
                    "The planet’s magnetic field is generated by its molten iron core.",
                ],
            },
            {
                name: "Mars",
                radius: 0.23,
                distance: 39.0,
                speed: 0.003,
                material: materials.mars,
                tilt: "25.19",
                moons: [
                    { name: "Phobos", radius: 0.05, distance: 2, speed: 0.02 },
                    { name: "Deimos", radius: 0.07, distance: 3, speed: 0.015 },
                ],
                tourNarration: "Mars is a cold desert world coloured red by rusty iron minerals. It preserves signs of ancient rivers and is home to Olympus Mons, the tallest volcano in the Solar System.",
                facts: [
                    "Mars is home to the tallest volcano in the solar system — Olympus Mons.",
                    "It has a thin atmosphere composed mostly of carbon dioxide.",
                    "Mars has two small moons: Phobos and Deimos.",
                    "Scientists believe liquid water once flowed on Mars’ surface.",
                    "Its red color comes from iron oxide (rust) in the soil.",
                ],
            },
            {
                name: "Jupiter",
                radius: 3.75,
                distance: 133.33,
                speed: 0.0015,
                material: materials.jupiter,
                tilt: "3.13",
                moons: [
                    { name: "Io", radius: 0.3, distance: 5, speed: 0.02, color: 0xffe4b5 },
                    { name: "Europa", radius: 0.25, distance: 7, speed: 0.018, color: 0xffffff },
                    { name: "Ganymede", radius: 0.4, distance: 9, speed: 0.016, color: 0x999999 },
                    { name: "Callisto", radius: 0.35, distance: 11, speed: 0.014, color: 0x888888 },
                    { name: "Amalthea", radius: 0.15, distance: 4, speed: 0.022, color: 0xffbb66 },
                ],
                tourNarration: "Jupiter is the giant of the Solar System, with enough room for more than a thousand Earths. Its swirling clouds contain enormous storms, including the centuries-old Great Red Spot.",
                facts: [
                    "Jupiter is the largest planet in the solar system — over 1,300 Earths could fit inside it.",
                    "It has a giant storm called the Great Red Spot that has raged for centuries.",
                    "Jupiter has at least 95 moons — the four largest are Io, Europa, Ganymede, and Callisto.",
                    "Its strong magnetic field is 20,000 times stronger than Earth’s.",
                    "Europa, one of its moons, may have a subsurface ocean that could harbor life.",
                ],
            },
            {
                name: "Saturn",
                radius: 3.45,
                distance: 244.62,
                speed: 0.001,
                material: materials.saturn,
                tilt: "26.73",
                hasRings: true,
                moons: [
                    { name: "Titan", radius: 0.4, distance: 15, speed: 0.015, color: 0xffd27f },
                    { name: "Rhea", radius: 0.2, distance: 12, speed: 0.017, color: 0xffffff },
                    { name: "Enceladus", radius: 0.1, distance: 8, speed: 0.02, color: 0xe0f7fa },
                    { name: "Mimas", radius: 0.1, distance: 7, speed: 0.021, color: 0xaaaaaa },
                    { name: "Tethys", radius: 0.12, distance: 9.2, speed: 0.019, color: 0xdddddd },
                    { name: "Dione", radius: 0.15, distance: 10.5, speed: 0.018, color: 0xcccccc },
                    { name: "Iapetus", radius: 0.18, distance: 20, speed: 0.013, color: 0xbbbbbb },
                    { name: "Hyperion", radius: 0.1, distance: 17, speed: 0.017, color: 0x999999 },
                    { name: "Phoebe", radius: 0.1, distance: 24, speed: 0.011, color: 0x777777 },
                ],
                tourNarration: SATURN_RING_LINE,
                facts: [
                    "Saturn is famous for its beautiful ring system, made mostly of ice and rock.",
                    "It’s the second-largest planet in the solar system.",
                    "Saturn’s moon Titan has lakes and rivers of liquid methane and ethane.",
                    "The planet is less dense than water — it would float in a giant bathtub.",
                    "Its rings stretch out over 280,000 km (175,000 miles) from the planet.",
                ],
            },
            {
                name: "Uranus",
                radius: 1.5,
                distance: 492.31,
                speed: 0.0008,
                material: materials.uranus,
                tilt: "97.77",
                moons: [
                    { name: "Titania", radius: 0.25, distance: 5, speed: 0.016, color: 0xcfcfcf },
                    { name: "Oberon", radius: 0.22, distance: 7, speed: 0.014, color: 0xdddddd },
                    { name: "Umbriel", radius: 0.2, distance: 6, speed: 0.018, color: 0x999999 },
                    { name: "Ariel", radius: 0.18, distance: 4, speed: 0.02, color: 0xffffff },
                    { name: "Miranda", radius: 0.12, distance: 3, speed: 0.022, color: 0xeeeeee },
                ],
                tourNarration: "Uranus is an ice giant that rolls around the Sun almost on its side. Methane in its atmosphere absorbs red light and gives the planet its pale blue-green colour.",
                facts: [
                    "Uranus rotates on its side — its tilt is over 97 degrees.",
                    "It appears blue due to methane in its atmosphere.",
                    "Uranus has 13 faint rings and at least 27 known moons.",
                    "It was the first planet discovered with a telescope (by William Herschel in 1781).",
                    "Seasons on Uranus last about 21 Earth years each.",
                ],
            },
            {
                name: "Neptune",
                radius: 1.5,
                distance: 770.77,
                speed: 0.0006,
                material: materials.neptune,
                tilt: "28.32",
                moons: [
                    { name: "Triton", radius: 0.35, distance: 5, speed: 0.018, color: 0xccccff },
                    { name: "Nereid", radius: 0.12, distance: 7, speed: 0.014, color: 0xaaaaff },
                ],
                tourNarration: "Neptune is the distant blue ice giant and the windiest planet we know. Although it receives little sunlight, its atmosphere drives storms with incredibly fast winds.",
                facts: [
                    "Neptune is the windiest planet, with storms reaching up to 2,100 km/h (1,300 mph).",
                    "It has a deep blue color caused by methane absorption and unknown atmospheric particles.",
                    "Triton, Neptune’s largest moon, orbits backward — a captured Kuiper Belt object.",
                    "A year on Neptune lasts about 165 Earth years.",
                    "Voyager 2 is the only spacecraft to have visited Neptune, in 1989.",
                ],
            },
            {
                name: "Pluto",
                radius: 0.1,
                distance: 1000,
                speed: 0.0004,
                material: new THREE.MeshStandardMaterial({ color: 0xaaaaaa }),
                tilt: "122.5",
                moons: [{ name: "Charon", radius: 0.05, distance: 2.5, speed: 0.018, color: 0xffffff }],
                tourNarration: "Pluto closes our tour at the edge of the planetary neighbourhood. It is a dwarf planet with icy mountains, a heart-shaped plain, and a large companion moon called Charon.",
                facts: [
                    "Pluto was reclassified as a dwarf planet in 2006.",
                    "It orbits the Sun once every 248 Earth years.",
                    "Pluto and its moon Charon are sometimes called a double dwarf planet system.",
                    "Its surface is made of nitrogen ice, with possible water ice mountains.",
                    "NASA’s New Horizons spacecraft flew by Pluto in 2015, revealing its heart-shaped region.",
                ],
            },
        ];

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

            const moons = planet.moons.map((moon, moonIndex) => {
                const moonMaterial = moon.color
                    ? new THREE.MeshStandardMaterial({ color: moon.color })
                    : materials.moon;
                const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
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
                return { mesh: moonMesh, label: moonLabel, data: moon, phase };
            });

            root.userData = { body, axialGroup, planet, planetLabel, moons };
            return root;
        };

        function createOrbitPath(radius, segments = 128, color = 0x888888) {
            const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, 2 * Math.PI, false, 0);
            const points = curve.getPoints(segments);
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.3 });
            const orbit = new THREE.LineLoop(geometry, material);
            orbit.rotation.x = Math.PI / 2;
            orbit.userData.isOrbit = true;
            return orbit;
        }

        function findPlanetDistance(name) {
            const p = planetData.find((p) => p.name === name);
            return p ? p.distance : null;
        }

        // ================================================================
        // Asteroid Belt
        // ================================================================
        const beltSettings = { ...defaults.belt };

        let asteroidBelt = null; // { mesh, angles, radii, speeds, inc, eccPhase, dummy }

        const marsDist = findPlanetDistance("Mars") ?? 39.0;
        const jupDist = findPlanetDistance("Jupiter") ?? 133.33;
        defaults.belt.innerRadius = beltSettings.innerRadius = marsDist + 8;
        defaults.belt.outerRadius = beltSettings.outerRadius = jupDist - 15;

        function createAsteroidBelt(opts = {}) {
            const o = { ...beltSettings, ...opts };

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
        const sun = createMesh(sphereGeometry, materials.sun, 5);
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
                    id: planet.name,
                    name: planet.name,
                    kind: "planet",
                    kindLabel: planet.name === "Pluto" ? "Dwarf planet" : "Planet",
                    parentName: null,
                    object3d: system,
                    radius: planet.radius,
                    planetSystem: system,
                    planetIndex,
                    moon: null,
                },
                ...system.userData.moons.map(({ mesh, data }) => ({
                    id: `${planet.name}/${data.name}`,
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
        const comet = modules.add("halleyComet", createHalleyComet({
            scene, getCamera: () => camera, getOrbitTime: () => worldTime.orbitTime,
            getQuality: currentQuality,
            isHidden: () => lineUp.isActive() || paleBlueDot.hidesScenery() || constellationSky.isActive(),
        }));
        searchEntries.push({ id: COMET_ID, name: COMET_NAME, kind: "comet", kindLabel: "Comet · illustrative orbit",
            parentName: null, object3d: comet.object3d, radius: 1.2, planetSystem: null });
        const searchEntriesById = new Map(searchEntries.map((entry) => [entry.id, entry]));
        setSearchBodies(searchEntries.map(({ id, name, kind, kindLabel, parentName }) => ({
            id,
            name,
            kind,
            kindLabel,
            parentName,
        })));

        const orbitPaths = planetData.map((planet) => {
            let color = 0x888888;
            if (planet.material && planet.material.color) color = planet.material.color.getHex();
            const orbit = createOrbitPath(planet.distance, 128, color);
            orbit.material.opacity = THREE.MathUtils.clamp(1 - planet.distance / 1000, 0.1, 0.6);
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
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.28);
        scene.add(ambientLight);
        const sunLight = new THREE.PointLight(0xffffff, 400, 0, 2);
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
        camera.position.fromArray(defaults.camera.position);
        scene.add(camera);

        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
        const maxAniso = renderer.capabilities.getMaxAnisotropy?.() ?? 0;
        if (maxAniso > 0 && textures.sun) textures.sun.anisotropy = maxAniso;
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
        sky.apply({ milkyWay: simulation.milkyWay });
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
            title: "Solar System",
            expanded: window.innerWidth >= 720,
        });

        pane.element.style.position = "absolute";
        pane.element.style.top = "1rem";
        pane.element.style.right = "1rem";
        pane.element.style.zIndex = "100";

        // Narrow screens share the pane's row with the tour button, so the pane
        // gives up the space that button needs. Set here rather than in CSS
        // because Tweakpane's own injected width rule would otherwise win.
        const wideQuery = window.matchMedia("(min-width: 720px)");
        const applyPaneWidth = () => {
            pane.element.style.width = wideQuery.matches
                ? "min(256px, calc(100% - 2rem))"
                : "min(232px, calc(100% - 10.5rem))";
        };
        applyPaneWidth();
        wideQuery.addEventListener("change", applyPaneWidth);

        const simulationFolder = pane.addFolder({ title: "Simulation Controls" });
        simulationFolder.addBinding(simulation, "orbitSpeedMultiplier", { label: "Orbit Speed", min: 1, max: 100, step: 0.1 }).on("change", (ev) => {
            paused = false;
            setSpeed(speedPresetFor(ev.value));
        });
        simulationFolder.addBinding(simulation, "rotationSpeedMultiplier", { label: "Rotation Speed", min: 1, max: 100, step: 0.1 });
        simulationFolder.addBinding(simulation, "showOrbits", { label: "Show Orbits" }).on("change", (ev) => syncViewSetting("showOrbits", ev.value));
        simulationFolder.addBinding(simulation, "showLabels", { label: "Show Labels" }).on("change", (ev) => syncViewSetting("showLabels", ev.value));
        simulationFolder.addBinding(simulation, "showMoonLabels", { label: "Moon Labels" }).on("change", (ev) => syncViewSetting("showMoonLabels", ev.value));
        simulationFolder.addBinding(simulation, "enableTilt", { label: "Axial Tilt" });

        const lightingFolder = pane.addFolder({ title: "Lighting", expanded: false });
        lightingFolder.addBinding(sunLight, "intensity", { min: 20, max: 400, step: 1, label: "Sun Intensity" });
        lightingFolder.addBinding(ambientLight, "intensity", { min: 0, max: 0.8, step: 0.01, label: "Ambient" });

        const starsFolder = pane.addFolder({ title: "Background Stars", expanded: false });
        starsFolder
            .addBinding(starSettings, "count", { label: "Star Count", min: 0, max: 10000, step: 100 })
            .on("change", () => createStars());
        const backgroundSettings = { ...defaults.background };
        starsFolder
            .addBinding(backgroundSettings, "enabled", { label: "Show Galaxy" })
            .on("change", (ev) => sky.apply({ milkyWay: simulation.milkyWay, skyVisible: ev.value }));

        const cameraFolder = pane.addFolder({ title: "Navigation" });
        const cameraSettings = { focus: "Overview" };
        let updatingCameraFocus = false;
        function updateCameraFocus(value) {
            updatingCameraFocus = true;
            cameraSettings.focus = value;
            pane.refresh();
            queueMicrotask(() => { updatingCameraFocus = false; });
        }
        cameraFolder
            .addBinding(cameraSettings, "focus", {
                label: "Focus",
                options: Object.fromEntries(["Overview", ...planetData.map(({ name }) => name)].map((name) => [name, name])),
            })
            .on("change", ({ value }) => {
                if (updatingCameraFocus) return;
                if (value === "Overview") resetView();
                else flyToPlanet(planetSystems[planetData.findIndex(({ name }) => name === value)]);
            });
        const stopBtnApi = cameraFolder.addButton({ title: "Stop Following" });
        cameraFolder.addButton({ title: "Reset View" }).on("click", () => resetView());
        cameraFolder.addButton({ title: "Start Guided Tour" }).on("click", () => startTour());

        if (debugFlags.debug) {
            const bloomFolder = pane.addFolder({ title: "Bloom (test)", expanded: false });
            bloomFolder.addBinding(bloomSettings, "enabled", { label: "Bloom" }).on("change", () => {
                applyBloom();
                frameReadout?.reset();
            });
            bloomFolder.addBinding(pipeline.settings, "strength", { label: "Strength", min: 0, max: 3, step: 0.05 });
            bloomFolder.addBinding(pipeline.settings, "radius", { label: "Radius", min: 0, max: 1, step: 0.01 });
            bloomFolder.addBinding(pipeline.settings, "threshold", { label: "Threshold", min: 0, max: 2, step: 0.01 });
            bloomFolder.addBinding(bloomSettings, "sunBrightness", { label: "Sun brightness", min: 0.6, max: 6, step: 0.1 }).on("change", applyBloom);
        }

        const glowFolder = pane.addFolder({ title: "Sun Glow", expanded: false });
        glowFolder.addBinding(glowSettings, "enabled", { label: "Visible" });
        glowFolder.addBinding(glowSettings, "intensity", { label: "Intensity", min: 0, max: 0.8, step: 0.01 });
        glowFolder.addBinding(glowSettings, "size", { label: "Size", min: 12, max: 24, step: 0.5 });

        const beltFolder = pane.addFolder({ title: "Asteroid Belt", expanded: false });
        beltFolder
            .addBinding(beltSettings, "enabled", { label: "Visible" })
            .on("change", () => {
                if (asteroidBelt?.mesh) asteroidBelt.mesh.visible = beltSettings.enabled;
            });
        beltFolder
            .addBinding(beltSettings, "count", { label: "Count", min: 0, max: 15000, step: 100 })
            .on("change", () => createAsteroidBelt({ count: beltSettings.count }));
        beltFolder
            .addBinding(beltSettings, "minSize", { label: "Min Size", min: 0.01, max: 0.3, step: 0.01 })
            .on("change", () => createAsteroidBelt());
        beltFolder
            .addBinding(beltSettings, "maxSize", { label: "Max Size", min: 0.05, max: 0.6, step: 0.01 })
            .on("change", () => createAsteroidBelt());
        beltFolder
            .addBinding(beltSettings, "maxInclinationDeg", { label: "Max Incl (°)", min: 0, max: 15, step: 0.1 })
            .on("change", () => createAsteroidBelt());
        beltFolder.addBinding(beltSettings, "eccentricity", { label: "Eccentricity", min: 0, max: 0.15, step: 0.005 });
        beltFolder
            .addBinding(beltSettings, "innerRadius", { label: "Inner R", min: marsDist + 1, max: jupDist - 30, step: 0.5 })
            .on("change", () => createAsteroidBelt());
        beltFolder
            .addBinding(beltSettings, "outerRadius", { label: "Outer R", min: marsDist + 5, max: jupDist - 5, step: 0.5 })
            .on("change", () => createAsteroidBelt());

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

        function stopFollowing() {
            ship?.cancel();
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
            speak(`${intro}${planet.name}. ${planet.tourNarration}`);
        }

        function stopTour(hideCard = false) {
            liftOff.cancel();
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
            desiredCameraPosition.set(0, 72, 128);
            desiredControlsTarget.set(0, 0, 0);
            zoomAnimating = true;
            updateCameraFocus("Overview");
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
            Object.assign(beltSettings, defaults.belt);
            Object.assign(backgroundSettings, defaults.background);
            sunLight.intensity = defaults.lighting.sun;
            ambientLight.intensity = defaults.lighting.ambient;
            sky.apply({ milkyWay: simulation.milkyWay });
            if (stars.geometry.attributes.position.count !== initialStarPositions.length / 3) createStars();
            stars.geometry.attributes.position.array.set(initialStarPositions);
            stars.geometry.attributes.position.needsUpdate = true;
            stars.material.size = starSettings.size;
            if (asteroidBelt.mesh.count !== initialBelt.baseAngles.length) createAsteroidBelt();
            for (const key of ["baseAngles", "radii", "speeds", "scales", "inc", "eccPhase"]) asteroidBelt[key].set(initialBelt[key]);
            asteroidBelt.angles.set(initialBelt.baseAngles);
            asteroidBelt.mesh.instanceMatrix.array.set(initialBelt.matrices);
            asteroidBelt.mesh.instanceMatrix.needsUpdate = true;
            asteroidBelt.mesh.visible = true;
            asteroidBelt.settings = { ...defaults.belt };
            worldTime = createWorldTime();
            applyWorldPoses();
            camera.position.fromArray(defaults.camera.position);
            camera.up.set(0, 1, 0);
            camera.fov = defaults.camera.fov;
            camera.near = defaults.camera.near;
            camera.far = defaults.camera.far;
            camera.zoom = 1;
            camera.updateProjectionMatrix();
            controls.target.fromArray(defaults.camera.target);
            clearControlDamping();
            controls.enabled = true;
            controls.enableDamping = true;
            controls.dampingFactor = 0.075;
            desiredCameraPosition.copy(camera.position);
            desiredControlsTarget.copy(controls.target);
            previousFollowPosition.copy(controls.target);
            parkShipAtEarth();
            cameraSettings.focus = "Overview";
            tourMuted = false;
            setTourState({ active: false, index: 0, total: 0, muted: false });
            pane.hidden = false;
            pane.disabled = false;
            pane.expanded = wideQuery.matches;
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
            if (disposed || resetting || experiment?.isActive()) return false;
            warpIn?.skip();
            // The meteor needs Earth at its exact size.
            bounces.settle();
            try {
                if (!experiment) experiment = createMeteorExperiment({
                    scene, camera, earthBody: planetSystems.find((system) => system.userData.planet.name === "Earth").userData.body,
                    earthTexture: textures.earth,
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

        function createPlanetInfo(planet, planetIndex) {
            const order = planetIndex + 1;
            const ordinalSuffix = order % 10 === 1 && order !== 11
                ? "st"
                : order % 10 === 2 && order !== 12
                    ? "nd"
                    : order % 10 === 3 && order !== 13
                        ? "rd"
                        : "th";
            return {
                kind: "planet",
                name: planet.name,
                classification: planet.name === "Pluto"
                    ? "Dwarf planet"
                    : `${order}${ordinalSuffix} planet from the Sun`,
                moonSummary: planet.moons.length === 0
                    ? "No featured moons"
                    : `${planet.moons.length} featured moon${planet.moons.length === 1 ? "" : "s"}`,
                narration: planet.tourNarration,
                facts: planet.facts,
                factsHeading: "Did you know?",
                summary: null,
                parentName: null,
                parentId: null,
            };
        }

        function createMoonInfo(entry) {
            const planet = planetData[entry.planetIndex];
            // Every moon in planetData has an entry; the fallbacks only guard a
            // future moon added without one.
            const details = moonFacts[entry.id];
            return {
                kind: "moon",
                name: entry.moon.name,
                classification: details?.label ?? "Moon",
                moonSummary: details?.diameter ?? `${planet.name} system`,
                narration: details?.summary ?? planet.tourNarration,
                summary: details?.summary ?? null,
                facts: details?.facts ?? planet.facts,
                factsHeading: "Did you know?",
                parentName: planet.name,
                parentId: planet.name,
            };
        }

        function createFocusInfo(entry) {
            if (entry.kind === "comet") return {
                kind: "comet", name: COMET_NAME, classification: "Comet",
                moonSummary: "Illustrative orbit", narration: COMET_LINE,
                facts: ["The blue ion tail points away from the Sun.", "The wider dust tail curves as sunlight pushes dust away.", "Halley's real trip around the Sun takes about 76 years."],
                factsHeading: "Two tails to spot", summary: COMET_LINE,
            };
            return entry.kind === "moon"
                ? createMoonInfo(entry)
                : createPlanetInfo(planetData[entry.planetIndex], entry.planetIndex);
        }

        // How far the camera frames a planet or moon from.
        function framingDistanceFor(entry) {
            // Moons are tiny, so frame them tighter — but stay clear of minDistance.
            if (entry.kind === "comet") return 32;
            return entry.kind === "moon"
                ? Math.max(entry.radius * 8, 1.8)
                : Math.max(entry.radius * 6, 4);
        }

        function focusEntry(entry, fromTour = false, { card = true } = {}) {
            if (!entry || experiment?.isActive() || resetting) return;
            closeLineUp();
            endPaleBlueDot({ home: false });
            warpIn?.skip();
            if (!fromTour) liftOff.cancel();
            if (!fromTour && tourActive) stopTour();
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
            updateCameraFocus(entry.kind === "comet" ? "Overview" : isMoon ? entry.parentName : entry.name);
        }

        function flyToPlanet(system, fromTour = false) {
            if (!system) return;
            focusEntry(searchEntriesById.get(system.userData.planet.name), fromTour);
        }

        // The tour starts with a lift-off from Earth (#35), unless motion is reduced.
        function startTour() {
            if (experiment?.isActive() || resetting) return;
            if (tourActive || reducedQuery.matches) {
                visitTourPlanet(0);
                return;
            }
            const earth = searchEntriesById.get("Earth");
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
            const clampedIndex = THREE.MathUtils.clamp(nextIndex, 0, planetSystems.length - 1);
            tourActive = true;
            tourIndex = clampedIndex;
            setTourState({
                active: true,
                index: clampedIndex,
                total: planetSystems.length,
                muted: tourMuted,
            });
            flyToPlanet(planetSystems[clampedIndex], true);
            speakPlanet(planetData[clampedIndex], intro);
        }

        function toggleTourNarration() {
            tourMuted = !tourMuted;
            setTourState((current) => ({ ...current, muted: tourMuted }));
            if (tourMuted) stopNarration();
            else if (tourActive) speakPlanet(planetData[tourIndex]);
        }

        const phaseEarth = new THREE.Vector3();
        const phaseMoon = new THREE.Vector3();
        sceneApiRef.current = {
            getMoonPhase: () => {
                const earth = planetSystems.find((system) => system.userData.planet.name === "Earth");
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
            focusById: (id) => focusEntry(searchEntriesById.get(id)),
            resetView,
            resetSolarSystem,
            launchMeteor: launchExperiment,
            start: () => startTour(),
            previous: () => visitTourPlanet(tourIndex - 1),
            next: () => {
                if (tourIndex >= planetSystems.length - 1) startPaleBlueDot();
                else visitTourPlanet(tourIndex + 1);
            },
            endPaleBlueDot: () => endPaleBlueDot(),
            replay: () => speakPlanet(planetData[tourIndex]),
            toggleNarration: toggleTourNarration,
            exit: (hideCard = false) => stopTour(hideCard),
            collapsePane: () => { pane.expanded = false; },
            openLineUp,
            closeLineUp,
            setSpeed: (key) => {
                applySpeed(key);
                pane.refresh();
            },
            // Only reachable from the idle view, so the pane is shown again after.
            setPaused: (value) => {
                drawingPaused = value;
                pane.hidden = value;
                prevTime = performance.now() / 1000;
            },
            setViewSetting: (key, value) => {
                simulation[key] = value;
                pane.refresh();
                syncViewSetting(key, value);
                if (key === "milkyWay") sky.apply({ milkyWay: value, skyVisible: backgroundSettings.enabled });
            },
        };
        setSceneReady(true);

        function onClick(event) {
            if (experiment?.isActive() || lineUp.isActive() || paleBlueDot.isActive() || constellationSky.isActive()) return;
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
            const visibleLabels = labelSprites.filter((label) => label.visible);
            const intersects = clickRaycaster.intersectObjects([...visibleLabels, ...planetBodies, sun, ship.hitTarget, iss.hitTarget, ...(comet.object3d.visible ? [comet.hitTarget] : [])], false);
            if (intersects[0]?.object === sun) {
                tapSun();
            } else if (intersects[0]?.object === comet.hitTarget && comet.object3d.visible) {
                focusEntry(searchEntriesById.get(COMET_ID));
            } else if (intersects[0]?.object === ship.hitTarget || intersects[0]?.object === iss.hitTarget) {
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
            // The line-up has its own controls, which need this event.
            if (lineUp.isActive()) return;
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
            if (e.key !== "Escape") return;
            // The steering game is open on top and closes itself on Escape.
            if (drawingPaused || constellationSky.isActive()) return;
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

        renderer.domElement.addEventListener("click", onClick, true);
        renderer.domElement.addEventListener("wheel", onWheel, { passive: false, capture: true });
        window.addEventListener("keydown", onKeyDown);
        controls.addEventListener("start", onControlsStart);
        stopBtnApi.on("click", () => stopFollowing());

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
                system.userData.moons.forEach(({ mesh, data: moonData, phase }) => {
                    const moonPose = getBodyPose({ ...moonData, phase }, worldTime);
                    mesh.position.set(moonPose.position.x, moonPose.position.y, moonPose.position.z);
                    mesh.rotation.y = moonPose.rotationY;
                });
            });
        }

        // Tap feedback (#24, #25, #26).
        const bounces = modules.add("bounces", createBounces());
        const sunSneeze = modules.add("sunSneeze", createSunSneeze({ scene, sun, camera, quality: currentQuality() }));
        const sunTaps = createSunTapCounter();

        modules.add("earthDayNight", createEarthDayNight({
            material: materials.earth,
            nightTexture: textureLoader.load("/static/2k_earth_nightmap.jpg"),
        }));

        // Earth's clouds (#11) and the glow round Earth, Venus and Mars (#12).
        modules.add("atmospheres", createPlanetAtmospheres({
            bodies: Object.fromEntries(planetSystems.map((system) => [system.userData.planet.name, system.userData.body])),
            cloudTexture: textureLoader.load("/static/2k_earth_clouds.jpg"),
            getSpinTime: () => worldTime.spinTime,
        }));
        modules.add("earthAurora", createEarthAurora({
            earthBody: planetSystems.find((system) => system.userData.planet.name === "Earth").userData.body,
            getTime: () => worldTime.elapsed,
            reducedMotion: () => reducedQuery.matches,
            getQuality: currentQuality,
        }));
        const saturnSystem = planetSystems.find((system) => system.userData.planet.name === "Saturn");
        modules.add("saturnRingDetail", createSaturnRingDetail({
            axialGroup: saturnSystem.userData.axialGroup,
            ringGroup: saturnSystem.userData.axialGroup.children.find((child) => child.userData.isRing),
            radius: saturnSystem.userData.planet.radius,
            getCamera: () => camera, getOrbitTime: () => worldTime.orbitTime,
            getQuality: currentQuality, reducedMotion: () => reducedQuery.matches,
        }));
        // The International Space Station (#50) zips round Earth; tap it.
        const iss = modules.add("iss", createIss({
            earthRoot: searchEntriesById.get("Earth").object3d,
            getOrbitTime: () => worldTime.orbitTime,
            quality: currentQuality(),
        }));

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

        // The autopilot ship (#34) starts beside Earth.
        const ship = modules.add("ship", createAutopilotShip({
            scene, camera, controls, quality: currentQuality(), reducedMotion: () => reducedQuery.matches,
        }));
        const parkShipAtEarth = () => {
            const earth = searchEntriesById.get("Earth");
            ship.park(earth.object3d, { radius: earth.radius, framingDistance: framingDistanceFor(earth) });
        };
        parkShipAtEarth();

        // The warp-in's streaks rush past on every flight too, strongest at top speed.
        const flightStreaks = createWarpStreaks({ camera, quality: currentQuality() });
        modules.add("flightStreaks", {
            update(dt, { active }) {
                const thrust = active ? 0 : ship.thrust();
                flightStreaks.update(dt, { speed: thrust, brightness: thrust });
            },
            dispose: () => flightStreaks.dispose(),
        });

        // Lift-off (#35): a countdown at Earth, then the ship leaves for the tour's first stop.
        const liftOff = modules.add("liftOff", createLiftOff({
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
        const lineUp = modules.add("lineUp", createLineUp({
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
            if (experiment?.isActive() || resetting || lineUp.isActive()) return;
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

        // The Pale Blue Dot (#47): after the last stop, the ship flies out past
        // Neptune and the camera looks back at home, as Voyager 1 did.
        const paleBlueDot = modules.add("paleBlueDot", createPaleBlueDot({
            scene,
            camera,
            controls,
            getEarthPosition: (out) => searchEntriesById.get("Earth").object3d.getWorldPosition(out),
            defaultFov: defaults.camera.fov,
            reducedMotion: () => reducedQuery.matches,
        }));

        function startPaleBlueDot() {
            if (experiment?.isActive() || resetting) return;
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
                parkShipAtEarth();
                resetView();
            }
        }

        // Warp-in arrival (#1), once per visit. Anything the child does skips it.
        const warpIn = shouldPlayWarp({ reducedMotion: reducedQuery.matches }) ? modules.add("warpIn", createWarpIn({
            camera,
            endPosition: new THREE.Vector3().fromArray(defaults.camera.position),
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
        let drawingPaused = false;
        let wasFlying = false;

        function animate() {
            if (drawingPaused) {
                animationFrameId = requestAnimationFrame(animate);
                return;
            }
            const frameStart = performance.now();
            const now = frameStart / 1000;
            let dt = now - prevTime;
            prevTime = now;
            dt = document.hidden ? 0 : Math.min(Math.max(dt, 0), 0.1);
            const active = experiment?.isActive() ?? false;
            if (!active) {
                worldTime = advanceWorldTime(worldTime, dt, simulation, paused);
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
            asteroidBelt.mesh.visible = !quiet && beltSettings.enabled;

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
                    ? (simulation.showMoonLabels || forceMoonLabels)
                        && followActive
                        && label.userData.planetSystem === followSystem
                        // The followed body needs no label of its own.
                        && label.userData.owner !== followTarget
                    : simulation.showLabels && !followActive);
                if (label.visible) shownBadges.push({ label, distance });
            });
            // Where badges overlap, the body nearer the camera keeps its name.
            const onScreen = shownBadges
                .sort((a, b) => a.distance - b.distance)
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

            if (!active && !constellationSky.isActive() && followActive && followTarget && !flying) {
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
            } else if (!active && !constellationSky.isActive() && zoomAnimating) {
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
                if (!constellationSky.isActive()) controls.update();
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
            if (lineUp.isActive()) lineUp.render();
            else pipeline.render();
            if (frameReadout && lastFrameStart > 0 && !document.hidden) {
                frameReadout.record(frameStart - lastFrameStart, performance.now() - frameStart);
            }
            lastFrameStart = frameStart;
            animationFrameId = requestAnimationFrame(animate);
        }
        animate();

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
            const seenTextures = new Set(Object.values(textures));
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
    }, []);

    useEffect(() => {
        if (searchExpanded) searchInputRef.current?.focus();
    }, [searchExpanded]);

    useEffect(() => {
        if (!sceneReady) return;
        if (focusRequestRef.current === "launch" && meteorPhase === "ready") launchButtonRef.current?.focus();
        else if (focusRequestRef.current === "reset" && meteorPhase !== "ready") resetButtonRef.current?.focus();
        else return;
        focusRequestRef.current = null;
    }, [meteorPhase, sceneReady]);

    // Closing the rocket game hands focus back to the button that opened it.
    useEffect(() => {
        if (steeringOpen || focusRequestRef.current !== "fly") return;
        focusRequestRef.current = null;
        flyButtonRef.current?.focus();
    }, [steeringOpen]);

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

    const meteorActive = meteorPhase !== "ready";
    // Derived, never stored: meteorPhase, tourState and constellationState are
    // the sources of truth, so these four modes cannot drift out of sync.
    let mode = "idle";
    if (meteorActive) mode = "meteor";
    else if (steeringOpen) mode = "steering";
    else if (lineUpName) mode = "lineup";
    else if (paleBlueDotPhase) mode = "palebluedot";
    else if (tourState.active) mode = "tour";
    else if (countdown !== null) mode = "liftoff";
    else if (constellationState.active) mode = "constellations";
    // Same rule as the launch buttons: the drawer steps aside for a planet
    // card or any other mode, and comes back closed.
    const drawerVisible = mode === "idle" && !selectedPlanet && !shipFlying;
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
                className={`solar-system__canvas${mode === "constellations" && !constellationState.sky ? " solar-system__canvas--dimmed" : ""}`}
                aria-label="Interactive model of the Solar System"
                style={{ display: "block", width: "100%", height: "100%", cursor: meteorActive ? "default" : "grab" }}
            />
            {mode === "idle" && (
                <div className={`solar-toolbar${searchExpanded ? " solar-toolbar--searching" : ""}`}>
                    <button
                        type="button"
                        className="solar-search-toggle"
                        aria-label="Search planets and moons"
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
                            aria-label="Search planets and moons"
                            aria-expanded={resultsVisible}
                            aria-controls="solar-search-results"
                            aria-autocomplete="list"
                            aria-activedescendant={
                                resultsVisible && highlighted >= 0
                                    ? `solar-search-option-${highlighted}`
                                    : undefined
                            }
                            placeholder="Search planets & moons"
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
            <SolarMissions enabled={mode === "idle" && !shipFlying} body={missionArrival}
                onOpen={() => sceneApiRef.current?.collapsePane?.()}
                onStart={() => { setMissionArrival(null); setSelectedPlanet(null); sceneApiRef.current?.resetView(); }} />
            {mode === "idle" && !selectedPlanet && !shipFlying && (
                <div className="solar-launch-buttons">
                    <button
                        type="button"
                        className="solar-tour-launch"
                        aria-label="Tour the Solar System"
                        onClick={() => sceneApiRef.current?.start()}
                    >
                        <span className="solar-tour-launch__icon" aria-hidden="true">▶</span>
                        <span className="solar-action-label">Tour the Solar System</span>
                    </button>
                    <button
                        type="button"
                        className="solar-tour-launch"
                        ref={flyButtonRef}
                        aria-label="Fly the rocket"
                        disabled={!sceneReady}
                        onClick={() => {
                            sceneApiRef.current?.setPaused(true);
                            setSteeringOpen(true);
                        }}
                    >
                        <span className="solar-tour-launch__icon" aria-hidden="true">🕹</span>
                        <span className="solar-action-label">Fly the rocket</span>
                    </button>
                    <button
                        type="button"
                        className="solar-tour-launch"
                        aria-label="Explore constellations"
                        ref={constellationButtonRef}
                        disabled={!sceneReady}
                        onClick={() => {
                            sceneApiRef.current?.collapsePane?.();
                            setConstellationState({ active: true, index: 0, muted: false });
                        }}
                    >
                        <span className="solar-tour-launch__icon" aria-hidden="true">✦</span>
                        <span className="solar-action-label">Constellations</span>
                    </button>
                    <button
                        ref={launchButtonRef}
                        type="button"
                        className="solar-tour-launch"
                        aria-label="Launch meteor"
                        disabled={!sceneReady}
                        onClick={() => sceneApiRef.current?.launchMeteor()}
                    >
                        <span className="solar-tour-launch__icon" aria-hidden="true">☄</span>
                        <span className="solar-action-label">Launch meteor</span>
                    </button>
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
            {steeringOpen && (
                <SteeringGame
                    onClose={() => {
                        focusRequestRef.current = "fly";
                        setSteeringOpen(false);
                        sceneApiRef.current?.setPaused(false);
                    }}
                />
            )}
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
            {tapMessage && !meteorActive && (
                <p key={tapMessage.id} className="solar-meteor-status solar-tap-message" role="status">
                    <span aria-hidden="true">{tapMessage.icon} </span>{tapMessage.text}
                </p>
            )}
            {(mode === "idle" || mode === "tour") && selectedPlanet && (
                <aside
                    className={`solar-info-card${tourState.active ? " solar-info-card--tour" : ""}`}
                    aria-label={`${selectedPlanet.name} information`}
                    aria-live="polite"
                >
                    <div className="solar-info-card__header">
                        <div>
                            <span className="solar-info-card__eyebrow">
                                {tourState.active
                                    ? `Tour stop ${tourState.index + 1} of ${tourState.total}`
                                    : selectedPlanet.kind === "moon"
                                        ? `Moon of ${selectedPlanet.parentName}`
                                        : selectedPlanet.kind === "comet" ? "Comet explorer" : "Planet profile"}
                            </span>
                            <h2>{selectedPlanet.name}</h2>
                        </div>
                        <button
                            type="button"
                            className="solar-info-card__close"
                            aria-label={`Hide ${selectedPlanet.name} information`}
                            onClick={() => {
                                if (tourState.active) sceneApiRef.current?.exit(true);
                                else setSelectedPlanet(null);
                            }}
                        >
                            ×
                        </button>
                    </div>
                    <div className="solar-info-card__body">
                        <div className="solar-info-card__meta">
                            <span>{selectedPlanet.classification}</span>
                            <span>{selectedPlanet.moonSummary}</span>
                        </div>
                        {selectedPlanet.summary && !tourState.active && (
                            <p className="solar-info-card__summary">{selectedPlanet.summary}</p>
                        )}
                        {!tourState.active && (
                            <PlanetPlayCard
                                bodyName={selectedPlanet.name}
                                onLineUp={TRUE_RADII_KM[selectedPlanet.name] ? () => sceneApiRef.current?.openLineUp(selectedPlanet.name) : undefined}
                            />
                        )}
                        {tourState.active && (
                            <div className="solar-tour-narration">
                                <span aria-hidden="true">{tourState.muted ? "◼" : "♪"}</span>
                                <p>{selectedPlanet.narration}</p>
                            </div>
                        )}
                        {selectedPlanet.name === "Saturn" && !tourState.active && (
                            <details className="solar-saturn-rings">
                                <summary>🧊 What are the rings made of?</summary>
                                <p>{SATURN_RING_LINE}</p>
                                <button type="button" className="solar-info-card__tour-button" onClick={() => { if (!isMuted()) speak(SATURN_RING_LINE); }}>🔊 Hear about Saturn’s rings</button>
                            </details>
                        )}
                        {selectedPlanet.kind === "comet" && (
                            <button type="button" className="solar-info-card__tour-button solar-comet-read" onClick={() => { if (!isMuted()) speak(COMET_LINE); }}>
                                🔊 Hear about the comet
                            </button>
                        )}
                        {selectedPlanet.name === "Earth" && !tourState.active && (
                            <button type="button" className="solar-info-card__tour-button" onClick={() => { if (!isMuted()) speak(EARTH_DAY_NIGHT_LINE); }}>
                                🔊 Hear about day and night
                            </button>
                        )}
                        {(selectedPlanet.name === "Earth" || (selectedPlanet.name === "Moon" && selectedPlanet.parentName === "Earth")) && (
                            <MoonPhaseCard key={selectedPlanet.name} sceneApiRef={sceneApiRef} muted={tourState.active && tourState.muted} />
                        )}
                        {selectedPlanet.name === "Earth" && <AuroraCard muted={tourState.active && tourState.muted} />}
                        <h3>{tourState.active ? "More to discover" : selectedPlanet.factsHeading}</h3>
                        <ul>
                            {selectedPlanet.facts.map((fact) => <li key={fact}>{fact}</li>)}
                        </ul>
                    </div>
                    {tourState.active ? (
                        <div className="solar-tour-controls" aria-label="Tour navigation">
                            <div className="solar-tour-controls__audio">
                                <button type="button" aria-label="Replay narration" title="Replay narration" onClick={() => sceneApiRef.current?.replay()} disabled={tourState.muted}>
                                    <span className="solar-control-icon" aria-hidden="true">↻</span>
                                    <span className="solar-control-label">Replay narration</span>
                                </button>
                                <button type="button" aria-label={tourState.muted ? "Turn sound on" : "Mute"} title={tourState.muted ? "Turn sound on" : "Mute"} onClick={() => sceneApiRef.current?.toggleNarration()}>
                                    <span className="solar-control-icon" aria-hidden="true">{tourState.muted ? "🔊" : "🔇"}</span>
                                    <span className="solar-control-label">{tourState.muted ? "Turn sound on" : "Mute"}</span>
                                </button>
                            </div>
                            <div className="solar-tour-controls__nav">
                                <button
                                    type="button"
                                    aria-label="Previous"
                                    title="Previous"
                                    onClick={() => sceneApiRef.current?.previous()}
                                    disabled={tourState.index === 0}
                                >
                                    <span className="solar-control-icon" aria-hidden="true">←</span>
                                    <span className="solar-control-label">← Previous</span>
                                </button>
                                <button
                                    type="button"
                                    className="solar-tour-controls__next"
                                    aria-label={tourState.index === tourState.total - 1 ? "One last look back at Earth" : "Next"}
                                    title={tourState.index === tourState.total - 1 ? "One last look back at Earth" : "Next"}
                                    onClick={() => sceneApiRef.current?.next()}
                                >
                                    <span className="solar-control-icon" aria-hidden="true">{tourState.index === tourState.total - 1 ? "🌍" : "→"}</span>
                                    <span className="solar-control-label">{tourState.index === tourState.total - 1 ? "One last look →" : "Next →"}</span>
                                </button>
                            </div>
                        </div>
                    ) : selectedPlanet.kind === "moon" ? (
                        <button
                            type="button"
                            className="solar-info-card__tour-button"
                            onClick={() => sceneApiRef.current?.focusById(selectedPlanet.parentId)}
                        >
                            View {selectedPlanet.parentName}
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="solar-info-card__tour-button"
                            onClick={() => sceneApiRef.current?.start()}
                        >
                            Start guided tour
                        </button>
                    )}
                </aside>
            )}
            {mode === "constellations" && (
                <ConstellationCard
                    skyView={Boolean(constellationState.sky)}
                    onFindSky={() => {
                        if (constellationState.sky) sceneApiRef.current?.showConstellationSky(constellations[constellationState.index].id);
                        else setConstellationState(current => ({ ...current, sky: true }));
                    }}
                    onShowChart={() => setConstellationState(current => ({ ...current, sky: false }))}
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
