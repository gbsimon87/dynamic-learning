import SolarSceneBoundary from './SolarSceneBoundary.jsx';
import SpaceArithmeticPanel from '../math/SpaceArithmeticPanel.jsx';
import { useCallback, useEffect, useRef, useState } from "react";
import ThreeSolarSystem from "./SolarSystem.jsx";
import { HOME_SYSTEM } from "./systems/home.js";
import { loadSystem, registryEntry } from "./systems/registry.js";
import { readDebugFlags } from "./solarQuality.js";
import { speak, stopNarration } from "../../../utils/speech.js";
import { isMuted } from "../../../components/celebration/sound/player.js";

// Page messages sit above the scene's hand-over fade (60) and trip panel (65).
const ABOVE_TRIP = { zIndex: 70 };
// A system that has not loaded by then counts as unreachable; messages then clear.
const LOAD_TIMEOUT_MS = 20000;
const NOTICE_MS = { welcome: 6000, alert: 8000 };

// Opposite way, without the -0s a plain minus sign leaves behind.
const reverse = (d) => d && { x: 0 - d.x, y: 0 - d.y, z: 0 - d.z };

/**
 * The Solar System page: which star system the child is in. Changing system
 * remounts the scene (`key`), which frees the old system and builds the new
 * one from its definition. Nothing is saved: a reload always starts at home.
 *
 * Travel requests (`onTravel`) come from the scene at a trip's hand-over;
 * one loads at a time. The scene asks for the next system early
 * (`onPrepare`, when the warning starts) so the hand-over rarely waits, and a
 * load that never finishes gives up and lands home. The page also speaks the new system's welcome once the
 * scene says the child has arrived — never after turning back, never muted.
 */
export default function SolarSystemPage({ initialActivity = false }) {
    const mounted = useRef(true), arithmeticPanel = useRef(null);
    const activityTransition = useRef(false);
    const [arithmetic, setArithmetic] = useState(null);
    const [sceneUnavailable, setSceneUnavailable] = useState(false);
    const unavailable = useCallback(() => {
        setSceneUnavailable(true); activityTransition.current = true; stopNarration();
        setArithmetic({ api: { prepareRound() {}, setState() {}, setLane() {}, setTurbo() {}, setHot() {}, leave() { activityTransition.current = false; setArithmetic(null); } } });
    }, []);
    useEffect(() => { mounted.current = true; return () => { mounted.current = false; stopNarration(); }; }, []);
    const [state, setState] = useState({ system: HOME_SYSTEM, arrival: null, visit: 0 });
    const [loading, setLoading] = useState(null);
    const [notice, setNotice] = useState(null);
    const loadingRef = useRef(false);
    const prepared = useRef(new Map());
    const welcomedVisit = useRef(-1);
    const stateRef = useRef(state);
    stateRef.current = state;

    const prepare = useCallback((id) => {
        if (!registryEntry(id) || prepared.current.has(id)) return prepared.current.get(id);
        // A failed load is forgotten, so the next attempt tries again.
        const load = loadSystem(id);
        load.catch(() => prepared.current.delete(id));
        prepared.current.set(id, load);
        return load;
    }, []);

    const travel = useCallback(({ to, mode, direction = null, turnedBack = false }) => {
        const entry = registryEntry(to);
        if (activityTransition.current || loadingRef.current || !entry) return;
        loadingRef.current = true;
        setLoading(entry.phrase);
        setNotice(null);
        let timer;
        const timeout = new Promise((resolve, reject) => { timer = window.setTimeout(() => reject(new Error("timed out")), LOAD_TIMEOUT_MS); });
        Promise.race([prepare(to), timeout]).then((system) => {
            if (!mounted.current || activityTransition.current) return;
            setState((current) => ({ system, visit: current.visit + 1, arrival: { from: current.system.id, mode, fromDirection: reverse(direction), turnedBack } }));
        }, () => {
            if (!mounted.current || activityTransition.current) return;
            prepared.current.delete(to);
            // Never a blank scene: back home, rebuilt even if home is where the trip began.
            setState((current) => ({ system: HOME_SYSTEM, visit: current.visit + 1, arrival: null }));
            setNotice({ kind: "alert", text: `We couldn't reach ${entry.phrase}. Back home for now.` });
        }).finally(() => {
            window.clearTimeout(timer);
            loadingRef.current = false;
            if (mounted.current && !activityTransition.current) setLoading(null);
        });
    }, [prepare]);

    const openArithmetic = useCallback(({ api, stage } = {}) => {
        if (!mounted.current || loadingRef.current || stateRef.current.system.id !== HOME_SYSTEM.id) return;
        if (stage === 'cancelled') { activityTransition.current = false; return; }
        activityTransition.current = true; setNotice(null); stopNarration();
        if (!api) return;
        setArithmetic({ api: { ...api, leave() { api.leave(); activityTransition.current = false; setArithmetic(null); } } });
    }, []);
    const arithmeticAnswer = useCallback(event => arithmeticPanel.current?.crossing(event), []);

    const arrived = useCallback(() => {
        if (activityTransition.current) return;
        const { system, arrival, visit } = stateRef.current;
        if (welcomedVisit.current === visit || arrival?.turnedBack || !system.welcome) return;
        welcomedVisit.current = visit;
        setNotice({ kind: "welcome", text: system.welcome });
        if (!isMuted()) speak(system.welcome.replaceAll(system.phrase, system.spokenName ?? system.phrase));
    }, []);

    useEffect(() => {
        if (!notice) return undefined;
        const timer = window.setTimeout(() => setNotice(null), NOTICE_MS[notice.kind]);
        return () => window.clearTimeout(timer);
    }, [notice]);

    // Adults can open another system directly with ?debug&system=<id>.
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("system");
        if (!id || !readDebugFlags(window.location.search).debug || id === HOME_SYSTEM.id) return;
        travel({ to: id, mode: "autopilot", direction: null });
    }, [travel]);

    return <div className="solar-system-page" style={{ position: "relative" }}>
        <SolarSceneBoundary onUnavailable={unavailable}>
            {!sceneUnavailable && <ThreeSolarSystem key={`${state.system.id}:${state.visit}`} system={state.system} arrival={state.arrival} onPrepare={prepare} onTravel={travel} onArrived={arrived} onOpenArithmetic={openArithmetic} onArithmeticAnswer={arithmeticAnswer} initialActivity={initialActivity} onUnavailable={unavailable} />}
        </SolarSceneBoundary>
        {sceneUnavailable && <div className="solar-unavailable"><p>Moving space is unavailable. Space Arithmetic still works in Still space.</p></div>}
        {arithmetic && <SpaceArithmeticPanel ref={arithmeticPanel} flightApi={arithmetic.api} forceStill={sceneUnavailable} />}
        {loading && <p className="solar-meteor-status" role="status" style={ABOVE_TRIP}>Getting {loading} ready…</p>}
        {!loading && notice?.kind === "alert" && <p className="solar-meteor-status" role="alert" style={ABOVE_TRIP}>{notice.text}</p>}
        {!loading && notice?.kind === "welcome" && <p className="solar-meteor-status solar-tap-message" role="status" style={{ ...ABOVE_TRIP, pointerEvents: "none" }}>
            <span aria-hidden="true">🚀 </span>{notice.text}
        </p>}
    </div>;
}
