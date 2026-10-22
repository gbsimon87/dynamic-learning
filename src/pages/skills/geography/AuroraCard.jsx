import { useEffect } from "react";
import { AURORA_LINE } from "./earthAurora.js";
import { speak, stopNarrationOf } from "../../../utils/speech.js";
import { isMuted } from "../../../components/celebration/sound/player.js";
import "./AuroraCard.css";

export default function AuroraCard({ muted }) {
    useEffect(() => () => stopNarrationOf(AURORA_LINE), []);
    return (
        <details className="solar-aurora-card" onToggle={(event) => { if (!event.currentTarget.open) stopNarrationOf(AURORA_LINE); }}>
            <summary>✨ Northern and southern lights</summary>
            <p>{AURORA_LINE}</p>
            <button type="button" disabled={muted} onClick={() => { if (!isMuted() && !muted) speak(AURORA_LINE); }}>🔊 Hear about auroras</button>
        </details>
    );
}
