import { useEffect, useRef, useState } from "react";
import Mascot from "../../../components/mascot/Mascot";
import { isMuted } from "../../../components/celebration/sound/player";
import { speak, stopNarrationOf } from "../../../utils/speech";
import { ageSentence, playFor, weightOn, weightSentence, yearLine, BIX_EARTH_KG } from "./planetPlay";
import "./PlanetPlayCard.css";

const AGES = [4, 5, 6, 7, 8, 9, 10, 11];

/**
 * Two small games on a planet card: your age there, and Bix's weight there.
 * `play` holds the body's numbers; `isHome` marks the child's own planet.
 * With `onLineUp`, a third button opens the line-up by size (#62).
 */
export default function PlanetPlayCard({ name: bodyName, play, isHome = false, onLineUp }) {
    // Open panel and chosen age are keyed to the body so they reset when it changes.
    const [state, setState] = useState({ body: bodyName, panel: null, age: null });
    const current = state.body === bodyName ? state : { body: bodyName, panel: null, age: null };
    const { panel, age } = current;
    const can = playFor(play);

    const set = (patch) => setState({ ...current, ...patch });

    const sentence =
        panel === "age" && age !== null ? ageSentence(bodyName, play, age, { isHome })
            : panel === "weight" ? weightSentence(bodyName, play, { isHome })
                : null;

    // Read aloud when a sentence appears, only with the app's sound on.
    const spoken = useRef(null);
    useEffect(() => {
        if (sentence && !isMuted()) {
            speak(sentence);
            spoken.current = sentence;
        }
    }, [sentence]);

    // Stop the card's own sentence when the body changes or the card goes
    // away, but not the line-up line or countdown that closed it.
    useEffect(() => () => stopNarrationOf(spoken.current), [bodyName]);

    if (!can.age && !can.weight) return null;

    const gravity = play.gravity;
    // Lighter bodies bounce higher, heavier ones squash more.
    const lift = Math.round(Math.min(34, Math.max(6, 22 / Math.max(gravity, 0.3))));
    const squash = Math.min(0.28, Math.max(0.04, (gravity - 0.5) * 0.18 + 0.1)).toFixed(2);
    const line = panel === "age" ? yearLine(bodyName, play, { isHome }) : null;

    return (
        <div className="planet-play">
            <div className="planet-play__buttons">
                <label>Choose an activity
                    <select aria-label="Choose an activity" value={panel ?? ""} onChange={event => {
                        const choice = event.target.value;
                        if (choice === "size") { onLineUp?.(); return; }
                        stopNarrationOf(spoken.current);
                        set({ panel: choice || null, age: null });
                    }}>
                        <option value="">Pick one…</option>
                        {can.age && <option value="age">🎂 Your space birthday</option>}
                        {can.weight && <option value="weight">⚖️ Bix on the scales</option>}
                        {onLineUp && <option value="size">📏 Compare planet sizes</option>}
                    </select>
                </label>
            </div>

            {panel === "age" && (
                <div className="planet-play__panel">
                    {age === null && <p className="planet-play__prompt">How old are you on Earth?</p>}
                    {age === null && (
                        <div className="planet-play__ages" role="group" aria-label="How old are you?">
                            {AGES.map((n) => (
                                <button key={n} type="button" className="planet-play__age" onClick={() => set({ age: n })}>
                                    {n}
                                </button>
                            ))}
                        </div>
                    )}
                    <div className="planet-play__result" aria-live="polite">
                        {age !== null && (
                            <>
                                <p className="planet-play__sentence">{sentence}</p>
                                {line && <p className="planet-play__note">{line}</p>}
                            </>
                        )}
                    </div>
                    {age !== null && (
                        <button type="button" className="planet-play__again" onClick={() => set({ age: null })}>
                            Pick another age
                        </button>
                    )}
                </div>
            )}

            {panel === "weight" && (
                <div className="planet-play__panel">
                    <div
                        className="planet-play__stage"
                        style={{ "--play-lift": `${lift}px`, "--play-squash": squash }}
                    >
                        <div className="planet-play__bix">
                            <Mascot className="mascot-small" decorative />
                        </div>
                        <div className="planet-play__scale" aria-hidden="true">
                            <div className="planet-play__readout">{weightOn(play)} kg</div>
                            <div className="planet-play__plate" />
                        </div>
                    </div>
                    <div className="planet-play__result" aria-live="polite">
                        <p className="planet-play__sentence">{sentence}</p>
                        {!isHome && <p className="planet-play__note">Earth: {BIX_EARTH_KG} kg</p>}
                    </div>
                </div>
            )}
        </div>
    );
}
