// Forgiving submarine movement: gentle easing, soft limits, no damage.
// The yaw convention matches Solar System free flight: forward is
// (-sin yaw, 0, -cos yaw) and steering right lowers yaw.
export const STEERING = {
  maxSpeed: 4,
  acceleration: 3,
  drag: 2.5,
  turnSpeed: 1.1,
  turnEase: 4,
  liftSpeed: 1.8,
  liftEase: 4,
  // Twenty times the first preview's area (radius 22).
  areaRadius: 100,
  floorClearance: 1.5,
  maxHeight: 5.5,
  hullRadius: 1.5,
  hullDepth: 1.1,
};
const IDLE = 0.001;

const approach = (value, target, step) => value < target ? Math.min(target, value + step) : Math.max(target, value - step);

export function createSteeringState({ x, y, z }, yaw = 0) {
  return { position: { x, y, z }, yaw, speed: 0, turn: 0, climb: 0 };
}

/** Advance one step. `world` supplies `floorHeight(x, z)` and rock `obstacles`. */
export function stepSteering(state, { turn, throttle, lift }, seconds, world) {
  let speed = approach(state.speed, throttle * STEERING.maxSpeed, (throttle ? STEERING.acceleration : STEERING.drag) * seconds);
  const turning = approach(state.turn, turn * STEERING.turnSpeed, STEERING.turnEase * seconds);
  let climb = approach(state.climb, lift * STEERING.liftSpeed, STEERING.liftEase * seconds);
  const yaw = state.yaw - turning * seconds;
  let x = state.position.x - Math.sin(yaw) * speed * seconds;
  let z = state.position.z - Math.cos(yaw) * speed * seconds;
  let y = state.position.y + climb * seconds;

  const reach = Math.hypot(x, z);
  if (reach > STEERING.areaRadius) { x *= STEERING.areaRadius / reach; z *= STEERING.areaRadius / reach; }
  for (const rock of world.obstacles) {
    if (y - STEERING.hullDepth >= rock.top) continue;
    const dx = x - rock.x, dz = z - rock.z;
    const gap = Math.hypot(dx, dz), clear = rock.radius + STEERING.hullRadius;
    if (gap >= clear) continue;
    const [nx, nz] = gap > 1e-9 ? [dx / gap, dz / gap] : [1, 0];
    x = rock.x + nx * clear;
    z = rock.z + nz * clear;
    speed *= 0.5;
  }
  const floor = world.floorHeight(x, z) + STEERING.floorClearance;
  if (y <= floor) { y = floor; climb = Math.max(0, climb); }
  if (y >= STEERING.maxHeight) { y = STEERING.maxHeight; climb = Math.min(0, climb); }
  return { position: { x, y, z }, yaw, speed, turn: turning, climb };
}

export function isSteeringIdle(state, input) {
  return !input.turn && !input.throttle && !input.lift
    && Math.abs(state.speed) < IDLE && Math.abs(state.turn) < IDLE && Math.abs(state.climb) < IDLE;
}
