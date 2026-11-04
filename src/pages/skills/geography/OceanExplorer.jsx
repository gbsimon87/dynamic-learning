import { useEffect, useRef, useState } from 'react';
import { steerInput } from './flightControls.js';
import { createOceanScene } from './oceanScene.js';
import OceanDriveControls from './OceanDriveControls.jsx';
import { OCEAN_DISCOVERIES } from './oceanDiscoveries.js';
import WorldOrbitControl from '../../../components/worlds/WorldOrbitControl.jsx';
import WorldInfoCard from '../../../components/worlds/WorldInfoCard.jsx';
import { isMuted } from '../../../components/celebration/sound/player.js';
import { speak } from '../../../utils/speech.js';
import './OceanExplorer.css';

// The Solar System free-flight keys, plus Space to move.
const DRIVE_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', ' '];
const keyName = (event) => event.key.length === 1 ? event.key.toLowerCase() : event.key;

export default function OceanExplorer() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const [status, setStatus] = useState('loading');
  const [waterMotion, setWaterMotion] = useState({ paused: true, reduced: false });
  const [offer, setOffer] = useState(null);
  const [orbit, setOrbit] = useState(null);
  const [cardOpen, setCardOpen] = useState(false);
  const keys = useRef(new Set());
  const stick = useRef({ x: 0, y: 0 });
  const going = useRef(false);
  const discovery = orbit && OCEAN_DISCOVERIES.find((item) => item.id === orbit.id);

  // Stick/arrow up rises and down dives, as Solar's pitch does; GO or Space moves.
  const steer = () => {
    const { x, y } = steerInput(stick.current.x, stick.current.y, keys.current);
    sceneRef.current?.setSteering({ turn: x, lift: y, throttle: going.current || keys.current.has(' ') ? 1 : 0 });
  };
  const releaseKeys = () => { keys.current.clear(); steer(); };
  const read = (text) => { if (!isMuted()) speak(text); };
  const keyDown = (event) => {
    if (sceneRef.current?.handleViewKey(event)) { event.preventDefault(); return; }
    const key = keyName(event);
    if (!DRIVE_KEYS.includes(key) || event.altKey || event.ctrlKey || event.metaKey) return;
    event.preventDefault();
    if (!event.repeat) { keys.current.add(key); steer(); }
  };
  const keyUp = (event) => { if (keys.current.delete(keyName(event))) steer(); };

  // Escape leaves orbit wherever the focus is.
  useEffect(() => {
    if (!orbit) return undefined;
    const leave = (event) => { if (event.key === 'Escape') { event.preventDefault(); sceneRef.current?.leaveOrbit(); } };
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
      onWaterMotionChange: (motion) => { if (active) setWaterMotion(motion); },
      onOrbitOffer: (next) => { if (active) setOffer(next); },
      // The card opens with each orbit and closes when it ends.
      onOrbitChange: (next) => { if (active) { setOrbit(next); setCardOpen(Boolean(next)); } },
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
        <div>
          <span className="ocean-explorer__preview">Prototype preview</span>
          <h1 id="ocean-title">Ocean Explorer</h1>
          <p>Drive the submarine around the seabed and take a look around.</p>
        </div>
        <div className="ocean-explorer__actions">
          <button className="ocean-explorer__motion" type="button" disabled={status !== 'ready' || waterMotion.reduced} onClick={() => sceneRef.current?.setWaterPaused(!waterMotion.paused)} title={waterMotion.reduced ? 'Your reduced-motion preference keeps the ocean still.' : undefined}>
            {waterMotion.reduced ? 'Still ocean' : waterMotion.paused ? 'Resume ocean' : 'Pause ocean'}
          </button>
          <button className="ocean-explorer__reset" type="button" disabled={status !== 'ready'} onClick={() => sceneRef.current?.resetView()}>
            <span aria-hidden="true">↺</span> Reset view
          </button>
          <button className="ocean-explorer__start" type="button" disabled={status !== 'ready'} onClick={() => sceneRef.current?.returnToStart()}>
            Back to start
          </button>
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
        {status === 'ready' && (
          <OceanDriveControls
            onStick={(x, y) => { stick.current = { x, y }; steer(); }}
            onThrust={(on) => { going.current = on; steer(); }}
          />
        )}
        {status === 'ready' && (offer || orbit) && (
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
        {discovery && cardOpen && (
          <div className="ocean-explorer__card">
            <WorldInfoCard key={discovery.id} discovery={discovery} orbiting onClose={() => setCardOpen(false)} onRead={read} />
          </div>
        )}
        {status !== 'ready' && (
          <div className="ocean-explorer__message" role="status">
            <span aria-hidden="true">🌊</span>
            <p>{status === 'loading' ? 'Opening the ocean preview…' : 'The 3D ocean preview is unavailable on this device.'}</p>
            {status === 'unavailable' && <p>You can use Back to Skills to choose another activity.</p>}
          </div>
        )}
      </div>
      <div className="ocean-explorer__help">
        <p id="ocean-view-help"><strong>Drive:</strong> steer with the joystick, or the arrow keys or W A S D. Up rises and down dives. Hold GO or Space to move; let go to slow down. <strong>Look around:</strong> drag to turn the view. Pinch or scroll to zoom. <strong>Discover:</strong> drive close to a coral reef or an animal (sharks, whales, dolphins, an octopus, swordfish, jellies, turtles and lots of fish swim all over the ocean) and choose Orbit to circle it and read about it.</p>
        <details>
          <summary>Keyboard controls</summary>
          <p id="ocean-keyboard-help">Tab to the viewing area. Arrow keys or W A S D steer, and holding Space moves. Hold Shift with the arrow keys to look around, + and − to zoom, and Home to reset the view. Press Escape to leave orbit. Tab moves to the next control.</p>
        </details>
      </div>
    </section>
  );
}
