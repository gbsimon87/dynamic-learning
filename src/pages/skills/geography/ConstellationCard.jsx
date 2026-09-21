import React, { useEffect, useMemo, useRef } from "react";
import { projectConstellation } from "./constellationProjection.js";
import { speak, stopNarration } from "./narration.js";
import "./ConstellationCard.css";

// Each segment starts drawing shortly after the one before it, so the figure
// assembles itself rather than appearing all at once.
const LINE_STAGGER_MS = 90;
const STARS_DELAY_PADDING_MS = 200;

export default function ConstellationCard({
    constellation,
    index,
    total,
    muted,
    onPrevious,
    onNext,
    onToggleMute,
    onExit,
}) {
    const closeButtonRef = useRef(null);
    const onExitRef = useRef(onExit);
    onExitRef.current = onExit;
    const chart = useMemo(() => projectConstellation(constellation.stars), [constellation]);
    const pointById = useMemo(
        () => new Map(chart.points.map((point) => [point.id, point])),
        [chart],
    );
    const nameById = useMemo(
        () => new Map(constellation.stars.map((star) => [star.id, star.name])),
        [constellation],
    );

    const spokenText = constellation.narration;

    useEffect(() => {
        if (muted) {
            stopNarration();
            return undefined;
        }
        speak(spokenText);
        // Covers stepping to another constellation, muting, and unmounting —
        // the card is the only thing that can stop its own narration.
        return stopNarration;
    }, [spokenText, muted]);

    useEffect(() => {
        closeButtonRef.current?.focus();
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                event.stopPropagation();
                onExitRef.current();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const starsDelayMs = constellation.lines.length * LINE_STAGGER_MS + STARS_DELAY_PADDING_MS;

    return (
        <aside
            className="solar-constellation"
            role="dialog"
            aria-modal="true"
            aria-label={`${constellation.name} information`}
        >
            <div className="solar-constellation__chart-pane">
                <svg
                    className="solar-constellation__chart"
                    viewBox={`0 0 ${chart.width} ${chart.height}`}
                    role="img"
                    aria-label={`Star chart of ${constellation.name}`}
                >
                    <defs>
                        <radialGradient id="solar-constellation-glow">
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
                            <stop offset="100%" stopColor="#9fd0ff" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    <g className="solar-constellation__lines">
                        {constellation.lines.map(([fromId, toId], lineIndex) => {
                            const from = pointById.get(fromId);
                            const to = pointById.get(toId);
                            if (!from || !to) return null;
                            return (
                                <line
                                    key={`${fromId}-${toId}`}
                                    x1={from.x}
                                    y1={from.y}
                                    x2={to.x}
                                    y2={to.y}
                                    pathLength="1"
                                    style={{ animationDelay: `${lineIndex * LINE_STAGGER_MS}ms` }}
                                />
                            );
                        })}
                    </g>
                    <g
                        className="solar-constellation__stars"
                        style={{ animationDelay: `${starsDelayMs}ms` }}
                    >
                        {chart.points.map((point) => (
                            <g key={point.id}>
                                <circle
                                    className="solar-constellation__halo"
                                    cx={point.x}
                                    cy={point.y}
                                    r={point.radius * 3}
                                    fill="url(#solar-constellation-glow)"
                                />
                                <circle
                                    className="solar-constellation__star"
                                    cx={point.x}
                                    cy={point.y}
                                    r={point.radius}
                                />
                                <text
                                    className="solar-constellation__star-name"
                                    x={point.x}
                                    y={point.y - point.radius - 1.8}
                                    textAnchor="middle"
                                >
                                    {nameById.get(point.id)}
                                </text>
                            </g>
                        ))}
                    </g>
                </svg>
            </div>

            <div className="solar-constellation__body">
                <div className="solar-constellation__header">
                    <div>
                        <span className="solar-constellation__eyebrow">
                            Constellation {index + 1} of {total}
                        </span>
                        <h2>{constellation.name}</h2>
                        <p className="solar-constellation__aka">{constellation.alsoKnownAs}</p>
                    </div>
                    <button
                        ref={closeButtonRef}
                        type="button"
                        className="solar-constellation__close"
                        aria-label="Close constellations"
                        onClick={onExit}
                    >
                        ×
                    </button>
                </div>

                <div className="solar-constellation__scroll">
                    <p className="solar-constellation__description">{constellation.description}</p>
                    <h3>Did you know?</h3>
                    <ul>
                        {constellation.facts.map((fact) => <li key={fact}>{fact}</li>)}
                    </ul>
                </div>

                <div className="solar-tour-controls" aria-label="Constellation navigation">
                    <div className="solar-tour-controls__audio">
                        <button type="button" onClick={() => speak(spokenText)} disabled={muted}>
                            Replay narration
                        </button>
                        <button type="button" onClick={onToggleMute}>
                            {muted ? "Turn sound on" : "Mute"}
                        </button>
                    </div>
                    <div className="solar-tour-controls__nav">
                        <button type="button" onClick={onPrevious} disabled={index === 0}>
                            ← Previous
                        </button>
                        <button
                            type="button"
                            className="solar-tour-controls__next"
                            onClick={onNext}
                            disabled={index >= total - 1}
                        >
                            Next →
                        </button>
                    </div>
                    <button type="button" className="solar-tour-controls__exit" onClick={onExit}>
                        Back to the Solar System
                    </button>
                </div>
            </div>
        </aside>
    );
}
