import { createFrameStats } from "./frameStats.js";

const DRAW_EVERY_S = 0.5;
const fixed = (n) => n.toFixed(1);

/**
 * The `?debug` frame-time readout: a module for the Solar System's module
 * host. It prints the numbers the meteor tracker asks for on a real device
 * (median and p95 frame intervals, quality tier, DPR, viewport), so a grown-up
 * can screenshot them on a phone. Children never see it.
 */
export function createFrameReadout({ container, getInfo }) {
    const stats = createFrameStats();
    const element = document.createElement("pre");
    element.className = "solar-frame-readout";
    element.setAttribute("aria-hidden", "true");
    container.appendChild(element);
    let sinceDraw = DRAW_EVERY_S;

    function draw() {
        const info = getInfo();
        const s = stats.summary();
        element.textContent = [
            `quality ${info.quality} · DPR ${info.dpr} · ${info.width}×${info.height}`,
            `bloom ${info.bloom ? "on" : "off"}`,
            `${Math.round(s.fps)} fps · frame ${fixed(s.intervalMedian)} / p95 ${fixed(s.intervalP95)} ms`,
            `work ${fixed(s.workMedian)} / p95 ${fixed(s.workP95)} ms · ${s.frames} frames`,
        ].join("\n");
    }

    return {
        record: (intervalMs, workMs) => stats.record(intervalMs, workMs),
        /** Starts a fresh sample, e.g. when bloom is switched. */
        reset: () => stats.reset(),
        update(dt) {
            sinceDraw += dt;
            if (sinceDraw < DRAW_EVERY_S) return;
            sinceDraw = 0;
            draw();
        },
        dispose: () => element.remove(),
    };
}
