// Name badges in the 3D scene keep one on-screen size, like map labels, so a
// badge near the camera can never grow to fill a phone screen.

const PHONE_WIDTH = 720;

/** Badge height in CSS pixels: smaller on phones, still readable for 6–8 year olds. */
export function badgePixelHeight(viewportWidth) {
    return viewportWidth < PHONE_WIDTH ? 22 : 26;
}

/** World-space height that projects to `pixels` tall at `distance` from the camera. */
export function badgeWorldHeight(pixels, distance, fovDeg, viewportHeight) {
    // A container still laying out can be 0px tall.
    return (pixels * 2 * distance * Math.tan((fovDeg * Math.PI) / 360)) / Math.max(1, viewportHeight);
}

/**
 * Screen boxes ({ x, y, halfWidth, halfHeight } in pixels), most important
 * first. Returns which to keep: each one that does not overlap a kept one.
 */
export function pickUnoverlapped(boxes) {
    const kept = [];
    return boxes.map((box) => {
        const clear = !kept.some((other) => Math.abs(other.x - box.x) < other.halfWidth + box.halfWidth
            && Math.abs(other.y - box.y) < other.halfHeight + box.halfHeight);
        if (clear) kept.push(box);
        return clear;
    });
}
