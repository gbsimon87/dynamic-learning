import { useState } from "react";
import { Link } from "react-router";
import Mascot from "../../../components/mascot/Mascot";
import SpeakButton from "../../../components/challenge/SpeakButton";
import AnswerFeedbackLine from "../../../components/skills/AnswerFeedbackLine";
import { useAnswerFeedback } from "../../../components/skills/useAnswerFeedback";
import {
    FEATURES,
    PENS,
    bixMove,
    checkGuess,
    describeCreature,
    featureById,
    makeZoo,
    penFor,
    plausibleRules,
    testCreature,
} from "../../../data/freePlay/ruleZoo";
import "../../../components/challenge/challenge-kit.css";
import "../../../components/skills/FreePlayShell.css";
import "./RuleZoo.css";

/**
 * Secret Rule Zoo — a small detective game about sorting (idea #3 in
 * docs/PLAYFUL_LEARNING_EXPLORATION.md).
 *
 * Find the rule: the keeper sorts invented creatures into the Sunny Pen and
 * the Moon Pen by one hidden feature. The child chooses which creature to
 * test, sees where it goes and says the rule when they think they know it. A
 * guess that fits every creature so far is never called wrong; one that
 * doesn't is answered with the creature that shows why.
 *
 * Stump Bix: the child picks a rule, and sorts each creature Bix asks about,
 * until Bix works it out.
 *
 * The rules and the creatures dealt are in data/freePlay/ruleZoo.js. Nothing
 * is stored.
 */

const SUN = "☀️";
const MOON = "🌙";
const PEN_ICON = { sunny: SUN, moon: MOON };
const FILL = { orange: "#f5a03a", blue: "#4a90e2", green: "#45b866", purple: "#a46ddb" };
const PLAIN = { colour: "grey", horns: false, wings: false, spots: false, fourLegs: false, oneEye: false };

const LEVELS = [
    { id: "easier", label: "Easier" },
    { id: "trickier", label: "Trickier" },
];
const MODES = [
    { id: "detective", label: "🔍 Find the rule" },
    { id: "stump", label: "🤖 Stump Bix" },
];

function Creature({ creature, size = 72 }) {
    const fill = FILL[creature.colour] ?? "#9aa0a6";
    const legs = creature.fourLegs ? [30, 42, 58, 70] : [40, 60];
    return (
        <svg className="zoo-creature" viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
            {creature.wings && (
                <g className="zoo-creature__wings">
                    <ellipse cx="20" cy="46" rx="16" ry="24" transform="rotate(-20 20 46)" />
                    <ellipse cx="80" cy="46" rx="16" ry="24" transform="rotate(20 80 46)" />
                </g>
            )}
            {legs.map((x) => <rect key={x} className="zoo-creature__leg" x={x - 3} y="70" width="6" height="18" rx="3" />)}
            {creature.horns && (
                <g className="zoo-creature__horns">
                    <path d="M36 34 L40 12 L46 32 Z" />
                    <path d="M54 32 L60 12 L64 34 Z" />
                </g>
            )}
            <ellipse className="zoo-creature__body" cx="50" cy="55" rx="29" ry="25" fill={fill} />
            {creature.spots && (
                <g className="zoo-creature__spots">
                    <circle cx="36" cy="64" r="4.5" />
                    <circle cx="62" cy="68" r="5.5" />
                    <circle cx="68" cy="52" r="3.5" />
                    <circle cx="44" cy="72" r="3" />
                </g>
            )}
            {creature.oneEye ? (
                <g className="zoo-creature__eye">
                    <circle cx="50" cy="46" r="9" />
                    <circle className="zoo-creature__pupil" cx="51" cy="47" r="4.5" />
                </g>
            ) : (
                <g className="zoo-creature__eye">
                    <circle cx="41" cy="46" r="6" />
                    <circle cx="59" cy="46" r="6" />
                    <circle className="zoo-creature__pupil" cx="42" cy="47" r="3" />
                    <circle className="zoo-creature__pupil" cx="60" cy="47" r="3" />
                </g>
            )}
            <path className="zoo-creature__mouth" d="M43 60 Q50 66 57 60" />
        </svg>
    );
}

