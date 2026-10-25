import { createBeyondWarp } from "./beyondWarp.js";
import { destinationById } from "./beyondDestinations.js";
import { createSpaceRipples } from "./spaceRipples.js";

// Each ready destination's scene, by its id in beyondDestinations.js. Later
// destinations (#90, #91, #109) register here.
const SCENES = { "space-ripples": createSpaceRipples };

/**
 * Beyond (#113): sequences the warp out, the destination, and the warp home.
 * Phases: "off" → "warp-out" → "arrived" → "warp-home" → "off".
 *
 * A module for solarModules.js. While `isActive()`, SolarSystem.jsx draws
 * `render()` instead of the Solar System, as it does for the line-up. The
 * warp is readied while the picker is open and the destination during the warp
 * out, so their shaders compile before they are first drawn. Both are disposed
 * once the child is home, so Beyond holds no GPU memory in the Solar System,
 * and the next trip is built at the quality of the moment. Nothing is saved.
 */
export function createBeyond({ renderer, getQuality, reducedMotion, makeRocket, onChange = () => {}, scenes = SCENES, createWarp = createBeyondWarp }) {
    let phase = "off";
    let destinationId = null;
    let destination = null;
    let stage = null;
    let progress = 0;
    let calm = false;
    let warp = null;
    let size = null;

    function emit() {
        onChange({ phase, destinationId, progress, calm, stage });
    }

    function closeDestination() {
        if (!destination) return;
        destination.close();
        destination.dispose();
        destination = null;
        stage = null;
    }

    function buildDestination() {
        destination = scenes[destinationId]({
            renderer,
            quality: getQuality(),
            reducedMotion,
            onChange: (state) => {
                stage = state.stage;
                if (phase === "arrived") emit();
            },
        });
        if (size) destination.resize(size);
        destination.prepare?.();
    }

    function arrive() {
        phase = "arrived";
        destination.open();
        // Place everything before the first frame is drawn, so nothing pops.
        destination.update(0);
        emit();
    }

    function freeWarp() {
        warp?.dispose();
        warp = null;
    }

    function ensureWarp() {
        if (warp) return warp;
        warp = createWarp({
            renderer,
            quality: getQuality(),
            reducedMotion,
            makeRocket,
            onFrame: (frame) => {
                progress = frame.progress;
                calm = frame.calm;
                emit();
            },
            onDone: (direction) => {
                progress = 1;
                if (direction === "out") arrive();
                else {
                    phase = "off";
                    destinationId = null;
                    freeWarp();
                    emit();
                }
            },
        });
        if (size) warp.resize(size);
        return warp;
    }

    return {
        /** The picker is open: build and compile the warp while the child chooses. */
        prepare() {
            if (phase === "off") ensureWarp().prepare?.();
        },

        /** The picker closed without a choice: nothing is kept. */
        release() {
            if (phase === "off") freeWarp();
        },

        go(id) {
            if (phase !== "off" || !destinationById(id) || !scenes[id]) return;
            destinationId = id;
            progress = 0;
            phase = "warp-out";
            ensureWarp().start("out");
            buildDestination();
            emit();
        },

        setHolding(holding) {
            if (phase === "warp-out") warp.setHolding(holding);
        },

        goHome() {
            if (phase !== "arrived") return;
            closeDestination();
            progress = 0;
            phase = "warp-home";
            warp.start("home");
            emit();
        },

        /** Straight back with no warp home: for Reset. */
        exitNow() {
            if (phase === "off") return;
            warp?.stop();
            freeWarp();
            closeDestination();
            phase = "off";
            destinationId = null;
            emit();
        },

        isActive: () => phase !== "off",
        destination: () => (phase === "arrived" ? destination : null),

        update(dt) {
            if (phase === "warp-out" || phase === "warp-home") warp.update(dt);
            else if (phase === "arrived") destination.update(dt);
        },

        render() {
            if (phase === "warp-out" || phase === "warp-home") warp.render();
            else if (phase === "arrived") destination.render();
        },

        resize(next) {
            size = next;
            warp?.resize(next);
            destination?.resize(next);
        },

        dispose() {
            closeDestination();
            freeWarp();
            phase = "off";
        },
    };
}
