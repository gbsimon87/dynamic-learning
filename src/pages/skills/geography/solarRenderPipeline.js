import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

/**
 * Draws the Solar System, optionally through bloom (idea #5, Phase 0 spike in
 * docs/SOLAR_SYSTEM_IDEAS.md).
 *
 * With bloom off this is exactly `renderer.render(scene, camera)`: no composer
 * exists and nothing extra is allocated. With bloom on, the scene renders into
 * a half-float target so the Sun can be brighter than white, only pixels above
 * `threshold` glow, and OutputPass applies the renderer's tone mapping and
 * colour space as the screen would. Labels and planets stay at or below 1.0,
 * so they don't glow.
 *
 * On the `low` tier the bloom blur runs at half its usual resolution.
 */
export const BLOOM_DEFAULTS = { strength: 0.8, radius: 0.4, threshold: 1.0 };

export function createRenderPipeline({ renderer, scene, camera, getQuality }) {
    const settings = { ...BLOOM_DEFAULTS };
    const cssSize = new THREE.Vector2();
    let composer = null;
    let bloomPass = null;

    function enable() {
        if (composer) return;
        renderer.getSize(cssSize);
        // Rendering into a target loses the canvas's own antialiasing; MSAA samples put it back.
        const target = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples: 4 });
        composer = new EffectComposer(renderer, target);
        // A custom target makes the composer take its size as CSS pixels; reset it.
        composer.setSize(cssSize.x, cssSize.y);
        composer.addPass(new RenderPass(scene, camera));
        bloomPass = new UnrealBloomPass(new THREE.Vector2(1, 1), settings.strength, settings.radius, settings.threshold);
        const fullSetSize = bloomPass.setSize.bind(bloomPass);
        bloomPass.setSize = (width, height) => {
            const scale = getQuality() === "low" ? 0.5 : 1;
            fullSetSize(Math.max(1, Math.round(width * scale)), Math.max(1, Math.round(height * scale)));
        };
        composer.addPass(bloomPass);
        composer.addPass(new OutputPass());
    }

    function disable() {
        if (!composer) return;
        composer.passes.forEach((pass) => pass.dispose?.());
        composer.dispose();
        composer = null;
        bloomPass = null;
    }

    return {
        settings,
        get bloomEnabled() { return composer !== null; },
        setBloom(enabled) {
            if (enabled) enable();
            else disable();
        },
        render() {
            if (!composer) {
                renderer.render(scene, camera);
                return;
            }
            bloomPass.strength = settings.strength;
            bloomPass.radius = settings.radius;
            bloomPass.threshold = settings.threshold;
            composer.render();
        },
        /** CSS-pixel size, as passed to `renderer.setSize`. */
        setSize(width, height) {
            composer?.setPixelRatio(renderer.getPixelRatio());
            composer?.setSize(width, height);
        },
        dispose: disable,
    };
}
