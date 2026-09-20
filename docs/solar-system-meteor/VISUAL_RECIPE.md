# Solar System Meteor — Geometry and Effects Recipe

**Status:** Proposed implementation recipe, not implemented or visually verified.  
**Read with:** [Implementation plan](IMPLEMENTATION_PLAN.md) and
[tracker](IMPLEMENTATION_TRACKER.md).

This supplies the construction details for M2–M4. Use the exact existing Earth
texture and normal scene renderer. Quantities below are expressed in Earth radii
unless stated otherwise. Values marked **tune** need browser inspection; the
transform, UV, ownership, and contact invariants are mandatory.

## 1. Coordinates and transform contract

At accepted launch, after the page freezes the world and updates world matrices:

1. Read `earthBody.getWorldPosition`, `getWorldQuaternion`, and `getWorldScale`
   into reusable vectors/quaternion. The original geometry has radius 1, so its
   uniform world scale is Earth radius `r` (currently 0.45).
2. Keep the effect root directly under `scene`, never under the hidden Earth
   mesh. Inside it, use separate groups for world-space meteor/contact effects
   and Earth-local fragments/cracks.
3. Copy the captured position, quaternion, and scale onto the fragments group.
   Its patch coordinates are unit-sphere local coordinates. Do not multiply
   by `r` again inside that group.
4. Contact, meteor path, glow, ring, and camera points use world coordinates.
   Transform the contact normal into Earth local coordinates with the inverse
   captured quaternion when locating cracks; include inverse scale when
   transforming a position. Do not confuse the system root's rotation with
   the body's tilt + spin.
5. Preserve body identity, parent, geometry, material, and texture. Its only
   experiment mutation is visibility. No original material opacity/emissive edits.

Reject a missing/zero/non-finite radius with the page's recoverable error path.
The current scene uses uniform scale; verify its three components agree within
an epsilon. Supporting an arbitrarily stretched ellipsoid is outside scope.

For pure functions use `{ x, y, z }` or numeric arrays consistently; adapt to
Three.js vectors at the controller boundary. No DOM or WebGL in geometry tests.

Use these exports from `meteorGeometry.js` in addition to the fragment builder
specified in §5:

| Export | Input and output contract |
| --- | --- |
| `buildApproachPath({ radius, aspect })` | Returns `{ start, control, end, contact, normal, meteorRadius }` as plain vectors/scalars in shot coordinates (origin C, axes U/V/N). Equations in §§2–3. |
| `sampleApproachPath(path, t)` | Returns a plain point on the curve; t is clamped to [0,1]. Controller applies time easing before this call. |
| `fitShotDistance({ samples, fovDegrees, width, height, reservedBottomPx, near })` | Samples are `{ position, radius }` in shot coordinates. Returns the conservative distance in §3; derive aspect from width/height. |
| `createFragmentMotion(fragments, { seed, contactNormal })` | Returns one plain motion record per fragment ID (direction, rotationAxis, maximumDisplacement, maximumAngle); contactNormal is in Earth-local coordinates. |

Shot coordinates are world-length units, not unit-Earth coordinates. Convert a
shot point `(x,y,z)` to world with `C + xU + yV + zN`. Fragment geometry/motion
remains in unit-Earth coordinates under the captured fragments group transform.
Keep these two coordinate contracts distinct.

## 2. Camera basis and contact point

Choose a stable shot independent of the learner's last camera orientation.
Build it once at launch and retain it on resize:

```text
C = captured Earth centre
L = normalize(sunPosition - C)       // sunPosition is (0, 0, 0)
N = normalize(L + (0, 0.55, 0))     // points from Earth towards the shot camera
U = normalize(worldUp cross N)      // screen right
V = normalize(N cross U)            // screen up
n = normalize(-0.45 U + 0.20 V + N) // visible upper-left contact normal
meteorRadius = 0.14 r
surfaceContact = C + r n
meteorContactCentre = C + (r + meteorRadius) n
```

Use a fallback basis if a cross product is near zero. This normally looks at a
lit face of Earth because `N` points generally towards the Sun, while the tilt
and map orientation remain exactly as captured. Do not rotate Earth just to
make the effect look better.

The impact sprite/ring originates at `surfaceContact`. The meteor's final centre
is `meteorContactCentre`, accounting for its own radius. Placing the rock centre
at Earth's centre or surface would bury it before the impact effect starts.

## 3. Approach path and shot framing

Start with a quadratic Bézier curve. In world coordinates, using the same basis:

```text
Q  = meteorContactCentre
sx = clamp(2.6 * initialAspect, 1.8, 3.2)
P0 = Q + r * (-sx U + 2.0 V - 6.0 N)
P1 = Q + r * (-1.3 U + 0.75 V + 2.0 N)
P2 = Q
B(t) = (1-t)^2 P0 + 2(1-t)t P1 + t^2 P2
```

