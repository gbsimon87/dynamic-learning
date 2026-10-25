// Rebuilds public/static/worlds/*.jpg (except Pluto) from downloaded source maps.
// Usage: node build-moon-maps.mjs <source dir> <output dir> [name,name]
// Needs sharp (npm i sharp in a scratch folder; not an app dependency).
// Source files and credits: /credits#solar-system-worlds.
// Second pass on the moon maps.
// - Unmapped areas get a smooth colour fill plus borrowed crater detail from the
//   other hemisphere or the mapped band, so they keep surface texture
//   instead of becoming a flat smear.
// - The longitude seam is matched with a gradient correction (no ghosting).
// - Rows near the poles are smoothed horizontally to hide pinching.
// - Colour: optional desaturation, tint or gradient map, then a brightness
//   level so ambient-lit moons read at their real relative brightness.
import sharp from "sharp";
import path from "node:path";

const [, , inDir, outDir, only] = process.argv;

const JOBS = {
    phobos: ["phobos.src", 1024, { level: 100 }],
    deimos: ["deimos.src", 1024, { level: 118 }],
    io: ["io_a.src", 1024, { padLat: 57.3, sat: 1.15, tint: [1.06, 1.0, 0.72], level: 170, polar: [0.78, 0.58, 0.4] }],
    europa: ["europa.src", 1024, { fill: true, gradient: [[92, 58, 38], [178, 146, 112], [246, 238, 222]], level: 190 }],
    ganymede: ["ganymede_b.src", 1024, { level: 132 }],
    callisto: ["callisto_bjj.jpg", 1024, { level: 112 }],
    titan: ["titan.src", 1024, { tint: [1.0, 0.72, 0.38], lift: 40 }],
    rhea: ["rhea.src", 1024, { contrast: 1.35, sat: 0.12, tint: [1.0, 0.98, 0.95], level: 172 }],
    enceladus: ["enceladus.src", 1024, { contrast: 1.3, sat: 0.35, level: 215 }],
    mimas: ["mimas.src", 1024, { contrast: 1.2, sat: 0.5, level: 160 }],
    tethys: ["tethys.src", 1024, { contrast: 1.35, sat: 0.12, tint: [1.0, 0.99, 0.97], level: 198 }],
    dione: ["dione.src", 1024, { contrast: 1.35, sat: 0.1, tint: [1.0, 0.99, 0.97], level: 172 }],
    iapetus: ["iapetus.src", 1024, { sat: 0.7, tint: [1.0, 0.95, 0.85] }],
    phoebe: ["phoebe.src", 1024, { fill: true, level: 88 }],
    titania: ["titania.src", 1024, { erode: 70, contrast: 1.4, fill: true, tint: [1.0, 0.96, 0.92], level: 150 }],
    oberon: ["oberon.src", 1024, { erode: 70, contrast: 1.3, fill: true, tint: [1.0, 0.94, 0.88], level: 128 }],
    umbriel: ["umbriel.src", 1024, { erode: 70, contrast: 1.4, fill: true, tint: [0.98, 0.98, 1.0], level: 100 }],
    ariel: ["ariel.src", 1024, { erode: 70, contrast: 1.8, fill: true, tint: [0.98, 0.99, 1.0], level: 172 }],
    miranda: ["miranda.src", 1024, { erode: 70, contrast: 1.5, fill: true, tint: [0.99, 0.99, 1.0], level: 158 }],
    triton: ["triton.src", 1024, { erode: 70, contrast: 1.3, fill: true, sat: 0.0, tint: [1.0, 0.93, 0.88], level: 188 }],
    charon: ["charon_usgs.jpg", 1024, { contrast: 1.2, fill: true, tint: [1.0, 0.97, 0.94], level: 140 }],
    // Stand-ins: no global maps exist. Recoloured from real cratered maps.
    amalthea: ["phobos.src", 512, { sat: 0, tint: [1.0, 0.58, 0.42], level: 92 }],
    hyperion: ["phoebe.src", 512, { fill: true, sat: 0, tint: [1.0, 0.9, 0.76], level: 140 }],
    nereid: ["phobos.src", 512, { sat: 0, tint: [0.97, 0.97, 1.0], level: 118 }],
};

const lum = (r, g, b) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

