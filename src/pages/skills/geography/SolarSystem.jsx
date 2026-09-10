import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Pane } from "tweakpane";
import "./SolarSystem.css";

/**
 * ThreeSolarSystem.jsx
 * React wrapper around your standalone Three.js solar system.
 *
 * Notes:
 * - Keep your textures & cubemap under public/static/... so the existing paths work.
 * - This component is self-contained; mount it full-screen or inside any sized parent.
 */

export default function ThreeSolarSystem() {
    const containerRef = useRef(null); // container div we control sizing from
    const canvasRef = useRef(null); // managed <canvas>
    const tourApiRef = useRef(null);
    const [selectedPlanet, setSelectedPlanet] = useState(null);
    const [tourState, setTourState] = useState({ active: false, index: 0, total: 0, muted: false });

    useEffect(() => {
        if (!containerRef.current || !canvasRef.current) return;

        // ================================================================
        // Constants & Config
        // ================================================================
        const getAspect = () => containerRef.current.clientWidth / containerRef.current.clientHeight;
        const MAX_PIXEL_RATIO = Math.min(window.devicePixelRatio, 2);

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

        const glowSettings = {
            enabled: true,
            intensity: 0.42,
            size: 16,
        };

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
                moons: [{ name: "Moon", radius: 0.12, distance: 3, speed: 0.015 }],
                tourNarration: "Earth is our ocean world and the only place where we know life exists. Its atmosphere, magnetic field, and unusually stable climate help living things thrive.",
                facts: [
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
                tourNarration: "Saturn is a gas giant surrounded by thousands of icy ringlets. The gaps and bands in its rings are shaped by gravity from Saturn and its many moons.",
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

        function createLabel(text, fontSize = 64, color = "#ffffff") {
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
            context.fillStyle = "rgba(5, 10, 24, 0.72)";
            context.beginPath();
            context.roundRect(1, 1, canvas.width - 2, canvas.height - 2, canvas.height / 2);
            context.fill();
            context.strokeStyle = "rgba(255, 255, 255, 0.22)";
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
            sprite.scale.set(1.75 * aspect, 1.75, 1);

            return sprite;
        }

        function createSaturnRings(radius) {
            const ringGroup = new THREE.Group();
            const bands = [
                [1.22, 1.30, 0xb4a98c, 0.18],
                [1.32, 1.42, 0xc9bea1, 0.28],
                [1.44, 1.53, 0xe0d2ad, 0.5],
                [1.54, 1.60, 0xbcae91, 0.38],
                // Cassini Division: the deliberate gap between the B and A rings.
                [1.66, 1.72, 0xd8cbaa, 0.4],
                [1.73, 1.80, 0xa99e86, 0.26],
            ];

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
            planetLabel.userData.labelOffset = planet.radius + 1;
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
                moonLabel.userData.labelOffset = moon.radius + 1.25;
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
        const beltSettings = {
            enabled: true,
            count: 4500,
            innerRadius: null,
            outerRadius: null,
            minSize: 0.25,
            maxSize: 0.3,
            maxInclinationDeg: 3,
            eccentricity: 0.04,
            minSpeed: 0.0004,
            maxSpeed: 0.0012,
        };

        let asteroidBelt = null; // { mesh, angles, radii, speeds, inc, eccPhase, dummy }

        const marsDist = findPlanetDistance("Mars") ?? 39.0;
        const jupDist = findPlanetDistance("Jupiter") ?? 133.33;
        beltSettings.innerRadius = marsDist + 8;
        beltSettings.outerRadius = jupDist - 15;

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
            asteroidBelt = { mesh, angles, radii, speeds, inc, eccPhase, dummy, settings: o };
        }

        function updateAsteroidBelt(dt, elapsed) {
            if (!asteroidBelt || !beltSettings.enabled) return;
            const { mesh, angles, radii, speeds, inc, eccPhase, dummy, settings } = asteroidBelt;
            const count = angles.length;

            for (let i = 0; i < count; i++) {
                angles[i] += speeds[i] * dt * simulation.orbitSpeedMultiplier;
                const rBase = radii[i];
                const r = rBase * (1 + settings.eccentricity * Math.sin(eccPhase[i] + elapsed * 0.2));

                const ca = Math.cos(angles[i]);
                const sa = Math.sin(angles[i]);
                let x = ca * r;
                let z = sa * r;
                const y = Math.sin(inc[i]) * z;
                z = Math.cos(inc[i]) * z;

                dummy.position.set(x, y, z);
                dummy.rotation.y = angles[i];
                dummy.updateMatrix();
                mesh.setMatrixAt(i, dummy.matrix);
            }
            mesh.instanceMatrix.needsUpdate = true;
            mesh.visible = beltSettings.enabled;
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

        const orbitPaths = planetData.map((planet) => {
            let color = 0x888888;
            if (planet.material && planet.material.color) color = planet.material.color.getHex();
            const orbit = createOrbitPath(planet.distance, 128, color);
            orbit.material.opacity = THREE.MathUtils.clamp(1 - planet.distance / 1000, 0.1, 0.6);
            scene.add(orbit);
            return orbit;
        });

        createAsteroidBelt();

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
        const starSettings = { count: 5000, size: 0.6 };

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
        camera.position.set(0, 72, 128);
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
        const simulation = {
            orbitSpeedMultiplier: 1,
            rotationSpeedMultiplier: 1,
            showOrbits: true,
            showLabels: true,
            showMoonLabels: false,
            enableTilt: true,
        };

        const pane = new Pane({
            container: containerRef.current,
            title: "Solar System",
            expanded: window.innerWidth >= 720,
        });

        pane.element.style.position = "absolute";
        pane.element.style.top = "1rem";
        pane.element.style.right = "1rem";
        pane.element.style.width = "min(256px, calc(100% - 2rem))";
        pane.element.style.zIndex = "100";

        const simulationFolder = pane.addFolder({ title: "Simulation Controls" });
        simulationFolder.addBinding(simulation, "orbitSpeedMultiplier", { label: "Orbit Speed", min: 1, max: 100, step: 0.1 });
        simulationFolder.addBinding(simulation, "rotationSpeedMultiplier", { label: "Rotation Speed", min: 1, max: 100, step: 0.1 });
        simulationFolder.addBinding(simulation, "showOrbits", { label: "Show Orbits" });
        simulationFolder.addBinding(simulation, "showLabels", { label: "Show Labels" });
        simulationFolder.addBinding(simulation, "showMoonLabels", { label: "Moon Labels" });
        simulationFolder.addBinding(simulation, "enableTilt", { label: "Axial Tilt" });

        const lightingFolder = pane.addFolder({ title: "Lighting", expanded: false });
        lightingFolder.addBinding(sunLight, "intensity", { min: 20, max: 400, step: 1, label: "Sun Intensity" });
        lightingFolder.addBinding(ambientLight, "intensity", { min: 0, max: 0.8, step: 0.01, label: "Ambient" });

        const starsFolder = pane.addFolder({ title: "Background Stars", expanded: false });
        starsFolder
            .addBinding(starSettings, "count", { label: "Star Count", min: 0, max: 10000, step: 100 })
            .on("change", () => createStars());
        const backgroundSettings = { enabled: true };
        starsFolder
            .addBinding(backgroundSettings, "enabled", { label: "Show Galaxy" })
            .on("change", (ev) => {
                scene.background = ev.value ? backgroundTexture : null;
            });

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
        cameraFolder.addButton({ title: "Start Guided Tour" }).on("click", () => visitTourPlanet(0));

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
        let followSystem = null;
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
            followActive = false;
            followSystem = null;
            zoomAnimating = false;
            desiredCameraPosition.copy(camera.position);
            desiredControlsTarget.copy(controls.target);
        }

        function stopNarration() {
            if ("speechSynthesis" in window) window.speechSynthesis.cancel();
        }

        function speakPlanet(planet) {
            if (tourMuted || !("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) return;
            stopNarration();
            const utterance = new SpeechSynthesisUtterance(`${planet.name}. ${planet.tourNarration}`);
            utterance.lang = "en-GB";
            utterance.rate = 0.95;
            utterance.pitch = 1.02;
            window.speechSynthesis.speak(utterance);
        }

        function stopTour(hideCard = false) {
            tourActive = false;
            stopNarration();
            setTourState((current) => ({ ...current, active: false }));
            if (hideCard) setSelectedPlanet(null);
        }

        function resetView() {
            stopFollowing();
            stopTour(true);
            followBlendT = 0;
            desiredCameraPosition.set(0, 72, 128);
            desiredControlsTarget.set(0, 0, 0);
            zoomAnimating = true;
            updateCameraFocus("Overview");
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
                name: planet.name,
                classification: planet.name === "Pluto"
                    ? "Dwarf planet"
                    : `${order}${ordinalSuffix} planet from the Sun`,
                moonSummary: planet.moons.length === 0
                    ? "No featured moons"
                    : `${planet.moons.length} featured moon${planet.moons.length === 1 ? "" : "s"}`,
                narration: planet.tourNarration,
                facts: planet.facts,
            };
        }

        function flyToPlanet(system, fromTour = false) {
            if (!system) return;
            if (!fromTour && tourActive) stopTour();
            followActive = true;
            followSystem = system;
            zoomAnimating = false;
            followBlendT = 0;
            followBlendCamStart.copy(camera.position);
            followBlendTargetStart.copy(controls.target);
            const planetPos = new THREE.Vector3();
            system.getWorldPosition(planetPos);
            const radius = system.userData.planet.radius;
            followDesiredDistance = Math.max(radius * 6, 4);
            followOffset.subVectors(camera.position, planetPos);
            if (followOffset.lengthSq() < 0.001) followOffset.set(0, radius * 2, radius * 6);
            followOffset.setLength(followDesiredDistance);
            previousFollowPosition.copy(planetPos);
            const planet = system.userData.planet;
            const planetIndex = planetData.indexOf(planet);
            setSelectedPlanet(createPlanetInfo(planet, planetIndex));
            updateCameraFocus(planet.name);
        }

        function visitTourPlanet(nextIndex) {
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
            speakPlanet(planetData[clampedIndex]);
        }

        function toggleTourNarration() {
            tourMuted = !tourMuted;
            setTourState((current) => ({ ...current, muted: tourMuted }));
            if (tourMuted) stopNarration();
            else if (tourActive) speakPlanet(planetData[tourIndex]);
        }

        tourApiRef.current = {
            start: () => visitTourPlanet(0),
            previous: () => visitTourPlanet(tourIndex - 1),
            next: () => {
                if (tourIndex >= planetSystems.length - 1) stopTour();
                else visitTourPlanet(tourIndex + 1);
            },
            replay: () => speakPlanet(planetData[tourIndex]),
            toggleNarration: toggleTourNarration,
            exit: (hideCard = false) => stopTour(hideCard),
        };

        function onClick(event) {
            const rect = renderer.domElement.getBoundingClientRect();
            clickMouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            clickMouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            clickRaycaster.setFromCamera(clickMouse, camera);
            const visibleLabels = labelSprites.filter((label) => label.visible);
            const intersects = clickRaycaster.intersectObjects([...visibleLabels, ...planetBodies], false);
            if (intersects.length > 0) {
                const planetIndex = intersects[0].object.userData.planetIndex;
                flyToPlanet(planetSystems[planetIndex]);
            } else {
                stopFollowing();
            }
        }

        function onWheel(event) {
            event.preventDefault();
            event.stopImmediatePropagation();

            const zoomFactor = Math.exp(THREE.MathUtils.clamp(event.deltaY, -120, 120) * 0.0025);
            if (followActive && followSystem) {
                const radius = followSystem.userData.planet.radius;
                followDesiredDistance = THREE.MathUtils.clamp(
                    followDesiredDistance * zoomFactor,
                    Math.max(radius * 2.2, 1.5),
                    Math.max(radius * 80, 40),
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
            zoomAnimating = false;
            desiredCameraPosition.copy(camera.position);
            desiredControlsTarget.copy(controls.target);
        }

        function onKeyDown(e) {
            if (e.key === "Escape") {
                stopFollowing();
                stopTour(true);
            }
        }

        renderer.domElement.addEventListener("click", onClick, true);
        renderer.domElement.addEventListener("wheel", onWheel, { passive: false, capture: true });
        window.addEventListener("keydown", onKeyDown);
        controls.addEventListener("start", onControlsStart);
        stopBtnApi.on("click", () => stopFollowing());

        // ================================================================
        // Animation Loop
        // ================================================================
        const clock = new THREE.Clock();
        let prevTime = performance.now() / 1000;

        const labelWorldPosition = new THREE.Vector3();
        const currentFollowPosition = new THREE.Vector3();
        let animationFrameId = 0;

        function animate() {
            const now = performance.now() / 1000;
            let dt = now - prevTime;
            prevTime = now;
            dt = Math.min(dt, 0.1);
            const elapsed = clock.getElapsedTime();

            planetSystems.forEach((system, i) => {
                const data = planetData[i];
                const orbitSpeed = data.speed * simulation.orbitSpeedMultiplier;
                system.position.x = Math.sin(elapsed * orbitSpeed) * data.distance;
                system.position.z = Math.cos(elapsed * orbitSpeed) * data.distance;

                const rotationSpeed = data.speed * simulation.rotationSpeedMultiplier;
                system.userData.axialGroup.rotation.z = simulation.enableTilt
                    ? THREE.MathUtils.degToRad(data.tilt || 0)
                    : 0;
                system.userData.body.rotation.y += rotationSpeed * dt * 60;

                system.userData.moons.forEach(({ mesh, data: moonData, phase }) => {
                    const moonOrbitSpeed = moonData.speed * simulation.orbitSpeedMultiplier;
                    mesh.rotation.y += moonData.speed * simulation.rotationSpeedMultiplier * dt * 60;
                    mesh.position.x = Math.sin(elapsed * moonOrbitSpeed + phase) * moonData.distance;
                    mesh.position.z = Math.cos(elapsed * moonOrbitSpeed + phase) * moonData.distance;
                });
            });

            orbitPaths.forEach((orbit) => (orbit.visible = simulation.showOrbits));

            labelSprites.forEach((label) => {
                label.userData.owner.getWorldPosition(labelWorldPosition);
                label.position.copy(labelWorldPosition);
                label.position.y += label.userData.labelOffset;
                label.visible = label.userData.isMoonLabel
                    ? simulation.showMoonLabels && followActive && label.userData.planetSystem === followSystem
                    : simulation.showLabels && !followActive;
            });

            if (followActive && followSystem) {
                followSystem.getWorldPosition(currentFollowPosition);

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
            } else if (zoomAnimating) {
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

            controls.update();
            updateAsteroidBelt(dt, elapsed);
            updateSunGlow();
            renderer.render(scene, camera);
            animationFrameId = requestAnimationFrame(animate);
        }
        animate();

        // ================================================================
        // Resize Handling (ResizeObserver for container)
        // ================================================================
        const ro = new ResizeObserver(() => {
            if (!containerRef.current) return;
            camera.aspect = getAspect();
            camera.updateProjectionMatrix();
            renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        });
        ro.observe(containerRef.current);

        // ================================================================
        // Cleanup
        // ================================================================
        return () => {
            stopNarration();
            tourApiRef.current = null;
            cancelAnimationFrame(animationFrameId);
            ro.disconnect();
            renderer.domElement.removeEventListener("click", onClick, true);
            renderer.domElement.removeEventListener("wheel", onWheel, true);
            window.removeEventListener("keydown", onKeyDown);
            controls.removeEventListener("start", onControlsStart);
            pane.dispose();
            controls.dispose();
            // dispose scene resources (shallow)
            scene.traverse((obj) => {
                if (obj.geometry) obj.geometry.dispose?.();
                if (obj.material) {
                    if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose?.());
                    else obj.material.dispose?.();
                }
            });
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="solar-system"
            style={{
                width: "100%",
                height: "max(420px, calc(100dvh - 66px))",
                position: "relative",
                overflow: "hidden",
                background: "#02040a",
            }}
        >
            <canvas
                ref={canvasRef}
                aria-label="Interactive model of the Solar System"
                style={{ display: "block", width: "100%", height: "100%", cursor: "grab" }}
            />
            {!selectedPlanet && !tourState.active && (
                <button
                    type="button"
                    className="solar-tour-launch"
                    onClick={() => tourApiRef.current?.start()}
                >
                    <span aria-hidden="true">▶</span>
                    Tour the Solar System
                </button>
            )}
            {selectedPlanet && (
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
                                    : "Planet profile"}
                            </span>
                            <h2>{selectedPlanet.name}</h2>
                        </div>
                        <button
                            type="button"
                            className="solar-info-card__close"
                            aria-label={`Hide ${selectedPlanet.name} information`}
                            onClick={() => {
                                if (tourState.active) tourApiRef.current?.exit(true);
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
                        {tourState.active && (
                            <div className="solar-tour-narration">
                                <span aria-hidden="true">{tourState.muted ? "◼" : "♪"}</span>
                                <p>{selectedPlanet.narration}</p>
                            </div>
                        )}
                        <h3>{tourState.active ? "More to discover" : "Did you know?"}</h3>
                        <ul>
                            {selectedPlanet.facts.map((fact) => <li key={fact}>{fact}</li>)}
                        </ul>
                    </div>
                    {tourState.active ? (
                        <div className="solar-tour-controls" aria-label="Tour navigation">
                            <div className="solar-tour-controls__audio">
                                <button type="button" onClick={() => tourApiRef.current?.replay()} disabled={tourState.muted}>
                                    Replay narration
                                </button>
                                <button type="button" onClick={() => tourApiRef.current?.toggleNarration()}>
                                    {tourState.muted ? "Turn sound on" : "Mute"}
                                </button>
                            </div>
                            <div className="solar-tour-controls__nav">
                                <button
                                    type="button"
                                    onClick={() => tourApiRef.current?.previous()}
                                    disabled={tourState.index === 0}
                                >
                                    ← Previous
                                </button>
                                <button
                                    type="button"
                                    className="solar-tour-controls__next"
                                    onClick={() => tourApiRef.current?.next()}
                                >
                                    {tourState.index === tourState.total - 1 ? "Finish tour" : "Next →"}
                                </button>
                            </div>
                            <button
                                type="button"
                                className="solar-tour-controls__exit"
                                onClick={() => tourApiRef.current?.exit()}
                            >
                                Exit guided tour
                            </button>
                        </div>
                    ) : (
                        <button
                            type="button"
                            className="solar-info-card__tour-button"
                            onClick={() => tourApiRef.current?.start()}
                        >
                            Start guided tour
                        </button>
                    )}
                </aside>
            )}
            <div
                className="solar-system__hint"
                style={{
                    position: "absolute",
                    left: "1rem",
                    bottom: "1rem",
                    maxWidth: "calc(100% - 2rem)",
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
                Drag to orbit · Pinch or scroll to zoom · Select a planet to follow
            </div>
        </div>
    );
}