P0 sits behind and to the side of Earth, so the approach gains apparent size
through perspective. P1 brings the meteor round to the visible contact point.
Use `t = p * p` (**tune**) for accelerating travel, where `p` is approach time
normalised to `[0, 1]`. Clamp progress exactly; evaluate `B(1)` at impact even if
a frame crosses the boundary. The rock keeps a constant physical radius.

Before accepting this path, test at least 201 evenly spaced curve parameters
for the low/high aspect fixtures: distance from C must exceed `r + meteorRadius`
until t=1 (within numeric tolerance at the endpoint). Also check projected
visibility. If tuning violates clearance, adjust control points; do not add
collision physics or move the intended impact point mid-flight.

### Fitting the approach

Use the current camera FOV and container dimensions, not window dimensions.
Reserve the measured control-strip height plus 16 px gap at the bottom; while
active there are no other scene overlays. A simple conservative initial fit
uses that same margin at top and bottom, keeping the subject centred:

```text
tanY = tan(verticalFov / 2)
tanX = tanY * aspect
usableX = 1 - 2 * horizontalMarginPx / width       // initial margin 16 px
usableY = 1 - 2 * reservedBottomPx / height
```

Use positive guarded dimensions. In very short layouts, compact the strip so
`usableY` remains at least 0.2; do not silently fit through an opaque UI panel.
For zero/non-finite dimensions, `fitShotDistance` returns null and the controller
keeps its last valid shot until the observer supplies a usable size.
Camera is `C + d N`, looking at C with the page's normal +Y up. The U/V basis
above is consistent with that orientation.

For each sample's camera-basis `(x, y, z)` relative to C, with bounding radius
`s`, a conservative distance requirement is:

```text
d >= z + s + (abs(x) + s) / (tanX * usableX)
d >= z + s + (abs(y) + s) / (tanY * usableY)
d >= z + s + camera.near
```

Fit Earth (radius r) and 33 curve samples (radius meteorRadius plus glow margin)
and take the largest required distance, with a small safety margin (**tune**).
The extra `s` term covers the nearest side of a spherical bound. Aim for an Earth
diameter of at least 80 CSS px on the phone fixtures; if the fit makes it too
small, shorten the lateral path/glow, not the controls' touch targets.

Interpolate from the captured user camera/target to the fitted shot during
preparing using `p*p*(3-2*p)`. The controller writes `camera.position` and calls
`camera.lookAt(target)`; it does not invoke OrbitControls. Hide all effect assets
until approach begins. If the preparation segment would pass through the Sun
or Earth (e.g. launching from the far side of the Sun), route via an elevated
waypoint and verify it; a direct cut is an acceptable prototype fallback and is
required for reduced motion. Do not let a large opaque Sun fill the preparation
frames without recording and resolving the framing issue.

Hold the shot through impact. For breakup, calculate a second fit enclosing
all final fragment bounds; ease distance to this fit during breaking. Keep
orientation and Earth centre fixed. This lets the opening show a readable Earth
without reserving the whole debris field too soon.

Resize recomputes fit distances for the same world-space path and fragment
poses. Do not rebuild P0/P1 using the new aspect, recapture Earth, or reset the
phase clock. In preparing, retain its original camera start and update the
endpoint; afterward refit the current shot. Guard zero-size observer callbacks.

## 4. Meteor and trail

- Use an `IcosahedronGeometry(meteorRadius, 1)` with an owned rough dark
  `MeshStandardMaterial`; a small warm emissive value keeps it readable.
- Add one glow sprite using an owned radial `CanvasTexture` (128 × 128 is enough
  initially), warm yellow/orange, additive blending, transparent, depthWrite
  false. Share that generated texture with contact/spark effects.
- Build the glow texture once. If a 2D canvas context is unavailable, throw a
  recoverable effect-construction error, not an error every animation frame.
- Rotate the rock slowly from absolute approach time; point any directional
  flame/trail along the curve derivative, not world -Z.
- Use a single `Points` object for the trail. Its fixed position/colour buffers
  hold older path samples behind the head: `B(max(0, t - j * tailSpan / count))`.
  Hide samples whose pre-clamp parameter is negative using draw range; avoid a
  bright stack at P0. Start `tailSpan` at 0.22 (**tune**).
- Fade the tail by per-vertex colour intensity against the additive material;
  keep depthTest on and depthWrite off. Update existing buffer attributes and
  mark them `needsUpdate`; assign a conservative bounding sphere or disable
  frustum culling for these bounded moving Points so stale bounds do not hide it.
- Hide rock at impact; fade retained trail over the first 0.25 s of impact.
  A slow frame entering breaking also hides it, even if no impact frame rendered.