function blur(src, w, h, r) {
    let a = Float32Array.from(src), b = new Float32Array(src.length);
    for (let pass = 0; pass < 3; pass++) {
        const d = 2 * r + 1;
        for (let y = 0; y < h; y++) {
            let s = 0;
            for (let k = -r; k <= r; k++) s += a[y * w + ((k % w) + w) % w];
            for (let x = 0; x < w; x++) {
                b[y * w + x] = s / d;
                s += a[y * w + (x + r + 1) % w] - a[y * w + ((x - r) % w + w) % w];
            }
        }
        const cl = (v) => Math.min(h - 1, Math.max(0, v));
        for (let x = 0; x < w; x++) {
            let s = 0;
            for (let k = -r; k <= r; k++) s += b[cl(k) * w + x];
            for (let y = 0; y < h; y++) {
                a[y * w + x] = s / d;
                s += b[cl(y + r + 1) * w + x] - b[cl(y - r) * w + x];
            }
        }
    }
    return a;
}

function pushPull(rgb, w, h, mask) {
    if (w <= 2 || h <= 1) {
        const m = [0, 0, 0]; let c = 0;
        for (let i = 0; i < w * h; i++) if (mask[i] > 0) { c += mask[i]; for (let k = 0; k < 3; k++) m[k] += rgb[i * 3 + k] * mask[i]; }
        const out = new Float32Array(w * h * 3);
        for (let i = 0; i < w * h; i++) for (let k = 0; k < 3; k++) out[i * 3 + k] = c ? m[k] / c : 128;
        return out;
    }
    const w2 = Math.ceil(w / 2), h2 = Math.ceil(h / 2);
    const r2 = new Float32Array(w2 * h2 * 3), m2 = new Float32Array(w2 * h2);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
        const i = y * w + x, j = (y >> 1) * w2 + (x >> 1);
        m2[j] += mask[i];
        for (let k = 0; k < 3; k++) r2[j * 3 + k] += rgb[i * 3 + k] * mask[i];
    }
    for (let j = 0; j < w2 * h2; j++) if (m2[j] > 0) { for (let k = 0; k < 3; k++) r2[j * 3 + k] /= m2[j]; m2[j] = Math.min(1, m2[j]); }
    const coarse = pushPull(r2, w2, h2, m2);
    const out = new Float32Array(w * h * 3);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
        const i = y * w + x;
        const fx = Math.min(w2 - 1, Math.max(0, (x - 0.5) / 2)), fy = Math.min(h2 - 1, Math.max(0, (y - 0.5) / 2));
        const x0 = Math.floor(fx), y0 = Math.floor(fy), x1 = Math.min(w2 - 1, x0 + 1), y1 = Math.min(h2 - 1, y0 + 1);
        const tx = fx - x0, ty = fy - y0;
        for (let k = 0; k < 3; k++) {
            const c = (coarse[(y0 * w2 + x0) * 3 + k] * (1 - tx) + coarse[(y0 * w2 + x1) * 3 + k] * tx) * (1 - ty)
                + (coarse[(y1 * w2 + x0) * 3 + k] * (1 - tx) + coarse[(y1 * w2 + x1) * 3 + k] * tx) * ty;
            const a = Math.min(1, mask[i]);
            out[i * 3 + k] = rgb[i * 3 + k] * a + c * (1 - a);
        }
    }
    return out;
}

// Borrow crater detail (high-pass only) for unknown pixels: first from the
// other hemisphere (same latitude, half a turn round), else from the mapped
// latitude band shifted by whole band heights. The smooth base colour comes
// from the push-pull fill, so the borrowed detail never brings colour seams.
function borrowDetail(px, w, h, known, radius) {
    const low = new Float32Array(n3(w, h));
    for (let c = 0; c < 3; c++) {
        const ch = new Float32Array(w * h);
        for (let i = 0; i < w * h; i++) ch[i] = px[i * 3 + c];
        const b = blur(ch, w, h, radius);
        for (let i = 0; i < w * h; i++) low[i * 3 + c] = b[i];
    }
    let a = h, b = -1;
    for (let y = 0; y < h; y++) {
        let k = 0;
        for (let x = 0; x < w; x++) k += known[y * w + x];
        if (k > w * 0.9) { a = Math.min(a, y); b = Math.max(b, y); }
    }
    const len = b - a + 1;
    const detail = new Float32Array(n3(w, h));
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
        const i = y * w + x;
        if (known[i]) continue;
        let src = (h - 1 - y) * w + (x + w / 2) % w;
        if (!known[src] && len > 8) {
            const yy = y < a ? y + len * Math.ceil((a - y) / len) : y - len * Math.ceil((y - b) / len);
            const s2 = Math.min(h - 1, Math.max(0, yy)) * w + (x + Math.round(w * 0.29)) % w;
            src = known[s2] ? s2 : -1;
        } else if (!known[src]) src = -1;
        if (src < 0) continue;
        for (let c = 0; c < 3; c++) detail[i * 3 + c] = px[src * 3 + c] - low[src * 3 + c];
    }
    return detail;
}
const n3 = (w, h) => w * h * 3;

