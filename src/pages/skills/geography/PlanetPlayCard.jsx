import { useEffect, useState } from "react";
import Mascot from "../../../components/mascot/Mascot";
import { isMuted } from "../../../components/celebration/sound/player";
import { speak, stopNarration } from "../../../utils/speech";
import { PLANET_PLAY, ageSentence, playFor, weightOn, weightSentence, BIX_EARTH_KG } from "./planetPlay";
import "./PlanetPlayCard.css";

const AGES = [4, 5, 6, 7, 8, 9, 10, 11];

function yearLine(name) {
    const years = PLANET_PLAY[name]?.yearInEarthYears;
    if (!years || name === "Earth") return null;
    return `A year on ${name} is ${years.toFixed(1)} Earth years long.`;
}

/**
 * Two small games on a planet card: your age there, and Bix's weight there.
 * With `onLineUp`, a third button opens the line-up by size (#62).
 */
export default function PlanetPlayCard({ bodyName, onLineUp }) {
    // Open panel and chosen age are keyed to the body so they reset when it changes.
    const [state, setState] = useState({ body: bodyName, panel: null, age: null });
    const current = state.body === bodyName ? state : { body: bodyName, panel: null, age: null };
    const { panel, age } = current;
    const can = playFor(bodyName);

    const set = (patch) => setState({ ...current, ...patch });

    const sentence =
        panel === "age" && age !== null ? ageSentence(bodyName, age)
            : panel === "weight" ? weightSentence(bodyName)
                : null;

    // Read aloud when a sentence appears, only with the app's sound on.
    useEffect(() => {
        if (sentence && !isMuted()) speak(sentence);
    }, [sentence]);

    // Stop narration when the body changes or the card goes away.
    useEffect(() => () => stopNarration(), [bodyName]);

    if (!can.age && !can.weight) return null;

    const ageId = "planet-play-age";
    const weightId = "planet-play-weight";
    const toggle = (name) => set({ panel: panel === name ? null : name, age: null });
    const gravity = PLANET_PLAY[bodyName].gravity;
    // Lighter bodies bounce higher, heavier ones squash more.
    const lift = Math.round(Math.min(34, Math.max(6, 22 / Math.max(gravity, 0.3))));
    const squash = Math.min(0.28, Math.max(0.04, (gravity - 0.5) * 0.18 + 0.1)).toFixed(2);
    const line = panel === "age" ? yearLine(bodyName) : null;

    return (
        <div className="planet-play">
            <div className="planet-play__buttons">
                {can.age && (
                    <button
                        type="button"
                        className="planet-play__toggle"
                        aria-expanded={panel === "age"}
                        aria-controls={ageId}
                        onClick={() => toggle("age")}
                    >
                        <span aria-hidden="true">🎂</span> How old would I be?
                    </button>
                )}
                {can.weight && (
                    <button
                        type="button"
                        className="planet-play__toggle"
                        aria-expanded={panel === "weight"}
                        aria-controls={weightId}
                        onClick={() => toggle("weight")}
                    >
                        <span aria-hidden="true">⚖️</span> How heavy would Bix be?
                    </button>
                )}
                {onLineUp && (
                    <button type="button" className="planet-play__toggle" onClick={onLineUp}>
                        <span aria-hidden="true">📏</span> How big is it really?
                    </button>
                )}
            </div>

            {panel === "age" && (
                <div className="planet-play__panel" id={ageId}>
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
                <div className="planet-play__panel" id={weightId}>
                    <div
                        className="planet-play__stage"
                        style={{ "--play-lift": `${lift}px`, "--play-squash": squash }}
                    >
                        <div className="planet-play__bix">
                            <Mascot className="mascot-small" decorative />
                        </div>
                        <div className="planet-play__scale" aria-hidden="true">
                            <div className="planet-play__readout">{weightOn(bodyName)} kg</div>
                            <div className="planet-play__plate" />
                        </div>
                    </div>
                    <div className="planet-play__result" aria-live="polite">
                        <p className="planet-play__sentence">{sentence}</p>
                        {bodyName !== "Earth" && <p className="planet-play__note">Earth: {BIX_EARTH_KG} kg</p>}
                    </div>
                </div>
            )}
        </div>
    );
}
