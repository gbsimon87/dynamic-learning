# Ocean Explorer — design

Date: 2026-10-29  
Status: Phase 1, the water-appearance follow-up and Phase 2 (manual steering) implemented; Phase 3 (coral reef orbit) implemented; Phase 4 has a parrotfish, clownfish, green sea turtle, spotted eagle ray and seahorse; the drivable ocean is 20 times the first preview's area and busy with nine reefs and 85 animals of twelve species; later phases remain future work.  
Home: Skills Mode → Geography → **Ocean Explorer**  
Audience: children aged 6–8.

## The experience

Explore an underwater world in a small submarine. The long-term experience is
an ocean counterpart to the Solar System skill: children can steer, take
interactive tours, approach and orbit objects such as reefs, open information
cards and travel between different ocean areas.

Ocean Explorer is the Solar System concept rebuilt underwater, and the second
world in the [explorable worlds](2026-10-29-explorable-worlds-design.md)
family. The submarine plays the part of the spaceship, and reefs and sea
creatures play the part of the planets. Ocean features reuse the shared kit
described there, rather than copying Solar System code.

Start with a small working prototype and add capabilities in phases. Each
phase should extend the working experience. The first prototype establishes
the underwater setting and submarine; learning encounters arrive later.

The owner's attached image and video link inspire the atmosphere, rather than
set a visual fidelity target. The image was visible during design; the X video
could not be retrieved. Use original artwork.
Reference: <https://x.com/i/status/2115466372083843575>.

## Phase 1: a submarine in an ocean

Open the preview and see one friendly submarine suspended above a sandy seabed
in blue water. A sunlit reflective surface overhead, gentle seabed light
patterns, distance haze and soft shadows give the scene depth. Shallow sand
ridges, scattered rocks, small seagrass patches and sparse suspended particles
provide scale without becoming interactive discoveries. The
submarine has a clear silhouette, rounded hull, window, fins and propeller.
Simple shapes are sufficient.

The submarine stays stationary. The view starts behind and slightly above it.
Children can look around it, zoom within comfortable limits and choose
**Reset view**. There is a clear way back to Skills Mode. This camera movement
is looking around the submarine, not steering it or travelling to a discovery.

The first interface is small: title, preview label, short viewing instructions,
Reset view, Pause/Resume water and navigation back. It works on phone, tablet and desktop, with
keyboard access, large touch targets and readable controls in both themes.
If the scene cannot load, show a short explanation with navigation back.

Phase 1 includes no fish, reef, information cards, lessons, questions, tours,
map, travel between areas, cockpit or saved discoveries. Water motion is
optional, pauses when the tab is hidden and stays still for reduced motion.
It is a visual prototype and must be described that way in the
Skills listing and public guide.

The prototype succeeds when it feels recognisably underwater, the submarine
is easy to see, looking around is comfortable, and reset and navigation work
reliably. It does not need the visual richness of the reference image.

## How the experience grows

| Phase | Experience added |
|---|---|
| **1. Ocean and submarine** | Look around a stationary submarine in a simple underwater scene |
| **2. Manual steering** | Drive around that same scene with forgiving keyboard and touch controls |
| **3. One discovery** | Approach a coral reef, orbit it like a planet and open its information card |
| **4. Sea life** | Watch one swimming fish, then introduce more animals gradually using the same discovery experience |
| **5. Interactive tours** | Follow a short guided journey through existing discoveries, with assisted travel, narration and pause/skip controls |
| **6. Different ocean areas** | Choose another environment, travel there and return, similar in purpose to travelling between systems in Solar System |

These phases describe the intended growth, not a commitment to build all of
it at once. Later scope can change after using the preceding version. There
is no requirement for a fully populated reef or an eight-animal cast before
the first prototype works.

## Phase 3: a coral reef to orbit

Phase 3 adds one stationary discovery, a colourful coral reef, and works
exactly like orbiting a planet in the Solar System's manual flight.

1. **Driving near the reef.** The reef sits on the seabed a short drive from
   where the submarine starts, so a child finds it within the first minute
   without help. When the submarine is close enough, an **Orbit Coral reef**
   button appears, with the same wording, look and place as the spaceship's.
   Driving away hides it again.
2. **Orbiting.** Choosing it takes over steering. The submarine circles the
   reef slowly, at about one lap a minute like the planets, with the camera
   following. A status line reads "Orbiting Coral reef". With reduced motion,
   the submarine holds still and the status line adds "steady view", as in the
   Solar System. The reef's information card opens.
3. **Leave orbit** hands steering back where the submarine is. The reef stays
   where it is.

The submarine cannot drive through the reef; it bumps against it like the
rocks.

### The reef card

The card has the same structure as the Solar System's planet card:

- **Header:** a small label ("Habitat"), the name "Coral reef" and a close
  button.
