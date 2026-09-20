const TAU = Math.PI * 2;
const add = (a, b) => ({ x: a.x + b.x, y: a.y + b.y, z: a.z + b.z });
const mul = (a, s) => ({ x: a.x * s, y: a.y * s, z: a.z * s });
const length = (a) => Math.hypot(a.x, a.y, a.z);
const normalise = (a) => mul(a, 1 / (length(a) || 1));
const cross = (a, b) => ({ x: a.y * b.z - a.z * b.y, y: a.z * b.x - a.x * b.z, z: a.x * b.y - a.y * b.x });
const subtract = (a, b) => add(a, mul(b, -1));
const dot = (a, b) => a.x * b.x + a.y * b.y + a.z * b.z;
const clamp = (v, low, high) => Math.max(low, Math.min(high, v));

export function buildApproachPath({ radius, aspect }) {
  const normal = normalise({ x: -0.45, y: 0.2, z: 1 });
  const meteorRadius = radius * 0.14;
  const contact = mul(normal, radius);
  const end = mul(normal, radius + meteorRadius);
  const start = add(end, mul({ x: -clamp(2.6 * aspect, 1.8, 3.2), y: 2, z: -6 }, radius));
  const control = add(end, mul({ x: -1.3, y: 0.75, z: 2 }, radius));
  return { start, control, end, contact, normal, meteorRadius };
}

export function sampleApproachPath(path, t) {
  t = clamp(t, 0, 1);
  const s = 1 - t;
  return add(add(mul(path.start, s * s), mul(path.control, 2 * s * t)), mul(path.end, t * t));
}

export function fitShotDistance({ samples, fovDegrees, width, height, reservedBottomPx = 0, near = 0.1 }) {
  if (![fovDegrees, width, height, reservedBottomPx, near].every(Number.isFinite) || width <= 0 || height <= 0) return null;
  const tanY = Math.tan(fovDegrees * Math.PI / 360);
  const tanX = tanY * width / height;
  const usableX = 1 - 32 / width;
  // Centre the shot in the area above the controls. Leave 16px at the top.
  const usableY = 1 - (reservedBottomPx + 32) / height;
  if (tanX <= 0 || tanY <= 0 || usableX <= 0 || usableY <= 0) return null;
  let distance = near;
  for (const { position: p, radius: r } of samples) {
    distance = Math.max(distance,
      p.z + r + (Math.abs(p.x) + r) / (tanX * usableX),
      p.z + r + (Math.abs(p.y) + r) / (tanY * usableY),
      p.z + r + near);
  }
  return distance * 1.08;
}

function spherePoint(phi, theta, radius = 1) {
  return { x: -radius * Math.cos(phi) * Math.sin(theta), y: radius * Math.cos(theta), z: radius * Math.sin(phi) * Math.sin(theta) };
}

