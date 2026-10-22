// Layout for the line-up by size (#62). No Three.js here, so it is
// unit-tested in node; lineUp.js builds the scene.

// Mean radii in kilometres (NASA planetary fact sheets).
export const TRUE_RADII_KM = {
    Sun: 695700,
    Mercury: 2439.7,
    Venus: 6051.8,
    Earth: 6371,
    Mars: 3389.5,
    Jupiter: 69911,
    Saturn: 58232,
    Uranus: 25362,
    Neptune: 24622,
    Pluto: 1188.3,
};

export const LINE_UP_LINE = "Here they all are, side by side, at their real sizes. The Sun is so big that only its edge fits!";

// Space between neighbours, in Earth radii (the layout's unit).
const GAP = 1.5;
// Saturn's rings reach out to about 1.8 times its radius (createSaturnRings),
// so it needs that much room either side.
const REACH = { Saturn: 1.8 };

/**
 * Where each body sits in the row, left to right in `names` order, with the
 * Sun's edge just behind the first one. Sizes are true to life with Earth's
 * radius as 1; everything is centred on y = 0.
 */
export function lineUpLayout(names) {
    const earth = TRUE_RADII_KM.Earth;
    let edge = 0;
    const bodies = names.map((name) => {
        const radius = TRUE_RADII_KM[name] / earth;
        const reach = radius * (REACH[name] ?? 1);
        const item = { name, radius, x: edge + reach };
        edge += reach * 2 + GAP;
        return item;
    });
    const sunRadius = TRUE_RADII_KM.Sun / earth;
    return {
        bodies,
        sun: { radius: sunRadius, x: -GAP * 2 - sunRadius },
        // The row from the Sun's edge to past the last body, for framing and panning.
        left: -GAP * 2,
        right: edge - GAP,
    };
}

/** How far a camera with vertical field of view `fov` (degrees) must be to see `height`. */
function distanceFor(height, fov) {
    return height / (2 * Math.tan((fov * Math.PI) / 360));
}

/**
 * Camera framing for one body with its neighbours either side: the body fills
 * about two fifths of the screen's shorter side.
 */
export function framingFor(body, aspect, fov) {
    const size = Math.max(body.radius * 2.6, 7);
    const height = aspect < 1 ? size / aspect : size;
    return { x: body.x, distance: distanceFor(height, fov) };
}

/** Camera framing for the whole row, the Sun's edge included. */
export function framingForAll(layout, aspect, fov) {
    const width = layout.right - layout.left + 8;
    const tallest = Math.max(...layout.bodies.map((body) => body.radius)) * 2.4;
    const height = Math.max(width / aspect, tallest);
    return { x: (layout.left + layout.right) / 2, distance: distanceFor(height, fov) };
}