function fixSeam(px, w, h) {
    const band = Math.round(w / 12);
    const diff = new Float32Array(h * 3);
    for (let y = 0; y < h; y++) for (let c = 0; c < 3; c++) {
        let l = 0, r = 0;
        for (let k = 0; k < 3; k++) { l += px[(y * w + k) * 3 + c]; r += px[(y * w + w - 1 - k) * 3 + c]; }
        diff[y * 3 + c] = (l - r) / 3;
    }
    // smooth the difference vertically so only colour, not detail, is matched
    const sm = new Float32Array(h * 3), R = 6;
    for (let y = 0; y < h; y++) for (let c = 0; c < 3; c++) {
        let s = 0, n = 0;
        for (let k = -R; k <= R; k++) { const yy = y + k; if (yy >= 0 && yy < h) { s += diff[yy * 3 + c]; n++; } }
        sm[y * 3 + c] = s / n;
    }
    for (let y = 0; y < h; y++) for (let k = 0; k < band; k++) {
        const t = 0.5 * (1 - k / band);
        for (let c = 0; c < 3; c++) {
            px[(y * w + k) * 3 + c] -= sm[y * 3 + c] * t;
            px[(y * w + w - 1 - k) * 3 + c] += sm[y * 3 + c] * t;
        }
    }
}

function smoothPoles(px, w, h) {
    const zone = Math.round(h * 0.1);
    const row = new Float32Array(w * 3);
    for (let y = 0; y < h; y++) {
        const edge = Math.min(y, h - 1 - y);
        if (edge >= zone) continue;
        const r = Math.round(((zone - edge) / zone) ** 2 * w / 8) + 1;
        for (let c = 0; c < 3; c++) {
            let s = 0;
            for (let k = -r; k <= r; k++) s += px[(y * w + ((k % w) + w) % w) * 3 + c];
            for (let x = 0; x < w; x++) {
                row[x * 3 + c] = s / (2 * r + 1);
                s += px[(y * w + (x + r + 1) % w) * 3 + c] - px[(y * w + ((x - r) % w + w) % w) * 3 + c];
            }
        }
        px.set(row, y * w * 3);
    }
}