Default PointsMaterial has uniform point size. If a width gradient is necessary,
use two fixed point layers before considering a custom shader. Do not add bloom
just to make the trail visible. Inspect the actual ACES tone-mapped result.

## 5. Curved fragments with continuous Earth texture

Build the low tier as 4 longitude × 4 latitude patches, standard as 8 × 4. These
divide the source sphere's 32 × 32 grid exactly. The prototype may temporarily
use fewer patches but must still show curved Earth pieces separating.

### Pure geometry result

`buildEarthFragmentData({ columns, rows = 4, segments = 32, innerRadius = 0.72 })`
returns a bounded array of records:

```js
{
  id,                       // stable row/column identity
  pivot: { x, y, z },        // centroid of outer patch vertices
  direction: { x, y, z },    // normalised pivot, deterministic fallback if needed
  positions, normals, uvs,   // numeric arrays, vertices recentered around pivot
  indices,                  // integer indices in range
  groups: [                 // for one geometry with two material slots
    { start, count, materialIndex: 0 }, // textured outer surface
    { start, count, materialIndex: 1 }, // inner surface + cut faces
  ],
  boundRadius,              // bound around the recentered local origin
}
```

Use bounded grid loops, never retry-until-randomly-valid loops. The controller
converts these arrays to BufferGeometry once. Mesh groups share one outer
material and one inner/cut material across fragments. Two materials mean up to
two draw calls per fragment; include that cost in performance measurements.

### Outer surface and UV equations

For each patch, define `phi0`, `phiLength`, `theta0`, `thetaLength` from its
column/row. Use the exact installed SphereGeometry coordinate convention:

```text
phi   = phi0   + u * phiLength
theta = theta0 + v * thetaLength
S(phi, theta) = (-cos(phi)*sin(theta), cos(theta), sin(phi)*sin(theta))
normal = S(phi, theta)
UV = (phi / (2*pi), 1 - theta / pi)
```

Use `32 / columns` horizontal cells and `32 / rows` vertical cells for each
patch. At the two poles, match the original sphere's U offset (`+0.5/32` at
north, `-0.5/32` at south). Preserve the original triangle winding and omit
zero-area polar triangles. Pole U coordinates can extend slightly outside
0–1 just as the source sphere does; do not clamp them and introduce a seam.

If implementing through `THREE.SphereGeometry` as an intermediate prototype,
its per-patch UVs must be remapped, including its existing local pole offset:

```text
globalU = (phi0 + localU * phiLength) / (2*pi)
globalV = 1 - (theta0 + (1 - localV) * thetaLength) / pi
```

Move the final numeric builder into the pure module for the geometry tests.
Never edit `textures.earth.repeat`, `.offset`, wrapping, or the shared source
sphere to correct patch UVs: those changes would affect the original Earth.

### Thickness and cut surfaces

Build an inner copy of the patch at radius 0.72. Reverse its triangle winding
and normals. For each of the four grid boundaries, connect the outer and inner
edge with quads split into triangles. Skip a collapsed edge at a pole. Duplicate
edge vertices where needed for flat cut-face normals; do not smooth crust and
cut faces into a paper-thin appearance.

For cap orientation, compute the triangle cross product and compare it with the
outward boundary direction: decreasing/increasing phi for left/right edges,
and decreasing/increasing theta for top/bottom. Flip winding when the dot
product is negative. Test nonzero triangle areas and normals, including polar
patches. Inner/cap UVs may be simple planar values; they use an untextured
material.

Outer material: owned MeshStandardMaterial using the borrowed Earth texture,
roughness near the original, no shadows. A very small owned emissiveMap/intensity
may keep blue/green crust readable; tune in the actual light. Interior material:
dark warm rock with orange emissive glow, strongest at breaking and subdued in
aftermath. It is shared and opaque. No per-fragment material copies solely for
identical colour.

### Pivot and swap invariants

Subtract each outer patch centroid from every vertex, including inner/cap
vertices. At rest set `fragment.position = pivot`, rotation identity. Under the
captured Earth group transform, the union of outer surfaces now matches the
original globe without a scale/orientation jump. This is the M2/M4 swap test.

During impact the original Earth is visible, fragments hidden. On breaking
entry, set original Earth invisible and fragments visible in the same update.
At zero separation the visible outer skin must still look like Earth. Keep
cracks as a separate overlay and remove/fade them as the pieces leave.

## 6. Fragment movement and settled aftermath

Generate seeded directions, rotation axes, maximum angles, and displacement
lengths once for each fragment ID; reuse on every replay. Do not call Math.random
inside the animation update. A small deterministic integer PRNG is sufficient;
record the seed constant and test that the same seed returns the same records.