- **While orbiting:** the "Show/Hide reef facts" toggle, as the planets have.
- **Opening line:** one sentence connecting what the child sees to one idea,
  for example that coral looks like rock but is made of tiny animals.
- **Honesty note:** this ocean is a made-up mix of places; real reefs grow in
  warm, shallow, sunlit seas.
- **✨ Discover:** short stats (for example where reefs are found, how deep
  and how big), two facts and a "More facts" fold.
- **🔎 Look closer:** a few short paragraphs and a 🔊 **Read aloud** button.
  Reading respects the app's mute setting.

Left out: **Play & compare** (the owner's decision) and **Explore more**,
which arrives with guided tours in Phase 5. No disabled or placeholder
sections appear.

All wording is written for 6–8 year olds, and every fact is checked against
primary marine science sources and matches the reef actually shown. The
builder drafts the card with a source for each fact, and the owner reviews
the wording before Phase 3 is called done.

### Built on the shared kit

Phase 3 extracts the kit's first pieces: the discovery data shape, fold-out
sections, the Orbit button, the orbit pilot and the information card. The
Solar System moves onto them in the same change, with no visible difference.
The reef is the first ocean user of each piece.

### Not in Phase 3

Animals, more discoveries, tapping or searching for the reef, tours,
missions, settings, saved discoveries and other ocean areas.

### Phase 3 succeeds when

A child drives to the reef without help, orbits it, reads or hears its card,
leaves orbit and drives on, on phone, tablet and desktop in both themes. The
Solar System looks and behaves exactly as before, and its tests still pass.

## Visual and interaction principles

Use colourful, stylised 3D with readable silhouettes. Create the underwater
feeling through water colour, haze, light and depth before adding detailed
scenery. Keep cameras calm and avoid compulsory bobbing, flashing or abrupt
motion. Later automatic movement must be stoppable.

Keep controls forgiving and understandable with sound off. Respect reduced
motion and offer keyboard access. Interface colours follow the app's paired
theme tokens; environmental lighting represents the habitat independently of
the selected interface theme.

Introduce controls only when their feature exists. There are no disabled
buttons advertising future tours or destinations in the initial preview.

## Learning in later phases

Information cards should connect what the child can see to one short,
understandable idea. Tours should encourage observation and allow children
to pause, skip or explore independently. There are no timers, fuel limits,
damage, combat or penalties for taking time.

Check facts against primary marine science sources and match them to the
actual object or animal shown. Choose animals appropriate to their area.
Distinguish habitats from depth zones and avoid implying every environment
is adjacent in one real location. Do not claim statutory curriculum coverage
without checking the relevant programme and mapping in `docs/curriculum/`.

Discoveries and activity state are session-only when introduced. Saved
progress and account rewards would need a separate design decision.

## Water rendering references

Keep these official Three.js references available when designing later visual
improvements: [Water](https://threejs.org/docs/#Water) and
[WaterMesh](https://threejs.org/docs/#WaterMesh). Their standalone documentation
and implementation notes are recorded in the Ocean Explorer section of
`docs/PROJECT_KNOWLEDGE.md`.

Both provide flat, reflective water-surface effects. The requested appearance
follow-up uses Water with the existing WebGLRenderer: the plane faces down,
its shading is adapted for viewing from below, and the camera stays submerged.
Original procedural textures provide layered surface ripples, fine sand texture
and irregular light patterns shared by the sand and rocks. Distance haze,
faint sunlight shafts and shadows add a sense of being underwater. Match the
distant background to the fog so no visible plane edge breaks the environment. A pause control and reduced-motion support keep the effect optional.
WaterMesh remains a reference for a possible future WebGPURenderer migration.
These effects are an artistic treatment, not a physical underwater simulation.
Physical-device performance review remains outstanding. This visual follow-up
does not change the order of the later gameplay phases.

## Build plans

The [Phase 4c build plan](../plans/2026-10-29-ocean-explorer-phase-4c-busy-ocean.md) fills the larger ocean with
reefs and animals.
The [Phase 4b build plan](../plans/2026-10-29-ocean-explorer-phase-4b-more-animals.md) adds four more
animals.
The [Phase 4 build plan](../plans/2026-10-29-ocean-explorer-phase-4.md) covers
the first swimming fish, a parrotfish that can be orbited.
The [Phase 3 build plan](../plans/2026-10-29-ocean-explorer-phase-3.md) covers
the coral reef orbit and the first shared world kit pieces.
The [Phase 2 build plan](../plans/2026-10-29-ocean-explorer-phase-2.md) covers
manual steering, reusing the Solar System free-flight controls.
The [Phase 1 build plan](../plans/2026-10-29-ocean-explorer-phase-1.md) contains
file changes, implementation order, checks and completion criteria. This
design holds the experience, scope and broad phase boundaries. Plan later
phases separately when we are ready to build them.
