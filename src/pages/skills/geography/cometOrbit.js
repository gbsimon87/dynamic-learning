// Illustrative Halley-like orbit, not an ephemeris. Distances and time are
// deliberately compressed for this Solar System model.
export const COMET_ID = "halleys-comet";
export const COMET_NAME = "Halley's Comet";
export const COMET_LINE = "A comet is a small world of ice, dust and rock. Near the Sun, warming ice releases gas and dust. The narrow blue tail shows gas pushed away from the Sun by the solar wind. Sunlight pushes dust away too, making the wider, curved tail. The tails do not simply trail behind like rocket flames! Halley's Comet takes about 76 years to go round the Sun. Our model makes it bigger and faster, and its path is illustrative, not its position today.";
export const COMET_PERIOD = 240;
const A = 64;
const E = 0.72;
const INCLINATION = Math.PI / 6;
const rotate = (x, z) => ({ x, y: z * Math.sin(INCLINATION), z: z * Math.cos(INCLINATION) });

export function cometPose(orbitTime) {
    const mean = ((0.15 - orbitTime * Math.PI * 2 / COMET_PERIOD) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
    let anomaly = mean;
    // Bounded Newton solve for eccentric anomaly; orbit runs retrograde.
    for (let i = 0; i < 10; i++) anomaly -= (anomaly - E * Math.sin(anomaly) - mean) / (1 - E * Math.cos(anomaly));
    const minor = A * Math.sqrt(1 - E * E);
    const position = rotate(A * (Math.cos(anomaly) - E), minor * Math.sin(anomaly));
    const velocity = rotate(A * Math.sin(anomaly), -minor * Math.cos(anomaly));
    const distance = Math.hypot(position.x, position.y, position.z);
    const away = { x: position.x / distance, y: position.y / distance, z: position.z / distance };
    const radial = velocity.x * away.x + velocity.y * away.y + velocity.z * away.z;
    const tangent = { x: velocity.x - radial * away.x, y: velocity.y - radial * away.y, z: velocity.z - radial * away.z };
    const length = Math.hypot(tangent.x, tangent.y, tangent.z);
    const behind = { x: -tangent.x / length, y: -tangent.y / length, z: -tangent.z / length };
    const activity = Math.max(0.03, Math.min(1, (95 - distance) / 65));
    return { position, away, behind, activity };
}

// All centre-line points extend into the anti-solar half-space. The dust
// bends opposite the transverse velocity, never into a Sun-facing plume.
export function cometTailPoint(pose, fraction, dust = false) {
    const length = (dust ? 15 : 22) * pose.activity;
    const bend = dust ? length * 0.55 * fraction * fraction : 0;
    return {
        x: pose.away.x * length * fraction + pose.behind.x * bend,
        y: pose.away.y * length * fraction + pose.behind.y * bend,
        z: pose.away.z * length * fraction + pose.behind.z * bend,
    };
}