export function buildEarthFragmentData({ columns, rows = 4, segments = 32, innerRadius = 0.72 }) {
  if (!Number.isInteger(columns) || !Number.isInteger(rows) || segments % columns || segments % rows || columns < 3 || rows < 2 || innerRadius <= 0 || innerRadius >= 1) throw new RangeError('Invalid fragment grid');
  const pieces = [];
  for (let row = 0; row < rows; row++) for (let col = 0; col < columns; col++) {
    const phi0 = col * TAU / columns;
    const theta0 = row * Math.PI / rows;
    const dx = segments / columns;
    const dy = segments / rows;
    const phiAt = (x) => phi0 + x * TAU / segments;
    const thetaAt = (y) => theta0 + y * Math.PI / segments;
    const pivot = spherePoint(phiAt(dx / 2), thetaAt(dy / 2));
    const positions = [], normals = [], uvs = [], indices = [], groups = [];
    const addTriangle = (vertices, faceNormal = null, invert = false) => {
      let [a, b, c] = vertices;
      let outward = cross(subtract(b.point, a.point), subtract(c.point, a.point));
      if (length(outward) < 1e-9) return;
      if ((faceNormal && dot(outward, faceNormal) < 0) || (!faceNormal && ((dot(outward, a.point) < 0) !== invert))) [b, c] = [c, b];
      outward = normalise(cross(subtract(b.point, a.point), subtract(c.point, a.point)));
      const offset = positions.length / 3;
      for (const vertex of [a, b, c]) {
        const p = subtract(vertex.point, pivot);
        positions.push(p.x, p.y, p.z);
        const n = faceNormal ? outward : (invert ? mul(normalise(vertex.point), -1) : normalise(vertex.point));
        normals.push(n.x, n.y, n.z);
        uvs.push(vertex.u ?? 0, vertex.v ?? 0);
      }
      indices.push(offset, offset + 1, offset + 2);
    };
    const vertex = (x, y, radius = 1) => {
      const phi = phiAt(x), theta = thetaAt(y);
      const poleOffset = theta < 1e-9 ? 0.5 / segments : Math.abs(theta - Math.PI) < 1e-9 ? -0.5 / segments : 0;
      return { point: spherePoint(phi, theta, radius), u: phi / TAU + poleOffset, v: 1 - theta / Math.PI };
    };
    for (let y = 0; y < dy; y++) for (let x = 0; x < dx; x++) {
      const a = vertex(x, y), b = vertex(x + 1, y), c = vertex(x, y + 1), d = vertex(x + 1, y + 1);
      addTriangle([b, a, d]);
      addTriangle([a, c, d]);
    }
    const outerCount = indices.length;
    for (let y = 0; y < dy; y++) for (let x = 0; x < dx; x++) {
      const a = vertex(x, y, innerRadius), b = vertex(x + 1, y, innerRadius), c = vertex(x, y + 1, innerRadius), d = vertex(x + 1, y + 1, innerRadius);
      addTriangle([b, a, d], null, true);
      addTriangle([a, c, d], null, true);
    }
    const capEdge = (x1, y1, x2, y2, expected) => {
      const a = vertex(x1, y1), b = vertex(x2, y2);
      const ai = vertex(x1, y1, innerRadius), bi = vertex(x2, y2, innerRadius);
      addTriangle([a, b, bi], expected);
      addTriangle([a, bi, ai], expected);
    };
    for (let y = 0; y < dy; y++) {
      const theta = thetaAt(y + 0.5);
      capEdge(0, y, 0, y + 1, { x: -Math.sin(phi0) * Math.sin(theta), y: 0, z: -Math.cos(phi0) * Math.sin(theta) });
      const phi = phiAt(dx);
      capEdge(dx, y, dx, y + 1, { x: Math.sin(phi) * Math.sin(theta), y: 0, z: Math.cos(phi) * Math.sin(theta) });
    }
    for (let x = 0; x < dx; x++) {
      const phi = phiAt(x + 0.5);
      const expected = (theta, sign) => ({ x: sign * -Math.cos(phi) * Math.cos(theta), y: sign * -Math.sin(theta), z: sign * Math.sin(phi) * Math.cos(theta) });
      capEdge(x, 0, x + 1, 0, expected(theta0, -1));
      capEdge(x, dy, x + 1, dy, expected(thetaAt(dy), 1));
    }
    groups.push({ start: 0, count: outerCount, materialIndex: 0 }, { start: outerCount, count: indices.length - outerCount, materialIndex: 1 });
    let boundRadius = 0;
    for (let k = 0; k < positions.length; k += 3) boundRadius = Math.max(boundRadius, Math.hypot(positions[k], positions[k + 1], positions[k + 2]));
    pieces.push({ id: `${row}-${col}`, pivot, direction: normalise(pivot), positions, normals, uvs, indices, groups, boundRadius });
  }
  return pieces;
}

export function createFragmentMotion(fragments, { seed = 1741, contactNormal = { x: 0, y: 0, z: 1 } } = {}) {
  let value = seed >>> 0;
  const random = () => { value ^= value << 13; value ^= value >>> 17; value ^= value << 5; return (value >>> 0) / 4294967296; };
  return fragments.map((piece) => {
    const away = subtract(piece.direction, mul(contactNormal, 0.25));
    const jitter = { x: random() - 0.5, y: random() - 0.5, z: random() - 0.5 };
    return { id: piece.id, direction: normalise(add(away, mul(jitter, 0.45))), rotationAxis: normalise(jitter), maximumDisplacement: 0.8 + random() * 0.7, maximumAngle: 0.2 + random() * 0.45 };
  });
}