/** A grey creature showing just one feature: the picture on a clue button. */
function ClueCreature({ id }) {
    return <Creature creature={{ ...PLAIN, [id]: true }} size={44} />;
}

function Pens({ evidence, highlight }) {
    return (
        <div className="zoo-pens">
            {["sunny", "moon"].map((pen) => {
                const here = evidence.filter((entry) => entry.pen === pen);
                return (
                    <section key={pen} className={`zoo-pen zoo-pen--${pen}`} aria-label={`${PENS[pen]}: ${here.length} creatures`}>
                        <h2 className="zoo-pen__title">
                            <span aria-hidden="true">{PEN_ICON[pen]} </span>{PENS[pen]}
                        </h2>
                        <ul className="zoo-pen__creatures">
                            {here.map(({ creature }) => (
                                <li
                                    key={creature.id}
                                    className={`zoo-pen__creature${highlight[creature.id] ? ` is-${highlight[creature.id]}` : ""}`}
                                    aria-label={describeCreature(creature)}
                                >
                                    <Creature creature={creature} size={60} />
                                </li>
                            ))}
                        </ul>
                    </section>
                );
            })}
        </div>
    );
}

function ClueGrid({ ids, onPick, legend, marks = {} }) {
    return (
        <div className="zoo-clues" role="group" aria-label={legend}>
            {ids.map((id) => (
                <button key={id} type="button" className="choice-btn zoo-clue" onClick={() => onPick(id)}>
                    <ClueCreature id={id} />
                    <span>{featureById(id).clue}</span>
                    {marks[id] && <span className={`zoo-clue__mark is-${marks[id].tone}`}>{marks[id].text}</span>}
                </button>
            ))}
        </div>
    );
}

function newDetective(level) {
    const zoo = makeZoo(Math.random, level);
    return {
        zoo,
        tests: 0,
        guessing: false,
        help: false,
        solved: false,
        highlight: {},
        message: "The keeper sorts creatures into two pens by a secret rule. Pick a creature to test, and see which pen it goes to.",
    };
}

function newStump() {
    return { stage: "choose", rule: null, zoo: null, pending: null, tests: 0, highlight: {}, message: "Pick a secret rule for the pens. Bix won't peek!" };
}

