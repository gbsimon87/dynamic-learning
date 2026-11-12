import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { steerInput } from './flightControls.js';
import { createOceanScene } from './oceanScene.js';
import OceanDriveControls from './OceanDriveControls.jsx';
import OceanCockpit from './OceanCockpit.jsx';
import { OCEAN_DISCOVERIES } from './oceanDiscoveries.js';
import { OCEAN_TOUR_STOPS, oceanTourDiscovery, oceanTourStop } from './oceanTour.js';
import WorldOrbitControl from '../../../components/worlds/WorldOrbitControl.jsx';
import WorldInfoCard from '../../../components/worlds/WorldInfoCard.jsx';
import { isMuted } from '../../../components/celebration/sound/player.js';
import { speak, stopNarrationOf } from '../../../utils/speech.js';
import BixLoader from '../../../components/mascot/BixLoader';
import './OceanExplorer.css';

// The Solar System free-flight keys, plus Space to move.
const DRIVE_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', ' '];
const keyName = (event) => event.key.length === 1 ? event.key.toLowerCase() : event.key;
const IDLE_TOUR = { active: false, index: 0, paused: false, travelling: false, muted: false };

export default function OceanExplorer() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const [status, setStatus] = useState('loading');
  const [cameraView, setCameraView] = useState('behind');
  const [waterMotion, setWaterMotion] = useState({ paused: true, reduced: false });
  const [offer, setOffer] = useState(null);
  const [orbit, setOrbit] = useState(null);
  const [cardOpen, setCardOpen] = useState(false);
  const [tour, setTour] = useState(IDLE_TOUR);
  const keys = useRef(new Set());
  const stick = useRef({ x: 0, y: 0 });
  const going = useRef(false);
  const tourRef = useRef(tour);
  tourRef.current = tour;
  const tourStop = tour.active ? OCEAN_TOUR_STOPS[tour.index] : null;
  const discovery = tourStop
    ? { ...oceanTourDiscovery(tourStop.id), eyebrow: `Tour stop ${tour.index + 1} of ${OCEAN_TOUR_STOPS.length}` }
    : orbit && OCEAN_DISCOVERIES.find((item) => item.id === orbit.id);

  // Stick/arrow up rises and down dives, as Solar's pitch does; GO or Space moves.
  const steer = () => {
    const { x, y } = steerInput(stick.current.x, stick.current.y, keys.current);
    sceneRef.current?.setSteering({ turn: x, lift: y, throttle: going.current || keys.current.has(' ') ? 1 : 0 });
  };
  const releaseKeys = () => { keys.current.clear(); steer(); };
  const read = (text) => { if (!isMuted() && !tourRef.current.muted) speak(text); };
  const keyDown = (event) => {
    if (sceneRef.current?.handleViewKey(event)) { event.preventDefault(); return; }
    const key = keyName(event);
    if (!DRIVE_KEYS.includes(key) || event.altKey || event.ctrlKey || event.metaKey) return;
    event.preventDefault();
    if (!event.repeat) { keys.current.add(key); steer(); }
  };
  const keyUp = (event) => { if (keys.current.delete(keyName(event))) steer(); };

  const travelToTourStop = (index) => {
    const stop = OCEAN_TOUR_STOPS[index];
    if (!stop) return;
    const nextTour = { ...tourRef.current, active: true, index, paused: false, travelling: true };
    tourRef.current = nextTour;
    setTour(nextTour);
    keys.current.clear();
    stick.current = { x: 0, y: 0 };
    going.current = false;
    sceneRef.current?.setSteering({ turn: 0, throttle: 0, lift: 0 });
    sceneRef.current?.setTourPaused(false);
    setOffer(null);
    setOrbit(null);
    setCardOpen(false);
    sceneRef.current?.tourTo(stop.id);
  };
  const startTour = () => travelToTourStop(0);
  const endTour = () => {
    const current = tourRef.current;
    if (current.active) stopNarrationOf(oceanTourStop(OCEAN_TOUR_STOPS[current.index]?.id)?.narration);
    tourRef.current = IDLE_TOUR;
    setTour(IDLE_TOUR);
    sceneRef.current?.setTourPaused(false);
    sceneRef.current?.leaveOrbit();
    setOrbit(null);
    setCardOpen(false);
  };
  const toggleTourPause = () => {
    const current = tourRef.current;
    const nextTour = { ...current, paused: !current.paused };
    tourRef.current = nextTour;
    setTour(nextTour);
    sceneRef.current?.setTourPaused(nextTour.paused);
    if (nextTour.paused) stopNarrationOf(tourStop?.narration);
    else if (tourStop) read(tourStop.narration);
  };
  const toggleTourNarration = () => {
    const current = tourRef.current;
    const nextTour = { ...current, muted: !current.muted };
    tourRef.current = nextTour;
    setTour(nextTour);
    if (nextTour.muted) stopNarrationOf(tourStop?.narration);
    else if (tourStop) read(tourStop.narration);
  };
  const returnToStart = () => {
    if (tourRef.current.active) {
      tourRef.current = IDLE_TOUR;
      setTour(IDLE_TOUR);
    }
    sceneRef.current?.setTourPaused(false);
    sceneRef.current?.returnToStart();
    setOrbit(null);
    setCardOpen(false);
  };

  useEffect(() => {
    if (status !== 'ready') return undefined;
    const changeCamera = (event) => {
      if ((event.code !== 'KeyC' && event.key.toLowerCase() !== 'c') || event.repeat || event.isComposing || event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.target instanceof Element && event.target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="textbox"]')) return;
      event.preventDefault();
      sceneRef.current?.toggleCameraView();
    };
    document.addEventListener('keydown', changeCamera);
    return () => document.removeEventListener('keydown', changeCamera);
  }, [status]);

  // Escape leaves orbit wherever the focus is.
  useEffect(() => {
    if (!orbit) return undefined;
    const leave = (event) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      if (tourRef.current.active) endTour();
      else sceneRef.current?.leaveOrbit();
    };
    document.addEventListener('keydown', leave);
    return () => document.removeEventListener('keydown', leave);
  }, [orbit]);

  useEffect(() => {
    let active = true;
    const scene = createOceanScene({
      canvas: canvasRef.current,
      container: containerRef.current,
      onReady: () => { if (active) setStatus('ready'); },
      onUnavailable: () => { if (active) setStatus('unavailable'); },
      onCameraViewChange: (view) => { if (active) setCameraView(view); },
      onWaterMotionChange: (motion) => { if (active) setWaterMotion(motion); },
      onOrbitOffer: (next) => { if (active) setOffer(next); },
      // The card opens with each orbit and closes when it ends.
      onOrbitChange: (next) => {
        if (!active) return;
        setOrbit(next);
        setCardOpen(Boolean(next));
        const currentTour = tourRef.current;
        const stop = next && currentTour.active ? oceanTourStop(next.id) : null;
        if (!stop) return;
        const nextTour = { ...currentTour, travelling: false, paused: false };
        tourRef.current = nextTour;
        setTour(nextTour);
        read(stop.narration);
      },
    });
    sceneRef.current = scene;
    return () => {
      active = false;
      sceneRef.current = null;
      scene.dispose();
    };
  }, []);

  return (
    <section className="ocean-explorer" aria-labelledby="ocean-title">
      <header className="ocean-explorer__header">
        <div className="ocean-explorer__brand">
          <Link to="/skills" className="ocean-explorer__back" aria-label="Back to Skills"><span aria-hidden="true">←</span></Link>
          <div><h1 id="ocean-title">Ocean Explorer</h1><p>A world beneath the waves</p></div>
        </div>
        <div className="ocean-explorer__actions">
          {!tour.active && <button className="ocean-explorer__tour-launch" type="button" disabled={status !== 'ready'} onClick={startTour}>
            <span aria-hidden="true">◎</span> Start ocean tour
          </button>}
          <details className="ocean-explorer__tools">
            <summary><span aria-hidden="true">☷</span> Controls</summary>
            <div className="ocean-explorer__menu">
              <button type="button" disabled={status !== 'ready'} aria-pressed={cameraView === 'cockpit'} onClick={() => sceneRef.current?.toggleCameraView()}>
                {cameraView === 'cockpit' ? 'Outside view' : 'Cockpit view'} <kbd>C</kbd>
              </button>
              <button className="ocean-explorer__motion" type="button" disabled={status !== 'ready' || waterMotion.reduced} onClick={() => sceneRef.current?.setWaterPaused(!waterMotion.paused)} title={waterMotion.reduced ? 'Your reduced-motion preference keeps the ocean still.' : undefined}>
                {waterMotion.reduced ? 'Still ocean' : waterMotion.paused ? 'Resume ocean' : 'Pause ocean'}
              </button>
              <button className="ocean-explorer__reset" type="button" disabled={status !== 'ready'} onClick={() => sceneRef.current?.resetView()}>
                <span aria-hidden="true">↺</span> Reset view
              </button>
              <button className="ocean-explorer__start" type="button" disabled={status !== 'ready'} onClick={returnToStart}>
                Back to start
              </button>
              <div className="ocean-explorer__help">
                <p id="ocean-view-help"><strong>Drive:</strong> steer with the joystick, arrow keys or W A S D. Up rises and down dives. Hold GO or Space to move; let go to slow down.</p>
                <p><strong>Camera:</strong> press C to switch between outside and cockpit views. In outside view, drag to look around and pinch or scroll to zoom.</p>
                <p><strong>Discover:</strong> drive near a reef or an animal and choose Orbit to take a closer look and read about it.</p>
                <p id="ocean-keyboard-help"><strong>Keyboard:</strong> Tab to the viewing area to drive. C switches camera. In outside view, Shift + arrow keys looks around and + and − zoom. Home resets the view, and Escape leaves orbit.</p>
              </div>
            </div>
          </details>
        </div>
      </header>
      <div className="ocean-explorer__scene" ref={containerRef}>
        <canvas
          ref={canvasRef}
          className="ocean-explorer__canvas"
          aria-label="Submarine viewing area"
          aria-describedby="ocean-view-help ocean-keyboard-help"
          tabIndex={status === 'ready' ? 0 : -1}
          hidden={status === 'unavailable'}
          onKeyDown={keyDown}
          onKeyUp={keyUp}
          onBlur={releaseKeys}
        >A yellow submarine beneath sunlit rippled water, above sandy ridges, scattered rocks and small patches of seagrass, with coral reefs and colourful sea animals swimming all around.</canvas>
        {status === 'ready' && cameraView === 'cockpit' && <OceanCockpit />}
        {status === 'ready' && !tour.active && !orbit && (
          <OceanDriveControls
            onStick={(x, y) => { stick.current = { x, y }; steer(); }}
            onThrust={(on) => { going.current = on; steer(); }}
          />
        )}
        {status === 'ready' && !tour.active && (offer || orbit) && (
          <WorldOrbitControl
            floating
            className="ocean-explorer__orbit"
            name={orbit?.name ?? offer.name}
            active={Boolean(orbit)}
            reducedMotion={orbit?.steady}
            onEnter={() => sceneRef.current?.enterOrbit()}
            onLeave={() => sceneRef.current?.leaveOrbit()}
          />
        )}
        {tour.active && <div className="ocean-explorer__tour" role="status" aria-live="polite">
          <strong>Ocean animals tour · stop {tour.index + 1} of {OCEAN_TOUR_STOPS.length}</strong>
          <span>{tour.travelling ? `Heading to ${tourStop.name}…` : tour.paused ? 'Tour paused' : `Exploring ${tourStop.name}`}</span>
          <div>
            <button type="button" onClick={toggleTourPause}>{tour.paused ? 'Resume tour' : 'Pause tour'}</button>
            <button type="button" onClick={endTour}>Skip tour</button>
          </div>
        </div>}
        {discovery && cardOpen && !tour.travelling && (
          <div className="ocean-explorer__card">
            <WorldInfoCard key={`${discovery.id}:${tour.active ? tour.index : 'free'}`} discovery={discovery} orbiting
              onClose={tour.active ? endTour : () => setCardOpen(false)} onRead={read} tour={{ ...tour, total: OCEAN_TOUR_STOPS.length, finishLabel: 'Finish tour' }}
              tourActions={{
                previous: () => travelToTourStop(tour.index - 1),
                replay: () => read(tourStop?.narration),
                toggleNarration: toggleTourNarration,
                next: () => tour.index === OCEAN_TOUR_STOPS.length - 1 ? endTour() : travelToTourStop(tour.index + 1),
              }} />
          </div>
        )}
        {/* The scene keeps mounting underneath Bix's screen. */}
        {status === 'loading' && <BixLoader message="Diving beneath the waves" />}
        {status === 'unavailable' && (
          <div className="ocean-explorer__message" role="status">
            <span aria-hidden="true">🌊</span>
            <p>The 3D ocean is unavailable on this device.</p>
            <p>You can use Back to Skills to choose another activity.</p>
          </div>
        )}
      </div>
      {status === 'ready' && !tour.active && cameraView !== 'cockpit' && <p className="ocean-explorer__hint">
        {orbit ? <><kbd>Esc</kbd> to leave orbit</> : <><kbd>Space</kbd> to move <span aria-hidden="true">·</span> arrows to steer</>}
        <span aria-hidden="true">·</span> <kbd>C</kbd> camera
        <span aria-hidden="true">·</span> drag to look
      </p>}
    </section>
  );
}
