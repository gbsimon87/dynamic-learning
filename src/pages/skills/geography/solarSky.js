import * as THREE from "three";

// The Milky Way band crosses the planets' plane at about 60°.
const GALACTIC_TILT = THREE.MathUtils.degToRad(60);
// The photo is true to life and very dark; children need to see the band.
const MILKY_WAY_BRIGHTNESS = 3;

/**
 * The sky behind the Solar System (#9). The default is the cube-map sky with
 * the random star dots; the "Milky Way sky" switch swaps both for Solar System
 * Scope's Milky Way photo, tilted the way the real band crosses the planets'
 * plane. The photo loads the first time it's switched on: 4k on the `low`
 * tier, because the 8k copy decodes to about 128 MB of GPU memory and many
 * phones can't load textures wider than 4096 px.
 *
 * A module for solarModules.js. `apply` sets the background; `update` keeps
 * the star dots hidden under the photo, since Tweakpane can rebuild them.
 */
export function createSolarSky({ scene, cubeTexture, getStars, quality, loader = new THREE.TextureLoader() }) {
    let milkyWayTexture = null;
    let milkyWayOn = false;

    function milkyWay() {
        if (!milkyWayTexture) {
            const file = quality === "low" ? "4k_stars_milky_way.jpg" : "8k_stars_milky_way.jpg";
            milkyWayTexture = loader.load(`/static/${file}`);
            milkyWayTexture.mapping = THREE.EquirectangularReflectionMapping;
            milkyWayTexture.colorSpace = THREE.SRGBColorSpace;
        }
        return milkyWayTexture;
    }

    return {
        /** `skyVisible` is Tweakpane's grown-up "Show Galaxy" switch. */
        apply({ milkyWay: wantMilkyWay, skyVisible = true }) {
            milkyWayOn = wantMilkyWay;
            if (!skyVisible) scene.background = null;
            else scene.background = wantMilkyWay ? milkyWay() : cubeTexture;
            scene.backgroundRotation.set(wantMilkyWay ? GALACTIC_TILT : 0, 0, 0);
            scene.backgroundIntensity = wantMilkyWay ? MILKY_WAY_BRIGHTNESS : 1;
            this.update();
        },
        update() {
            const stars = getStars();
            if (stars) stars.visible = !milkyWayOn;
        },
        dispose() {
            milkyWayTexture?.dispose();
        },
    };
}
