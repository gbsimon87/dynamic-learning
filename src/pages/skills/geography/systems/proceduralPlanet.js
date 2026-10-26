// Pictures for worlds nobody has photographed. A planet's `look.procedural`
// ({ base, accent, kind }) becomes a small painted texture, seeded by the
// planet's id so it looks the same on every visit.
import * as THREE from "three";

function hashSeed(text) {
    let h = 2166136261;
    for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
    return h >>> 0;
}

function seededRandom(seed) {
    let s = seed || 1;
    return () => {
        s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
        return s / 4294967296;
    };
}

const PATCHES = { "bare-rock": 90, rocky: 70, "icy-maybe": 60 };

/** The patches to paint: [x, y, radius, usesAccent] on a 0–1 square. Pure. */
export function proceduralPatches(id, look) {
    const random = seededRandom(hashSeed(`${id}:${look.kind}`));
    const patches = [];
    for (let i = 0; i < (PATCHES[look.kind] ?? 70); i++) {
        patches.push([random(), random(), 0.02 + random() * 0.09, random() < 0.55]);
    }
    return patches;
}

function css(color) {
    return `#${new THREE.Color(color).getHexString()}`;
}

export function paintProceduralPlanet(canvas, id, look) {
    const size = canvas.width;
    const context = canvas.getContext("2d");
    context.fillStyle = css(look.base);
    context.fillRect(0, 0, size, size);
    for (const [x, y, r, accent] of proceduralPatches(id, look)) {
        context.globalAlpha = 0.35;
        context.fillStyle = css(accent ? look.accent : look.base);
        if (look.kind === "icy-maybe" && !accent) context.fillStyle = "#ffffff";
        // Wrap sideways so the texture has no seam.
        for (const dx of [-1, 0, 1]) {
            context.beginPath();
            context.arc((x + dx) * size, y * size, r * size, 0, Math.PI * 2);
            context.fill();
        }
    }
    context.globalAlpha = 1;
}

export function proceduralPlanetMaterial(id, look, { quality = "high" } = {}) {
    const procedural = look.procedural;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = quality === "low" ? 256 : 512;
    paintProceduralPlanet(canvas, id, procedural);
    const map = new THREE.CanvasTexture(canvas);
    map.colorSpace = THREE.SRGBColorSpace;
    return new THREE.MeshStandardMaterial({ map, metalness: 0, roughness: procedural.kind === "bare-rock" ? 0.95 : 0.7 });
}
