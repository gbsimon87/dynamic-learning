import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Pane } from "tweakpane";

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

        const flareSettings = {
            enabled: true,
            intensity: 1.0,
            glareSize: 28,
            streakSize: 60,
            occlusion: true,
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
                    { name: "Titan", radius: 0.4, distance: 6, speed: 0.015, color: 0xffd27f },
                    { name: "Rhea", radius: 0.2, distance: 8, speed: 0.017, color: 0xffffff },
                    { name: "Enceladus", radius: 0.1, distance: 4.5, speed: 0.02, color: 0xe0f7fa },
                    { name: "Mimas", radius: 0.1, distance: 3.5, speed: 0.021, color: 0xaaaaaa },
                    { name: "Tethys", radius: 0.12, distance: 5, speed: 0.019, color: 0xdddddd },
                    { name: "Dione", radius: 0.15, distance: 6.5, speed: 0.018, color: 0xcccccc },
                    { name: "Iapetus", radius: 0.18, distance: 9.5, speed: 0.013, color: 0xbbbbbb },
                    { name: "Hyperion", radius: 0.1, distance: 7.5, speed: 0.017, color: 0x999999 },
                    { name: "Phoebe", radius: 0.1, distance: 11.5, speed: 0.011, color: 0x777777 },
                ],
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
            const padding = 20;

            context.font = `${fontSize}px Arial`;
            const textWidth = context.measureText(text).width;

            canvas.width = textWidth + padding * 2;
            canvas.height = fontSize + padding * 2;

            // Reapply font after resizing the canvas
            context.font = `${fontSize}px Arial`;
            context.fillStyle = color;
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillText(text, canvas.width / 2, canvas.height / 2);

            const texture = new THREE.CanvasTexture(canvas);
            texture.minFilter = THREE.LinearFilter;

            const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
            const sprite = new THREE.Sprite(material);

            const aspect = canvas.width / canvas.height;
            sprite.scale.set(2 * aspect, 2, 1);

            return sprite;
        }

        function createSaturnRings(innerRadius, outerRadius) {
            const ringGeometry = new THREE.RingGeometry(innerRadius, outerRadius, 128);
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: 0xccc7aa,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.6,
            });

            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.rotation.x = Math.PI / 2.5;
            ring.position.set(0, 0, 0);
            ring.userData.isRing = true;
            return ring;
        }

        const createPlanetSystem = (planet) => {
            const planetMesh = new THREE.Mesh(sphereGeometry, planet.material);
            planetMesh.scale.setScalar(planet.radius);
            planetMesh.position.x = planet.distance;
            planetMesh.rotation.z = THREE.MathUtils.degToRad(planet.tilt || 0);
            planetMesh.castShadow = true;
            planetMesh.receiveShadow = true;

            const planetLabel = createLabel(planet.name, 64, "#ffffff");
            planetLabel.position.set(0, planet.radius + 1, 0);
            planetMesh.add(planetLabel);

            if (planet.hasRings) {
                const rings = createSaturnRings(planet.radius * 1.4, planet.radius * 2.4);
                rings.receiveShadow = true;
                planetMesh.add(rings);
            }

            planet.moons.forEach((moon) => {
                const moonMaterial = moon.color
                    ? new THREE.MeshStandardMaterial({ color: moon.color })
                    : materials.moon;
                const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
                moonMesh.scale.setScalar(moon.radius);
                moonMesh.position.x = moon.distance;
                moonMesh.castShadow = true;
                moonMesh.receiveShadow = true;

                const moonLabel = createLabel(moon.name, 48, "#cccccc");
                moonLabel.position.set(0, moon.radius + 1.5, 0);
                moonMesh.add(moonLabel);
                planetMesh.add(moonMesh);
            });

            return planetMesh;
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

        const planetMeshes = planetData.map((planet) => {
            const mesh = createPlanetSystem(planet);
            scene.add(mesh);
            return mesh;
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
        // Lens flare sprites anchored at the Sun
        // ================================================================
        let sunGlareSprite, sunStreakSprite;
        function makeRadialGlowTexture(size = 512) {
            const c = document.createElement("canvas");
            c.width = c.height = size;
            const ctx = c.getContext("2d");
            const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
            g.addColorStop(0.0, "rgba(255, 245, 200, 1)");
            g.addColorStop(0.3, "rgba(255, 200, 120, 0.6)");
            g.addColorStop(0.7, "rgba(255, 160, 80, 0.15)");
            g.addColorStop(1.0, "rgba(255, 140, 60, 0)");
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, size, size);
            const tex = new THREE.CanvasTexture(c);
            tex.colorSpace = THREE.SRGBColorSpace;
            tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
            tex.minFilter = THREE.LinearMipMapLinearFilter;
            tex.magFilter = THREE.LinearFilter;
            return tex;
        }

        function makeHorizontalStreakTexture(w = 1024, h = 256) {
            const c = document.createElement("canvas");
            c.width = w;
            c.height = h;
            const ctx = c.getContext("2d");
            const g = ctx.createLinearGradient(0, h / 2, w, h / 2);
            g.addColorStop(0.0, "rgba(255,200,120,0)");
            g.addColorStop(0.45, "rgba(255,220,160,0.9)");
            g.addColorStop(0.5, "rgba(255,240,200,1)");
            g.addColorStop(0.55, "rgba(255,220,160,0.9)");
            g.addColorStop(1.0, "rgba(255,200,120,0)");
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, w, h);
            const tex = new THREE.CanvasTexture(c);
            tex.colorSpace = THREE.SRGBColorSpace;
            tex.minFilter = THREE.LinearMipMapLinearFilter;
            tex.magFilter = THREE.LinearFilter;
            return tex;
        }

        {
            const glareTex = makeRadialGlowTexture(512);
            const streakTex = makeHorizontalStreakTexture(1024, 256);

            const glareMat = new THREE.SpriteMaterial({
                map: glareTex,
                color: 0xffffff,
                transparent: true,
                depthWrite: false,
                depthTest: false,
                blending: THREE.AdditiveBlending,
                opacity: 0.0,
            });
            const streakMat = new THREE.SpriteMaterial({
                map: streakTex,
                color: 0xffffff,
                transparent: true,
                depthWrite: false,
                blending: THREE.AdditiveBlending,
                opacity: 0.0,
            });

            sunGlareSprite = new THREE.Sprite(glareMat);
            sunStreakSprite = new THREE.Sprite(streakMat);
            sunGlareSprite.renderOrder = 999;
            sunStreakSprite.renderOrder = 999;
            sun.add(sunGlareSprite);
            sun.add(sunStreakSprite);
            sunGlareSprite.scale.setScalar(materials.sun ? 5 * flareSettings.glareSize : 120);
            sunStreakSprite.scale.set(200, 30, 1);
        }

        function updateLensFlare(camera) {
            if (!flareSettings.enabled || !sunGlareSprite || !sunStreakSprite) {
                if (sunGlareSprite) sunGlareSprite.material.opacity = 0;
                if (sunStreakSprite) sunStreakSprite.material.opacity = 0;
                return;
            }
            const camDir = new THREE.Vector3();
            camera.getWorldDirection(camDir);
            const sunWorld = sun.getWorldPosition(new THREE.Vector3());
            const toSun = new THREE.Vector3().subVectors(sunWorld, camera.position);
            const dist = toSun.length();
            const dirToSun = toSun.clone().normalize();
            const ndot = camDir.dot(dirToSun);
            const angleFactor = THREE.MathUtils.clamp((ndot - 0.1) / 0.9, 0, 1);
            const distFactor = THREE.MathUtils.smoothstep(0, 400, 400 - Math.min(dist, 400));

            let occFactor = 1.0;
            if (flareSettings.occlusion) {
                const ray = new THREE.Raycaster(camera.position, dirToSun, 0, dist - 0.5);
                // Only test against planet meshes that are actually Mesh objects, not sprites
                const meshesToTest = planetMeshes.filter(m => m && m.type === 'Mesh');
                const hits = ray
                    .intersectObjects(meshesToTest, false) // false = don't traverse children
                    .filter(
                        (h) => h.object !== sun && h.object.type === 'Mesh' && !h.object.userData?.isRing
                    );
                if (hits.length > 0) occFactor = 0.0;
            }

            const a = flareSettings.intensity * angleFactor * Math.max(0.4, distFactor) * occFactor;
            const sunSize = sun.scale.x;
            const glareScale = sunSize * flareSettings.glareSize;
            const streakW = sunSize * flareSettings.streakSize;
            const streakH = streakW * 0.15;

            sunGlareSprite.scale.set(glareScale, glareScale, 1);
            sunStreakSprite.scale.set(streakW, streakH, 1);
            sunGlareSprite.material.opacity = a;
            sunStreakSprite.material.opacity = a * 0.7;
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
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.12);
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
        camera.position.z = 100;
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
        controls.dampingFactor = 0.05;
        controls.enablePan = true;
        controls.enableZoom = false; // custom zoom
        controls.minDistance = 0.1;
        controls.maxDistance = 3000;

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        const zoomPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
        const targetPosition = new THREE.Vector3();
        let smoothTarget = new THREE.Vector3().copy(controls.target);
        let lastHitObject = null;
        const lerpFactor = 0.15;

        function updateZoomPlane() {
            const cameraDirection = new THREE.Vector3();
            camera.getWorldDirection(cameraDirection);
            zoomPlane.setFromNormalAndCoplanarPoint(cameraDirection.negate(), controls.target);
        }

        function filterMeshes(intersects) {
            return intersects.filter((hit) => {
                const obj = hit.object;
                return (
                    obj.type === "Mesh" &&
                    !obj.userData.isOrbit &&
                    !obj.userData.isRing &&
                    obj.material.type !== "SpriteMaterial"
                );
            });
        }

        // ================================================================
        // Simulation Settings & Tweakpane
        // ================================================================
        const simulation = { orbitSpeedMultiplier: 1, rotationSpeedMultiplier: 1 };
        simulation.showOrbits = true;
        simulation.enableTilt = true;

        const pane = new Pane();

        pane.element.style.position = "absolute";
        pane.element.style.top = "4rem";
        pane.element.style.right = "1rem";   // move to top-right
        pane.element.style.zIndex = "100";   // ensure it’s above the canvas

        const simulationFolder = pane.addFolder({ title: "Simulation Controls" });
        simulationFolder.addBinding(simulation, "orbitSpeedMultiplier", { label: "Orbit Speed", min: 1, max: 100, step: 0.1 });
        simulationFolder.addBinding(simulation, "rotationSpeedMultiplier", { label: "Rotation Speed", min: 1, max: 100, step: 0.1 });
        simulationFolder.addBinding(simulation, "showOrbits", { label: "Show Orbits" });
        simulationFolder.addBinding(simulation, "enableTilt", { label: "Axial Tilt" });

        const lightingFolder = pane.addFolder({ title: "Lighting" });
        lightingFolder.addBinding(sunLight, "intensity", { min: 20, max: 400, step: 1, label: "Sun Intensity" });
        lightingFolder.addBinding(ambientLight, "intensity", { min: 0, max: 0.4, step: 0.01, label: "Ambient" });

        const starsFolder = pane.addFolder({ title: "Background Stars" });
        starsFolder
            .addBinding(starSettings, "count", { label: "Star Count", min: 0, max: 10000, step: 100 })
            .on("change", () => createStars());
        const backgroundSettings = { enabled: true };
        starsFolder
            .addBinding(backgroundSettings, "enabled", { label: "Show Galaxy" })
            .on("change", (ev) => {
                scene.background = ev.value ? backgroundTexture : null;
            });

        const cameraFolder = pane.addFolder({ title: "Camera" });
        const stopBtnApi = cameraFolder.addButton({ title: "Stop Following" });

        const flareFolder = pane.addFolder({ title: "Sun Flares" });
        flareFolder.addBinding(flareSettings, "enabled", { label: "Enabled" });
        flareFolder.addBinding(flareSettings, "intensity", { label: "Intensity", min: 0, max: 3, step: 0.01 });
        flareFolder
            .addBinding(flareSettings, "glareSize", { label: "Glare Size", min: 5, max: 80, step: 1 })
            .on("change", () => {
                if (sunGlareSprite) {
                    const sunSize = sun.scale.x;
                    const glareScale = sunSize * flareSettings.glareSize;
                    sunGlareSprite.scale.set(glareScale, glareScale, 1);
                }
            });
        flareFolder
            .addBinding(flareSettings, "streakSize", { label: "Streak Size", min: 10, max: 150, step: 1 })
            .on("change", () => {
                if (sunStreakSprite) {
                    const sunSize = sun.scale.x;
                    const w = sunSize * flareSettings.streakSize;
                    const h = w * 0.15;
                    sunStreakSprite.scale.set(w, h, 1);
                }
            });
        flareFolder.addBinding(flareSettings, "occlusion", { label: "Occlude by Planets" });

        const beltFolder = pane.addFolder({ title: "Asteroid Belt" });
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

        const labelSprites = [];
        planetMeshes.forEach((planetMesh, i) => {
            planetMesh.traverse((child) => {
                if (child.material?.type === "SpriteMaterial") {
                    child.userData.planetIndex = i;
                    labelSprites.push(child);
                }
            });
        });

        let followActive = false;
        let followMesh = null;
        let followRadius = 50;
        let followAzimuth = 0;
        let followElevation = 0.35;
        let followAngularSpeed = 0.2;

        let followBlendT = 0;
        let followBlendDuration = 1.5;
        let followBlendCamStart = new THREE.Vector3();
        let followBlendTargetStart = new THREE.Vector3();

        function stopFollowing() {
            if (!followActive) return;
            followActive = false;
            followMesh = null;
            smoothTarget.copy(controls.target);
            lastHitObject = null;
        }

        function flyToPlanet(planetMesh) {
            followActive = true;
            followMesh = planetMesh;
            followBlendT = 0;
            followBlendCamStart.copy(camera.position);
            followBlendTargetStart.copy(controls.target);
            const planetPos = new THREE.Vector3();
            planetMesh.getWorldPosition(planetPos);
            const rel = new THREE.Vector3().subVectors(camera.position, planetPos);
            const sph = new THREE.Spherical().setFromVector3(rel);
            const tightFraming = planetMesh.scale.x * 6;
            followRadius = tightFraming;
            followAzimuth = sph.theta;
            followElevation = THREE.MathUtils.clamp(sph.phi, 0.2, Math.PI - 0.2);
            smoothTarget.copy(planetPos);
            followAngularSpeed = 0.6;
        }

        function onClick(event) {
            const rect = renderer.domElement.getBoundingClientRect();
            clickMouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            clickMouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            clickRaycaster.setFromCamera(clickMouse, camera);
            const intersects = clickRaycaster.intersectObjects(labelSprites, false);
            if (intersects.length > 0) {
                const clickedLabel = intersects[0].object;
                const planetIndex = clickedLabel.userData.planetIndex;
                const planetMesh = planetMeshes[planetIndex];
                flyToPlanet(planetMesh);
            } else {
                const paneEl = document.querySelector(".tp-dfwv");
                if (paneEl && paneEl.contains(event.target)) return;
                stopFollowing();
            }
        }

        function onWheel(event) {
            event.preventDefault();
            const rect = renderer.domElement.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            updateZoomPlane();
            raycaster.setFromCamera(mouse, camera);
            const allIntersects = raycaster.intersectObjects(scene.children, true);
            const meshIntersects = filterMeshes(allIntersects);
            let targetSet = false;

            if (meshIntersects.length > 0) {
                const hit = meshIntersects[0];
                targetPosition.copy(hit.point);
                lastHitObject = hit.object;
                targetSet = true;
            } else if (lastHitObject) {
                lastHitObject.getWorldPosition(targetPosition);
                targetSet = true;
            } else {
                raycaster.ray.intersectPlane(zoomPlane, targetPosition);
                targetSet = true;
            }

            if (targetSet) {
                const currentDistance = camera.position.distanceTo(targetPosition);
                const baseZoomSpeed = 0.15;
                const adaptiveSpeed = baseZoomSpeed * Math.max(0.3, Math.min(2, currentDistance / 50));
                const deltaZoom = event.deltaY * -0.001 * adaptiveSpeed;

                if (followActive && followMesh) {
                    const planetPos = new THREE.Vector3();
                    followMesh.getWorldPosition(planetPos);
                    smoothTarget.copy(planetPos);
                    followRadius = Math.max(followMesh.scale.x * 2, followRadius * (1 + deltaZoom));
                    updateLensFlare(camera);
                    controls.update();
                    return;
                }

                const interpolationStrength = meshIntersects.length > 0 ? 0.3 : 0.1;
                smoothTarget.lerp(targetPosition, interpolationStrength);
                const direction = new THREE.Vector3().subVectors(camera.position, smoothTarget).normalize();
                const distance = camera.position.distanceTo(smoothTarget);
                let minDistance = 0.5;
                if (lastHitObject && lastHitObject.geometry?.boundingSphere) {
                    const objRadius = lastHitObject.geometry.boundingSphere.radius * lastHitObject.scale.x;
                    minDistance = objRadius * 1.5;
                }
                const newDistance = Math.max(minDistance, distance * (1 + deltaZoom));
                camera.position.copy(smoothTarget.clone().add(direction.multiplyScalar(newDistance)));
                controls.target.lerp(smoothTarget, lerpFactor);
            }
            controls.update();
        }

        function onKeyDown(e) {
            if (e.key === "Escape") stopFollowing();
        }

        renderer.domElement.addEventListener("click", onClick, true);
        renderer.domElement.addEventListener("wheel", onWheel, { passive: false });
        window.addEventListener("keydown", onKeyDown);
        stopBtnApi.on("click", () => stopFollowing());

        // ================================================================
        // Animation Loop
        // ================================================================
        const clock = new THREE.Clock();
        let prevTime = performance.now() / 1000;

        function animate() {
            const now = performance.now() / 1000;
            let dt = now - prevTime;
            prevTime = now;
            dt = Math.min(dt, 0.1);
            const elapsed = clock.getElapsedTime();

            planetMeshes.forEach((planet, i) => {
                const data = planetData[i];
                const orbitSpeed = data.speed * simulation.orbitSpeedMultiplier;
                planet.position.x = Math.sin(elapsed * orbitSpeed) * data.distance;
                planet.position.z = Math.cos(elapsed * orbitSpeed) * data.distance;

                const rotationSpeed = data.speed * simulation.rotationSpeedMultiplier;
                if (data.name !== "Saturn") {
                    if (simulation.enableTilt) {
                        planet.rotateY(rotationSpeed);
                    } else {
                        planet.rotation.z = 0;
                        planet.rotation.y += rotationSpeed;
                    }
                }

                if (data.name === "Saturn") {
                    planet.children.forEach((child) => {
                        if (child.userData?.isRing) child.rotation.x += 0.005;
                    });
                }

                let moonIdx = 0;
                planet.children.forEach((child) => {
                    if (child.userData?.isRing) return;
                    const moonData = data.moons[moonIdx++];
                    if (!moonData) return;
                    const moonOrbitSpeed = moonData.speed * simulation.orbitSpeedMultiplier;
                    child.rotation.y += moonOrbitSpeed * simulation.rotationSpeedMultiplier;
                    child.position.x = Math.sin(elapsed * moonOrbitSpeed) * moonData.distance;
                    child.position.z = Math.cos(elapsed * moonOrbitSpeed) * moonData.distance;
                });
            });

            orbitPaths.forEach((orbit) => (orbit.visible = simulation.showOrbits));

            if (!followActive) controls.target.lerp(smoothTarget, lerpFactor);

            if (followActive && followMesh) {
                followAngularSpeed = THREE.MathUtils.lerp(followAngularSpeed, 0.2, 0.05);
                followAzimuth += followAngularSpeed * dt;
                const planetPos = new THREE.Vector3();
                followMesh.getWorldPosition(planetPos);
                const desired = new THREE.Vector3()
                    .setFromSphericalCoords(followRadius, followElevation, followAzimuth)
                    .add(planetPos);

                if (followBlendT < 1) {
                    followBlendT = Math.min(1, followBlendT + dt / followBlendDuration);
                    const eased = followBlendT * followBlendT * (3 - 2 * followBlendT);
                    camera.position.lerpVectors(followBlendCamStart, desired, eased);
                    const blendedTarget = new THREE.Vector3().lerpVectors(
                        followBlendTargetStart,
                        planetPos,
                        eased
                    );
                    controls.target.copy(blendedTarget);
                } else {
                    camera.position.copy(desired);
                    controls.target.copy(planetPos);
                }
                smoothTarget.copy(planetPos);
            }

            controls.update();
            updateAsteroidBelt(dt, elapsed);
            updateLensFlare(camera);
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
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
            ro.disconnect();
            renderer.domElement.removeEventListener("click", onClick, true);
            renderer.domElement.removeEventListener("wheel", onWheel);
            window.removeEventListener("keydown", onKeyDown);
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
        <div ref={containerRef} style={{ width: "100%", height: "calc(100vh - 66px)", minHeight: "100dvh", position: "relative" }}>
            <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
        </div>
    );
}