function RuleZoo() {
    const [mode, setMode] = useState("detective");
    const [level, setLevel] = useState("easier");
    const [detective, setDetective] = useState(() => newDetective("easier"));
    const [stump, setStump] = useState(newStump);
    const fb = useAnswerFeedback();

    // A new mode or level is a whole new game: nothing carries over.
    const restart = (nextMode = mode, nextLevel = level) => {
        fb.reset();
        setMode(nextMode);
        setLevel(nextLevel);
        setDetective(newDetective(nextLevel));
        setStump(newStump());
    };

    const message = mode === "detective" ? detective.message : stump.message;

    return (
        <div className="free-play-page rule-zoo">
            <header className="free-play-header">
                <Link to="/skills" className="free-play-back">
                    <span aria-hidden="true">←</span> All games
                </Link>
                <h1 className="free-play-title">
                    <span aria-hidden="true">🦓 </span>
                    Secret Rule Zoo
                </h1>
                <p className="free-play-intro">Test creatures, spot the pattern, and crack the keeper's secret rule.</p>
            </header>

            <div className="challenge-container free-play">
                <div className="free-play-toolbar zoo-toolbar">
                    <div className="free-play-levels" role="group" aria-label="Choose a game">
                        {MODES.map((option) => (
                            <button
                                key={option.id}
                                type="button"
                                className={`free-play-level ${option.id === mode ? "is-active" : ""}`}
                                aria-pressed={option.id === mode}
                                onClick={() => option.id !== mode && restart(option.id, level)}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                    <div className="free-play-levels" role="group" aria-label="Choose a level">
                        {LEVELS.map((option) => (
                            <button
                                key={option.id}
                                type="button"
                                className={`free-play-level ${option.id === level ? "is-active" : ""}`}
                                aria-pressed={option.id === level}
                                onClick={() => option.id !== level && restart(mode, option.id)}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>

                <p className="zoo-message" aria-live="polite">
                    {message} <SpeakButton text={message} label="Hear it" compact />
                </p>

                {mode === "detective" ? (
                    <Detective game={detective} setGame={setDetective} fb={fb} onNew={() => restart()} />
                ) : (
                    <Stump game={stump} setGame={setStump} level={level} fb={fb} onNew={() => restart()} />
                )}

                <AnswerFeedbackLine feedback={fb.feedback} ref={fb.feedbackRef} />
            </div>
        </div>
    );
}

function Detective({ game, setGame, fb, onNew }) {
    const { zoo, tests, guessing, help, solved, highlight } = game;
    const plausible = plausibleRules(zoo.candidates, zoo.evidence);

    const test = (creature) => {
        const next = testCreature(Math.random, zoo, creature.id);
        const pen = next.evidence.at(-1).pen;
        fb.clear();
        setGame({
            ...game,
            zoo: next,
            tests: tests + 1,
            guessing: false,
            highlight: { [creature.id]: "new" },
            message: `It went to the ${PENS[pen]}! ${PEN_ICON[pen]}`,
        });
    };

    const guess = (rule) => {
        const { result, against } = checkGuess(zoo, rule);
        const clue = featureById(rule).clue;
        if (result === "right") {
            fb.answer(true);
            setGame({
                ...game,
                guessing: false,
                solved: true,
                highlight: {},
                message: `You cracked it! The secret rule is "${clue}". You tested ${tests} ${tests === 1 ? "creature" : "creatures"}.`,
            });
        } else if (result === "fits") {
            fb.clear();
            setGame({
                ...game,
                guessing: false,
                highlight: {},
                message: `Good thinking: "${clue}" fits every creature so far! But it isn't the keeper's rule. Test another creature to find out more.`,
            });
        } else {
            fb.answer(false);
            const feature = featureById(rule);
            setGame({
                ...game,
                guessing: false,
                highlight: { [against.creature.id]: "clue" },
                message: `Look at the creature with the 👀: it has ${against.creature[rule] ? feature.has : feature.hasNot}, but it's in the ${PENS[against.pen]}. So the rule can't be "${feature.clue}".`,
            });
        }
    };

    const marks = Object.fromEntries(zoo.candidates.map((id) => [
        id,
        plausible.includes(id) ? { tone: "maybe", text: "Still possible" } : { tone: "out", text: "Ruled out" },
    ]));

    return (
        <>
            <Pens evidence={zoo.evidence} highlight={highlight} />

            {!solved && !guessing && (
                <section className="zoo-parade" aria-label="Creatures waiting to be tested">
                    <h2 className="zoo-parade__title">Which creature should we test?</h2>
                    <div className="zoo-parade__creatures">
                        {zoo.parade.map((creature) => (
                            <button
                                key={creature.id}
                                type="button"
                                className="zoo-parade__creature"
                                aria-label={`Test this creature. ${describeCreature(creature)}.`}
                                onClick={() => test(creature)}
                            >
                                <Creature creature={creature} size={84} />
                            </button>
                        ))}
                    </div>
                </section>
            )}

            {guessing && !solved && (
                <section className="zoo-guess" ref={fb.answerRef}>
                    <h2 className="zoo-parade__title">What's the secret rule?</h2>
                    <ClueGrid ids={zoo.candidates} onPick={guess} legend="Choose the secret rule" marks={help ? marks : {}} />
                </section>
            )}

            {help && !guessing && !solved && (
                <ul className="zoo-help" aria-label="What Bix has worked out so far">
                    {zoo.candidates.map((id) => (
                        <li key={id} className={`zoo-help__item is-${marks[id].tone}`}>
                            <span aria-hidden="true">{marks[id].tone === "out" ? "✗" : "?"} </span>
                            {featureById(id).clue}: {marks[id].text.toLowerCase()}
                        </li>
                    ))}
                </ul>
            )}

            <div className="zoo-actions">
                {!solved && (
                    <button
                        type="button"
                        className="submit-btn"
                        onClick={() => setGame({ ...game, guessing: !guessing, highlight: {} })}
                    >
                        {guessing ? "Test more creatures" : "I know the rule!"}
                    </button>
                )}
                {!solved && (
                    <button type="button" className="scale-step-btn zoo-secondary" aria-pressed={help} onClick={() => setGame({ ...game, help: !help })}>
                        {help ? "Hide Bix's help" : "Help me think"}
                    </button>
                )}
                <button type="button" className={solved ? "submit-btn" : "scale-step-btn zoo-secondary"} onClick={onNew}>
                    {solved ? "Play again" : "New zoo"}
                </button>
            </div>
        </>
    );
}

function Stump({ game, setGame, level, fb, onNew }) {
    const { stage, rule, zoo, pending, tests, highlight } = game;

    const choose = (picked) => {
        fb.clear();
        setGame({
            ...game,
            stage: "sorting",
            rule: picked,
            zoo: makeZoo(Math.random, level, picked),
            message: `Your secret rule is "${featureById(picked).clue}". The keeper has sorted two creatures already. Now tap "Bix, pick one!"`,
        });
    };

    const bixPicks = () => {
        const move = bixMove(zoo);
        fb.clear();
        if (move.kind === "guess") {
            setGame({
                ...game,
                stage: "done",
                pending: null,
                message: `Bix says: "I think your secret rule is ${featureById(move.rule).clue}!" He's right! He needed ${tests} ${tests === 1 ? "test" : "tests"}, because you sorted every creature carefully.`,
            });
            fb.answer(true);
            return;
        }
        setGame({
            ...game,
            pending: move.creature,
            highlight: {},
            message: "Bix wants to test this creature. Which pen does it go in, by your rule?",
        });
    };

    const sort = (pen) => {
        const feature = featureById(rule);
        if (pen !== penFor(rule, pending)) {
            fb.answer(false);
            const check = `Check your rule: "${feature.clue}". Does this creature have ${feature.has}?`;
            // A new wording each time, so a screen reader says it again.
            setGame({
                ...game,
                message: game.message === check ? `Look again: does this creature have ${feature.has}? Your rule is "${feature.clue}".` : check,
            });
            return;
        }
        fb.clear();
        setGame({
            ...game,
            zoo: testCreature(Math.random, { ...zoo, parade: [pending, ...zoo.parade.filter((c) => c.id !== pending.id)] }, pending.id, rule),
            pending: null,
            tests: tests + 1,
            highlight: { [pending.id]: "new" },
            message: `Into the ${PENS[pen]} it goes! Bix is thinking… Tap "Bix, pick one!" again.`,
        });
    };

    if (stage === "choose") {
        return <ClueGrid ids={FEATURES.map((f) => f.id)} onPick={choose} legend="Pick the secret rule" />;
    }

    return (
        <>
            <p className="zoo-secret">
                <span aria-hidden="true">🤫 </span>Your secret rule: <strong>{featureById(rule).clue}</strong>
            </p>
            <Pens evidence={zoo.evidence} highlight={highlight} />

            {pending && (
                <section className="zoo-bix-pick" ref={fb.answerRef} aria-label="The creature Bix wants to test">
                    <Mascot decorative className="zoo-bix" />
                    <div className="zoo-bix-pick__creature" role="img" aria-label={describeCreature(pending)}>
                        <Creature creature={pending} size={96} />
                    </div>
                    <div className="zoo-bix-pick__pens" role="group" aria-label="Which pen?">
                        {["sunny", "moon"].map((pen) => (
                            <button key={pen} type="button" className={`choice-btn zoo-pen-btn zoo-pen-btn--${pen}`} onClick={() => sort(pen)}>
                                <span aria-hidden="true">{PEN_ICON[pen]} </span>{PENS[pen]}
                            </button>
                        ))}
                    </div>
                </section>
            )}

            <div className="zoo-actions">
                {stage === "sorting" && !pending && (
                    <button type="button" className="submit-btn" onClick={bixPicks}>
                        <span aria-hidden="true">🤖 </span>Bix, pick one!
                    </button>
                )}
                <button type="button" className={stage === "done" ? "submit-btn" : "scale-step-btn zoo-secondary"} onClick={onNew}>
                    {stage === "done" ? "Play again" : "Start again"}
                </button>
            </div>
        </>
    );
}

export default RuleZoo;
