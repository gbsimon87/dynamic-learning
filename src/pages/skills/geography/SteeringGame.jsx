import { useCallback, useEffect, useRef, useState } from "react";
import { createSteeringGame } from "./steeringFlight.js";
import { ACTION_LABELS, STYLE_NAMES, formatSeconds, stickVector } from "./steeringRound.js";
import "./SteeringGame.css";

const THUMB_SIZE = 64;
const INITIAL_VIEW = {
    style: "A",
    target: { name: "RED", css: "#ff4d4d" },
    done: false,
    progress: { done: 0, total: 5 },
    toast: null,
    notes: { A: { rows: [], doneCount: 0, doneSeconds: 0 }, B: { rows: [], doneCount: 0, doneSeconds: 0 } },
};

function NotesTable({ style, notes, playing }) {
    const { rows, doneCount, doneSeconds } = notes;
    return (
        <section>
            <h3>{STYLE_NAMES[style]}{playing ? " (playing)" : ""}</h3>
            {rows.length === 0 ? (
                <div>No targets yet.</div>
            ) : (
                <>
                    <table>
                        <thead>
                            <tr><th>Target</th><th>Time</th><th>Bumps</th><th>{ACTION_LABELS[style]}</th></tr>
                        </thead>
                        <tbody>
                            {rows.map((r) => (
                                <tr key={r.name}>
                                    <td>{r.name}</td><td>{formatSeconds(r.t)} s</td><td>{r.bumps}</td><td>{r.acts}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {doneCount > 0 && <div>Done: {doneCount}/5, total {formatSeconds(doneSeconds)} s</div>}
                </>
            )}
        </section>
    );
}

/**
 * Full-size rocket-steering overlay for the Solar System page. Place it inside a
 * positioned container; it covers it. Owns its canvas and the three.js game.
 */
export default function SteeringGame({ onClose }) {
    const rootRef = useRef(null);
    const canvasRef = useRef(null);
    const arrowRef = useRef(null);
    const thumbRef = useRef(null);
    const gameRef = useRef(null);
    const stickPointer = useRef(null);
    const onCloseRef = useRef(onClose);
    const [view, setView] = useState(INITIAL_VIEW);
    const [failed, setFailed] = useState(false);
    const [thrustOn, setThrustOn] = useState(false);
    const [notesOpen, setNotesOpen] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        onCloseRef.current = onClose;
    }, [onClose]);

    useEffect(() => {
        const root = rootRef.current;
        let game;
        try {
            game = createSteeringGame({
                canvas: canvasRef.current,
                arrowEl: arrowRef.current,
                reducedMotion: window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false,
                onChange: setView,
            });
        } catch {
            setFailed(true);
            return undefined;
        }
        gameRef.current = game;
        setView(game.getState());
        const fit = () => {
            const rect = root.getBoundingClientRect();
            game.resize(rect.width || window.innerWidth, rect.height || window.innerHeight);
        };
        fit();
        const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(fit);
        observer?.observe(root);
        window.addEventListener("resize", fit);
        return () => {
            observer?.disconnect();
            window.removeEventListener("resize", fit);
            game.dispose();
            gameRef.current = null;
        };
    }, []);

    useEffect(() => {
        const onKeyDown = (event) => {
            if (event.key === "Escape") onCloseRef.current?.();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    const chooseStyle = (style, event) => {
        gameRef.current?.setStyle(style);
        setThrustOn(false);
        stickPointer.current = null;
        event.currentTarget.blur();
    };

    // joystick: pointer capture keeps it tracking, and GO! works at the same time
    const moveStick = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const max = rect.width / 2 - THUMB_SIZE / 2;
        const v = stickVector(event.clientX - (rect.left + rect.width / 2), event.clientY - (rect.top + rect.height / 2), max);
        gameRef.current?.setStick(v.x, v.y);
        if (thumbRef.current) thumbRef.current.style.transform = `translate(${v.thumbX}px, ${v.thumbY}px)`;
    };
    const stickDown = (event) => {
        stickPointer.current = event.pointerId;
        event.currentTarget.setPointerCapture?.(event.pointerId);
        moveStick(event);
        event.preventDefault();
    };
    const stickMove = (event) => {
        if (event.pointerId === stickPointer.current) moveStick(event);
    };
    const stickEnd = (event) => {
        if (event.pointerId !== stickPointer.current) return;
        stickPointer.current = null;
        gameRef.current?.setStick(0, 0);
        if (thumbRef.current) thumbRef.current.style.transform = "";
    };

    const thrustDown = (event) => {
        gameRef.current?.setThrust(true);
        setThrustOn(true);
        event.currentTarget.setPointerCapture?.(event.pointerId);
        event.preventDefault();
    };
    const thrustUp = () => {
        gameRef.current?.setThrust(false);
        setThrustOn(false);
    };

    const copyResults = useCallback(async () => {
        const text = gameRef.current?.resultsText() ?? "";
        try {
            await navigator.clipboard.writeText(text);
            setMessage("Copied!");
        } catch {
            setMessage("Could not copy. You can select the numbers above instead.");
        }
    }, []);

    const { style, target, toast, notes } = view;
    const hint = style === "A"
        ? <>Steer with the joystick, hold GO! to fly<span className="steering__kbd"> (or arrow keys / WASD + Space)</span></>
        : "Tap a planet or anywhere in space to fly there";

    return (
        <div ref={rootRef} className="steering" data-style={style} role="dialog" aria-label="Rocket steering practice">
            <canvas ref={canvasRef} className="steering__canvas" onPointerDown={(e) => gameRef.current?.tap(e.clientX, e.clientY)} />
            {failed && (
                <p className="steering__fail">Sorry, the 3D bits could not start on this device. Please go back and try again.</p>
            )}
            <div ref={arrowRef} className="steering__arrow" aria-hidden="true" />

            <div className="steering__top">
                <button type="button" className="steering__back" onClick={() => onClose?.()}>
                    <span aria-hidden="true">←</span> Back
                </button>
                <div className="steering__modes">
                    {["A", "B"].map((st) => (
                        <button key={st} type="button" className="steering__mode" aria-pressed={style === st} onClick={(e) => chooseStyle(st, e)}>
                            {STYLE_NAMES[st]}
                        </button>
                    ))}
                </div>
                <button type="button" className="steering__notes-btn" aria-expanded={notesOpen} aria-controls="steering-notes" onClick={() => setNotesOpen((o) => !o)}>
                    Notes
                </button>
                <div className="steering__banner">
                    {target ? (
                        <>
                            <span className="steering__swatch" style={{ background: target.css }} />
                            <span>Fly to the {target.name} planet!</span>
                        </>
                    ) : (
                        <>
                            <span>All done, star pilot!</span>
                            <button type="button" className="steering__again" onClick={() => gameRef.current?.goAgain()}>Go again</button>
                        </>
                    )}
                </div>
                <div className="steering__hint">{hint}</div>
            </div>

            {toast && (
                <div key={toast.id} className="steering__toast" role="status">{toast.text}</div>
            )}

            {style === "A" && (
                <>
                    <div
                        className="steering__stick"
                        onPointerDown={stickDown}
                        onPointerMove={stickMove}
                        onPointerUp={stickEnd}
                        onPointerCancel={stickEnd}
                        role="group"
                        aria-label="Joystick"
                    >
                        <div ref={thumbRef} className="steering__thumb" />
                    </div>
                    <button
                        type="button"
                        className={`steering__thrust${thrustOn ? " is-on" : ""}`}
                        aria-label="Thrust"
                        onPointerDown={thrustDown}
                        onPointerUp={thrustUp}
                        onPointerCancel={thrustUp}
                        onContextMenu={(e) => e.preventDefault()}
                    >
                        GO!
                    </button>
                </>
            )}

            {notesOpen && (
                <div id="steering-notes" className="steering__notes">
                    <h2 className="steering__notes-title">Notes for the grown-up</h2>
                    <NotesTable style="A" notes={notes.A} playing={style === "A"} />
                    <NotesTable style="B" notes={notes.B} playing={style === "B"} />
                    <div className="steering__notes-row">
                        <button type="button" onClick={() => gameRef.current?.newRound()}>New round</button>
                        <button type="button" onClick={copyResults}>Copy results</button>
                    </div>
                    <div className="steering__msg" role="status">{message}</div>
                </div>
            )}
        </div>
    );
}
