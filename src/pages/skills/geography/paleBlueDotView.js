// The Pale Blue Dot (#47): where the camera looks back from, and how far it
// zooms. No Three.js here, so it is unit-tested in node; paleBlueDot.js moves
// the camera. Points are plain { x, y, z } with the Sun at the origin.

export const PALE_BLUE_DOT_TITLE = "The Pale Blue Dot";
export const PALE_BLUE_DOT_STORY = [
    "In 1990 the spacecraft Voyager 1 was about 6 billion kilometres away, past all the planets.",
    "Scientists asked it to turn round and take one last photo of home.",
    "Earth was so small it was just a tiny blue dot, floating in a sunbeam.",
    "Everyone you have ever met lives on that little dot. Let's take care of it!",
];

// Voyager 1 was about 32° above the planets' plane when it took the photo.
export const LOOK_BACK_ELEVATION = 32;
// Far enough out that, even tilted up, it is past Neptune (770); inside the far plane (5000).
export const LOOK_BACK_DISTANCE = 1100;

const DEG = Math.PI / 180;

/**
 * Where the camera looks back from: far out, above the planets' plane, and
 * side-on to the line from the Sun to Earth, so Earth shows as far from the
 * Sun as it can.
 */
export function lookBackPoint(earth, distance = LOOK_BACK_DISTANCE, elevation = LOOK_BACK_ELEVATION) {
    const flat = Math.hypot(earth.x, earth.z) || 1;
    // A quarter-turn round from Earth.
    const side = { x: -earth.z / flat, z: earth.x / flat };
    const across = Math.cos(elevation * DEG) * distance;
    return { x: side.x * across, y: Math.sin(elevation * DEG) * distance, z: side.z * across };
}

/** How far apart the Sun and Earth look from `eye`, in degrees. */
export function separationDegrees(earth, eye) {
    const toSun = { x: -eye.x, y: -eye.y, z: -eye.z };
    const toEarth = { x: earth.x - eye.x, y: earth.y - eye.y, z: earth.z - eye.z };
    const dot = toSun.x * toEarth.x + toSun.y * toEarth.y + toSun.z * toEarth.z;
    const cos = dot / (Math.hypot(toSun.x, toSun.y, toSun.z) * Math.hypot(toEarth.x, toEarth.y, toEarth.z));
    return Math.acos(Math.min(1, Math.max(-1, cos))) / DEG;
}

/**
 * The camera's vertical field of view for the zoom: narrow enough that the
 * gap between the Sun and Earth fills about a third of the screen's shorter
 * side, so Earth is a dot clear of the Sun.
 */
export function zoomFov(separation, aspect) {
    const shorter = Math.min(1, aspect);
    return Math.min(20, Math.max(1.5, separation / 0.35 / shorter));
}