Use each patch's outward normal plus a modest bias away from the contact point,
then normalise. Start maximum displacements at 0.8–1.5 local Earth radii, maximum
rotations at 0.2–0.65 radians (**tune**). For normalised breakup time p:

```text
ease = 1 - (1-p)^3
position = pivot + direction * maximumDisplacement * ease
rotation = axisAngle(rotationAxis, maximumAngle * ease)
```

This yields a frame-rate-independent result with no physics integration. Keep
large blue/green pieces visible; no whole-field fade to empty space. Compute
final bounds using `length(finalPosition) + boundRadius` per piece, so camera
framing accounts for rotation without guessing a debris radius.

In aftermath keep these final fragment poses fixed. Only dust/sparks/contact
finish fading. Reduced motion directly uses the same final transforms and fades
the group into view; use a group-level material-opacity transition with separate
owned reduced-motion materials if needed, restoring opaque state on reset.
Do not change the shared normal Earth's material. A cut to the final pieces
with a gentle contact-glow fade is also sufficient and cheaper.

## 7. Impact, cracks, dust, and sparks

All effects are allocated once and phase-driven. Use world positions for
contact/debris and Earth-local positions for surface cracks.

| Effect | Construction and animation |
| --- | --- |
| Contact glow | Shared generated radial texture, world position `surfaceContact + n * 0.01r`; one smooth rise/fall over impact, no repeated flashes or screen-wide white overlay. |
| Shockwave | One RingGeometry in its XY plane, rotate its +Z normal to n with a quaternion; grow from 0.15r to 2.5r and fade over impact/early breaking. Transparent, depthWrite false, additive. It is a stylised surface-tangent ring. |
| Temporary light | One non-shadow PointLight near contact. Smooth bounded pulse; explicitly zero/hide in aftermath and reset. It never overwrites sun/ambient settings. |
| Cracks | Start from the contact location, branch towards patch boundaries, and reveal several seam-following polylines by distance from contact during impact. Place at radius 1.006 in Earth local coordinates; use thin tubes/ribbons, not unsupported wide WebGL lines. Use owned warm emissive material. |
| Dust | One Points object with seeded outward directions/speeds/lifetimes; start near contact and fragment boundaries, drift at most a few radii, fade during breaking and first 2 s of aftermath. |
| Sparks | One smaller additive Points object, faster/shorter-lived than dust; same bounded position-update strategy. Omitted in reduced motion. |

Keep crack branches within the tier count. Build polylines/geometry before
impact, then reveal by draw ranges or scaling opacity; no new meshes on each
crack frame. The long patch seams can remain only partly illuminated, avoiding
an overly regular bright latitude/longitude cage. Fine unevenness is visual
polish; start with seams that match the actual fragment boundaries.

For particles use absolute age since impact, initial position + seeded velocity
× age with a bounded slowing function, and analytical fade. Keep all positions
finite even after a large timeline delta. A PointsMaterial's opacity is uniform;
use per-vertex colour brightness for an additive fade, separate small fixed age
batches, or one shared fade if that looks sufficient. Do not assume standard
PointsMaterial automatically consumes a custom alpha attribute.

Clear draw ranges/opacity/light intensity on reset, and initialise every reused
attribute on the next launch. Hide the whole effect root when ready. Never let
faded-but-visible Mesh objects enter scene raycasts.

## 8. Visual review gates

**M2:** Record intact Earth immediately before swap, zero-separation fragments,
and separated fragments. Confirm position/tilt/map alignment and a working reset.
Missing polish is expected; missing globe breakup is not.

**M3:** Record Earth + meteor at approach start/middle/contact in phone portrait
and landscape. Look for clipping, a path through Earth, a texture that becomes
black, a bright trail hiding the rock, and a camera that moves after preparation.

**M4:** Record impact, early breakup, and settled aftermath. Confirm a child can
identify blue/green Earth pieces, curved surfaces have thickness, cracks lead
into separation, and the final view remains visibly destroyed until reset.

The procedural default is accepted only if these images demonstrate the intended
experience. If patches still read as a tidy grid after tuning direction/rotation,
record that specific limitation before considering irregular patch boundaries
or an authored model. Do not add an unrelated rendering library on speculation.

## 9. Planning-time numerical checks

On 2026-09-20, sampled the proposed curve at 201 parameters for aspect ratios
320/844, 390/844, 844/390, 768/1024, and 1440/900. Every pre-contact sample stayed
outside the combined Earth/meteor radius; the endpoint distance was exactly
1.14 Earth radii within floating-point tolerance.

Also generated both patch tiers with installed Three.js 0.181.0 and compared
2,736 patch vertices with the original 32 × 32 sphere. Positions and remapped
UVs matched within 1e-6, including pole offsets. These small read-only checks
validate the recipe's starting equations; they do not verify the future pure
builder, cut faces, camera framing, browser appearance, or device performance.
