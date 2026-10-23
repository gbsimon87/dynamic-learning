import { useEffect, useRef, useState } from "react";
import { speak, stopNarrationOf } from "../../../utils/speech.js";
import { isMuted } from "../../../components/celebration/sound/player.js";
import { drawMoonPhase, MOON_PHASE_LINE } from "./moonPhase.js";
import "./MoonPhaseCard.css";

export default function MoonPhaseCard({ sceneApiRef, muted = false, embedded = false }) {
    const [expanded, setOpen] = useState(false);
    const open = embedded || expanded;
    const [name, setName] = useState("");
    const canvas = useRef(null);
    const timer = useRef(null);
    useEffect(() => {
        if (!open) return;
        const update = () => {
            const phase = sceneApiRef.current?.getMoonPhase?.();
            if (phase) {
                drawMoonPhase(canvas.current, phase);
                setName(phase.name);
            }
        };
        update();
        timer.current = setInterval(update, 150);
        return () => { clearInterval(timer.current); stopNarrationOf(MOON_PHASE_LINE); };
    }, [open, sceneApiRef]);
    return (
        <div className="moon-phase">
            {!embedded && <button type="button" aria-expanded={open} aria-controls="moon-phase-window" onClick={() => setOpen(!open)}>
                🌗 See the Moon from Earth
            </button>}
            {open && <section id="moon-phase-window" aria-label="Moon phases: view from Earth">
                <h3>View from Earth</h3>
                <canvas ref={canvas} width="128" height="128" role="img" aria-label={`Moon seen from Earth: ${name}`} />
                <p className="moon-phase__name">{name}</p>
                <p>The Moon turns once each orbit, keeping the same face towards Earth.</p>
                <p>The Sun lights half the Moon. As the Moon goes round Earth, we see different amounts of that bright half.</p>
                <p>Model view, north up. Time moves faster here. Pause time to look closely. This is not tonight’s forecast.</p>
                <button type="button" disabled={muted} onClick={() => { if (!muted && !isMuted()) speak(MOON_PHASE_LINE); }}>🔊 Hear about Moon phases</button>
            </section>}
        </div>
    );
}