async function run(key, [file, width, opt = {}]) {
    const h = width / 2;
    let img = sharp(path.join(inDir, file)).removeAlpha().toColourspace("srgb");
    if (opt.padLat) {
        const bandH = Math.round(h * (2 * opt.padLat) / 180);
        const band = await img.resize(width, bandH, { fit: "fill" }).jpeg({ quality: 95 }).toBuffer();
        const top = Math.floor((h - bandH) / 2);
        img = sharp(await sharp({ create: { width, height: h, channels: 3, background: "#000" } })
            .composite([{ input: band, top, left: 0 }]).png().toBuffer());
        opt = { ...opt, fill: true };
    }
    const { data, info } = await img.resize(width, h, { fit: "fill" }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    const ch = info.channels, n = width * h;
    let px = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) for (let c = 0; c < 3; c++) px[i * 3 + c] = data[i * ch + Math.min(c, ch - 1)];

    let polarWeight = null;
    if (opt.fill) {
        const raw = new Float32Array(n);
        for (let i = 0; i < n; i++) raw[i] = px[i * 3] + px[i * 3 + 1] + px[i * 3 + 2] > 30 ? 1 : 0;
        const erode = Math.round(width / (opt.erode ?? 160));
        const shrunk = blur(raw, width, h, erode);
        const known = new Uint8Array(n);
        for (let i = 0; i < n; i++) known[i] = shrunk[i] > 0.98 ? 1 : 0;
        const k = new Float32Array(n);
        for (let i = 0; i < n; i++) k[i] = known[i];
        const base = pushPull(px, width, h, k);
        const detail = borrowDetail(px, width, h, known, Math.round(width / 64));
        const feather = blur(k, width, h, erode * 2);
        for (let i = 0; i < n; i++) {
            const t = known[i] ? feather[i] : 0;
            for (let c = 0; c < 3; c++) {
                // fade borrowed detail towards the poles, where it would pinch
                const lat = Math.abs((Math.floor(i / width) + 0.5) / h - 0.5) * Math.PI;
                const fill = base[i * 3 + c] + detail[i * 3 + c] * 0.9 * Math.min(1, Math.cos(lat) * 1.6);
                px[i * 3 + c] = px[i * 3 + c] * t + fill * (1 - t);
            }
        }
        polarWeight = new Float32Array(n);
        const dist = blur(k, width, h, Math.round(width / 40));
        for (let i = 0; i < n; i++) polarWeight[i] = 1 - dist[i];
    }

    fixSeam(px, width, h);
    smoothPoles(px, width, h);

    if (opt.polar && polarWeight) {
        for (let i = 0; i < n; i++) {
            const t = Math.min(1, polarWeight[i] * 1.2);
            for (let c = 0; c < 3; c++) px[i * 3 + c] *= 1 - t + t * opt.polar[c];
        }
    }

    if (opt.lift !== undefined) {
        for (let i = 0; i < n; i++) {
            const g = (px[i * 3] + px[i * 3 + 1] + px[i * 3 + 2]) / 3;
            const v = opt.lift + g * (255 - opt.lift) / 255;
            for (let c = 0; c < 3; c++) px[i * 3 + c] = v * opt.tint[c];
        }
    } else {
        if (opt.sat !== undefined) for (let i = 0; i < n; i++) {
            const g = lum(px[i * 3], px[i * 3 + 1], px[i * 3 + 2]);
            for (let c = 0; c < 3; c++) px[i * 3 + c] = g + (px[i * 3 + c] - g) * opt.sat;
        }
        if (opt.gradient) {
            const [d, m, l] = opt.gradient;
            let lo = 255, hi = 0;
            for (let i = 0; i < n; i++) { const g = lum(px[i * 3], px[i * 3 + 1], px[i * 3 + 2]); lo = Math.min(lo, g); hi = Math.max(hi, g); }
            for (let i = 0; i < n; i++) {
                const t = (lum(px[i * 3], px[i * 3 + 1], px[i * 3 + 2]) - lo) / Math.max(1, hi - lo);
                for (let c = 0; c < 3; c++) px[i * 3 + c] = t < 0.5 ? d[c] + (m[c] - d[c]) * t * 2 : m[c] + (l[c] - m[c]) * (t - 0.5) * 2;
            }
        }
        if (opt.tint) for (let i = 0; i < n * 3; i++) px[i] *= opt.tint[i % 3];
        if (opt.contrast) {
            let mean = 0;
            for (let i = 0; i < n; i++) mean += lum(px[i * 3], px[i * 3 + 1], px[i * 3 + 2]);
            mean /= n;
            for (let i = 0; i < n * 3; i++) px[i] = mean + (px[i] - mean) * opt.contrast;
        }
        if (opt.level) {
            let mean = 0;
            for (let i = 0; i < n; i++) mean += lum(px[i * 3], px[i * 3 + 1], px[i * 3 + 2]);
            mean /= n;
            // gamma towards the target mean so highlights do not clip flat
            const gamma = Math.log(opt.level / 255) / Math.log(mean / 255);
            for (let i = 0; i < n * 3; i++) px[i] = 255 * Math.pow(Math.max(0, Math.min(1, px[i] / 255)), gamma);
        }
    }

    const outPx = new Uint8ClampedArray(n * 3);
    for (let i = 0; i < n * 3; i++) outPx[i] = px[i];
    const out = path.join(outDir, `${key}.jpg`);
    await sharp(Buffer.from(outPx.buffer), { raw: { width, height: h, channels: 3 } }).jpeg({ quality: 82, mozjpeg: true }).toFile(out);
    console.log(key);
}

for (const [key, job] of Object.entries(JOBS)) if (!only || only.split(",").includes(key)) await run(key, job);
